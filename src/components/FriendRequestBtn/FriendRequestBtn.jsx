import React from "react";

// Utils
import axios from "../../utils/AxiosConfig";

const FriendRequestBtn = ({ userId, unfriend=false }) => {

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
        })
    }

    return (
        <button onClick={handleClick}>
            {unfriend ? 'Unfriend' : 'Add Friend'}
        </button>
    )
}

export default FriendRequestBtn;