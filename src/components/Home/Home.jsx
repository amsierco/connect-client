import React from "react";

// CSS
import './Home.css';

// Components
import Timeline from "../Timeline/Timeline";
import Sidebar from "../Sidebar/Sidebar";
import SuggestedUsers from "../SuggestedUsers/SuggestedUsers";

const Home = () => {
    return(
        <div className="homepage-wrapper">
            <Sidebar />
            <Timeline />
            <SuggestedUsers />
        </div>
    )
}

export default Home;