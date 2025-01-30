import React from "react";

function Footer() {
    return (
        <div className="flex mt-auto px-1 py-1 bg-slate-950 text-slate-200 justify-evenly font-mono">
            <div className="mt-2">
                <ul>
                    <li>Blog_application</li>
                    <li>Home</li>
                    <li>Signup</li>
                    <li>Login</li>
                </ul>
            </div>
            <div className="mt-2">
                <ul>
                    <li>Blog_application</li>
                    <li>Home</li>
                    <li>Signup</li>
                    <li>Login</li>
                </ul>
            </div>
            <div className="justify-center items-center">
                <span className="font-semibold">Message me</span>
                <form action="" className="border-2 border-white rounded-md px-2 py-2">
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input className="rounded-md" type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <br />
                        <input className="rounded-md" type="text" name="description" id="description" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Footer;
