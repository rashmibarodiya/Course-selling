import { useEffect, useState } from "react"
import { Button, Typography, Card, TextField } from "@mui/material"


function Courses() {
    const [courses, setCourses] = useState([])
    
    
    useEffect(() => {
        console.log("111111111")
        const url = `https://fantastic-happiness-jjrgp4974647f5rr5-8000.app.github.dev/admin/courses`;
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    setCourses(data);
                    console.log(data)
                });
            } else {
                console.log("Failed to fetch courses:", res.status, res.statusText);
            }
        }).catch((err) => {
            console.error("Error fetching courses:", err);
        });
    }, []);

    
    return (
        
        <div style={{
            display: 'flex',
            flexWrap:"wrap",
            justifyContent: "center",
            padding:20
       }}>
            {courses.map((course) => (
               <CardShape course ={course}></CardShape> 
            ))}
        </div>
    )

}

function CardShape(props){
    return(<>
    <div >
        <Card variant="outlined" style={{
            marginTop :10,
            minHeight:200,
            marginRight:20,
            width :300,
            padding:10

        }}>
            <Typography align="center">{props.course.title}</Typography>
            <br/>
           
            <Typography align="center" >{props.course.description}</Typography>

            <img src={props.course.imageLink} style={{width:300}}></img>

        </Card>
    </div>
    </>)
}

export default Courses
