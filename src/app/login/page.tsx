"use client";

import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./login.css";
import { signIn, useSession } from "next-auth/react";
import { Session } from "inspector";

const SignInSignUp = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const Session = useSession();

    const toggleSignUp = () => setIsSignUp(true);
    const toggleSignIn = () => setIsSignUp(false);

    const signwithGoogle = async () => {
        try {
            signIn("google");
        } catch (e) {
            console.log(e);
        } finally {
            console.log(Session);
        }
    };

    return (
        <div>
            <div
                className={`container ${isSignUp ? "right-panel-active" : ""}`}
                id="container"
            >
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className="social">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button type="button">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className="social">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button type="button">Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>
                                To keep connected with us please login with your
                                personal info
                            </p>
                            <button
                                className="ghost"
                                id="signIn"
                                onClick={toggleSignIn}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>
                                Enter your personal details and start journey
                                with us
                            </p>
                            <button
                                className="ghost"
                                id="signUp"
                                onClick={toggleSignUp}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInSignUp;
