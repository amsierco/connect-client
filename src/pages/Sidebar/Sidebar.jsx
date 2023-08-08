import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

// Utils
import axios from "../../utils/AxiosConfig";
import { NotificationContext } from "../../utils/NotificationContext";

// CSS
import './Sidebar.css';

const Sidebar = () => {
    const [userId, setUserId] = useState();
    const [page, setPage] = useState();
    const {notifications} = useContext(NotificationContext);
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.setItem('accessToken', undefined);
        localStorage.setItem('refreshToken', undefined);
        navigate('/login');
    }

    // console.log(new RegExp('/profile/*').test(page));

    useEffect(() => {
        console.log('Load Sidebar ' + JSON.parse(localStorage.getItem('user'))._id);
        setUserId(JSON.parse(localStorage.getItem('user'))._id);
        setPage(window.location.pathname);
        console.log('Sidebar loaded');
    }, []);

    return(
        <div className="sidebar-wrapper">
            <ul>
                <li><h1>Connect</h1></li>
                <li id={page === '/' ? 'active-nav' : null}>
                    <Link to='/' onClick={() => setPage('/')}>Home</Link>
                </li>
                <li id={page === '/search' ? 'active-nav' : null}>
                    <Link to='/search' onClick={() => setPage('/search')}>Search</Link>
                </li>
                <li id={page === '/friends' ? 'active-nav' : null}>
                    <Link to='/friends' onClick={() => setPage('/friends')}>Friends</Link>
                </li>
                <li id={page === '/notifications' ? 'active-nav' : null}>
                    <Link to='/notifications' onClick={() => setPage('/notifications')}>
                        {
                        notifications.length !== 0 ? 
                            notifications.length === 1 ? 
                                '1 Notification' 
                            : notifications.length + ' Notifications' 
                        : '0 Notifications'
                        }
                    </Link>
                </li>
                <li id={page === '/post-form' ? 'active-nav' : null}>
                    <Link to='/post-form' onClick={() => setPage('/post-form')}>Create</Link>
                </li>
                <li id={new RegExp('/profile/*').test(page) ? 'active-nav' : null}>
                    <Link to={`/profile/${userId}`} onClick={() => setPage(`/profile/${userId}`)}>Profile</Link>
                </li>
                <li id="logout-btn"><div onClick={handleClick}>Logout</div></li>
            </ul>
        </div>
    )
}

export default Sidebar;