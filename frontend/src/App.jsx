
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./admin/Signup.jsx"
import Signin from './admin/Signin.jsx'
import Appbar from './admin/Appbar.jsx'
import Appbar2 from './Appbar2.jsx'
import AddCourse from './admin/AddCourse.jsx';
import Courses from './admin/Courses.jsx'
import Course from './admin/Course.jsx'
import { RecoilRoot } from 'recoil';
function App() {  

   // State to keep track of the selected user type
   const [userType, setUserType] = useState(null);

   // Function to handle user type selection
   const handleUserTypeSelect = (type) => {
     setUserType(type);
   };
 
   // Render the appropriate bar based on user selection
   const renderAppBar = () => {
     if (userType === 'admin') {
       return <Adminbar />;
     } else if (userType === 'user') {
       return <Userbar />;
     } else {
       // Default rendering Appbar2 if userType is not yet selected
       return <Appbar2 onSelect={handleUserTypeSelect} />;
     }
   }


  return (
    <>
      <div style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}>

        <Router>
          {/* <Appbar2></Appbar2> */}
          <RecoilRoot>
          <Routes>
          <Route path="admin" element={<Appbar />} />
          <Route path="cs" element={<Appbar2 />}></Route>
            
            <Route path="courses/:courseId" element={<Course />}></Route>
            <Route path="courses" element={<Courses />}></Route>
            <Route path="addCourse" element={<AddCourse />}></Route>
            <Route path="login" element={<Signin />}></Route>
            <Route path="signup" element={<Signup />}></Route>
          </Routes>
          </RecoilRoot>
        </Router>

      </div>


    </>
  )
}

export default App
