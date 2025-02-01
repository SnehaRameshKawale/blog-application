import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({authentication,setauthentication}) {
    const navigate = useNavigate();

    //logout functionality insted of using api one
    const logout = async () => {
        const token = localStorage.getItem("token");

        // Remove token from local storage before making API call
        localStorage.removeItem("token");
        setauthentication(false);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            console.log("Logout successfully");
            setauthentication(false);
            navigate("/");
        } catch (e) {
            console.log("Error while log out", e);
        }
    };

    return (
        <div className="flex w-full max-w-full mx-auto py-4 bg-slate-950 text-white items-center font-mono">
            <div className="w-full">
                <img
                    className="w-11 mx-3"
                    src="https://img.zcool.cn/community/0180b65af0400aa801219b7fe7ee6b.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100"
                    alt="logo img"
                />
            </div>
            <div className="flex w-full justify-end text-lg font-bold">
                {/* <Link to="/home" className="mx-6">
                    Home
                </Link> */}
                {authentication ? (
                    <>
                        <Link to="/posts" className="mx-6">
                            Posts
                        </Link>
                        <Link to="/logout" className="mx-6" onClick={logout}>
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/" className="mx-6">
                            Login
                        </Link>
                        <Link to="/register" className="mx-6">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
