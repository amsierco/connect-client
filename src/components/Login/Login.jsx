import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username or Email</p>
                    <input type="text" onChange={e => setUsernameEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="text" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div>Don't have an account, <Link to='/signup'>Signup today!</Link></div>
      </div>
    )
}

export default Login;