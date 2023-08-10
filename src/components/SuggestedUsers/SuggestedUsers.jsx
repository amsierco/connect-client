import React, { useEffect, useState } from "react";

// Utils
import axios from "../../utils/AxiosConfig";
import Loading from "../../utils/Loading";

// Components
import UserInfo from "../UserInfo/UserInfo";

// CSS
import './SuggestedUsers.css';

const SuggestedUsers = () => {

    const [loading, setLoadingState] = useState(true);
    const [users, setUsers] = useState([]);

    const axiosConfig = {
        params: {
            activeUserId: JSON.parse(localStorage.getItem('user'))._id
        },
    }

    // Once on mount
    useEffect(() => {
        setLoadingState(true);
        // API function
        const getUsers = async () => {
            try {
                const response = await axios.get('/api/profile/suggested-users', axiosConfig);
                setUsers(response.data);
                setLoadingState(false);

            } catch (err) {
                console.log(err);
            }
        }
        // Call API function
        getUsers();

    }, []);

    return(
        loading === true ? <Loading /> : 

        <ul className="suggested-user-wrapper">
            {users.map(userInstance => {
                return (
                    <li key={userInstance._id}>
                        <UserInfo 
                            userObj={userInstance}
                            imageSize="3rem"
                            fontSize="1rem"
                            gap=".5rem"
                            orientation="row"
                        />
                    </li>
                );
            })}
        </ul>
    )
}

export default SuggestedUsers;