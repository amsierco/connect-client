import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

// Utils
import axios from "../../utils/AxiosConfig";

// CSS
import './Sidebar.css';

const Sidebar = () => {
    const[userId, setUserId] = useState();

    const navigate = useNavigate();

    // const axiosConfig = {
    //     headers: { 
    //         'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
    //         'Refresh_Token': sessionStorage.getItem('refresh_token')
    //     }
    // };

    const handleClick = () => {
        sessionStorage.setItem('access_token', undefined);
        sessionStorage.setItem('refresh_token', undefined);
        navigate('/login');
    }

    useEffect(() => {
        setUserId(JSON.parse(sessionStorage.getItem('user'))._id);
    }, []);


    return(
        <div className="sidebar-wrapper">
            <ul>
                <li><h1>Connect</h1></li>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/search'>Search</Link></li>
                <li><Link to='/friends'>Friends</Link></li>
                <li><Link to='/notifications'>Notifications</Link></li>
                <li><Link to='/post-form'>Create</Link></li>
                <li><Link to={`/profile/${userId}`}>Profile</Link></li>
                <li><button onClick={handleClick}>Logout</button></li>
            </ul>
        </div>
    )
}

export default Sidebar;