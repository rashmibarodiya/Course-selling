import React, { useState } from 'react';
import { Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Adminbar } from "./admin/Adminbar.jsx";
import { Userbar } from "./user/Userbar.jsx";
import {userRole} from './state/atoms/Username.jsx'
import { useSetRecoilState,useRecoilValue } from 'recoil';

function Appbar2() {
    const role = useRecoilValue(userRole);
   

    

    return (
        <div>
            {!role ? (
                <Classic />
            ) : role === "Admin" ? (
                <div>
                    <Adminbar />
                </div>
            ) : (
                <div>
                    <Userbar />
                </div>
            )}
        </div>
    );
}
function Classic() {

    const setRole = useSetRecoilState(userRole);
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", padding :10}} >

                    <div >
                        <Typography fontSize={20} variant="body1" style={{ color: '#333' }}>Coursera</Typography>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", gap : 10}}>

                    <div >
                        <Button
                            onClick={() => {
                                setRole("Admin");
                            }}
                            variant="outlined"
                        >
                            Admin
                        </Button>
                    </div>

                        <div>
                        <Button
                            onClick={() => {
                                setRole("User");
                                // window.location = "/Userbar"
                            }}
                            variant="outlined"
                        >
                            User
                        </Button>
                        </div>

                        </div>
                    </div>
               
                <div style={{
                    marginTop:75,
                    color: "#303030" 
                    
                }}>
                            <Typography fontSize={60} align = "center" fontStyle = "initial">Welcome to Coursera</Typography>
                </div>
               
         
        </>
    );
}

export default Appbar2;



