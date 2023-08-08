import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Utils
import axios from "./AxiosConfig";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = async() => {
 
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        const axiosConfig = {
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Refresh_Token': localStorage.getItem('refreshToken')
            }
        };
        
        // Check if token exists
        if (!accessToken || accessToken === 'undefined' || !refreshToken || refreshToken === 'undefined'){
            setIsLoggedIn(false);
            // Redirect to login page
            return navigate('/login');
        }

        // Check if token is valid
        axios.get('/api/auth/validate', axiosConfig)
        .then ((response) => {
            // Update client storage
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setIsLoggedIn(true);
        })
        .catch ((err) => {
            setIsLoggedIn(false);
            return navigate('/login');
        });
    }

    // Validates user token on every rerender
    useEffect(() => {
        checkUserToken();
    });

    return (
        <React.Fragment>
            {isLoggedIn ? 
                props.children
            : null}
        </React.Fragment>
    );
}

export default ProtectedRoute;