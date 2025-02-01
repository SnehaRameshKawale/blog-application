import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

function Login({setauthentication}) {
    const [modelIsOpen, setModelIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({
        email: "",
        password: "",
    });

    const [submitData, SetSubmitData] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailError = validateFiled("email", formData.email);
        const passwordError = validateFiled("password", formData.password);

        if (emailError || passwordError) {
            setError({
                email: emailError,
                password: passwordError,
            });
            return; // Prevent form submission
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                formData,
                { withCredentials: true } // This ensures cookies are sent with the request
            );
            if (response.data.status) {
                localStorage.setItem("token", response.data.token); // Store token

                setMessage("Login successfully");
                setauthentication(true);
                setModelIsOpen(true);

                setTimeout(() => {
                    navigate("/posts");
                }, 2000);
            } else {
                setMessage("Login failed");
                setauthentication(false);
                setModelIsOpen(true);

                // Set errors for each field (name, email, password)
                const errorResponse = response.data.error;
                setError({
                    email: errorResponse.email || "",
                    password: errorResponse.password || "",
                });
            }
        } catch (e) {
            setMessage("Error : colud not login please try after some time");
            setModelIsOpen(true);
            setTimeout(()=>{
                navigate("/");
            },2000)
        }

        // If no errors, submit the form data
        SetSubmitData(true);
    };

    const submitLoginData = () => {
        SetSubmitData(true);
    };

    const validateFiled = (name, value) => {
        let errorMessage = "";

        if (name === "email") {
            if (!value) {
                errorMessage = "Email filed is required!";
            } else if (
                !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            ) {
                errorMessage = "Please enter valid email!";
            }
        } else if (name === "password") {
            if (!value) {
                errorMessage = "Password is required!";
            }
        }

        return errorMessage;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        const errorMessage = validateFiled(name, value);
        setError({
            ...error,
            [name]: errorMessage,
        });
    };

    return (
        <div className="flex justify-center mx-auto mt-4 md:mt-2 font-mono">
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                method="POST"
                action="/api/login"
                className="bg-slate-950 text-white px-2 py-2 rounded-md space-y-8 space-x-5"
            >
                <div className="text-center my-3 font-bold text-xl">
                    <span>Login Form</span>
                </div>

                <div>
                    <label htmlFor="">Email</label>
                    <input
                        type=""
                        name="email"
                        id="email"
                        onChange={handleChange}
                        placeholder="e.g sneha@gmail.com"
                        className=" pl-2 ml-3 w-96 max-w-full rounded-md py-1 bg-slate-950 ring-1 ring-white focus:shadow-white focus:shadow hover:ring-transparent"
                    />
                    <br />
                    {error.email && (
                        <div className="text-center text-red-600">
                            {error.email}
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        placeholder="e.g s#neh!23"
                        className="pl-2 ml-2 w-96 max-w-full rounded-md py-1 bg-slate-950 ring-1 ring-white focus:shadow-white focus:shadow hover:ring-transparent"
                    />
                    <br />
                    {error.password && (
                        <div className="text-center text-red-600">
                            {error.password}
                        </div>
                    )}
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="font-bold ml-2 w-56 max-w-full rounded-md py-1 bg-slate-950 ring-1 ring-white focus:shadow-white focus:shadow hover:ring-slate-600 hover:bg-white hover:text-black"
                    >
                        Login
                    </button>
                </div>
            </form>
            {submitData && (
                <div>
                    <span>Form Data</span>
                    <span>Email = {formData.email}</span>
                    <span>Password = {formData.password}</span>
                </div>
            )}
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

export default Login;
