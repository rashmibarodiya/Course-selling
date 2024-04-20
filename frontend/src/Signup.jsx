

import { Button, Typography, Card, TextField } from "@mui/material"
import { useState } from "react"
import { Link } from 'react-router-dom';
function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    return (
        <>


            <div style={{
                marginTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center",

            }}>
                <Typography fontSize={20} >Welcome to Coursera. Signup below</Typography>


            </div>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>

                <Card variant='outlined' style={{ width: 300, padding: 20 }} >
                    <TextField
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        fullWidth={"true"}
                        id="outlined-basic"
                        label="username"
                        variant="outlined"
                    />
                    <br />
                    <br />
                    <TextField
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        fullWidth
                        id="outlined-basic"
                        label="password"
                        type='password'
                        variant="outlined"
                    />
                    <br />
                    <br />
                    
                    <Button
                        onClick={() => {
                            fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/admin/signup`, {
                                method: "POST",
                                body: JSON.stringify({
                                    username,
                                    password
                                }),
                                headers: {
                                    "content-type": "application/json"
                                }
                            }).then((res) => {
                               return res.json();
                            }).then((data) => {
                                console.log(data)
                                localStorage.setItem("token", data.token)
                            })
                        }}
                        size={"large"}
                        variant="outlined"


                    >Signup</Button>

                </Card>
            </div>


        </>
    )
}

export default Signup