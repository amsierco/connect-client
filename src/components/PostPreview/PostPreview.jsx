import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Utils
import Loading from "../../utils/Loading";

// CSS
import './PostPreview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heart, faComment as comment } from '@fortawesome/free-solid-svg-icons';


const PostPreview = ({ post }) => {

    return(
        <div className="profile-post-wrapper">
            <div className="profile-post-content">
                {post.message}
            </div>
            <div className="profile-post-stats">
                <div>
                    <FontAwesomeIcon icon={heart} />
                    <div>{post.likes.count}</div>
                </div>
                <div>
                    <FontAwesomeIcon icon={comment} />
                    <div>{post.comments.length}</div>
                </div>
            </div>
        </div>
    )
}

export default PostPreview;