"use client";
import React, { useState, useEffect } from "react";

function Profile() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");  // Change 'name' to 'username'
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const userData = JSON.parse(user);
            setEmail(userData.email);
            setUsername(userData.username);  // Update to 'username'
            setPhone(userData.phone);
        }
    }, []);

    const handleSubmit = () => {
        console.log({ email, username, phone, password });  // Change 'name' to 'username'
    };

    return (
        <div className="bg-gray-100">
            <header
                className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white flex items-center px-6"
                style={{ height: "33vh" }}
            >
                <h1 className="text-3xl font-bold">My Profile</h1>
            </header>

            <div className="max-w-3xl mx-auto mt-24 bg-white rounded-lg shadow-lg mb-5">
                <div className="text-center pt-6 pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                </div>

                <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Email :</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Username :</dt> {/* Change 'Name' to 'Username' */}
                            <dd className="text-gray-700 sm:col-span-2">
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Phone :</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Password :</dt> {/* Change 'Mot de passe' to 'Password' */}
                            <dd className="text-gray-700 sm:col-span-2">
                                <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                            </dd>
                        </div>
                    </dl>

                    <div className="mt-4 flex justify-center">
                        <button onClick={handleSubmit} className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition shadow-lg text-sm font-medium">
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
