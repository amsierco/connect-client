import React, { useState } from 'react';
import axios from '../../utils/AxiosConfig';
import { Link, useNavigate } from 'react-router-dom';

// Utils
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from '../../utils/Google';

// CSS
import './Login.css';

const Login = () => {
    const [username_email, setUsernameEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    // Form submit for user login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // API call
            const response = await axios.post(
                '/api/auth/login', 
                { username_email, password }
            );
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            // Redirect to homepage
            // console.log('navigating to home')
            return navigate('/');

        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="login-wrapper">
            {/* Spacing div */}
            <div></div>

            <div className='login-form-wrapper'>
                <h1>Connect</h1>    

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    <h3>Welcome Back!</h3>
                    <div className='input-style-wrapper'>
                        <div id='label'>Username or Email</div>
                        <div id='input-inner'>
                            <input type="text" onChange={e => setUsernameEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className='input-style-wrapper'>
                    <div id='label'>Password</div>
                        <div id='input-inner'>
                         <input type="text" onChange={e => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <button className='button-wrapper' type="submit">
                        <div>Login</div>
                    </button>

                    {/* 'Or' Decor */}
                    <div className='or-style'>
                        <div>or</div>
                    </div>

                    {/* Facebook/Google */}
                    <div className='external-login'>
                        <button type='button' id='facebook'>
                            <img src='../../../facebook.jpg' />
                            <div>Facebook</div>
                        </button>
                        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                            <Google />
                        </GoogleOAuthProvider>
                    </div>

                    <div>Don't have an account? <Link to='/signup'>Sign up</Link></div>
                    
                </form>
            </div>
      </div>
    )
}

export default Login;