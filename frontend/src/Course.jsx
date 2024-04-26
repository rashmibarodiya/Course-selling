import { useEffect, useState } from "react";


function Course() {

    const { courseId } = useParam();
    const url = `https://fantastic-happiness-jjrgp4974647f5rr5-8000.app.github.dev/admin/courses`;

    const setCourses = useRecoilState(courseState);

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
    }, [])


    return <div>
        <CourseCard courseId={courseId}></CourseCard>
        <UpdateCard courseId={courseId}></UpdateCard>
    </div>
}



function CourseCard(props) {

    var courseId = props.courseId;

    const courses = useRecoilValue(courseState)
    let course = courses[courseId - 1]
    if (!course) return <div>
        loading....
    </div>

    return (
        <div>
            <Card variant="outlined" style={{
                marginTop: 10,
                minHeight: 200,
                marginRight: 20,
                width: 300,
                padding: 10
            }}>
                <Typography align="center">{title}</Typography>

                <Typography align="center">{description}</Typography>
                <img src={imageLink} alt={title} style={{ width: '100%', height: 300 }} />
            </Card>
        </div>
    );
}
function UpdateCard(props) {
    var courseId = props.courseId;
    var [title, setTitle] = useState('');
    var [description, setDescription] = useState('');
    var [imageLink, setImageLink] = useState('');


    const [courses, setCourses] = useRecoilState(courseState)
    let course = courses[courseId - 1]
    if (!course) return <div>
        loading....
    </div>

    return (
        <div>
            <Card variant="outlined" style={{
                marginTop: 10,
                minHeight: 200,
                marginRight: 20,
                width: 300,
                padding: 10
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
                        setDescription(e.target.value)
                    }}
                    label={"Description"}
                    variant={"outlined"}>


                </TextField>
                <br /><br />
                <TextField
                    fullWidth
                    onChange={(e) => {
                        setImageLink(e.target.value)
                    }}
                    label={"Image Link"}
                    variant={"outlined"}>

                </TextField>
                <br /><br />

                <Button size="large" variant={"outlined"}

                    onClick={() => {
                        fetch(`${url}` + "/" + courseId, {
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

                                let updatedCourse = []
                                for (let i = 0; i < courses.length; i++) {
                                    if (courses[i].courseId = courseId) {
                                        updatedCourse.push({
                                            courseId,
                                            title,
                                            description,
                                            imageLink,
                                            published: "true"
                                        })
                                    } else {
                                        updatedCourse.push(course[i])
                                    }
                                }




                                alert("Course updated successfully")
                                console.log("data : " + data)
                            })
                        })
                    }}

                >Update Course</Button>
            </Card>
        </div>
    );
}


export default Course;

const courseState = atom({
    key: 'courseState',
    default: '',
})
