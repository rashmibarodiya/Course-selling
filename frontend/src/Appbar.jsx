import { Button, Typography } from "@mui/material"

function Appbar(){
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
        <Button  variant="outlined">Signup</Button> 
        </div>
    
        <div>
        <Button variant="outlined">Signin</Button>
        </div>

    </div>
    

    </div>
    
    </>
)
}
export default Appbar