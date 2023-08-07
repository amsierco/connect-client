import React, { useState, useContext } from "react";

// Utils
import axios from "../../utils/AxiosConfig";

// CSS
import './Notifications.css';
import { NotificationContext } from "../../utils/NotificationContext";

const Notifications = () => {
    const {notifications, getNotifications} = useContext(NotificationContext);
    console.log(notifications);

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
            'Refresh_Token': sessionStorage.getItem('refresh_token')
        }
    };

    const handleClick = async(id) => {
        const response = await axios.post(`/api/notifications/friend-request/${id}/accept`, {}, axiosConfig);
        getNotifications;
    }

    return (
        <div className="notifications-container">
            <ul>
                {notifications.map((notif) => {
                    return (
                        <li key={notif.sender}>
                            <div>'type ' + {notif.notification_type}</div>
                            <div>'sender id ' + {notif.sender}</div>
                            <button onClick={() => handleClick(notif._id)}>ACCEPT</button>
                            <button onClick={getNotifications}>CLICK ME</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Notifications;