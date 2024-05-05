import { Typography, Card } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';

function PurchasedCourse() {
    const [myCourse, setMyCourse] = useState([]);
    const url = `https://fantastic-happiness-jjrgp4974647f5rr5-8000.app.github.dev/users/purchasedCourses`;

    useEffect(() => {
        axios.get(`${url}`, {
            headers: {
                "Content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            console.log("Response data:", res.data);
            setMyCourse(res.data.purchasedCourses); // Assuming res.data.purchasedCourses is an array
        })
        .catch((error) => {
            console.error("Error fetching purchased courses:", error);
        });
    }, []);

    return (
        <>
            <div >
                <div >
                    <Typography align="center" fontSize={40} variant="body1" style={{ color: '#333' }}>My courses</Typography>
                </div>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    padding: 40,
                    justifyContent:"space-evenly"
                }}>
                    {myCourse.map((course) => (
                        <CardShape key={course._id} course={course} />
                    ))}
                </div>
            </div>
        </>
    );
}

function CardShape({ course }) {
    const { title, description, imageLink } = course;
    return (
        <div>
            <Card variant="outlined" style={{  borderRadius : 10}}>
                <Typography align="center">{title}</Typography>
                <Typography align="center">{description}</Typography>
                <img src={imageLink} style={{ width: '100%', height: 300 }} />
            </Card>
        </div>
    );
}

export default PurchasedCourse;
