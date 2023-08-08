import React, { useState } from "react";

// Utils
import axios from "../../utils/AxiosConfig";

const FriendRequestBtn = ({ userId, unfriend=false }) => {
    const [isFriend, setFriend] = useState(unfriend);


    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Refresh_Token': localStorage.getItem('refreshToken')
        }
    };

    const handleClick = async() => {
        axios.post(`/api/friend/${userId}/request`, {}, axiosConfig)
        .then ((response) => {
            console.log('Process Complete');
            // setFriend(false);
        })
    }

    return (
        <button onClick={handleClick}>
            {isFriend ? 'Unfriend' : 'Add Friend'}
        </button>
    )
}

export default FriendRequestBtn;