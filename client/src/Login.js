import { GoogleLogin } from '@react-oauth/google';
import { Typography, Box, Button, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontSize: 18,
    },
    spacing: (factor) => `${0.5 * factor}rem`,
});

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
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh"
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
                        <Button variant="text" color="primary" href="/home">
                            Skip Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
