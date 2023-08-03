import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axiosConfig";

const ProtectedRoute = (props) => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = async() => {
        const token = sessionStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('access_token')}`;
        
        // Check if token exists
        if (!token || token === 'undefined') {
            setIsLoggedIn(false);
            // Redirect to login page
            return navigate('/login');
        }

        // Check if token is valid
        axios.get('/api/auth/validate')
        .then ((response) => {
            setIsLoggedIn(true);
            return;
        })
        .catch ((err) => {
            setIsLoggedIn(false);
            // Redirect to login page
            return navigate('/login');
        });
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {isLoggedIn ? props.children : null}
        </React.Fragment>
    );
}

export default ProtectedRoute;