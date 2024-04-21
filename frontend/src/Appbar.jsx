import { Button, Typography } from "@mui/material"

import { useNavigate } from 'react-router-dom';

function Appbar(){

   const navigate  = useNavigate()
return(
    <>
    <div style={{
        display:"flex",
        justifyContent:"space-between"
    }}>

        <div style={{padding:20}}>
        <Typography fontSize={20} >Coursera</Typography>
        </div>
    
    <div style={{display:"flex", padding: 20}}>
        <div style={{marginRight:10}}>
        <Button  variant={"outlined"}
        onClick={() => {
    // window.location = `/signup`
            // alert("hi")
            navigate('/signup') 
        }}
        >Signup</Button> 
        </div>
    
        <div>
        <Button variant={"outlined"}
        onClick={() => {
          //  window.location = `/login`
            navigate('/login')
        }}
        >Signin</Button>
        </div>

    </div>
    

    </div>
    
    </>
)
}
export default Appbar