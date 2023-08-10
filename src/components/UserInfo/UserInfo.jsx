import React from "react";
import { Link } from "react-router-dom";

// CSS
import './UserInfo.css';

// Components
import FriendRequestBtn from "../FriendRequestBtn/FriendRequestBtn";

const UserInfo = ({
    userObj, 
    requestButton = true,
    imageSize='2rem', 
    fontSize='1rem', 
    gap='.5rem',
    orientation='row'
}) => {
    const guest_pic = '../../guest-32.png';

    return (
        <div className="user-info" style={{
            // gap: `${gap}`,
            flexDirection: `${orientation}`,
        }}>
            {undefined !== userObj.picture ? 
                <Link 
                    to={`/profile/${userObj._id}`} 
                    id='user-icon' 
                    style={{
                        backgroundImage: `url(${userObj?.picture})`,
                        width: `${imageSize}`
                    }}
                /> 
            : 
                <Link 
                    to={`/profile/${userObj._id}`} 
                    id='guest-picture'
                    style={{
                        backgroundImage: `url(${guest_pic})`,
                        width: `${imageSize}`
                    }}
                />}

            <div>{userObj.username}</div>

            {requestButton ? 
                <FriendRequestBtn userObj={userObj}/>
            : null}
        </div>
    )
}

export default UserInfo;