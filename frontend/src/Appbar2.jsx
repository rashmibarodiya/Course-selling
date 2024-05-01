import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Appbar2() {
    const navigate = useNavigate();
    const [role, setRole] = useState("")

    if (!role) {
        return (
            <>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <Typography>Coursera</Typography>

                    <div>
                        <Button
                        onClick={ () => {
                            navigate('/Admin/Appbar');
                            setRole("Admin")
                        }}
                        variant = "outlined"
                        
                        >Admin</Button>
                        <Button 
                        onClick={ () => {
                            navigate('/User/Appbar');
                            setRole("User")
                        }}
                        
                        variant = "outlined">User</Button>
                    </div>
                </div>
            </>
        )
    }
}
export default Appbar2