import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "./AxiosConfig";

const ProtectedRoute = (props) => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = async() => {
 
        const token = sessionStorage.getItem('access_token');
        const refresh_token = sessionStorage.getItem('refresh_token');

        axios.defaults.headers.common['Authorization'] = [
            `Bearer ${sessionStorage.getItem('access_token')}`,
            `Bearer ${sessionStorage.getItem('refresh_token')}`
        ];
        
        // Check if token exists
        if (!token || token === 'undefined' || !refresh_token || refresh_token === 'undefined') {
            setIsLoggedIn(false);
            // Redirect to login page
            return navigate('/login');
        }

        // Check if token is valid
        axios.get('/api/auth/validate')
        .then ((response) => {
            sessionStorage.setItem('access_token', response.data.access_token);
            setIsLoggedIn(true);
        })
        .catch ((err) => {
            setIsLoggedIn(false);
            return navigate('/login');
        });
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {isLoggedIn ? props.children : null}
            {/* <Outlet /> */}
        </React.Fragment>
    );
}

export default ProtectedRoute;