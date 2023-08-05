import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./AxiosConfig";

const ProtectedRoute = (props) => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = async() => {
 
        const token = sessionStorage.getItem('access_token');
        const refresh_token = sessionStorage.getItem('refresh_token');

        const axiosConfig = {
            headers: { 
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
                'Refresh_Token': sessionStorage.getItem('refresh_token')
            }
        };
        
        // Check if token exists
        if (!token || token === 'undefined' || !refresh_token || refresh_token === 'undefined') {
            setIsLoggedIn(false);
            // Redirect to login page
            return navigate('/login');
        }

        // Check if token is valid
        axios.get('/api/auth/validate', axiosConfig)
        .then ((response) => {
            sessionStorage.setItem('access_token', response.data.access_token);
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
            setIsLoggedIn(true);
        })
        .catch ((err) => {
            setIsLoggedIn(false);
            return navigate('/login');
        });
    }

    // Validates user token 
    useEffect(() => {
        console.log('Validating Token')
        checkUserToken();
    });

    return (
        <React.Fragment>
            {isLoggedIn ? props.children : null}
        </React.Fragment>
    );
}

export default ProtectedRoute;