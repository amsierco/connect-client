import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

// Utils
import axios from './AxiosConfig';

const Google = () => {

  const navigate = useNavigate();

  async function sendGoogleToServer(codeResponse){
    try {
      // API call
      const response = await axios.post("/api/auth/google", {
        code: codeResponse.code,
        headers: {
          "Content-Type": "application/json"
        }
      });
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Redirect to homepage
      return navigate('/');

    } catch (err) {
        console.log(err);
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: codeResponse => {
      // console.log(codeResponse);
      sendGoogleToServer(codeResponse);
    },
    onError: () => console.log('Google Login Failed'),
    flow: 'auth-code',
  });

    return (
      <React.Fragment>
        <button type='button' onClick={handleGoogleLogin} id='google'>
          <img src='../../../google.jpg' />
          <div>Google</div>
        </button>
      </React.Fragment>
    )
}

export default Google;