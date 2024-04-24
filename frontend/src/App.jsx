
import './App.css'
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from "./Signup.jsx"
import Signin from './Signin.jsx'
import Appbar from './Appbar.jsx'
import AddCourse from './AddCourse.jsx';
function App() {

  return (
    <>
      <div style={{width:"100vw", height:"100vh", backgroundColor:"#eeeeee"}}>

        <Router>
        <Appbar></Appbar>
          <Routes>
          <Route path ="addCourse" element ={<AddCourse/>}></Route>
            <Route path ="login" element ={<Signin/>}></Route>
            <Route path ="signup" element ={<Signup/>}></Route>
            </Routes>
        </Router>

      </div>
     
      
    </>
  )
}

export default App
