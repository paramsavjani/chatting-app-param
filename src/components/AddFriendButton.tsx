"use client";

import { AddFriendSchema } from "@/lib/validation/add-friend";
import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import Button from "./ui/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

interface AddFriendButtonProps {}

type FormData = z.infer<typeof AddFriendSchema>;

const AddFriendButton: FC<AddFriendButtonProps> = () => {
    const [showSuccessState, setShowSuccessState] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(AddFriendSchema),
    });

    const addFriend = async (email: string) => {
        try {
            setLoading(true);
            const validatedEmail = AddFriendSchema.parse({ email });

            await axios.post("/api/friends/add", { email: validatedEmail });

            setShowSuccessState(true);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleError = (error: unknown) => {
        if (error instanceof z.ZodError) {
            setError("email", { message: error.message });
        } else if (error instanceof AxiosError) {
            setError("email", { message: error.response?.data.message });
        } else {
            setError("email", { message: "Something went wrong." });
        }
    };

    const onSubmit = (data: FormData) => {
        addFriend(data.email);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
                    {/* <Image
                        src="/svg-for-app.svg"
                        style={{ filter:"invert(1)"}}
                        alt="Logo"
                        width={200}
                        height={200}
                    /> */}
                    <h2 className="text-2xl font-extrabold text-center mb-6">
                        Add a Friend
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="max-w-sm mx-auto"
                    >
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Add friend by E-Mail
                        </label>
                        <div className="mt-3 flex gap-4">
                            <input
                                {...register("email")}
                                type="email"
                                className={`block w-full rounded-md py-2 px-3 border ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1`}
                                placeholder="you@example.com"
                            />
                            <Button
                                disabled={loading}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                {loading ? "Adding..." : "Add"}
                            </Button>
                        </div>
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600 animate-fade-in">
                                {errors.email.message}
                            </p>
                        )}
                        {showSuccessState && (
                            <p className="mt-2 text-sm text-green-600 animate-fade-in">
                                Friend request sent!
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFriendButton;
