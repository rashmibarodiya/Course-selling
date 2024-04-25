import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Appbar() {

    const navigate = useNavigate();
    const found = false
    const [username, setUsername] =  useState("")
    const url = `https://fantastic-happiness-jjrgp4974647f5rr5-8000.app.github.dev/admin/me`;
    useEffect(() => {
        const token = localStorage.getItem("token");
        
            fetch(`${url}`, {
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                res.json().then((data) => {
                    setUsername(data.username)
                 //   found = true
                    console.log("DATA : " + data);
                });
            }).catch((err) => {
                console.error(err);
            });
        
    }, []);


    if (username) {
       return (
        
         <>
         fjdsfjlksjfljdsfj
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>

                <div style={{ padding: 20 }}>
                    <Typography fontSize={20}>Coursera</Typography>
                </div>

                <div style={{ display: "flex", padding: 20 }}>
                    <div style={{ marginRight: 10 }}>
                        <Button variant={"outlined"}
                            onClick={() => {
                                localStorage.setItem("token",null)
                            }}
                        >Logout</Button>
                    </div>


                </div>
            </div>
        
        </>
       )
    }

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>

                <div style={{ padding: 20 }}>
                    <Typography fontSize={20}>Coursera</Typography>
                </div>

                <div style={{ display: "flex", padding: 20 }}>
                    <div style={{ marginRight: 10 }}>
                        <Button variant={"outlined"}
                            onClick={() => {
                                navigate('/signup');
                            }}
                        >Signup</Button>
                    </div>

                    <div>
                        <Button variant={"outlined"}
                            onClick={() => {
                                navigate('/login');
                            }}
                        >Signin</Button>
                    </div>

                </div>
            </div>
        </>
    );
}
export default Appbar;
