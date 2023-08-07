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

    const navigate = useNavigate();

    // const handleClick = () => {
    //     console.log('clicked')
    //     return navigate(`/profile/${userId}`);
    // }

    useEffect(() => {
        // Get friends

        // API function
        const api = async () => {
            try {
                const response = await axios.get(`/api/friend/${userId}`);
                setFriend(response.data);
                setLoadingState(false);
            } catch (err) {
                console.log(err);
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
            <FriendRequestBtn userId={userId} unfriend={true} />
        </div>
    )
}

export default FriendPreview;