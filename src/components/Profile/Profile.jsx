import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Utils
import axios from "../../utils/AxiosConfig";
import Loading from "../../utils/Loading";

// Components
import FriendSlider from "../FriendSlider/FriendSlider";
import FriendRequestBtn from "../FriendRequestBtn/FriendRequestBtn";
import ProfilePost from "../ProfilePost/ProfilePost";

// CSS
import './Profile.css';

const Profile = () => {
    const[loading, setLoadingState] = useState(true);

    const[user, setUser] = useState();
    const[picture, setPicture] = useState();
    const[username, setUsername] = useState();
    const[userId, setUserId] = useState();
    const[posts, setPosts] = useState([]);

    const { id } = useParams();

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
            'Refresh_Token': sessionStorage.getItem('refresh_token')
        }
    };

    useEffect(() => {
        setLoadingState(true);

        // Get profile
        axios.get(`/api/profile/${id}`, axiosConfig)
        .then ((response) => {
            setUser(response.data);
            setUsername(response.data.username);
            setPicture(response.data.picture);
            setUserId(response.data._id);
            // console.log(response.data.posts)
            setPosts(response.data.posts);
            setLoadingState(false);
        })
       
    }, [id])

    return (
        loading === true ? <Loading /> : 

        <div className="profile-container">
            <div className="header">
                <div className="info">
                    <div id="icon-wrapper">
                    {
                        undefined !== picture ? 
                        <div id='icon' style={{backgroundImage: `url(${picture})`}} /> : 
                        <div id='icon'>
                            <img src='../../guest-32.png' alt='' id="guest"/>
                        </div>
                    }
                    </div>
                    <div id='details'>
                        <h4 id='username'> {username} </h4>
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
                <FriendSlider userId={userId}/>
            </div>
            <div className="all-posts-wrapper">
                All Posts
                <div className="all-posts">
                    {posts.map(postId => {
                        return (
                            <div key={postId}>
                                <ProfilePost postId={postId}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Profile;