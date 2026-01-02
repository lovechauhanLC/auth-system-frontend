/* src/pages/ForgotPassword.jsx */
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // show message instantly
    setMessage("If that email exists, a reset link has been sent.");

    try {
      await api.post("/api/auth/forgot-password", { email });
    } catch (err) {
      // if API fails, replace message with error
      setMessage("");
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    // Updated: Modern gradient background
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4">
      
      {/* Updated: Glassmorphism card container */}
      <form 
        onSubmit={submit} 
        className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 ring-1 ring-black/5"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-br from-indigo-600 to-purple-600">
            Forgot Password
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* Updated: Success Message Styling */}
        {message && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg animate-fade-in">
            <p className="text-green-700 text-sm font-medium text-center">
              {message}
            </p>
          </div>
        )}

        {/* Updated: Error Message Styling */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-pulse">
            <p className="text-red-700 text-sm font-medium text-center">
              {error}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">Email Address</label>
            <input
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 placeholder-slate-400"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Updated: Gradient Button */}
        <button 
          className="w-full mt-8 bg-linear-to-br from-indigo-600 to-purple-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-indigo-200 active:scale-95"
        >
          Send Reset Link
        </button>

        {/* Updated: Footer Link */}
        <div className="mt-6 text-center text-sm font-medium text-slate-500">
          Remembered your password?{" "}
          <Link 
            to="/login" 
            className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}