import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

// Utils
import axios from "../../utils/AxiosConfig";
import Loading from "../../utils/Loading";

// Components
import FriendRequestBtn from "../FriendRequestBtn/FriendRequestBtn";
import UserInfo from "../UserInfo/UserInfo";

// CSS
import './FriendPreview.css';

const FriendPreview = ({userId}) => {
    const[friend, setFriend] = useState();
    const[loading, setLoadingState] = useState(true);
    const[isCurrentUser, setCurrentUser] = useState(false);

    const navigate = useNavigate();

    // const handleClick = () => {
    //     console.log('clicked')
    //     return navigate(`/profile/${userId}`);
    // }

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Refresh_Token': localStorage.getItem('refreshToken')
        }
    };

    useEffect(() => {
        // Get friends

        // API function
        const api = async () => {
            try {
                const response = await axios.get(`/api/friend/${userId}`, axiosConfig);
                setFriend(response.data);
                setCurrentUser(response.data.isUser);
                // console.log('isFriend? ' + response.data.isFriend);
                // console.log('isUser? ' + response.data.isUser);
                setLoadingState(false);
            } catch (err) {
                // console.log(err);
                setLoadingState(false);
            }
        }
        // Call API function
        api();

    }, [])

    return (
        loading === true ? <Loading /> : 
        <div className="friend-preview-wrapper">
            <UserInfo 
                userObj={friend}
                imageSize="3rem"
                fontSize="1rem"
                gap=".5rem"
                orientation="column"
            />
            {isCurrentUser ? null :
            <FriendRequestBtn userId={userId} unfriend={friend.isFriend} />}
        </div>
    )
}

export default FriendPreview;