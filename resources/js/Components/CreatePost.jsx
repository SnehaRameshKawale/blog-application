import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"; // use for dailog box

function CreatePost() {
    const [modelIsOpen, setModelIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const [postData, setPost] = useState({
        title: "",
        des: "",
        img: null,
    });

    const [error, setError] = useState({
        title: "",
        des: "",
        img: "",
    });

    //validate the data
    const validateFiled = (name, value) => {
        let errorMessage = "";

        if (name === "title") {
            if (!value) {
                errorMessage = "Title cannot be empty";
            }
        } else if (name === "des") {
            if (!value) {
                errorMessage = "Description cannot be empty";
            }
        } else if (name === "img") {
            if (!value) {
                errorMessage = "Image need to be selected for post";
            }
        }

        return errorMessage;
    };

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const titleError = validateFiled("title", postData.title);
        const desError = validateFiled("des", postData.des);
        const imgError = validateFiled("img", postData.img);

        if (titleError || desError || imgError) {
            setError({
                title: titleError,
                des: desError,
                img: imgError,
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", postData.title);
            formData.append("des", postData.des);
            formData.append("img", postData.img); // Correctly append file

            const response = await axios.post(
                "http://127.0.0.1:8000/api/posts",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.status) {
                setMessage("Post created successfully");
                setModelIsOpen(true);

                setTimeout(() => {
                    navigate("/posts");
                }, 2000);
            } else {
                setMessage("Failed to create post");
                setModelIsOpen(true);

                // Set validation errors
                const errorResponse = response.data.error;
                setError({
                    title: errorResponse?.title || "",
                    des: errorResponse?.des || "",
                    img: errorResponse?.img || "",
                });
            }
        } catch (e) {
            setMessage("Error creating post");
            setModelIsOpen(true);
            setTimeout(() => {
                setModelIsOpen(false);
            }, 2000);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "img") {
            setPost({ ...postData, img: files[0] }); // Store file object
        } else {
            setPost({ ...postData, [name]: value });
        }

        const errorMessage = validateFiled(
            name,
            name === "img" ? files[0] : value
        );
        setError({ ...error, [name]: errorMessage });
    };

    return (
        <div className="flex justify-center mx-auto mt-4 md:mt-2 font-mono">
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="bg-slate-950 text-white px-2 py-2 rounded-md space-y-8 space-x-5"
            >
                <div className="text-center my-3 font-bold text-xl">
                    <span>Create new Post</span>
                </div>

                <div>
                    <label htmlFor="">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={handleChange}
                        placeholder="e.g title of post"
                        className=" pl-2 ml-5 w-96 max-w-full rounded-md py-1 bg-slate-950 ring-1 ring-white focus:shadow-white focus:shadow hover:ring-transparent"
                    />
                    {error.title && (
                        <div className="text-red-600 text-center">
                            {error.title}
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="">Image</label>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        onChange={handleChange}
                        placeholder="select img"
                        className=" pl-2 ml-5 w-96 max-w-full rounded-md py-1 bg-slate-950 ring-1 ring-white focus:shadow-white focus:shadow hover:ring-transparent"
                    />
                    {error.img && (
                        <div className="text-red-600 text-center">
                            {error.img}
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="des"
                        name="des"
                        onChange={handleChange}
                        placeholder="e.g brief about your post"
                        className="pl-2 ml-2 w-96 max-w-full rounded-md py-1 bg-slate-950 ring-1 ring-white focus:shadow-white focus:shadow hover:ring-transparent"
                    />
                    {error.des && (
                        <div className="text-red-600 text-center">
                            {error.des}
                        </div>
                    )}
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="font-bold ml-2 w-56 max-w-full rounded-md py-1 bg-slate-950 ring-1 ring-white focus:shadow-white focus:shadow hover:ring-slate-600 hover:bg-white hover:text-black"
                    >
                        Create Post
                    </button>
                </div>
            </form>

            {/* Dialog Box */}
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

export default CreatePost;
