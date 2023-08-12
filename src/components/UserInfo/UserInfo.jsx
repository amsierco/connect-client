import React from "react";
import { Link } from "react-router-dom";

// Utils
import ImageFormat from "../../utils/ImageFormat";

// CSS
import './UserInfo.css';

// Components
import FriendRequestBtn from "../FriendRequestBtn/FriendRequestBtn";

const UserInfo = ({
    userObj, 
    requestButton = true,
    orientation='row'
}) => {

    return (
        <div className="user-info" style={{
            flexDirection: `${orientation}`,
        }}>
            <Link 
                to={`/profile/${userObj._id}`} 
                className='user-picture' 
                style={ImageFormat(userObj?.picture)}
            /> 

            <div>{userObj.username}</div>

            {requestButton ? 
                <FriendRequestBtn userObj={userObj}/>
            : null}
        </div>
    )
}

export default UserInfo;