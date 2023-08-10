import React, { useState, useContext } from "react";

// Utils
import axios from "../../utils/AxiosConfig";
import UserInfo from "../UserInfo/UserInfo";

// CSS
import './Notifications.css';
import { NotificationContext } from "../../utils/NotificationContext";

const Notifications = () => {
    const {notifications, setNotifications} = useContext(NotificationContext);
    

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Refresh_Token': localStorage.getItem('refreshToken') 
        }
    };

    const handleClick = async(id, status) => {
        // Handle notification action and returns updated array
        const updatedNotifications = await axios.post(`/api/notifications/friend-request/${id}/${status}`, {}, axiosConfig);

        const user = JSON.parse(localStorage.getItem('user'));
        user.notifications = updatedNotifications.data.notifications;
        localStorage.setItem('user', JSON.stringify(user));

        setNotifications(JSON.parse(localStorage.getItem('user')).notifications);
        console.log(JSON.parse(localStorage.getItem('user')).notifications);
    }

    return (
        <div className="notifications-container">
            {notifications.length !== 0 ?
                <ul>
                    {notifications.map((notif) => {
                        return (
                            <li key={notif._id}>
                                <UserInfo 
                                    userObj={notif.sender}
                                    requestButton={false}
                                    imageSize="3rem"
                                    fontSize="1rem"
                                    gap=".5rem"
                                    orientation="row"
                                />
                                <div id='notif-message'>Sent you a friend request</div>
                                <button onClick={() => handleClick(notif._id, 'accept')}>Accept</button>
                                <button onClick={() => handleClick(notif._id, 'reject')}>Reject</button>
                            </li>
                        )
                    })}
                </ul>
            : <div>You have no notifications</div>}
        </div>
    )
}

export default Notifications;