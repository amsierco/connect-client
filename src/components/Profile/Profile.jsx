import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Utils
import axios from "../../utils/AxiosConfig";
import Loading from "../../utils/Loading";

// Components
import FriendSlider from "../FriendSlider/FriendSlider";
import FriendRequestBtn from "../FriendRequestBtn/FriendRequestBtn";

// CSS
import './Profile.css';

const Profile = () => {

    const[loading, setLoadingState] = useState(true);

    const[user, setUser] = useState();
    const[picture, setPicture] = useState();
    const[username, setUsername] = useState();
    const[userId, setUserId] = useState();

    const { id } = useParams();

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
            'Refresh_Token': sessionStorage.getItem('refresh_token')
        }
    };

    useEffect(() => {
        // Get profile
        axios.get(`/api/profile/${id}`, axiosConfig)
        .then ((response) => {
            setUser(response.data);
            setUsername(response.data.username);
            setPicture(response.data.picture);
            setUserId(response.data._id);
            console.log('ID: '+userId);
            console.log('ID2: ' + response.data._id);
            setLoadingState(false);
        })
       
    }, [])

    return (
        loading === true ? <Loading /> : 

        <div className="profile-container">
            <div className="header">
                <div className="info">
                    <div id="icon-wrapper">
                        <div id='icon' style={{backgroundImage: `url(${picture})`}} />
                    </div>
                    <div id='details'>
                        <div id='username'> {username} </div>
                        <div id='description'>
                            I like to program
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <FriendRequestBtn userId={userId}/>
                </div>
            </div>
            <div className="friend-slider">
                Friend Slider
                { /*userId &&*/ <FriendSlider userId={userId}/> }
            </div>
            <div className="all-posts">
                All Posts
            </div>
        </div>
    )
}

export default Profile;