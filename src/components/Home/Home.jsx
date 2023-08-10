import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// CSS
import './Home.css';

// Utils
import axios from "../../utils/AxiosConfig";
import { NotificationContext } from "../../utils/NotificationContext";

// Components
import Sidebar from "../../pages/Sidebar/Sidebar";

const Home = () => {
    // const[loading, setLoadingState] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Get notifications from local storage
        setNotifications(JSON.parse(localStorage.getItem('user')).notifications);
        // console.log(JSON.parse(localStorage.getItem('user')).notifications)
    }, [])

    return(
        // loading ? null :

        <NotificationContext.Provider value={{notifications, setNotifications}}>
            <div className="homepage-wrapper">
                <Sidebar />
                <Outlet />
            </div>
        </NotificationContext.Provider>
    )
}

export default Home;