import React from "react";

// Utils
import axios from "../../utils/AxiosConfig";

const FriendRequestBtn = ({ userId }) => {

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
            'Refresh_Token': sessionStorage.getItem('refresh_token')
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
            Click me!
        </button>
    )
}

export default FriendRequestBtn;