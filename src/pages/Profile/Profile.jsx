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
    const[posts, setPosts] = useState([]);
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
                console.log('profile data');console.log(response.data);
                setUser(response.data.user);
                setFriend(response.data.isFriend);
                setOwner(response.data.isOwner);
                setPosts(response.data.user.posts);
                setDescription(response.data.user?.description);
                setLoadingState(false);
            });
    }, [id, description])

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
                        {!isEditing ?
                            <div id='description'>
                                {description}
                            </div>
                        :
                            <form action="" id="description" onSubmit={handleSubmit}>
                                <input type="text" placeholder={description} onChange={e => setDescriptionPlaceholder(e.target.value)}/>
                            </form>}
                         
                    </div>
                </div>
                <div className="actions">
                    {isOwner ?
                        <>
                        <button id="edit-btn" onClick={handleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
                        {
                            isEditing ? 
                            <button type="submit" form="description">Confirm</button> 
                        : null}
                        </>
                    :null}
                    {/* : !isFriend ? 
                        <FriendRequestBtn userId={user._id}/>
                    :   <FriendRequestBtn userId={user._id} unfriend={true}/>} */}
                </div>
            </div>
            <div className="friend-slider">
                <FriendSlider profileId={user._id}/>
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