import React from "react";

// CSS
import './Loading.css'

const Loading = () => {
    return (
        <div className="loading-wrapper">
            <div id="loading-icon">
                <div className="loading-el"></div>
                <div className="loading-el"></div>
                <div className="loading-el"></div>
                <div className="loading-el"></div>
                <div className="loading-el"></div>
                {/* LOADING */}
            </div>
        </div>
    )
}

export default Loading;