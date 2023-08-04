import React from "react";
import { Link } from 'react-router-dom';

// CSS
import './Sidebar.css';

const Sidebar = () => {
    return(
        <div className="sidebar-wrapper">
            <ul>
                <li><h1>Connect</h1></li>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/search'>Search</Link></li>
                <li><Link to='/friends'>Friends</Link></li>
                <li><Link to='/notifications'>Notifications</Link></li>
                <li><Link to='/post-form'>Create</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar;