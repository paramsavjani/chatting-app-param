"use client";

import { AddFriendSchema } from "@/lib/validation/add-friend";
import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import Button from "./ui/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./styles.css";

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
            email = email.toLowerCase();
            setLoading(true);
            const validatedEmail = AddFriendSchema.parse({ email });

            await axios.post("/api/friends/add", { email: validatedEmail });

            setShowSuccessState(true);
            setTimeout(() => {
                setShowSuccessState(false);
            }, 3500);
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
            setError("email", { message: error.response?.data });
        } else {
            setError("email", { message: "Something went wrong." });
        }
    };

    const onSubmit = (data: FormData) => {
        addFriend(data.email);
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-background"></div>
                <div className="card-content">
                    <h2 className="title">Add a Friend</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="email" className="label">
                            Add friend by E-Mail
                        </label>
                        <div className="input-group">
                            <input
                                {...register("email")}
                                type="text"
                                className={`input ${
                                    errors.email ? "error" : ""
                                }`}
                                placeholder="you@example.com"
                            />
                            <Button disabled={loading} className="button-add">
                                {loading ? "Adding..." : "Add"}
                            </Button>
                        </div>
                        <p className="error-message">
                            {errors.email?.message && (
                                <i className="fas fa-exclamation-circle icon"></i>
                            )}
                            {errors.email?.message}
                        </p>
                        {showSuccessState && (
                            <p className="success-message">
                                <i className="fas fa-check-circle icon"></i>
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
