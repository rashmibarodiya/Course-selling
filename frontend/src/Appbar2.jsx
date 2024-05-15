import React, { useState } from 'react';
import { Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Adminbar } from "./admin/Adminbar.jsx";
import { Userbar } from "./user/Userbar.jsx";
import { userRole } from './state/atoms/Username.jsx'
 import { useSetRecoilState, useRecoilValue } from 'recoil';
import {userName} from './state/atoms/Username.jsx'
import { useEffect } from "react";

var r = "";
function checkUser(){
   
    const setUsername = useSetRecoilState(userName)
    const setRole = useSetRecoilState(userRole)
    const url = `https://fantastic-happiness-jjrgp4974647f5rr5-8000.app.github.dev`;
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token :: " + token)

        fetch(`${url}` + `/me`, {
            method: 'GET',
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.text().then((data) => {
                    setUsername(data.userName);
                    if(data.role === "admin"){
                        setRole("admin")
                        r = "admin"
                    }else if(data.role === "user"){
                        setRole("user")
                        r = "user"
                    } 
                    console.log("DATA : " + data);
                    // window.location = "/"
                });
            } else {
                return res.text().then((text) => {
                    console.log("Non-JSON Response: " + text);
                });
            }
        })

    }, []);

}


function Appbar2() {
checkUser();
const role = useRecoilValue(userRole);
console.log("role ********** "+r)

    return (
        <div>
            
            {!role ? (
                <Classic />
            ) : role === "admin" ? (
                
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
            <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }} >

                <div >
                    <Typography fontSize={20} variant="body1" style={{ color: '#333' }}>Coursera</Typography>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>

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
                marginTop: 75,
                color: "#303030"

            }}>
                <Typography fontSize={60} align="center" fontStyle="initial">Welcome to Coursera</Typography>
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}  >
                    <img src={`https://getwallpapers.com/wallpaper/full/2/2/7/834570-learning-wallpapers-2960x1661-for-iphone-5.jpg`} 
                    style={{ width: 'auto', height: 420 }} />
                </div>

            </div>


        </>
    );
}

export default Appbar2;



