import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// CSS
import './Login.css';

const Login = ({ setToken }) => {
    const [username_email, setUsernameEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    // Form submit for user login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // API call
            const user_token = await axios.post('http://localhost:3000/api/auth/login', { username_email, password })
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
                        <text>Login</text>
                    </button>

                    {/* 'Or' Decor */}
                    <div className='or-style'>
                        <text>or</text>
                    </div>

                    {/* Facebook/Google */}
                    <div className='external-login'>
                        <button id='facebook'>Facebook</button>
                        <button id='google'>Google</button>
                    </div>

                    <div>Don't have an account? <Link to='/signup'>Signup</Link></div>
                    
                </form>
            </div>
      </div>
    )
}

export default Login;