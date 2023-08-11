import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Utils
import axios from "../../utils/AxiosConfig";

// CSS
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHeart as heart_solid, 
    faComment as comment_solid 
} from '@fortawesome/free-solid-svg-icons';
import { 
    faHeart as heart_outline, 
    faComment as comment_outline, 
    faPaperPlane 
} from '@fortawesome/free-regular-svg-icons';

// Components
import Comment from "../Comment/Comment";

const Post = ({ post }) => {
    const [isLiked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes.count)
    const [date, setDate] = useState();

    const [comments, setComments] = useState([]);
    const [commentMessage, setCommentMessage] = useState();
    const [isCommentFormVisible, setCommentFormVisibility] = useState(false);

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Refresh_Token': localStorage.getItem('refreshToken')
        }
    };

    // Handle likes
    const handleLike = async() => {
        // Change heart UI
        setLiked(!isLiked);

        // Update database with like status
        const response = await axios.post(`/api/posts/like/${post._id}`, {}, axiosConfig);

        // Rerenders post component
        setLikeCount(response.data);
    }

    // Handle comments
    const handleComment = async() => {
        setCommentFormVisibility(!isCommentFormVisible);
    }

    // Handle share
    const handleShare = async() => {
        console.log('POST SHARE NOT IMPLEMENTED')
    }

    // Comment submit
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const message = commentMessage;
            const response = await axios.post(
                `/api/posts/${post._id}/comments/create`, 
                { message },
                axiosConfig
            );

            console.log('comment added');

            const _comments = comments;
            _comments.push(response.data);
            setComments(_comments);
            setCommentFormVisibility(false);

        } catch (err) {
            console.log(err);
        }
    }

    // Load API data
    useEffect(() => {
        // Check like status
        const getLikeStatus = async () => {
            try {
                const like_status = await axios.get(`/api/posts/like/${post._id}`, axiosConfig);
                setLiked(like_status.data);

            } catch (err) {
                console.log(err);
            }
        }

        // Add comments
        setComments(post.comments);

        // Format date display
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const date_data = new Date(post.date.toLocaleString().split('T')[0]);
        const month = months[date_data.getMonth()]
        const date_string = month + ' ' + date_data.getDate() + ', ' + date_data.getFullYear();
        setDate(date_string);

        // Call API functions
        getLikeStatus();

    }, []);

    return(
    <div className="z-index-wrapper">
        <div className="post-wrapper">
            {isCommentFormVisible || comments.length !== 0 ? <div className="post-background timeline-background"/> : null}
            
            {/* Author icon */}
            {undefined !== post.user_id.picture ? 
            <Link to={`/profile/${post.user_id._id}`} className='user-picture post-picture' style={{backgroundImage: `url(${post.user_id?.picture})`}}/> : 
            <Link to={`/profile/${post.user_id._id}`} className='user-picture guest-picture post-picture' style={{backgroundImage: `url(${'../../guest-32.png'})`}} />}
            {/* Username and Date */}
            <div className="post-header">
                <h3>{post.user_id.username}</h3>
                <div id='small-circle'></div>
                <h4>{date}</h4>
            </div>
            {/* Post post */}
            <div className="post-content">
                <div>{post.message}</div>
            </div>
            {/* Footer with icons */}
            <div className="post-footer">
                <div className="post-footer-icons">
                    <button><FontAwesomeIcon icon={isLiked ? heart_solid : heart_outline} onClick={handleLike}/></button>
                    <button><FontAwesomeIcon icon={isCommentFormVisible ? comment_solid : comment_outline} onClick={handleComment}/></button>
                    <button><FontAwesomeIcon icon={faPaperPlane} onClick={handleShare}/></button>
                </div>
                <div id='like-counter'>{likeCount} {likeCount === 1 ? 'like' : 'likes'} </div>
            </div>
        </div>

        {/* Comments and Comment Form logic */}
        {isCommentFormVisible ? 
            <div className="comment-form">
                <div className="comment-form-background timeline-background" />
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={e => setCommentMessage(e.target.value)} placeholder="Add a comment..."/>
                    <button className='button-wrapper' type="submit">Comment</button>
                </form>
            </div> 
        : null}

        {comments.length !== 0 ? 
                <ul className={`${
                    isCommentFormVisible ? 
                    'comment-wrapper comment-form-visible' :
                    'comment-wrapper'
                    }`}>

                    {comments.map(user_comment => {
                        return (
                            <li key={user_comment._id}> 
                                {isCommentFormVisible ? null : <div className="comment-background timeline-background"/>}
                                <Comment commentId={user_comment._id} />
                            </li>
                        );
                    })}
                </ul>
        : null}
    </div>
    )
}

export default Post;