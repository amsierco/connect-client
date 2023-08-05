import React from "react";

// Components
import FriendRequestBtn from "../FriendRequestBtn/FriendRequestBtn";

const FriendPreview = ({picture, username, friend_status}) => {

    return (
        <div className="friend-preview-wrapper">
            <div className="details">
                <div id='icon'>{picture}</div>
                <div id='username'>{username}</div>
            </div>
            <FriendRequestBtn userId={'1234'} />
        </div>
    )
}

export default FriendPreview;