"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ThemeToggle from "@/components/ThemeToggle";

export default function signup() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        if (user.password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
        }
        try {
            if (user.username.includes(" ")) {
                toast.error("Username cannot contain spaces");
                return;
            }
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup successfull", response.data);
            toast.success("SignUp Success");
            router.push("/verifyemail");
        } catch (error: any) {
            toast.error("SignUp Failed");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 5 &&
            user.username.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900">
            <Toaster />
            <ThemeToggle />
            <div className="gap-5 flex flex-col w-full max-w-md bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg outline-1">
                <h2 className="text-3xl font-bold text-center text-black dark:text-white">
                    {loading ? "Processing..." : "SignUp"}
                </h2>
                <p className="text-gray-400 text-center text-sm">
                    Enter your details.
                </p>
                <hr className="w-full border-gray-700" />
                <div className="space-y-4">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full p-3 border text-black dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500
                         hover:ring-1 hover:ring-blue-600 "
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
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
                    <label
                        htmlFor="username"
                        className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder="xyz"
                        className="w-full p-3 border text-black dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 hover:ring-1 hover:ring-blue-600"
                        value={user.username}
                        onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                        }
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:cursor-not-allowed disabled:hover:bg-gray-600 hover:cursor-pointer"
                        onClick={onSignup}
                        disabled={buttonDisabled}
                    >
                        {buttonDisabled ? "Fill info!" : "Sign Up"}
                    </button>
                    <div className="flex">
                        <Link
                            href="/login"
                            className="text-sm underline hover:text-blue-400 ml-auto text-gray-700 dark:text-gray-200"
                        >
                            Login &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
