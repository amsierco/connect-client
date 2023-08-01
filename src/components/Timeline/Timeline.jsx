import React, { useEffect, useState } from "react";
import axios from "axios";

// CSS
import './Timeline.css';

// Components
import Post from "../Post/Post";

async function getTimeline(){
    return await axios.get('http://localhost:3000/api/posts');
}

const Timeline = () => {
    const [timeline, setTimeline] = useState([]);

    // Once on mount
    useEffect(() => {
        // API function
        const getTimeline = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/posts');
                const db_timeline = response.data;
                console.log('Timeline retrieved!');
                setTimeline(db_timeline);

            } catch (err) {
                console.log(err);
                setTimeline([]);
            }
        }
        // Call API function
        getTimeline();

    }, []);

    return(<>
        <ul className="timeline-wrapper">
            {timeline.map(post => {
                return (
                    <li key={post._id}>
                        <Post content={post}/>
                    </li>
                );
            })}
        </ul>
    </>)
}

export default Timeline;