

import { Button, Typography, Card, TextField} from "@mui/material"
function Signin() {
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
                
                <Card variant='outlined' style={{ width: 300, padding: 20}} >
                    <TextField
                         fullWidth= {"true"} 
                        id="outlined-basic"
                        label="username"
                        variant="outlined"
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="password"
                        type='password'
                        variant="outlined"
                    />
                    <br />
                    <br />
                    <Button size={"large"} variant="outlined">Signin</Button>

                </Card>
            </div>


        </>
    )
}

export default Signin