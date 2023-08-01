import React, { useEffect, useState } from "react";
import axios from "axios";

// CSS
import './Post.css';

// Components
import Comment from "../Comment/Comment";

const Post = ({ content }) => {
    const [author, setAuthor] = useState(null);
    const [comments, setComments] = useState([]);

    // Load API data
    useEffect(() => {
        // Get author
        const getAuthor = async () => {
            try {
                const author = await axios.get(`http://localhost:3000/api/posts/author/${content.user_id}`);
                setAuthor(author.data.username);

            } catch (err) {
                console.log(err);
            }
        }
        
        // Call API function
        getAuthor();

    }, []);

    return(<>
         <div className="post-wrapper">
            <div className="post-header">
                <div>Icon</div>
                <div>Author: {author}</div>
                <div>Posted: {content.date}</div>
            </div>
            <div className="post-content">
                <div>{content.message}</div>
            </div>
            <div className="post-footer">
                <div>Likes: {content.likes}</div>
            </div>
            <div className="post-comment-wrapper">
                <ul>
                    {comments.map(comment => {
                        return (
                            <li key={comment._id}>
                                <Comment content={comment}/>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    </>)
}

export default Post;