"use client";
import ThemeToggle from "@/components/ThemeToggle";
import axios from "axios";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface UserData {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
}

export default function UserProfile({
    params: paramsPromise,
}: {
    params: Promise<{ id: string }>;
}) {
    const params = use(paramsPromise);
    const [data, setData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await axios.get(`/api/users/${params.id}`);
                setData(response.data.data);
            } catch (error: any) {
                console.error(error.message);
                toast.error(
                    error.response?.data?.error ||
                        "Failed to fetch user details."
                );
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            getUserDetails();
        }
    }, [params.id]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-neutral-900 px-4 text-black dark:text-white">
            <Toaster />
            <ThemeToggle />
            <div className="border-1 border-white p-8 flex flex-col items-center gap-5 rounded-lg shadow-lg bg-white dark:bg-neutral-800 w-full max-w-md">
                <h1 className="text-4xl font-bold">User Profile</h1>
                <p className="text-gray-400 -mt-2">Public view</p>
                <hr className="w-full border-gray-500" />

                {loading ? (
                    <p className="text-lg">Loading details...</p>
                ) : data ? (
                    <div className="text-left w-full space-y-4">
                        <p className="text-lg">
                            <span className="font-semibold text-gray-400">
                                Username:
                            </span>{" "}
                            {data.username}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold text-gray-400">
                                Email:
                            </span>{" "}
                            {data.email}
                        </p>
                        <p className="text-lg flex items-center gap-2">
                            <span className="font-semibold text-gray-400">
                                Status:
                            </span>
                            <span
                                className={`px-2 py-1 text-xs font-bold rounded-full ${
                                    data.isVerified
                                        ? "bg-green-500 text-white"
                                        : "bg-yellow-500 text-white"
                                }`}
                            >
                                {data.isVerified ? "Verified" : "Not Verified"}
                            </span>
                        </p>
                    </div>
                ) : (
                    <p className="text-lg text-red-400">
                        Could not load user data.
                    </p>
                )}

                <Link
                    href="/profile"
                    className="text-sm hover:text-blue-400 hover:underline"
                >
                    &larr; Back to Profile
                </Link>
            </div>
        </div>
    );
}
