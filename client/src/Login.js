import { GoogleLogin } from '@react-oauth/google';
import { Typography, Box, Button, Container } from '@mui/material';
import rawpixel_holographic_background from './images/rawpixel_holographic-background.jpg';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'
import { alpha } from '@material-ui/core/styles/colorManipulator';
import katerina_stepanenko from './images/katerina_stepanenko.jpg';

const styles = {
    patternedBackground: {
        backgroundImage: `url(${rawpixel_holographic_background})`,
        borderRadius: '0px',
        width: '100%',
        height: '100vh',
    },
    textContainer: {
        backgroundColor: alpha('#FFFFFF'),
        width: '80%',
        height: '100%',
        margin: 'auto',
        borderRadius: '0px',
        alignItems: "center",
        paddingBottom: '0px',
        // align: "center"
    },
    darkenBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: alpha('#000000', 0.1),
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
            <Paper container style={styles.darkenBackground}>
                <Grid container style={styles.textContainer}>
                    <Grid container flexDirection='column' m='20px'>
                        <Typography variant="h3" fontSize='60px' color="white" >
                            eventer
                        </Typography>
                        <Typography variant="h1" fontSize='140px' color="white" marginBottom='0px'>
                            Explore LA.
                        </Typography>
                    </Grid>
                    <Grid flexDirection='row' m='20px' width='100%' justifyItems="center" justifyContent="center" marginBottom='100px'>
                        <GoogleLogin
                            clientId="588092924792-o3h09qv5dc5jrm4l80tgdjp62kr9e60g"
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginError}
                            buttonText="Login with Google"
                            cookiePolicy={'single_host_origin'}
                        />
                        <Button variant="text" href="/home">
                            Skip Login
                        </Button>
                        <Button variant="text" href="/home">
                            Skip Login
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Paper>
    );
};

export default Login;
