import React, { useState, useEffect } from "react";

// Utils
import axios from "../../utils/AxiosConfig";

const FriendRequestBtn = ({ userObj }) => {
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
        setStatus(userObj.status);
    }, [])

    return (
        status === 'current' ? null :

        <button onClick={handleClick} >
            {status === 'add' ? 'Add'
            :
            status === 'pending' ? 'Pending' 
            : 
            status === 'remove' ? 'Remove'
            : null}
        </button>
    )
}

export default FriendRequestBtn;