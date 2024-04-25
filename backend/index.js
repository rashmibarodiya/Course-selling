const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors")

//require('dotnev').config()
const port = process.env.PORT || 8000
var secret = "abc"
app.use(cors())


app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let val = 0;



function authentication(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, data) => {
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

app.get('/',(req, res)=>{
  res.status(200).send("done")
})

// Admin routes
app.post("/admin/signup", (req, res) => {
 // console.log("i am not getting this")
  var username = req.body.username;
  var password = req.body.password;
  var admin = ADMINS.find(a => a.username === username && a.password === password);
  if (admin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    const token = jwt.sign({ username: username }, secret, { expiresIn: '1h' });
    var newAdmin = {
      username: username,
      password: password,
      token: token
    }
    ADMINS.push(newAdmin);
    res.json({
      message: 'Admin created successfully',
      token: token
    });
  }
});


app.post("/admin/login", (req, res) => {
  // logic to log in admin

  const admin = ADMINS.find(a => a.username === req.headers.username && a.password === req.headers.password);
  if (admin) {
    res.status(200).send({
      masssge: "Admin login succesfully",
      token: jwt.sign({ username: req.headers.username }, secret, { expiresIn: '1h' })
    });

  } else res.status(403).send({ message: 'Admin login failed' });

});

app.post("/admin/courses", authentication, (req, res) => {
  // logic to create a course

  var title = req.body.title;
  var description = req.body.description;
  var img = req.body.imageLink

  var course = {
    courseId: ++val,
    title: title,
    description: description,
    price: 100,
    imageLink: img,
    published: true
  };

  // admin.courses.push(course);
  var resp = {
    message: "Course created successfully",
    courseId: course.courseId,
  };
  COURSES.push(course);

  res.status(200).send(resp);
})



app.put("/admin/courses/:courseId", authentication, (req, res) => {
  // logic to edit a course
  var courseId = req.params.courseId

  var course = COURSES[courseId - 1]
  course.title = req.body.title;
  course.description = req.body.description;
  course.img = "https://updatedlinktoimage.com";

  res.status(200).send({
    message: "Course updated successfully",
    courseId: course.courseId,
  });
})


app.get("/admin/me", authentication,(req, res) => {
 
  res.status(200).send(req.user.username)
})

app.get("/admin/courses", authentication, (req, res) => {
  // logic to get all courses
  res.status(200).send(COURSES)
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  var username = req.body.username
  var password = req.body.password
  var user = USERS.find(a => a.username === username)
  if (user) {
    res.status(403).send("User already exists!");
  }
  else {
    var payload = jwt.sign({ username: username }, secret, { expiresIn: '1h' })
    var user = {
      username: username,
      password: password,
      courses: []
    }
    USERS.push(user);
    res.status(200).send({
      message: "User created successfully",
      token: payload,
    });
  }

});

app.post("/users/login", (req, res) => {
  // logic to log in user
  var username = req.body.username
  var password = req.body.password
  var user = USERS.find(a => a.username === username && a.password === password)
  if (user) {
    var payload = jwt.sign({ username: username }, secret, { expiresIn: '1h' })
    res.status(200).send({
      message: "User login succesfully!",
      token: payload,
    });
  }
  else res.status(403).send({ message: 'User login failed!' });
});

app.get("/users/courses", authentication, (req, res) => {
  // logic to list all courses
  res.status(200).send(COURSES);
});

app.post("/users/courses/:courseId", (req, res) => {
  // logic to purchase a course
  console.log("i am here")
  var id = req.params.courseId
  var username = req.user

  console.log(username)
  var course = COURSES.find(c => c.courseId === parseInt(id));
  if (course) {
    var user = USERS.find(u => u.username == username)
    user.courses.push(course)
    res.status(200).send({
      message: "Course purchased successfully!",
      courseId: course.courseId,
    });

  }


});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
  var username = req.user
  var user = USERS.find(a => a.username == username)
  res.status(200).send(user.courses);
});

// app.listen(process.env.BACKEND_PORT,()=>{
//   console.log(process.env.BACKEND_PORT)
// })

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});



