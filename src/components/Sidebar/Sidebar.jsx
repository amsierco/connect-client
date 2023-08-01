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
                <li><Link to='/'>Search</Link></li>
                <li><Link to='/'>Friends</Link></li>
                <li><Link to='/'>Notifications</Link></li>
                <li><Link to='/'>Create</Link></li>
                <li><Link to='/'>Profile</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar;