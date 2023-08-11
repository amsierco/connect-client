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
    faUser as userSolid,
    faRightFromBracket as signoutSolid,
    faC as tempLogo
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
        // console.log('Load Sidebar ' + JSON.parse(localStorage.getItem('user'))._id);
        setUserId(JSON.parse(localStorage.getItem('user'))._id);
        setPage(window.location.pathname);
        // console.log('Sidebar loaded');
    }, []);

    return(
        <div className="sidebar-wrapper">
            <ul>
                <li>
                    <Link to='/' onClick={() => setPage('/')}>
                        <h1>
                            <div id='logo-text'>Connect</div>
                            <div id="logo-icon">
                                <FontAwesomeIcon icon={tempLogo} /> 
                            </div>
                        </h1>
                    </Link>
                </li>
                <li id={page === '/' ? 'active-nav' : null}>
                    <Link to='/' onClick={() => setPage('/')}>
                        <FontAwesomeIcon icon={houseSolid} /> 
                        <div>Home</div>
                    </Link>
                </li>
                {/* <li id={page === '/search' ? 'active-nav' : null}>
                    <Link to='/search' onClick={() => setPage('/search')}>
                        <FontAwesomeIcon icon={searchSolid} /> 
                        <div>Search</div>
                    </Link>
                </li>
                <li id={page === '/friends' ? 'active-nav' : null}>
                    <Link to='/friends' onClick={() => setPage('/friends')}>
                        <FontAwesomeIcon icon={friendSolid} /> 
                        <div>Friends</div>
                    </Link>
                </li> */}
                <li id={page === '/notifications' ? 'active-nav' : null}>
                    <Link to='/notifications' onClick={() => setPage('/notifications')}>
                        <FontAwesomeIcon icon={bellSolid} /> 
                        <div>Notifications</div>
                    </Link>
                </li>
                <li id={page === '/post-form' ? 'active-nav' : null}>
                    <Link to='/post-form' onClick={() => setPage('/post-form')}>
                        <FontAwesomeIcon icon={plusSolid} /> 
                        <div>Create</div>
                    </Link>
                </li>
                <li id={new RegExp('/profile/*').test(page) ? 'active-nav' : null}>
                    <Link to={`/profile/${userId}`} onClick={() => setPage(`/profile/${userId}`)}>
                        <FontAwesomeIcon icon={userSolid} /> <div>Profile</div>
                    </Link>
                </li>
                <li id="logout-btn-wrapper">
                    <div id='logout-btn' onClick={handleClick}>
                        <FontAwesomeIcon icon={signoutSolid} />
                        <div>Logout</div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;