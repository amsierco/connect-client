import React, { useEffect, useState } from "react";
import axios from "../../utils/AxiosConfig";
import { Link } from "react-router-dom";

// CSS
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heart_solid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heart_outline, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';

// Components
import Comment from "../Comment/Comment";

const Post = ({ content }) => {
    const [author, setAuthor] = useState();
    const [isLiked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(content.likes.count)

    // Handle likes
    const handleLike = async() => {
        // Change heart UI
        setLiked(!isLiked);

        // Update database with like status
        const response = await axios.post(`/api/posts/like/${content._id}`,
            {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
                }
            }
        );
        // Rerenders post component
        setLikeCount(response.data);
    }

    // Handle comments
    const handleComment = async() => {

    }

    // Handle share
    const handleShare = async() => {

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
                const like_status = await axios.get(`/api/posts/like/${content._id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
                        }
                    }
                );  
                setLiked(like_status.data);

            } catch (err) {
                console.log(err);
            }
        }
        
        // Call API functions
        getAuthor();
        getLikeStatus();

    }, []);

    return(<>
         <div className="post-wrapper">
            {
            undefined !== author?.picture ? 
            <Link to={`/profile/${author?._id}`} id='post-icon' style={{backgroundImage: `url(${author?.picture})`}}/> : 
            <Link to={`/profile/${author?._id}`} id='post-icon'>
                <img src='../../guest-32.png' alt='' id="guest"/>
            </Link>
            }
            
            <div className="post-header">
                <div>{author?.username}</div>
                <div id='small-circle'></div>
                <div>{content.date.toLocaleString().split('T')[0]}</div>
            </div>

            <div className="post-content">
                {/* {undefined === typeof(content.picture) ? null :
                    // Following DB Schema
                    (() => {
                        try{
                            <img 
                                src={`data:image/${content?.picture?.img?.contentType};
                                base64,${content?.picture?.img?.data?.toString('base64')}`} 
                            /> 
                        } catch { null } 
                    })()
                } */}
                <div>{content.message}</div>
            </div>

            <div className="post-footer">
                <div className="post-footer-icons">
                    <button><FontAwesomeIcon icon={isLiked ? heart_solid : heart_outline} onClick={handleLike}/></button>
                    <button><FontAwesomeIcon icon={faComment} onClick={handleComment}/></button>
                    <button><FontAwesomeIcon icon={faPaperPlane} onClick={handleShare}/></button>
                </div>
                <div id='like-counter'>{likeCount} {likeCount === 1 ? 'like' : 'likes'} </div>
            </div>

            {/* <div className="post-comment-wrapper">
                <ul>
                    {comments.map(comment => {
                        return (
                            <li key={comment._id}>
                                <Comment content={comment.message}/>
                            </li>
                        );
                    })}
                </ul>
            </div> */}
        </div>
    </>)
}

export default Post;