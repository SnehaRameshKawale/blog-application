import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal"; // use for dailog box

function Signup() {
    const [modelIsOpen, setModelIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    const [formData, SetFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [submitData, setSubmitData] = useState(false);

    //validate the data
    const validateFiled = (name, value) => {
        let errorMessage = "";

        if (name === "name") {
            if (!value) {
                errorMessage = "Name filed is required!";
            }
        } else if (name === "email") {
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

    //Handle when form is submited
    const handleSubmit = async (e) => {
        e.preventDefault();

        const nameError = validateFiled("name", formData.name);
        const emailError = validateFiled("email", formData.email);
        const passwordError = validateFiled("password", formData.password);

        if (nameError || emailError || passwordError) {
            setError({
                name: nameError,
                password: passwordError,
                email: emailError,
            });
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/signup",
                formData
            );
            if (response.data.status) {
                setMessage("Registartion successfully");
                setModelIsOpen(true);

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setMessage("Registartion failed");
                setModelIsOpen(true);
                // Set errors for each field (name, email, password)
                const errorResponse = response.data.error;
                setError({
                    name: errorResponse.name || "",
                    email: errorResponse.email || "",
                    password: errorResponse.password || "",
                });
            }
        } catch (e) {
            setMessage("Error : colud not register please try after some time");
            setModelIsOpen(true);
        }

        submitRegisterData();
    };

    //handle to show the data info
    const submitRegisterData = () => {
        setSubmitData(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        SetFormData({
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
                action=""
                className="bg-slate-950 text-white px-2 py-2 rounded-md space-y-8 space-x-5"
            >
                <div className="text-center my-3 font-bold text-xl">
                    <span>Signup Form</span>
                </div>

                <div>
                    <label htmlFor="">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        placeholder="e.g sneha"
                        className=" pl-2 ml-5 w-96 max-w-full rounded-md py-1 bg-slate-950 ring-1 ring-white focus:shadow-white focus:shadow hover:ring-transparent"
                    />
                    {error.name && (
                        <div className="text-red-600 text-center">
                            {error.name}
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="e.g sneha@gmail.com"
                        className=" pl-2 ml-5 w-96 max-w-full rounded-md py-1 bg-slate-950 ring-1 ring-white focus:shadow-white focus:shadow hover:ring-transparent"
                    />
                    {error.email && (
                        <div className="text-red-600 text-center">
                            {error.email}
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="e.g s#neh!23"
                        className="pl-2 ml-2 w-96 max-w-full rounded-md py-1 bg-slate-950 ring-1 ring-white focus:shadow-white focus:shadow hover:ring-transparent"
                    />
                    {error.password && (
                        <div className="text-red-600 text-center">
                            {error.password}
                        </div>
                    )}
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="font-bold ml-2 w-56 max-w-full rounded-md py-1 bg-slate-950 ring-1 ring-white focus:shadow-white focus:shadow hover:ring-slate-600 hover:bg-white hover:text-black"
                    >
                        Signup
                    </button>
                </div>
                {submitData && (
                    <div>
                        <span>Registred data</span>
                        <br />
                        <span>{formData.name}</span>
                        <br />
                        <span>{formData.email}</span>
                        <br />
                        <span>{formData.password}</span>
                        <br />
                    </div>
                )}
            </form>

            {/* Dialog Box */}
            <Modal
                isOpen={modelIsOpen}
                onRequestClose={() => setModelIsOpen(false)}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {message}
                    </h2>
                    <button
                        onClick={() => setModelIsOpen(false)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Signup;
