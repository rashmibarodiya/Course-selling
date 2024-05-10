import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Card, Typography, TextField, Button } from "@mui/material"
import { atom } from "recoil";

const courseState = atom({
  key: 'courseState',
  default: [],
});

function Course() {
  const { courseId } = useParams();
  const url = `https://fantastic-happiness-jjrgp4974647f5rr5-8000.app.github.dev/admin/courses`;

  const setCourses = useSetRecoilState(courseState);

  useEffect(() => {
    fetch(`${url}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res) => {
      res.json().then((data) => {
        setCourses(data)
      })
    })
  }, [setCourses, url])

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-around", 
      marginTop: '100'
    }}>
      <CourseCard courseId={courseId}></CourseCard>
      <UpdateCard courseId={courseId} url={url}></UpdateCard>
    </div>
  );
}

function CourseCard(props) {
  const { courseId } = props;
  const courses = useRecoilValue(courseState);
  let course = null
  courses.map((a) => {
    if (a._id == courseId) {
      course = a;
    }
  })
  if (!course) return <div>loading.ll...</div>;
  console.log("hi::::" + course.imageLink)
  return (
    <div>
      <Card variant="outlined" style={{ marginTop: 10, minHeight: 200, marginRight: 20, width: 300, padding: 10}}>
        <Typography align="center">{course.title}</Typography>
        <Typography align="center">{course.description}</Typography>
        <img src={course.imageLink} style={{ width: '100%', height: 300 }} />
      </Card>
    </div>
  );
}

function UpdateCard(props) {
  const { courseId, url } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');

  const [courses, setCourses] = useRecoilState(courseState);
  let course = null
  courses.map((a) => {
    if (a._id == courseId) {
      course = a;
    }
  })
  if (!course) return <div>loading....</div>;

  return (
    <div style={{}}>
      <Card variant="outlined" style={{ marginTop: 10, minHeight: 200, marginRight: 20, width: 300, padding: 10, borderRadius: 10 }}>
        <div>
          <Typography align = "center">New value to be used</Typography>
        </div>   
        <TextField  value={title} fullWidth onChange={(e) => setTitle(e.target.value)} label={"Title"} variant={"outlined"} />
        <br /><br />
        <TextField value={description} fullWidth onChange={(e) => setDescription(e.target.value)} label={"Description"} variant={"outlined"} />
        <br /><br />
        <TextField value={imageLink} fullWidth onChange={(e) => setImageLink(e.target.value)} label={"Image Link"} variant={"outlined"} />
        <br /><br />
        <Button size="large" variant={"outlined"} onClick={() => {
          fetch(`${url}/${courseId}`, {
            method: 'PUT',
            body: JSON.stringify({
              title,
              description,
              imageLink,
              published: true
            }),
            headers: {
              "Content-type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          }).then((res) => {
            res.json().then((data) => {
              let updatedCourses = courses.map(c => c.id === parseInt(courseId) ? {
                ...c,
                title,
                description,
                imageLink,
                published: true
              } : c);
              setCourses(updatedCourses);
              alert("Course updated successfully");
              console.log("data : " + data);
            })
          })
        }}>Update Course</Button>
      </Card>
    </div>
  );
}

export default Course;
