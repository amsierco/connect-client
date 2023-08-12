import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Utils
import axios from "../../utils/AxiosConfig";
import Loading from "../../utils/Loading";
import ImageFormat from "../../utils/ImageFormat";

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
            let file = document.querySelector('input[type=file]')['files'][0];
            if(undefined !== file){
                if(file.size > 2097152){
                    alert("File is too big! Max upload size: 2MB");
                    return;
                }
                let base64String = "";
                const reader = new FileReader();
                reader.onload = async() => {
                    base64String = reader.result
                        .replace("data:", "")
                        .replace(/^.+,/, "");
                    // console.log(base64String);
    
                    axios.post(
                        `/api/profile/${id}/edit`, 
                        { 
                            description: descriptionPlaceholder, 
                            base64String: base64String
                        },
                        axiosConfig
                    )
                    setDescription(descriptionPlaceholder);
                    setEditing(false);
                }
                reader.readAsDataURL(file);
            } else {
                axios.post(
                    `/api/profile/${id}/edit`, 
                    { 
                        description: descriptionPlaceholder
                    },
                    axiosConfig
                )
                setDescription(descriptionPlaceholder);
                setEditing(false);
            }
            
            
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
                            <div 
                                className="user-picture profile-picture" 
                                style={ImageFormat(user.picture)} 
                            />
                        </div>
                        <div className="info">

                        <div id='details'>

                            <div className="profile-details-background" />
                            {!isEditing ?
                                <>
                                <h4 id='username'> {user.username} </h4>
                                <div id='description'>
                                    {description}
                                </div>
                                </>
                            :
                                <form action="" id='form'onSubmit={handleSubmit}>
                                    <label>Update description</label>
                                    <input type="text" placeholder={description}
                                    onChange={e => setDescriptionPlaceholder(e.target.value)}
                                    />
                                    <label htmlFor='profile-pic' id='profile-pic'>Update Profile Picture</label>
                                    <input type="file" id='profile-pic' name='profile-pic'/>
                                </form>}
                        </div> 
                        <div className="actions">
                            {user.isOwner ?
                                <>
                                <button id="edit-btn" onClick={handleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
                                {
                                    isEditing ? 
                                    <button type="submit" form="form">Confirm</button> 
                                : null}
                                </>
                            : <FriendRequestBtn userObj={user}/>}
                        </div>
                            
                        </div>
                    {/* </div> */}
                </div>
            </div>
            <div className="profile-subheader">
                <h3>Friends</h3>
            </div>
            <div className="friend-slider">
                <FriendSlider profileId={user._id}/>
            </div>
            <div className="profile-subheader">
                <h3>All Posts</h3>
            </div>
            <div className="all-posts-wrapper">
                {user.posts.length === 0 ? 
                    <div>No current posts</div> 
                :
                    <div className="all-posts">
                        {user.posts.map(postInstance => {
                            return (
                                <PostPreview post={postInstance} key={postInstance._id}/>
                            );
                        })}
                    </div>}
            </div>
        </div>
    )
}

export default Profile;