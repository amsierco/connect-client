import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

// Utils
import axios from "../../utils/AxiosConfig";
import Loading from "../../utils/Loading";

// Components
import FriendRequestBtn from "../FriendRequestBtn/FriendRequestBtn";

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
                // console.log(response.data?.picture);
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
            <Link to={`/profile/${userId}`} className="details">
                {
                undefined !== friend?.picture ? 
                <div id='icon' style={{backgroundImage: `url(${friend?.picture})`}}/> : 
                <div id='icon'>
                    <img src='../../guest-32.png' alt='' id="guest"/>
                </div>
                }
                <div id='username'>{friend.username}</div>
            </Link>
            <FriendRequestBtn userId={userId} />
        </div>
    )
}

export default FriendPreview;