
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminSignup from "./admin/Signup.jsx"
import AdminSignin from './admin/Signin.jsx'
import UserSignup from "./user/Signup.jsx"
import UserSignin from './user/Signin.jsx'
import Appbar2 from './Appbar2.jsx'
import AddCourse from './admin/AddCourse.jsx';
import AdminCourses from './admin/Courses.jsx'
import UserCourses from './user/Courses.jsx'
import Course from './admin/Course.jsx'
import { RecoilRoot } from 'recoil';
import PurchasedCourse from './user/PurchasedCourse.jsx';


function App() {

  

  // State to keep track of the selected user type



  return (
    <>
    <RecoilRoot>
     <div style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}>
      {/* <div style={{ width: "100vw", height: "100vh", backgroundColor: "#FDF5DF" }}> */}

        <Router>
         
          
           <Appbar2></Appbar2>
            <Routes>
              <Route path="admin/courses/:courseId" element={<Course />}></Route>
              <Route path="admin/courses" element={<AdminCourses />}></Route>
              <Route path="user/purchasedCourse" element={<PurchasedCourse />}></Route>
              <Route path="user/courses" element={<UserCourses />}></Route>
              <Route path="addCourse" element={<AddCourse />}></Route>
              <Route path="admin/login" element={<AdminSignin />}></Route>
              <Route path="admin/signup" element={<AdminSignup />}></Route>
              <Route path="user/login" element={<UserSignin />}></Route>
              <Route path="user/signup" element={<UserSignup />}></Route>
            </Routes>
          
        </Router>

      </div>

      </RecoilRoot>
    </>
  )
}


export default App
