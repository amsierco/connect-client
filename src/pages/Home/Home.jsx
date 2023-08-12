import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// Utils
import { NotificationContext } from "../../utils/NotificationContext";

// Components
import Sidebar from "../Sidebar/Sidebar";

// CSS
import './Home.css';

const Home = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Get notifications from local storage
        setNotifications(JSON.parse(localStorage.getItem('user')).notifications);
    }, [])

    return(
        <NotificationContext.Provider value={{notifications, setNotifications}}>
            <div className="homepage-wrapper">
                <Sidebar />
                <Outlet />
            </div>
        </NotificationContext.Provider>
    )
}

export default Home;