import React, { useState, useContext } from "react";

// Utils
import axios from "../../utils/AxiosConfig";
import UserInfo from "../UserInfo/UserInfo";

// CSS
import './Notifications.css';
import { NotificationContext } from "../../utils/NotificationContext";

const Notifications = () => {
    const {notifications, getNotifications} = useContext(NotificationContext);

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Refresh_Token': localStorage.getItem('refreshToken') 
        }
    };

    const handleClick = async(id, status) => {
        console.log('pre');console.log(JSON.parse(localStorage.getItem('user')));
        // Handle notification action and returns updated array
        const updatedNotifications = await axios.post(`/api/notifications/friend-request/${id}/${status}`, {}, axiosConfig);
        console.log('response recieved');
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('recieved user');
        console.log(user.notifications);
        // console.log(JSON.parse(localStorage.getItem('user')));
        user.notifications = updatedNotifications.data.notifications;
        console.log(updatedNotifications.data.notifications);
        console.log(user.notifications);
        // // console.log(updatedNotifications.data.notifications);

        localStorage.setItem('user', user);
        console.log('updated user');
        // console.log(JSON.parse(localStorage.getItem('user')));
        // getNotifications();
    }

    //notif.notification_type

    return (
        <div className="notifications-container">
            <ul>
                <button onClick={getNotifications}>REFRESH PAGE</button>
                {notifications.map((notif) => {
                    return (
                        <li key={notif.sender}>
                            <UserInfo 
                                userObj={notif.sender}
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
        </div>
    )
}

export default Notifications;