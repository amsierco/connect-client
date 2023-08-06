import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Utils
import axios from "../../utils/AxiosConfig";
import Loading from "../../utils/Loading";

// CSS
import './ProfilePost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heart_solid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heart_outline, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';

// Components
import Comment from "../Comment/Comment";

const ProfilePost = ({ postId }) => {
    const[loading, setLoadingState] = useState(true);

    const [isLiked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [post, setPost] = useState();

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
            'Refresh_Token': sessionStorage.getItem('refresh_token')
        }
    };

    // Handle likes
    const handleLike = async() => {
        // // Change heart UI
        // setLiked(!isLiked);

        // // Update database with like status
        // const response = await axios.post(`/api/posts/like/${content._id}`, {}, axiosConfig);

        // // Rerenders post component
        // setLikeCount(response.data);
    }

    // Handle comments
    const handleComment = async() => {

    }

    // Handle share
    const handleShare = async() => {

    }

    // Load API data
    useEffect(() => {
        setLoadingState(true);
        // Get author
        const getPost = async () => {
            try {
                const post = await axios.get(`/api/posts/${postId}`);
                // console.log(post.data);
                setPost(post.data);
                setLikeCount(post.data.likes.count);
                setLoadingState(false);
            } catch (err) {
                console.log(err);
            }
        }

        // Check like status
        // const getLikeStatus = async () => {
        //     try {
        //         const like_status = await axios.get(`/api/posts/like/${content._id}`, axiosConfig);
        //         setLiked(like_status.data);

        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
        
        // Call API functions
        getPost();
        // getLikeStatus();

    }, []);

    return(
        loading === true ? <Loading /> : 
    
        <div className="profile-post-wrapper">
            <div className="profile-post-content">
                <div>{post.message}</div>
            </div>
            <div className="profile-post-footer">
                <FontAwesomeIcon icon={heart_solid} />
                <div>{likeCount}</div>
            </div>

        </div>
    )
}

export default ProfilePost;