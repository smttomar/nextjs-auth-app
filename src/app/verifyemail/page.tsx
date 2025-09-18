"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            toast.success("Email Verification Successfull");
            setVerified(true);
        } catch (error: any) {
            setError(true);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900">
            <Toaster />
            <div className="w-full max-w-md bg-white text-center dark:bg-neutral-800 p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-4">Verify Email</h1>
                <h2 className="p-1 text-l font-bold bg-blue-500 text-white mb-4">
                    {token
                        ? "Email verification has been successfull"
                        : "Verification email has been sent on register email address"}
                </h2>
                {verified && (
                    <div className="underline hover:text-blue-400 text-xl">
                        <Link href="/login">Login</Link>
                    </div>
                )}
                {error && (
                    <div>
                        <h2 className="text-2xl bg-red-500 text-black">
                            Error
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
}
