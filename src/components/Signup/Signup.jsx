import React, { useState } from 'react';
import axios from '../../utils/AxiosConfig';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setToken }) => {
    const [username, setUsername] = useState();
    const [email, setEmail ] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    // Form submit for user signup
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // API call
            const user_token = await axios.post('/api/auth/signup', { email, username, password })
            console.log('Account created!');

            // Update token's state
            setToken(user_token.data.token);

            // Redirect to homepage
            navigate('/');

        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="signup-wrapper">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input type="text" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUsername(e.target.value)}/>
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

export default Signup;