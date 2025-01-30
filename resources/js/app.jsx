import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./Components/Navbar";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Login from "./Components/LoginPage";
import Signup from "./Components/SignupPage";

function App() {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Signup />} />
                    <Route path="/" element={<Content />} />
                </Routes>
            </div>
            <Footer />
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
