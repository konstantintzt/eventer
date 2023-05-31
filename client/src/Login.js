import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
    const trySampleRequest = (params) => {
        if (params && params['access_token']) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://c800-2607-f010-2a7-c-7999-8b6e-8e4-1e70.ngrok-free.app/auth/verify_token');
            xhr.onreadystatechange = function (e) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.response);
                } else if (xhr.readyState === 4 && xhr.status === 401) {
                    console.log('Invalid token'); //prompts user for permission
                }
            };
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(params));
        } else {
            console.log('No token found');
        }
    };

    const responseGoogle = (response) => {
        console.log(response);
        localStorage.setItem('oauth2-test-params', JSON.stringify(response));
        trySampleRequest(response);
    }

    return (
        <div>
            <GoogleLogin
                clientId="588092924792-pn199a7ipp505p3ilu1k3d1enttnlvvs.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Login;
