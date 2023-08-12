import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Utils
import axios from "../../utils/AxiosConfig";

// CSS
import './PostForm.css';

const PostForm = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState();

    const axiosConfig = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Refresh_Token': localStorage.getItem('refreshToken')
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            let file = document.querySelector('input[type=file]')['files'][0];
            if(undefined !== file){
                if(file.size > 2097152){
                    alert("File is too big! Max upload size: 2MB");
                    return;
                }
                let base64String = "";
                const reader = new FileReader();
                reader.onload = async() => {
                    base64String = reader.result
                        .replace("data:", "")
                        .replace(/^.+,/, "");
                    // console.log(base64String);

                    await axios.post(
                        '/api/posts/create', 
                        { message, base64String: base64String },
                        axiosConfig
                    );

                    // Redirect to homepage
                    return navigate('/');
                }
                reader.readAsDataURL(file);
            } else {
                await axios.post(
                    '/api/posts/create', 
                    { message },
                    axiosConfig
                );

                // Redirect to homepage
                return navigate('/');
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="post-form-container">
            <div className="post-form-wrapper">
                <h1>Add a new post</h1>    
                <form onSubmit={handleSubmit} >
                    <div className='input-style-wrapper'>
                        <div id='label'>Message</div>
                        <div id='input-inner'>
                            <input type="text" onChange={e => setMessage(e.target.value)}/>
                        </div>
                        <div id='label'>Image</div>
                        <div id='input-inner'>
                            <input type="file"/>
                        </div>
                    </div>
                    <button className='button-wrapper' type="submit"> Create </button>
                </form>
            </div>
        </div>
    )
}

export default PostForm;