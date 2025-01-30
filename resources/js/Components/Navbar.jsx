import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
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
                <Link to="/" className="mx-6">
                    Home
                </Link>
                <Link to="/login" className="mx-6">
                    Login
                </Link>
                <Link to="/register" className="mx-6">
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
