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
    const[isEditing, setEditing] = useState(false);
    const[description, setDescription] = useState();
    const[descriptionPlaceholder, setDescriptionPlaceholder] = useState();

    const { id } = useParams();

    const axiosConfig = {
        params: {
            activeUserId: JSON.parse(localStorage.getItem('user'))._id
        },
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Refresh_Token': localStorage.getItem('refreshToken')
        }
    };

    const handleEdit = () => {
        setEditing(!isEditing);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            axios.post(
                `/api/profile/${id}/edit`, 
                { description: descriptionPlaceholder },
                axiosConfig
            )
            setDescription(descriptionPlaceholder);
            setEditing(false);

        } catch (err) {
            setEditing(false);
            console.log(err);
        }
    }

    useEffect(() => {
        setLoadingState(true);

        // Get profile
        axios
            .get(`/api/profile/${id}`, axiosConfig)
            .then ((response) => {
                setUser(response.data);
                setDescription(response.data?.description);
                setLoadingState(false);
            });
    }, [id, description])

    return (
        loading === true ? <Loading /> : 

        <div className="profile-container">
            <div className="z-index-wrapper">
                <div id="profile-background-spacer" />
                <div className="header">
                    {/* <div className="info"> */}
                        <div className="icon-wrapper">
                            <div className="profile-icon-background" />
                            {
                                undefined !== user.picture ? 
                                    <div className="user-picture profile-picture" style={{backgroundImage: `url(${user.picture})`}} /> 
                                : 
                                    <div className="user-picture guest-picture profile-picture" style={{backgroundImage: `url(${'../../guest-32.png'})`}} /> 
                            }
                        </div>
                        <div className="info">

                        <div id='details'>

                            <div className="profile-details-background" />
                            <h4 id='username'> {user.username} </h4>
                            {!isEditing ?
                                <div id='description'>
                                    {description}
                                </div>
                            :
                                <form action="" id="description" onSubmit={handleSubmit}>
                                    <input type="text" placeholder={description} 
                                    onChange={e => setDescriptionPlaceholder(e.target.value)}
                                    />
                                </form>}
                        </div> 
                        <div className="actions">
                            {user.isOwner ?
                                <>
                                <button id="edit-btn" onClick={handleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
                                {
                                    isEditing ? 
                                    <button type="submit" form="description">Confirm</button> 
                                : null}
                                </>
                            : <FriendRequestBtn userObj={user} id='AAWG' />}
                        </div>
                            
                        </div>
                    {/* </div> */}
                </div>
            </div>
            <div className="friend-slider">
                <FriendSlider profileId={user._id}/>
            </div>
            <div className="all-posts-wrapper">
                <div className="all-posts">
                    {user.posts.map(postInstance => {
                        console.log(postInstance);
                        return (
                            // <div key={postInstance._id}>
                                <PostPreview post={postInstance} key={postInstance._id}/>
                            // </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Profile;