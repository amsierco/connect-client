import React, { useState, createContext, useContext } from 'react';
import axios from '../../utils/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';



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
            const access_token = response.data.access_token;
            // const refresh_token = response.data.refresh_token;

            sessionStorage.setItem('access_token', access_token);
            // sessionStorage.setItem('refresh_token', refresh_token);

            // Redirect to homepage
            return navigate('/');

        } catch (err) {
            console.log(err);
        }
    }

    // Login with Google
    const handleGoogleLogin = async (e) => {
        
        console.log('Try Google Login');

        try {
            // API call
            const user_token = await axios.get('http://localhost:3000/api/auth/google');
            console.log('Token Found! User logged in');

            // Update token's state
            setToken(user_token.data.token);

            // Redirect to homepage
            navigate('/');

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
                        <button type='button' id='facebook'>Facebook</button>
                        <button type='button' onClick={handleGoogleLogin} id='google'>Google</button>
                    </div>

                    <div>Don't have an account? <Link to='/signup'>Sign up</Link></div>
                    
                </form>
            </div>
      </div>
    )
}

export default Login;