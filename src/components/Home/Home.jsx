import React from "react";

// Components
import Timeline from "../Timeline/Timeline";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Home = () => {
    return(
        <div className="homepage-wrapper">
            <h1>Welcome to your Homepage!</h1>
            <Timeline />
            <Sidebar />
            <Navbar />
        </div>
    )
}

export default Home;