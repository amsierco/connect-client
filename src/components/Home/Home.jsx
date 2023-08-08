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
    const[loading, setLoadingState] = useState(false);
    const [notifications, setNotifications] = useState([]);

    // const axiosConfig = {
    //     headers: { 
    //         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    //         'Refresh_Token': localStorage.getItem('refreshToken')
    //     }
    // };

    async function getNotifications() {
        // setLoadingState(true);
        // // Get notifications
        // const response = await axios.get(`/api/notifications/${JSON.parse(localStorage.getItem('user'))._id}`, axiosConfig);
        // console.log(response.data);
        // setNotifications(response.data);
        // setLoadingState(false);
    }

    useEffect(() => {
        // API call
        // getNotifications();
        setNotifications(JSON.parse(localStorage.getItem('user')).notifications);
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