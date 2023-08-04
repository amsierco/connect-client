import React from "react";
import { Outlet } from "react-router-dom";

// CSS
import './Home.css';

// Components
import Sidebar from "../Sidebar/Sidebar";

const Home = () => {
    return(
        <div className="homepage-wrapper">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Home;