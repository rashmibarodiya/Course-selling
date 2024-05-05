import { useEffect, useState } from "react"
import { Button, Typography, Card } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Courses() {
    const [courses, setCourses] = useState([])


    useEffect(() => {
       
        const url = `https://fantastic-happiness-jjrgp4974647f5rr5-8000.app.github.dev/user/courses`;
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
        <div>
            <div style={{ marginTop: 0 }}>
                <Typography align='center' fontSize={40}>Courses</Typography>
            </div>
            <div style={{
                display: 'flex',
                flexWrap: "wrap",
                justifyContent: "center",
                padding: 20
            }}>

                {courses.map((course) => (
                    <CardShape course={course}></CardShape>
                ))}
            </div>
        </div>
    )

}

function CardShape(props) {
    const { title, description, imageLink } = props.course;
    const navigate = useNavigate()

    const handlePurchaseCourse = () => {
        const url = `https://fantastic-happiness-jjrgp4974647f5rr5-8000.app.github.dev/users/courses/${props.course._id}`;
        console.log(localStorage.getItem("token"))
        axios.post(url,{},{
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            console.log(res);
            alert("Course purchased successfully");
        })
        .catch((error) => {
            console.error("Error purchasing course:", error);
        });
    };

    return (
        <div>
            <Card variant="outlined" style={{
                marginTop: 10,
                minHeight: 200,
                marginRight: 20,
                width: 300,
                padding: 10
                , borderRadius : 10
            }}>
                <Typography align="center">{title}</Typography>

                <Typography align="center">{description}</Typography>
                <img src={imageLink} style={{ width: '100%', height: 300 }} />



                <Button variant={"outlined"}
                   onClick={handlePurchaseCourse}
                >Purchase Course</Button>
            </Card>
        </div>
    );
}


export default Courses
