

"use client";

import React, { useState } from "react";
import { registerUser } from "@/services/authService"; // Assuming this file is in the services folder
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Field-specific errors
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Clear previous errors
    setErrors({});
  
    // Frontend validation
    const newErrors: { [key: string]: string } = {};
    if (!username) newErrors.username = "Username is required.";
    
    if (!phone) newErrors.phone = "Phone number is required.";
    else if (!/^\d{8}$/.test(phone)) newErrors.phone = "Phone number must be exactly 8 digits.";
  
    // 🔹 Strict Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org)$/;
    if (!email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format. Use .com, .net, or .org.";
  
    // 🔹 Password Validation
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 3) newErrors.password = "Password must be at least 3 characters long.";
    else if (!/\d/.test(password)) newErrors.password = "Password must contain at least one number.";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) newErrors.password = "Password must contain at least one special character.";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await registerUser({ username, phone, email, password });
  
      if (response.errors) {
        const backendErrors: { [key: string]: string } = {};
        response.errors.forEach((error: { param: string; msg: string }) => {
          backendErrors[error.param] = error.msg;
        });
        setErrors(backendErrors);
        return;
      }
  
      if (response.message === "User registered successfully") {
        router.push("/login");
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const backendErrors: { [key: string]: string } = {};
        err.response.data.errors.forEach((error: { param: string; msg: string }) => {
          backendErrors[error.param] = error.msg;
        });
        setErrors(backendErrors);
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-8">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="text-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
            alt="logo"
            className="w-24 mx-auto"
          />
          <h4 className="mt-4 mb-6 text-xl font-semibold text-gray-700">
            Create Your Account
          </h4>
        </div>

        <p className="text-gray-600 mb-4">Please register to create an account</p>

        {/* General Error Message */}
        {errors.general && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded-md">
            <p className="text-sm">{errors.general}</p>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Username Field */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center mb-4 w-full">
            <button
              type="submit"
              className="w-full py-2 px-4 text-sm font-medium text-white rounded-md bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:opacity-90 transition shadow-lg"
              disabled={loading}
            >
              {loading ? "Registering..." : "REGISTER"}
            </button>
          </div>
        </form>

        {/* Already have an account? */}
        <div className="flex items-center justify-center mt-6">
          <p className="text-sm text-black">Already have an account?</p>
          <button className="ml-2 text-sm font-medium px-4 py-1 text-orange-600 border-2 border-orange-600 rounded-md hover:border-orange-400 hover:text-orange-400 transition shadow-lg">
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
}
