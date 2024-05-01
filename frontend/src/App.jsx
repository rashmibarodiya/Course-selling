
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Signup from "./Signup.jsx"
//import Signin from './Signin.jsx'
import Appbar from './Admin/Appbar.jsx'
import Appbar2 from './Appbar2.jsx'
// import AddCourse from './AddCourse.jsx';
// import Courses from './Courses.jsx'
// import Course from './Course.jsx'
import { RecoilRoot } from 'recoil';
function App() {  

  return (
    <>
      <div style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}>

        <Router>
          <Appbar2></Appbar2>
          <RecoilRoot>
          <Routes>
          <Route path="/admin" element={<Appbar />} />

            
            {/* <Route path="courses/:courseId" element={<Course />}></Route>
            <Route path="courses" element={<Courses />}></Route>
            <Route path="addCourse" element={<AddCourse />}></Route>
            <Route path="login" element={<Signin />}></Route>
            <Route path="signup" element={<Signup />}></Route> */}
          </Routes>
          </RecoilRoot>
        </Router>

      </div>


    </>
  )
}

export default App
