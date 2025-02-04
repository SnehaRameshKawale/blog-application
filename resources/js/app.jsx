import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./Components/Navbar";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import Modal from "react-modal";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom";
import Login from "./Components/LoginPage";
import Signup from "./Components/SignupPage";
import MyPost from "./Components/MyPost";
import CreatePost from "./Components/CreatePost";
Modal.setAppElement("#app");

function App() {
    const [authentication, setauthentication] = useState(false);
    const [auth_user_id,set_auth_user_id] = useState(0);

    //check if authentifacted or not
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log(auth_user_id);
            setauthentication(true);
        }
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <Navbar
                authentication={authentication}
                setauthentication={setauthentication}
            />
            <div className="flex-grow">
                <Routes>
                    {authentication ? (
                        <Route path="/" element={<Navigate to={"/posts"} />} />
                    ) : (
                        <Route
                            path="/"
                            element={<Navigate to="/login" replace />}
                        />
                    )}
                    <Route
                        path="/login"
                        element={
                            <Login
                                setauthentication={setauthentication}
                                set_auth_user_id={set_auth_user_id}
                            />
                        }
                    />
                    <Route path="/register" element={<Signup />} />
                    <Route path="/posts" element={<Content />} />
                    <Route
                        path="/myPosts"
                        element={<MyPost auth_user_id={auth_user_id} />}
                    />
                    <Route path="/createPost" element={<CreatePost />} />
                </Routes>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

// Wrap the App component with <Router> at the root level
const rootElement = document.getElementById("app");

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <Router>
            <App />
        </Router>
    );
}
