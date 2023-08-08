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
    const [timeline, setTimeline] = useState([]);

    // Once on mount
    useEffect(() => {
        setLoadingState(true);
        // API function
        const getTimeline = async () => {
            try {
                const response = await axios.get('/api/posts');
                setTimeline(response.data);
                setLoadingState(false);
            } catch (err) {
                console.log(err);
            }
        }
        // Call API function
        getTimeline();

    }, []);

    return(
        loading === true ? <Loading /> : 
        <React.Fragment>
            <div className="timeline-container">
                <ul className="timeline-wrapper">
                    <div>Timeline</div>
                    {timeline.map(post => {
                        return (
                            <li key={post._id}>
                                <Post post={post}/>
                            </li>
                        );
                    })}
                </ul>
                <SuggestedUsers />
            </div>
        </React.Fragment>
    )
}

export default Timeline;