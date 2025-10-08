"use client";
import ThemeToggle from "@/components/ThemeToggle";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [passwords, setPasswords] = useState({
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    const onResetPassword = async () => {
        if (passwords.password !== passwords.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        if (passwords.password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        if (!token) {
            toast.error("Invalid or missing reset token.");
            return;
        }

        try {
            setLoading(true);
            await axios.post("/api/users/resetpassword", {
                token,
                password: passwords.password,
            });
            toast.success("Password reset successfully!");
            router.push("/login");
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.error || "An unexpected error occurred.";
            console.log("Reset password failed", errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900">
            <Toaster />
            <ThemeToggle />
            <div className="w-full max-w-md gap-5 flex flex-col bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg outline-1">
                <h1 className="text-3xl font-bold text-black dark:text-white text-center">
                    Reset Your Password
                </h1>
                <p className="text-gray-400 text-center text-sm">
                    Enter your new password.
                </p>
                <hr className="w-full border-gray-700" />

                <div className="flex flex-col w-full gap-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        New Password
                    </label>
                    <input
                        className="w-full p-3 border text-black dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 hover:ring-1 hover:ring-blue-600"
                        id="password"
                        type="password"
                        value={passwords.password}
                        onChange={(e) =>
                            setPasswords({
                                ...passwords,
                                password: e.target.value,
                            })
                        }
                        placeholder="••••••••"
                    />
                </div>
                <div className="flex flex-col w-full gap-2">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Confirm New Password
                    </label>
                    <input
                        className="w-full p-3 border text-black dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 hover:ring-1 hover:ring-blue-600"
                        id="confirmPassword"
                        type="password"
                        value={passwords.confirmPassword}
                        onChange={(e) =>
                            setPasswords({
                                ...passwords,
                                confirmPassword: e.target.value,
                            })
                        }
                        placeholder="••••••••"
                    />
                </div>

                <button
                    onClick={onResetPassword}
                    className="text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-blue-500 disabled:hover:bg-gray-600 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700"
                    disabled={
                        loading ||
                        passwords.password.length < 6 ||
                        passwords.password !== passwords.confirmPassword
                    }
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </div>
        </div>
    );
}
