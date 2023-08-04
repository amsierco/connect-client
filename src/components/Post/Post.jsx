import React, { useEffect, useState } from "react";
import axios from "../../utils/AxiosConfig";

// CSS
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heart_solid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heart_outline, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';

// Components
import Comment from "../Comment/Comment";

const Post = ({ content }) => {
    const [author, setAuthor] = useState(null);
    const [icon, setIcon] = useState(undefined);
    const [isLiked, setLiked] = useState(false);

    // Handle likes
    const handleLike = async() => {
        // Change heart UI
        setLiked(!isLiked);

        // !!! LOGIC TO DETECT IF POST IS ALREADY LIKED !!! //

        // Update database
        const response = await axios.get(`/api/posts/like/${content.id}`,
            {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
                }
            }
        );
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
                setAuthor(author.data.username);
                setIcon(author.data.picture);
            } catch (err) {
                console.log(err);
            }
        }
        
        // Call API function
        getAuthor();

    }, []);

    return(<>
         <div className="post-wrapper">
            {
            undefined !== icon ? 
            <div id='post-icon' style={{backgroundImage: `url(${icon})`}}/> : 
            <div id='post-icon'>
                <img src='../../guest-32.png' alt='' id="guest"/>
            </div>
            }
            
            <div className="post-header">
                <div>{author}</div>
                <div id='small-circle'></div>
                <div>{content.date.toLocaleString().split('T')[0]}</div>
            </div>

            <div className="post-content">
                {undefined === typeof(content.picture) ? null :
                    // Following DB Schema
                    (() => {
                        try{
                            <img 
                                src={`data:image/${content?.picture?.img?.contentType};
                                base64,${content?.picture?.img?.data?.toString('base64')}`} 
                            /> 
                        } catch { null } 
                    })()
                }
                <div>{content.message}</div>
            </div>

            <div className="post-footer">
                <div className="post-footer-icons">
                    <button><FontAwesomeIcon icon={isLiked ? heart_solid : heart_outline} onClick={handleLike}/></button>
                    <button><FontAwesomeIcon icon={faComment} onClick={handleComment}/></button>
                    <button><FontAwesomeIcon icon={faPaperPlane} onClick={handleShare}/></button>
                </div>
                <div id='like-counter'>{content.likes} Likes</div>
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