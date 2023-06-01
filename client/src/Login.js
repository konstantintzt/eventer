import { GoogleLogin } from '@react-oauth/google';
import { Typography, Box, Button, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

const Login = redirect => {
    const [loggedin, setloggedin] = useState(0);

    const handleLoginSuccess = async (credentialResponse) => {
        console.log(credentialResponse);
        const response = await fetch('http://localhost:2902/auth/verify_token', {
            method: 'POST',
            body: JSON.stringify(credentialResponse),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the token in local storage
        setloggedin(1);
        window.location.reload()
    };

    const handleLoginError = () => {
        console.log('Login Failed');
        setloggedin(0);
    };

    if (!loggedin){
        return (
            <Container maxWidth="sm">
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    paddingY={4}
                >
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                        Welcome to Eventer
                    </Typography>
                    <Typography variant="body1" align="center" paragraph>
                        Sign in to post events and gain access to special features.
                    </Typography>
                    <GoogleLogin
                        clientId="588092924792-o3h09qv5dc5jrm4l80tgdjp62kr9e60g"
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                        buttonText="Login with Google"
                        cookiePolicy={'single_host_origin'}
                    />
                    <Box marginTop={2}>
                        <Button variant="text" color="primary" href="/">
                            Skip Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }
    else{
        return <Navigate replace to={redirect} />;
    }

};

export default Login;
