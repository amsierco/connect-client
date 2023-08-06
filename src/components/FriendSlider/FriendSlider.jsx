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

        // API function
        const api = async () => {
            try {
                const response = await  axios.get(`/api/profile/${userId}/friends`, axiosConfig);
                setFriends(response.data);
                setLoadingState(false);
            } catch (err) {
                console.log(err);
                setFriends([]);
                setLoadingState(false);
            }
        }
        // Call API function
        api();
    }, [])

    const test = () => {
        const item = document.getElementById('scroll-menu');
        item.addEventListener('wheel', (e) => {
            // e.preventDefault();
            if (e.deltaY > 0) item.scrollLeft += 100;
            else item.scrollLeft -= 100;
            // item.scrollLeft += e.deltaY + e.deltaX;
          });
    }

    return (
        loading === true ? <Loading /> : 
        <ul id="scroll-menu" onMouseEnter={test}>
            {friends.map(friend => {
                        return (
                            <li key={friend}>
                                <FriendPreview userId={friend} />
                            </li>
                        );
                    })}
            </ul>
    )
}

export default FriendSlider;
/**
 * (e) => {console.log('a'); horizontalScroll(e);}
 */