import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

// Utils
import axios from "../../utils/AxiosConfig";
import { NotificationContext } from "../../utils/NotificationContext";

// CSS
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHouse as houseSolid, 
    faMagnifyingGlass as searchSolid,
    faBell as bellSolid,
    faPlus as plusSolid,
    faUserGroup as friendSolid,
    faUser as userSolid
} from '@fortawesome/free-solid-svg-icons';

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
                    <Link to='/' onClick={() => setPage('/')}>
                    <FontAwesomeIcon icon={houseSolid} /> Home
                    </Link>
                </li>
                <li id={page === '/search' ? 'active-nav' : null}>
                    <Link to='/search' onClick={() => setPage('/search')}>
                        <FontAwesomeIcon icon={searchSolid} /> Search
                    </Link>
                </li>
                <li id={page === '/friends' ? 'active-nav' : null}>
                    <Link to='/friends' onClick={() => setPage('/friends')}>
                        <FontAwesomeIcon icon={friendSolid} /> Friends
                    </Link>
                </li>
                <li id={page === '/notifications' ? 'active-nav' : null}>
                    <Link to='/notifications' onClick={() => setPage('/notifications')}>
                        
                        <div id="notif-counter-wrapper">
                            <FontAwesomeIcon icon={bellSolid} /> Notifications
                            {/* <div id="notif-counter">0</div> */}
                        </div>
                        {/* {
                        notifications.length !== 0 ? 
                            notifications.length === 1 ? 
                                '1 Notification' 
                            : notifications.length + ' Notifications' 
                        : '0 Notifications'
                        } */}
                    </Link>
                </li>
                <li id={page === '/post-form' ? 'active-nav' : null}>
                    <Link to='/post-form' onClick={() => setPage('/post-form')}>
                        <FontAwesomeIcon icon={plusSolid} /> Create
                    </Link>
                </li>
                <li id={new RegExp('/profile/*').test(page) ? 'active-nav' : null}>
                    <Link to={`/profile/${userId}`} onClick={() => setPage(`/profile/${userId}`)}>
                        <FontAwesomeIcon icon={userSolid} /> Profile
                    </Link>
                </li>
                <li id="logout-btn"><div onClick={handleClick}>Logout</div></li>
            </ul>
        </div>
    )
}

export default Sidebar;