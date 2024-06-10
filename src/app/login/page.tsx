"use client";

import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import "./login.css";

const Page: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean[]>([]);

    async function loginWithGoogle() {
        setIsLoading([true, isLoading[1]]);
        try {
            await signIn("google");
        } catch (error) {
            toast.error("Something went wrong with your login.");
        } finally {
            setTimeout(() => setIsLoading([false, isLoading[1]]), 2000);
        }
    }

    async function loginWithGitHub() {
        setIsLoading([isLoading[0], true]);
        try {
            await signIn("github");
        } catch (error) {
            toast.error("Something went wrong with your login.");
        } finally {
            setTimeout(() => setIsLoading([isLoading[0], false]), 2000);
        }
    }

    return (
        <div className="container">
            <div className="logo">
                <Image
                    src="/svg-for-app.svg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="logo-icon"
                />
            </div>
            <h2 className="title">Welcome to Chatter Sphere</h2>
            <p className="welcome-message">
                Connect with your friends and family through seamless
                conversations. Chatter Sphere is the ultimate chatting app that
                brings everyone closer.
            </p>
            <button
                className="button"
                onClick={loginWithGoogle}
                disabled={isLoading[0]}
            >
                {isLoading[0] ? (
                    <span>Loading...</span>
                ) : (
                    <>
                        <svg
                            className="button-icon"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="google"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                            <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Sign in with Google
                    </>
                )}
            </button>
            <button
                className="button"
                onClick={loginWithGitHub}
                disabled={isLoading[1]}
            >
                {isLoading[1] ? (
                    <span>Loading...</span>
                ) : (
                    <>
                        <svg
                            className="button-icon"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="github"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.158-1.11-1.467-1.11-1.467-.908-.62.069-.608.069-.608 1.003.07 1.53 1.03 1.53 1.03.893 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.635-1.338-2.22-.252-4.555-1.11-4.555-4.945 0-1.092.39-1.984 1.029-2.683-.103-.253-.447-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.843c.85.004 1.705.115 2.504.337 1.91-1.296 2.748-1.026 2.748-1.026.547 1.376.202 2.394.1 2.647.64.7 1.028 1.591 1.028 2.683 0 3.845-2.339 4.687-4.566 4.934.359.31.678.92.678 1.853 0 1.337-.012 2.418-.012 2.747 0 .268.18.58.688.482C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                fill="#000"
                            />
                        </svg>
                        Sign in with GitHub
                    </>
                )}
            </button>
        </div>
    );
};

export default Page;
    