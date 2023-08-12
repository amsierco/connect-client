import React, { useEffect, useState} from "react";

// Utils
import axios from "../../utils/AxiosConfig";
import Loading from "../../utils/Loading";

// Components
import UserInfo from "../UserInfo/UserInfo";

// CSS
import "./FriendSlider.css";

const FriendSlider = ({ profileId }) => {
    const[loading, setLoadingState] = useState(true);
    const[friends, setFriends] = useState([]);

    const axiosConfig = {
        params: {
            activeUserId: JSON.parse(localStorage.getItem('user'))._id
        },
    }

    useEffect(() => {
        // Get friends
        setLoadingState(true);
        axios
            .get(`/api/profile/${profileId}/friends`, axiosConfig)
            .then(response => {
                setFriends(response.data);
                setLoadingState(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const horizontalScroll = () => {
        const element = document.getElementById('scroll-menu');
        element.addEventListener('wheel', (e) => {
            // e.preventDefault();
            if (e.deltaY > 0) element.scrollLeft += 100;
            else element.scrollLeft -= 100;
          }); 
    }

    return (
        loading === true ? <Loading /> : 
        <div className="scroll-menu-wrapper">
            {friends.length === 0 ? 
                <div>No current friends</div> 
            :
                <ul id="scroll-menu" onMouseEnter={horizontalScroll}>
                    {friends.map(friend => {
                        return (
                            <li key={friend._id}>
                                    <UserInfo 
                                    userObj={friend}
                                    requestButton={true}
                                    orientation="column"
                                />
                            </li>
                        );
                    })}
                </ul>}
        </div>
    )
}

export default FriendSlider;