import { Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import {userName} from '../state/atoms/Username.jsx'
import { useRecoilValue } from 'recoil';


 export function Userbar() {

    const navigate = useNavigate();
    const username = useRecoilValue(userName)

    if (username) {
        return (

            <>
            <div style={{
                   
                    backgroundColor:"#AAB7B8"
                }}>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor:"#AAB7B8"
                }}>
                    <Typography fontSize={20} style={{fontStyle : "normal", fontFamily: "cursive"}}>Hi {username}!</Typography>
                </div>

                <div style={{

                    display: "flex",
                    justifyContent: "space-between"
                }}>


                    <div style={{ padding: 20 }}>
                        <Typography fontSize={20}>Coursera</Typography>
                    </div>

                    <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", gap: 10 }}>
                        <div >
                            <Button variant={"outlined"}

                                onClick={() => {
                                    navigate('user/purchasedCourse')
                                }}>My courses
                            </Button>
                        </div>
                        <div >
                            <Button variant={"outlined"}

                                onClick={() => {
                                    navigate('user/Courses')
                                }}>Courses
                            </Button>
                        </div>

                        <div style={{ marginRight: 10 }}>
                            <Button variant={"outlined"}
                                onClick={() => {
                                    localStorage.setItem("token", null)
                                    //navigate("/")
                                    window.location = "/"
                                }}
                            >Logout</Button>
                        </div>


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
                                navigate('user/signup');
                            }}
                        >Signup</Button>
                    </div>

                    <div>
                        <Button variant={"outlined"}
                            onClick={() => {

                                navigate('user/login');

                            }}
                        >Signin</Button>
                    </div>

                </div>
            </div>
        </>
    );
}
export default Userbar;
