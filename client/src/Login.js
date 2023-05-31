import { GoogleLogin } from '@react-oauth/google';
import { Typography, Box, Button, Container } from '@mui/material';
import rawpixel_holographic_background from './images/rawpixel_holographic-background.jpg';
import Paper from '@mui/material/Paper';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import katerina_stepanenko from './images/katerina_stepanenko.jpg';

import Background from './components/Background';

const styles = {
    patternedBackground: {
        backgroundImage: `url(${katerina_stepanenko})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px',
        width: '100%',
        height: '100vh',
    },
    opaqueBacking: {
        backgroundColor: alpha('#FFFFFF', 1),
        width: '80%',
        height: '100%',
        margin: 'auto',
        borderRadius: '0px',
    },
    semiTransparentBacking: {
        backgroundColor: alpha('#FFFFFF', 0.7),
        width: '80%',
        height: '100%',
        margin: 'auto',
        borderRadius: '0px',
    },
    darkenBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: alpha('#FFFFFF', 0),
    },
};

const Login = () => {
    const handleLoginSuccess = async (credentialResponse) => {
        console.log(credentialResponse);
        const response = await fetch('https://3e1e-2607-f010-2a7-c-7999-8b6e-8e4-1e70.ngrok-free.app/auth/verify_tokenn', {
            method: 'POST',
            body: JSON.stringify(credentialResponse),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        localStorage.setItem('token', data.token); //out the token in local stor
    };

    const handleLoginError = () => {
        console.log('Login Failed');
    };

    return (
        <Paper container style={styles.patternedBackground}>
            {/* <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
                paddingY={4}
            > */}
                <Typography variant="h4" align="center" gutterBottom>
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
                    <Button variant="text" href="/home">
                        Skip Login
                    </Button>
                </Box>
            {/* </Box> */}
        </Paper>
    );
};

export default Login;
