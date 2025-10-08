"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        identifier: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login successfull", response.data);
            toast.success("Login Success");
            router.push("/profile");
        } catch (error: any) {
            toast.error("Login Failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.identifier.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900">
            <Toaster />
            <ThemeToggle />
            <div className="flex flex-col gap-5 w-full max-w-md bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg outline-1">
                <h2 className="text-3xl font-bold text-center text-black dark:text-white">
                    {loading ? "Processing..." : "Login"}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                    Enter your email/username and password.
                </p>
                <hr className="w-full border-gray-700" />
                <div className="space-y-4">
                    <label
                        htmlFor="identifier"
                        className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Email / Username
                    </label>
                    <input
                        type="text"
                        placeholder="Enter email or username"
                        className="w-full p-3 border text-black dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500
                         hover:ring-1 hover:ring-blue-600 "
                        value={user.identifier}
                        onChange={(e) =>
                            setUser({ ...user, identifier: e.target.value })
                        }
                        required
                    />
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full p-3 border text-black dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 hover:ring-1 hover:ring-blue-600"
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:cursor-not-allowed disabled:hover:bg-gray-600 hover:cursor-pointer"
                        onClick={onLogin}
                        disabled={buttonDisabled}
                    >
                        {buttonDisabled ? "Fill info!" : "Login"}
                    </button>
                    <div className="flex">
                        <Link
                            href="/signup"
                            className="text-sm underline hover:text-blue-400 mr-auto text-gray-700 dark:text-gray-200"
                        >
                            &larr; Sign Up
                        </Link>
                        <Link
                            href="/forgotpassword"
                            className="text-sm underline hover:text-blue-400 ml-auto text-gray-700 dark:text-gray-200"
                        >
                            Forgot password? &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
