import { FC, useState } from "react";

interface AddFriendButtonProps {}

const AddFriendButton: FC<AddFriendButtonProps> = () => {

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-blue-600">
            <div className="container bg-black p-10 rounded-xl shadow-xl text-center max-w-md w-full">
                <h1 className="title text-2xl font-bold text-gray-200 mb-6">
                    Add Friends...
                </h1>
                <p className="description text-sm text-gray-300 mb-4">
                    Connect with your friends by sending them friend requests.
                    Once accepted, you&apos;ll become friends!
                </p>
                <form  className="space-y-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Add friend by E-Mail
                    </label>
                    <div className="flex gap-4">
                        <input
                            type="email"
                            className="block w-full rounded-md py-2 px-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="you@example.com"
                        />
                        <button
                            type="submit"
                            className="button font-poppins flex items-center justify-center px-4 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-600 transition-transform transform hover:scale-105"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFriendButton;
