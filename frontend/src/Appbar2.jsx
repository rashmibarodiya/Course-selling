import React, { useState } from 'react';
import { Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Appbar } from "./admin/Appbar.jsx";
import { Userbar } from "./user/Userbar.jsx";

function Appbar2() {
    const [role, setRole] = useState("");

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
    };

    return (
        <div>
            {!role ? (
                <Classic setRole={handleRoleSelect} />
            ) : role === "Admin" ? (
                <div>
                    <Appbar />
                </div>
            ) : (
                <div>
                    <Userbar/>
                </div>
            )}
        </div>
    );
}

function Classic({ setRole }) {
    

    return (
        <>
            jkjhkjhkjhkjhkj
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Coursera</Typography>
                <div>
                    <Button
                        onClick={() => {
                            setRole("Admin");
                        }}
                        variant="outlined"
                    >
                        Admin
                    </Button>
                    <Button
                        onClick={() => {
                            setRole("User");
                        }}
                        variant="outlined"
                    >
                        User
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Appbar2;
