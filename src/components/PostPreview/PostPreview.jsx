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
                <div>
                    {
                        post.message.length >= 70 ?
                        post.message.substring(0, 70)+'...' :
                        post.message
                    }
                </div>
            </div>
            <div className="profile-post-footer">
                <FontAwesomeIcon icon={heart} />
                <div>{post.likes.count}</div>
            </div>

        </div>
    )
}

export default PostPreview;