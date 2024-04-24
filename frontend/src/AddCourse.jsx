

import { Button, Typography, Card, TextField } from "@mui/material"
import { useState } from "react";


function AddCourse() {

    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [img, setImg] = useState('');
    const url = `https://fantastic-happiness-jjrgp4974647f5rr5-8000.app.github.dev/admin/courses`
    return <>




        <div style={{ display: "flex", justifyContent: "center" }}>

            <Typography fontSize={22} style={{
                marginTop: 30
            }}>Add courses </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant={"outlined"} style={{
                marginTop: 5,
                marginBottom: 10, width: 300, padding: 20
            }}>
                <TextField
                    fullWidth
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    label={"Title"}
                    variant={"outlined"}>

                </TextField>
                <br /><br />
                <TextField
                    fullWidth
                    onChange={(e) => {
                        setDes(e.target.value)
                    }}
                    label={"Description"}
                    variant={"outlined"}>


                </TextField>
                <br /><br />
                <TextField
                    fullWidth
                    onChange={(e) => {
                        setImg(e.target.value)
                    }}
                    label={"Image Link"}
                    variant={"outlined"}>

                </TextField>
                <br /><br />

                <Button size="large" variant={"outlined"}
                
                onClick={()=>{
                    fetch(`${url}` ,{
                        method:'POST',
                        body: JSON.stringify({
                            title,
                            des,
                            img,
                            published : true
                        }),
                        headers:{
                            "Content-type":"application/json",
                            "Authorization" : "Bearer "+localStorage.getItem("token")
                        }
                    }).then((res)=>{
                        res.json().then((data)=>{
                            alert("Course added successfully")
                            console.log("data : "+data)
                        })
                    })
                }}
                
                >Add Course</Button>
            </Card>

        </div>

    </>
}
export default AddCourse