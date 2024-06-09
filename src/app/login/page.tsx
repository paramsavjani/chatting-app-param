"use client";

import Button from "@/components/ui/Button";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

const Page: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function loginWithGoogle() {
        setIsLoading(true);
        try {
            await signIn("google");
        } catch (error) {
            toast.error("Something went wrong with your login.");
        } finally {
            setIsLoading(false);
        }
    }

    async function loginWithGithub() {
        setIsLoading(true);
        try {
            await signIn("github");
        } catch (error) {
            toast.error("Something went wrong with your login.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full flex flex-col items-center max-w-md space-y-8">
                <div className="flex flex-col items-center gap-8">
                    <div>Logo</div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <Button
                    isLoading={isLoading}
                    type="button"
                    className="max-w-sm mx-auto w-full"
                    onClick={loginWithGoogle}
                >
                    {isLoading ? null : (
                        <svg
                            className="mr-2 h-4 w-4"
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
                    )}
                    Google
                </Button>

                <Button
                    isLoading={isLoading}
                    type="button"
                    className="max-w-sm mx-auto w-full"
                    onClick={loginWithGithub}
                >
                    {isLoading ? null : (
                        <svg
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="github"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2C6.48 2 2 6.48 2 12c0 4.418 2.87 8.166 6.84 9.49.5.09.66-.22.66-.47v-1.7c-2.77.6-3.36-1.34-3.36-1.34-.45-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.61.07-.61 1 .07 1.54 1.02 1.54 1.02.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.1.64-1.35-2.22-.25-4.56-1.12-4.56-5 0-1.1.39-2 1.03-2.7-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0112 7.68c.85.004 1.7.11 2.5.33 1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.7 0 3.88-2.34 4.75-4.57 5 .36.31.68.93.68 1.87v2.78c0 .26.16.56.67.47C19.13 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"
                            />
                        </svg>
                    )}
                    GitHub
                </Button>
            </div>
        </div>
    );
};

export default Page;
