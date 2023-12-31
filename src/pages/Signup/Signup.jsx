import React, { useState } from 'react';
import axios from '../../utils/AxiosConfig';
import { Link, useNavigate } from 'react-router-dom';

// Utils
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from '../../utils/Google';

// CSS
import './Signup.css';

const Signup = ({ setToken }) => {
    const [username, setUsername] = useState();
    const [email, setEmail ] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Form submit for user signup
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // API call
            const response = await axios.post(
                '/api/auth/signup', 
                { email, username, password }
            );
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Redirect to homepage
            return navigate('/');

        } catch (err) {
            setError(`${err.response.status} Error: ${err.response.data}`);
        }
    }

    return(
        <div className="signup-wrapper">
            {/* Spacing div */}
            <div></div>
            
            <div className='signup-form-wrapper'>
                <h1>Connect</h1>   

                {/* Signup Form */}
                <form onSubmit={handleSubmit}>
                    <h3>Create an Account!</h3>
                    {null === error ? null : <div className="error">{error}</div>}
                    <div className='input-style-wrapper'>
                        <div id='label'>Email</div>
                        <div id='input-inner'>
                            <input type="text" onChange={e => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className='input-style-wrapper'>
                        <div id='label'>Username</div>
                        <div id='input-inner'>
                            <input type="text" onChange={e => setUsername(e.target.value)}/>
                        </div>
                    </div>
                    <div className='input-style-wrapper'>
                        <div id='label'>Password</div>
                        <div id='input-inner'>
                            <input type="text" onChange={e => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <button className='button-wrapper' type="submit">
                        <div>Signup</div>
                    </button>

                    {/* 'Or' Decor */}
                    <div className='or-style'>
                        <div>or</div>
                    </div>

                    {/* Facebook/Google */}
                    <div className='external-signup'>
                        <button type='button' id='facebook'>
                            <img src='../../../facebook.jpg' />
                            <div>Facebook</div>
                        </button>
                        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                            <Google />
                        </GoogleOAuthProvider>
                    </div>

                    <div>Already have an account? <Link to='/login'>Login</Link></div>
                
                </form>
            </div>
      </div>
    )
}

export default Signup;