

import { Button, Typography, Card, TextField } from "@mui/material"
import{useState} from 'react'
import axios from 'axios'

function Signin() {

    const url = `https://fantastic-happiness-jjrgp4974647f5rr5-8000.app.github.dev/admin/login`
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
                <Typography fontSize={20} >Welcome back. Login below</Typography>


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
                    <Button size={"large"} variant="outlined"
                        onClick={async () => {
                            let res = await axios.post(`${url}`, {
                                username: username,
                                password: password
                            },{
                                headers:{
                                    "Content-type":"application/json"
                                }
                            })
                            localStorage.setItem("token", res.data.token)
                            window.location = "/"
                        }}


                    >Signin</Button>

                </Card>
            </div>


        </>
    )
}

export default Signin