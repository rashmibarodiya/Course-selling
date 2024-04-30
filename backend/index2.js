
require('dotenv').config()
const express = require('express');
const app = express(); 
const cors = require("cors")
app.use(cors())


const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const port =  process.env.PORT

console.log(process.env.HI)
const mongId = process.env.MONG
//const bodyParser = require('body-parser');
app.use(express.json());

const SECRET = process.env.se; 
console.log(SECRET)
 console.log(mongId)
// console.log(mongId)
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});


const adminSchema = new mongoose.Schema({
  username:String,
  password:String
})
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: { type: Number, default: 100 },
  imageLink: String ,
  published: { type: Boolean, default: true }
});


// create models for mongoose

const User = mongoose.model('User',userSchema);
const Admin = mongoose.model('Admin',adminSchema);
const Course = mongoose.model('Courses',courseSchema);

// connect to MongoDB

mongoose.connect(mongId,
{dbname: 'courses'}
);



function authenticateJwt(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    new Promise((resolve, reject) => {
      jwt.verify(token, SECRET, (err, data) => {
        if (err) {
          reject(err);
        } else {
          req.user = data;
          resolve();
        }
      });
    })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(403).send({ msg: "Unauthorized access" });
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
}


app.get("/admin/me", authenticateJwt,(req, res) => {
 
  res.status(200).send(req.user.username)
})


// Admin routes
app.post('/admin/signup', async (req, res) => {
  // logic to sign up admin
  console.log("i am not here")
  console.log("signup")
  var {username, password} = req.body;
  var admin = await User.findOne({username: username })
  if (admin) {
    res.status(403).json({ message: 'admin already exists' });
  }
  admin = new Admin({
      username: username,
      password: password
  });
  admin.save();
  const payload = jwt.sign({ username: username }, SECRET, { expiresIn: '1h' })

  res.status(200).send({
    message: "User created successfully",
    token: payload,
  });
});

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  var {username, password} = req.body;
  var admin = await Admin.findOne({username: username, password: password })
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Admin login succesfully', token });
  } else {
    res.status(404).json({ message: 'Admin not found' });
  }
});

app.post('/admin/courses', authenticateJwt, async (req, res) => {
  // logic to create a course
var {title, description,imageLink} = req.body;

  const course = new Course({title: title, description: description, imageLink:imageLink})
  await course.save();
  res.json({ message: 'Course created successfully', courseId: course.id });
  
});

app.put('/admin/courses/:courseId',authenticateJwt, async (req, res) => {
  // logic to edit a course
  var courseId = req.params.courseId
  var course = await Course.findOne({_id: courseId})
  if (course) {
    course.title = req.body.title
    course.description = req.body.description
    course.imageLink =req.body.imageLink
    await course.save();
    res.json({ message: 'Course updated successfully', course: course });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }

});

app.get('/admin/courses', authenticateJwt, async (req, res) => {
  // logic to get all courses
  
  var courses = await Course.find({})
  console.log(courses)
  res.json(courses);
});

// User routes
app.post('/users/signup', async(req, res) => {
  // logic to sign up user
  var {username, password} = req.body;
  var user = await User.findOne({username: username })
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  }
  const newUser = new User({ username, password });
  await newUser.save();
  const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
  res.json({ message: 'User created successfully', token });
});

app.post('/users/login', async(req, res) => {
  // logic to log in user
  var {username, password} = req.body;
  var user = await User.findOne({username: username })
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User login succesfully', token });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.get('/users/courses', authenticateJwt,async(req, res) => {
  // logic to list all courses
  var courses = await Course.find({published: true})
  res.json({ courses: courses });
});

const { ObjectId } = require('mongodb');

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  console.log(course);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});



app.get('/users/purchasedCourses',authenticateJwt, async (req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
