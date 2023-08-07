import React from "react";
import { Link } from "react-router-dom";

// CSS
import './UserInfo.css';

const UserInfo = ({
    userObj, 
    imageSize='2rem', 
    fontSize='1rem', 
    gap='.5rem',
    orientation='row'
}) => {
    const guest_pic = '../../guest-32.png';

    return (
        <div className="user-info" style={{
            gap: `${gap}`,
            flexDirection: `${orientation}`
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
                id="guest-picture"
                style={{
                    backgroundImage: `url(${guest_pic})`,
                    width: `${imageSize}`
                }}
            >
                {/* <img src={guest_pic} alt='' id="guest-picture"/> */}
            </Link>}
            <div style={{fontSize: `${fontSize}`}}>{userObj.username}</div>
        </div>
    )
}

export default UserInfo;