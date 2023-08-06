import React, { useEffect, useState } from "react";
import axios from "../../utils/AxiosConfig";
import { Link } from "react-router-dom";

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

const Post = ({ content }) => {
    const [author, setAuthor] = useState();
    const [isLiked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(content.likes.count)
    const [date, setDate] = useState();

    const [comments, setComments] = useState([]);
    const [commentMessage, setCommentMessage] = useState();
    const [isCommentFormVisible, setCommentFormVisibility] = useState(false);

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
            'Refresh_Token': sessionStorage.getItem('refresh_token')
        }
    };

    // Handle likes
    const handleLike = async() => {
        // Change heart UI
        setLiked(!isLiked);

        // Update database with like status
        const response = await axios.post(`/api/posts/like/${content._id}`, {}, axiosConfig);

        // Rerenders post component
        setLikeCount(response.data);
    }

    // Handle comments
    const handleComment = async() => {
        setCommentFormVisibility(!isCommentFormVisible);
    }

    // Handle share
    const handleShare = async() => {

    }

    // Comment submit
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const message = commentMessage;
            const response = await axios.post(
                `/api/posts/${content._id}/comments/create`, 
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
        // Get author
        const getAuthor = async () => {
            try {
                const author = await axios.get(`/api/posts/author/${content.user_id}`);
                setAuthor(author.data);
            } catch (err) {
                console.log(err);
            }
        }

        // Check like status
        const getLikeStatus = async () => {
            try {
                const like_status = await axios.get(`/api/posts/like/${content._id}`, axiosConfig);
                setLiked(like_status.data);

            } catch (err) {
                console.log(err);
            }
        }

        // Add comments
        console.log(content.comments);
        setComments(content.comments);

        // Format date display
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const date_data = new Date(content.date.toLocaleString().split('T')[0]);
        const month = months[date_data.getMonth()]
        const date_string = month + ' ' + date_data.getDay() + ', ' + date_data.getFullYear();
        setDate(date_string);

        // Call API functions
        getAuthor();
        getLikeStatus();

    }, []);

    return(
    <div className="z-index-wrapper">
        <div className="post-wrapper">
            <div className="post-wrapper-background"/>
            {/* Author icon */}
            {undefined !== author?.picture ? 
            <Link to={`/profile/${author?._id}`} id='post-icon' style={{backgroundImage: `url(${author?.picture})`}}/> : 
            <Link to={`/profile/${author?._id}`} id='post-icon'>
                <img src='../../guest-32.png' alt='' id="guest"/>
            </Link>}
            {/* Username and Date */}
            <div className="post-header">
                <h3>{author?.username}</h3>
                <div id='small-circle'></div>
                <h4>{date}</h4>
            </div>
            {/* Post content */}
            <div className="post-content">
                <div>{content.message}</div>
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

        {/* Comment form logic */}
        {isCommentFormVisible ? 
            <><div className="comment-form">
                <div className="comment-form-background"/>
                    <form onSubmit={handleSubmit}>
                        <input type="text" onChange={e => setCommentMessage(e.target.value)} placeholder="Add a comment"/>
                        <button className='button-wrapper' type="submit">Comment</button>
                    </form>
            </div>
            {comments.length === 0 ? null : 
            <div className="comment-wrapper-with-form">
                <ul>
                    {comments.map(user_comment => {
                        return (
                            <li key={user_comment._id}>
                                <div>
                                    {/* Author icon
                                    {undefined !== user_comment?.picture ? 
                                    <Link to={`/profile/${author?._id}`} id='post-icon' style={{backgroundImage: `url(${author?.picture})`}}/> : 
                                    <Link to={`/profile/${author?._id}`} id='post-icon'>
                                        <img src='../../guest-32.png' alt='' id="guest"/>
                                    </Link>} */}
                                </div>
                                <div>{user_comment.message}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>}
            </>

        : comments.length === 0 ? null : 
        <div className="comment-wrapper">  
            <ul>
                {comments.map(user_comment => {
                    return (
                        <li key={user_comment._id}>
                            <div className="comment-form-background"/>
                            <div>{user_comment.message}</div>
                        </li>
                    );
                })}
            </ul>
        </div>}
    </div>
    )
}

export default Post;