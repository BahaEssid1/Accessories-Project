

"use client"
import React, { useState, useEffect } from 'react';

function Profile() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState('/placeholder-image.jpg'); // Default profile picture

    // Fetch user data from localStorage when the component mounts
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            setEmail(userData.email);
            setName(userData.name);
            setPhone(userData.phone);
            setBio(userData.bio);
            // You can set profilePic here as well if it's saved
        }
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl);
        }
    };

    const handleSubmit = () => {
        // Logic for submitting the updated profile details
        console.log({ email, name, phone, password, bio });
    };

    return (
        <div className='bg-gray-100'>
            {/* Banner */}
            <header
                className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white flex items-center px-6"
                style={{ height: "33vh" }}
            >
                <h1 className="text-3xl font-bold">My Profile</h1>
            </header>

            {/* Profile Picture */}
            <div className="relative">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white overflow-hidden">
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <label
                        htmlFor="profilePicUpload"
                        className="block text-center mt-2 text-sm font-medium text-gray-700 cursor-pointer"
                    >
                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white rounded-md shadow-md hover:opacity-90 transition">
                            Change Picture
                        </span>
                        <input
                            type="file"
                            id="profilePicUpload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>
            </div>

            {/* Profile Form */}
            <div className="max-w-3xl mx-auto mt-24 bg-white rounded-lg shadow-lg mb-5">
                {/* Heading Section */}
                <div className="text-center pt-6 pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                </div>

                {/* Form Section */}
                <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Email :</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Name :</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Phone :</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Mot de passe :</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Bio :</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    rows={4}
                                />
                            </dd>
                        </div>
                    </dl>

                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition shadow-lg text-sm font-medium"
                        >
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;
