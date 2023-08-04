import React, { useState } from "react";

// Utils
import axios from "../../utils/AxiosConfig";

// CSS
import './Profile.css';

const Profile = () => {
   
    return (
        <div className="profile-container">
            <div className="info">
                <div id='icon'>
                    
                </div>
                <div id='details'>
                    Details:
                    <div id='username'>
                        John Doe
                    </div>
                    <div id='description'>
                        I like to program
                    </div>
                </div>
            </div>
            <div className="friend-slider">
                Friend Slider
            </div>
            <div className="all-posts">
                All Posts
            </div>
        </div>
    )
}

export default Profile;