import React, { useEffect, useState } from "react";

// Utils
import axios from "../../utils/AxiosConfig";
import Loading from "../../utils/Loading";

// CSS
import './Timeline.css';

// Components
import Post from "../../components/Post/Post";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";

const Timeline = () => {
    const[loading, setLoadingState] = useState(true);
    const[timeline, setTimeline] = useState([]);
    const[reload, initReload] = useState(false);

    const reloadPage = () => {
        initReload(!reload);
    }

    useEffect(() => {
        setLoadingState(true);
        const getTimeline = async () => {
            try {
                const response = await axios.get('/api/posts');
                setTimeline(response.data);
                setLoadingState(false);
            } catch (err) {
                alert(err);
            }
        }
        getTimeline();
    }, [reload]);

    return(
        loading === true ? <Loading /> : 

        <div className="timeline-container">
            <ul className="timeline-wrapper">
                {timeline.map(post => {
                    return (
                        <li key={post._id}>
                            <Post post={post} reloadPage={reloadPage}/>
                        </li>
                    );
                })}
            </ul>
            <SuggestedUsers />
        </div>
    )
}

export default Timeline;