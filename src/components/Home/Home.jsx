import React from "react";

// CSS
import './Home.css';

// Components
import Timeline from "../Timeline/Timeline";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Home = () => {
    return(
        <div className="homepage-wrapper">
            <Sidebar />
            <Timeline />
        </div>
    )
}

export default Home;