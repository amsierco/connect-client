import React, { useEffect, useState } from "react";

// Utils
import axios from "../../utils/AxiosConfig";
import Loading from "../../utils/Loading";

// Components
import UserInfo from "../UserInfo/UserInfo";

// CSS
import './Comment.css';

const Comment = ({ commentId }) => {
    const[loading, setLoadingState] = useState(true);
    const [comment, setComment] = useState();

    // Load API data
    useEffect(() => {
        setLoadingState(true);
        // Get comment
        const getComment = async () => {
            try {
                const response = await axios.get(`/api/posts/${commentId}/comments`);
                setComment(response.data);
                setLoadingState(false);
            } catch (err) { console.log(err); }
        }

        // Call API functions
        getComment();

    }, []);

    return(
        loading === true ? <Loading /> : 
        <div className="comment-wrapper-local">
            <UserInfo 
                userObj={comment?.user_id}
                requestButton={false}
                imageSize="2rem"
                fontSize="1rem"
                gap=".5rem"
            />
            <div>{comment?.message}</div>
        </div>
    )
}

export default Comment;
