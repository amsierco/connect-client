import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Utils
import axios from "../../utils/AxiosConfig";

/**
 * @param {userObj} containing fields: _id, username, picture, status
 */
const FriendRequestBtn = ({ userObj }) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState();  

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Refresh_Token': localStorage.getItem('refreshToken')
        }
    };

    const handleClick = async() => {
        // No action if pending
        if(status === 'pending'){
            return
        }

        if(status === 'incoming'){
            navigate('/notifications');
            return;
        }

        // Add or Remove friend (not async)
        axios.post(`/api/friend/${userObj._id}/request`, {}, axiosConfig)

        // Update status
        if(status === 'add'){
            setStatus('pending');
        } else if (status === 'remove'){
            setStatus('add');
        }
    }
    
    useEffect(() => {
        // Set init state
        console.log(userObj.status)
        setStatus(userObj.status);
    }, [])

    return (
        status === 'current' ? null :

        <button onClick={handleClick}>
            {status === 'add' ? 'Add'
            :
            status === 'pending' ? 'Pending' 
            : 
            status === 'remove' ? 'Remove'
            : 
            status ==='incoming' ? 'Incoming'
            : null}
        </button>
    )
}

export default FriendRequestBtn;