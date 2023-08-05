import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// Utils
import axios from "../../utils/AxiosConfig";

// CSS
import './Sidebar.css';

const Sidebar = () => {
    const[userId, setUserId] = useState();

    // const axiosConfig = {
    //     headers: { 
    //         'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
    //         'Refresh_Token': sessionStorage.getItem('refresh_token')
    //     }
    // };

    // useEffect(() => {
    //     // Get user
    //     const getUser = async () => {
    //         try {
    //             const user = await axios.get('/api/profile', axiosConfig);
    //             setCurrentUser(user.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }

    //     getUser();

    // }, []);

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
            </ul>
        </div>
    )
}

export default Sidebar;