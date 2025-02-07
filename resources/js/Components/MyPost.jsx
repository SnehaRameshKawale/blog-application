import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function MyPost({ auth_user_id }) {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("");
    const [modelIsOpen, setModelIsOpen] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    console.log("Token:", token);
    console.log(auth_user_id);

    const setDeletePost = async (postId) => {
        try{
            const response = await fetch(
                `http://127.0.0.1:8000/api/posts/${postId}`,
                {
                    method: "DELETE",
                    headers:{
                        Authorization : `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );

            const data = await response.json();

            if(data.status){
                setMessage("post deleted successfully");
                setModelIsOpen(true);

                setTimeout(() => {
                    navigate("/posts");
                }, 2000);
            }else{
                setMessage("Error while deleting post");
                setModelIsOpen(true);

                setTimeout(() => {
                    navigate("/posts");
                }, 2000);
            }

        }catch(e){
            setMessage("Error : chould not delete post");
                setModelIsOpen(true);

                setTimeout(() => {
                    navigate("/posts");
                }, 2000);
        }
    }

    useEffect(() => {
        const fetechMyPosts = async () => {
            try {
                console.log(auth_user_id);
                const response = await fetch(
                    `http://127.0.0.1:8000/api/posts/${auth_user_id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json", // Correct header syntax
                        },
                    }
                );

                const data = await response.json();
                console.log(data);

                // Check if posts exist
                if (data?.status && Array.isArray(data?.data?.posts) && data?.data?.posts?.length > 0) {
                    if (data.data.posts.length > 0) {
                        setPosts(data.data.posts); // Set posts if they exist
                    }
                } else {
                    setMessage("No posts available");
                    setModelIsOpen(true);
                    setTimeout(() => {
                        setModelIsOpen(false);
                    }, 2000);
                }
            } catch (e) {
                setMessage("Error feteching posts");
                setModelIsOpen(true);
                setTimeout(() => {
                    setModelIsOpen(false);
                }, 2000);
            }
        };

        fetechMyPosts();
    }, []);

    return (
        <div className="flex flex-wrap px-1 py-1 text-white justify-center font-mono">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="bg-slate-950 mx-2 my-2">
                        <div className="text-end mr-2" onClick={() => setDeletePost(post.id)}><FontAwesomeIcon icon={faDeleteLeft} /></div>
                        <img
                            src={`http://127.0.0.1:8000/uploads/${post.image}`}
                            alt="nature img"
                            className="px-3 py-4 max-h-60"
                        />
                        <span className="px-2 py-2">{post.title}</span>
                        <p className="px-2 py-2">{post.description}</p>
                    </div>
                ))
            ) : (
                <div className="bg-slate-950 mx-2 my-2">
                    <p className="px-2 py-2">No posts</p>
                </div>
            )}
            ;{/* Dialog Box */}
            <Modal
                isOpen={modelIsOpen}
                onRequestClose={() => setModelIsOpen(false)}
                appElement={document.getElementById("root")}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {message}
                    </h2>
                </div>
            </Modal>
        </div>
    );
}

export default MyPost;
