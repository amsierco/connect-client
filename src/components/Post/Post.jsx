import React, { useEffect, useState } from "react";
import axios from "axios";

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
    const [comments, setComments] = useState([]);

    // Load API data
    useEffect(() => {
        // Get author
        const getAuthor = async () => {
            try {
                const author = await axios.get(`http://localhost:3000/api/posts/author/${content.user_id}`);
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
                <div>Author: {author}</div>
                <div>Posted: {content.date.toLocaleString().split('T')[0]}</div>
            </div>

            <div className="post-content">
                <div>{content.message}</div>
            </div>

            <div className="post-footer">
                <div className="post-footer-icons">
                    <button><FontAwesomeIcon icon={heart_outline} /></button>
                    <button><FontAwesomeIcon icon={faComment} /></button>
                    <button><FontAwesomeIcon icon={faPaperPlane} /></button>
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