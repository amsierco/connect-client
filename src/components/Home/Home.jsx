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

    const [notifications, setNotifications] = useState([]);

    const[loading, setLoadingState] = useState(true);
    

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
            'Refresh_Token': sessionStorage.getItem('refresh_token')
        }
    };

    async function getNotifications() {
        setLoadingState(true);
        // Get notifications
        const response = await axios.get(`/api/notifications/${JSON.parse(sessionStorage.getItem('user'))._id}`, axiosConfig);
        setNotifications(response.data);
        setLoadingState(false);
    }

    useEffect(() => {
        // API call
        getNotifications();
    }, [])

    return(
        loading ? null :
        <NotificationContext.Provider value={{notifications, getNotifications}}>
            <div className="homepage-wrapper">
                <Sidebar />
                <Outlet />
            </div>
        </NotificationContext.Provider>
    )
}

export default Home;