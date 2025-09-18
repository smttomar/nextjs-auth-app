"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPasswordEmailPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const isEmailValid = useMemo(() => {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, [email]);

    const sendForgotPasswordEmail = async () => {
        if (!isEmailValid || loading) return;

        try {
            setLoading(true);
            await axios.post("/api/users/forgotpassword", { email });
            toast.success("Password reset link sent! Please check your inbox.");
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.error || "An unexpected error occurred.";
            console.log("Email sending failed!", errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900">
            <Toaster />
            <div className="flex flex-col gap-5 w-full max-w-md bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg outline-1">
                <h1 className="text-3xl font-bold text-white text-center">
                    Forgot Your Password?
                </h1>
                <p className="text-gray-400 text-center text-sm">
                    No problem! Enter your email address below and we'll send
                    you a link to reset it.
                </p>
                <hr className="w-full border-gray-700" />

                <div className="flex flex-col w-full gap-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-200"
                    >
                        Email Address
                    </label>
                    <input
                        className="w-full p-3 border text-black dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500
                         hover:ring-1 hover:ring-blue-600"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        type="email"
                    />
                </div>

                <button
                    onClick={sendForgotPasswordEmail}
                    className="text-white font-semibold hover:cursor-pointer py-3 px-4 rounded-lg transition-all duration-300 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-blue-500 disabled:hover:bg-gray-600 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700"
                    disabled={!isEmailValid || loading}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <Link
                    href="/login"
                    className="text-sm hover:text-blue-400 hover:underline"
                >
                    &larr; Back to Login
                </Link>
            </div>
        </div>
    );
}
