
"use client";

import React, { useState } from "react";
import { loginUser } from "@/services/authService"; // Your login function
import { useRouter } from "next/navigation"; // For redirection
import { useAuth } from "@/context/AuthContext"; // Auth context

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Get login function from context
  const router = useRouter(); // For navigation after successful login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError("Both fields are required");
  
    setLoading(true);
    setError("");
  
    try {
      const data = await loginUser({ email, password });
  
      if (data.token) {
        login(data.token); // Save token globally using context
        
        // Save real user data from API
        localStorage.setItem("user", JSON.stringify(data.user));
  
        // Redirect to profile/dashboard
        router.push("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-16">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="text-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
            alt="logo"
            className="w-24 mx-auto"
          />
          <h4 className="mt-4 mb-6 text-xl font-semibold text-gray-700">
            Log In to Your Account
          </h4>
        </div>

        <p className="text-gray-600 mb-4">Please login to your account</p>

        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="text-center mb-4 w-full">
            <button
              type="submit"
              className="w-full py-2 px-4 text-sm font-medium text-white rounded-md bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:opacity-90 transition shadow-lg"
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOG IN"}
            </button>
          </div>
        </form>

        <a href="#" className="text-sm text-gray-500 hover:underline">
          Forgot password?
        </a>

        <div className="flex items-center justify-center mt-6">
          <p className="text-sm text-black">Don't have an account?</p>
          <button
            onClick={() => router.push("/auth/register")}
            className="ml-2 text-sm font-medium px-4 py-1 text-orange-600 border-2 border-orange-600 rounded-md hover:border-orange-400 hover:text-orange-400 transition shadow-lg"
          >
            CREATE NEW
          </button>
        </div>
      </div>
    </div>
  );
}











