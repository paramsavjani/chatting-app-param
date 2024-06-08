    "use client";

    import { signIn } from "next-auth/react";
    import Image from "next/image";
    import "./login.css"; // Import the CSS file
    import Button from "@/components/ui/Button";

    export default function Home() {
        const signInWithGoogle = async () => {
            try {
                await signIn("google");
            } catch (err) {
                console.error(err);
            }
        };
        const signInWithGithub = async () => {
            try {
                await signIn("github");
            } catch (err) {
                console.error(err);
            }
        };

        return (
            <>
                <div className="login-container">
                    <div className="logo">
                        <Image
                            src="/logo-of-app.png"
                            alt="logo"
                            width={300} // Increase logo size
                            height={300}
                        />
                    </div>
                    <div className="align-center button-container">
                    <button
                        onClick={signInWithGoogle}
                        // size="lg"
                        className="google-button"
                    >
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
                        Sign in with Google
                    </button>
                    <button onClick={signInWithGithub} className="github-button">
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
                                fill="#000000"
                                d="M12,0C5.373,0,0,5.373,0,12c0,5.303,3.438,9.8,8.208,11.371c0.6,0.111,0.822-0.261,0.822-0.579 c0-0.286-0.012-1.039-0.015-2.039c-3.338,0.724-4.042-1.609-4.042-1.609c-0.547-1.393-1.333-1.762-1.333-1.762 c-1.089-0.745,0.083-0.729,0.083-0.729c1.203,0.084,1.838,1.234,1.838,1.234c1.07,1.834,2.811,1.305,3.494,0.998 c0.109-0.775,0.418-1.305,0.762-1.605c-2.665-0.3-5.466-1.332-5.466-5.93c0-1.312,0.468-2.385,1.235-3.232 c-0.124-0.3-0.535-1.523,0.116-3.176c0,0,1.007-0.322,3.3,1.23c0.959-0.266,1.984-0.398,3.002-0.402 c1.016,0.004,2.041,0.136,3,0.402c2.291-1.552,3.295-1.23,3.295-1.23c0.652,1.652,0.242,2.876,0.118,3.176 c0.771,0.847,1.234,1.92,1.234,3.232c0,4.61-2.805,5.625-5.475,5.922c0.429,0.371,0.813,1.102,0.813,2.221 c0,1.605-0.014,2.895-0.014,3.289c0,0.32,0.216,0.694,0.829,0.577C20.566,21.799,24,17.303,24,12 C24,5.373,18.627,0,12,0z"
                            />
                        </svg>
                        Sign in with Github
                    </button>
                    </div>
                </div>
            </>
        );
    }
