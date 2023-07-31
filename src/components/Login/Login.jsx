import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [username_email, setUsernameEmail] = useState();
    const [password, setPassword] = useState();

    // Form submit for user login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // API call
            const token = await axios.post('http://localhost:3000/api/auth/login', { username_email, password })
            console.log('Token Found! User logged in');

            // Update token's state
            setToken(token.data.token);

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
      </div>
    )
}

export default Login;