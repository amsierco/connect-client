import React, { useEffect, useState} from "react";

// Utils
import axios from "../../utils/AxiosConfig";
import Loading from "../../utils/Loading";

// Components
import UserInfo from "../UserInfo/UserInfo";

// CSS
import "./Friends.css";

const Friends = () => {
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
            .get(`/api/profile/${JSON.parse(localStorage.getItem('user'))._id}/friends`, axiosConfig)
            .then(response => {
                setFriends(response.data);
                setLoadingState(false);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        loading === true ? <Loading /> : 
        <div className="friends-container">
            <h2>Friends</h2>
            {friends.length === 0 ? 
                <div>BEANS</div> 
            :
                <ul>
                    {friends.map(friend => {
                        return (
                            <li key={friend._id}>
                                    <UserInfo 
                                    userObj={friend}
                                    requestButton={true}
                                    imageSize="3rem"
                                    orientation="row"
                                />
                            </li>
                        );
                    })}
                </ul>}
        </div>
    )
}

export default Friends;