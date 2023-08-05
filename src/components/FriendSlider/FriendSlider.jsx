import React, { useEffect, useState} from "react";

// Utils
import axios from "../../utils/AxiosConfig";
import Loading from "../../utils/Loading";

// CSS
import "./FriendSlider.css";

// Components
import FriendPreview from "../FriendPreview/FriendPreview";

const FriendSlider = ({ userId }) => {

    const[loading, setLoadingState] = useState(true);

    const[friends, setFriends] = useState();

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
            'Refresh_Token': sessionStorage.getItem('refresh_token')
        }
    };

    useEffect(() => {
        // Get friends
        console.log('FRIEND ID: '+userId)
        // API function
        const api = async () => {
            try {
                const response = await  axios.get(`/api/profile/${userId}/friends`, axiosConfig);
                console.log('Friends Retrieved');
                await setFriends(response.data);
                console.log(friends)
                setLoadingState(false);
            } catch (err) {
                console.log(err);
                setFriends([]);
                setLoadingState(false);
            }
        }
        // Call API function
       api();
        // axios.get(`/api/profile/${userId}/friends`, axiosConfig)
        // .then ((response) => {
        //     setFriends(response.data);
        //     console.log(friends);
        //     // console.log('F2: ' + typeof(response.data))
        //     setLoadingState(false);
        // })
        // .then (() => {
        //     console.log(friends);
        //     setLoadingState(false);
        // })
        // console.log(friends)

    }, [])

    return (
        loading === true ? <Loading /> : 
        <div className="friend-slider-wrapper">
            <ul className="scroll-menu">
                {friends.map(friend => {
                            return (
                                <li key={friend._id}>
                                    <FriendPreview 
                                        picture={friend.picture}
                                        username={friend.username}
                                        friend_status={true}
                                    />
                                </li>
                            );
                        })}
                </ul>
        </div>
    )
}

export default FriendSlider;