import axios from 'axios';
import React from 'react';
import GoogleLogin from 'react-google-login';
import {useNavigate} from 'react-router-dom'

function LoginWithGoogle() {
    let navigate = useNavigate();
    const responseSuccesGoogle = (response) => {
        console.log(response);
        axios({
            method: 'post',
            url: 'http://localhost:3000/users/api/googleLogin',
            data: {
                tokenId: response.tokenId
            }
        }).then((response) => {
            console.log(response);
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            navigate('/');
        })
    }
    const responseErrorGoogle = (response) => {}
    return (
        <>
            <div>
                <GoogleLogin clientId="231700882499-1b30qa5b7vtl8jc4tb4h7hbon88t591r.apps.googleusercontent.com" buttonText="Sign In with Google"
                    onSuccess={responseSuccesGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={'single_host_origin'}/>
            </div>
        </>
    );
}

export default LoginWithGoogle;
