import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Utils
import axios from "../../utils/AxiosConfig";
import Loading from "../../utils/Loading";

// Components
import FriendSlider from "../../components/FriendSlider/FriendSlider";
import FriendRequestBtn from "../../components/FriendRequestBtn/FriendRequestBtn";
import PostPreview from "../../components/PostPreview/PostPreview";

// CSS
import './Profile.css';

const Profile = () => {
    const[loading, setLoadingState] = useState(true);

    const[user, setUser] = useState();
    const[isFriend, setFriend] = useState(false);
    const[isOwner, setOwner] = useState(false);

    const[picture, setPicture] = useState();
    const[username, setUsername] = useState();
    const[userId, setUserId] = useState();
    const[posts, setPosts] = useState([]);


    const { id } = useParams();

    const axiosConfig = {
        params: {
            activeUserId: JSON.parse(localStorage.getItem('user'))._id
        }
    };

    const handleEdit = () => {
        console.log('BEGIN EDIT')
    }

    useEffect(() => {
        setLoadingState(true);

        // Get profile
        axios
            .get(`/api/profile/${id}`, axiosConfig)
            .then ((response) => {
                setUser(response.data.user);
                setFriend(response.data.isFriend);
                setOwner(response.data.isOwner);
                setPosts(response.data.user.posts);
                console.log(response.data.user.posts)
                setLoadingState(false);
            });
    }, [id])

    return (
        loading === true ? <Loading /> : 

        <div className="profile-container">
            <div className="header">
                <div className="info">
                    <div id="icon-wrapper">
                    {
                        undefined !== user.picture ? 
                            <div id='icon' style={{backgroundImage: `url(${user.picture})`}} /> 
                        : 
                            <div id='icon'>
                                <img src='../../guest-32.png' alt='' id="guest"/>
                            </div>
                    }
                    </div>
                    <div id='details'>
                        <h4 id='username'> {user.username} </h4>
                        <div id='description'>
                            I like to program
                        </div>
                    </div>
                </div>
                <div className="actions">
                    {isOwner ?
                        <button id="edit-btn" onClick={handleEdit}>Edit</button>
                    : !isFriend ? 
                        <FriendRequestBtn userId={user._id}/>
                    :null}
                </div>
            </div>
            <div className="friend-slider">
                <FriendSlider userId={user._id}/>
            </div>
            <div className="all-posts-wrapper">
                All Posts
                <div className="all-posts">
                    {posts.map(postInstance => {
                        return (
                            <div key={postInstance._id}>
                                <PostPreview post={postInstance}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Profile;