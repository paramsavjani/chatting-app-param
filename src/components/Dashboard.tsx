"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiUserPlus, FiMenu } from "react-icons/fi";
import FriendRequestSidebarOptions from "./FriendRequestSidebarOptions";
import { Session } from "next-auth";
import SignOutButton from "./SignOutButton";
import { FC } from "react";
import { usePathname } from "next/navigation";
import SidebarChatList from "@/components/SlidebarChatList";

interface LayoutProps {
    unseenRequestCount: number;
    friends: User[];
    session: Session;
}

const Dashboard: FC<LayoutProps> = ({
    session,
    unseenRequestCount,
    friends,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Mobile header */}
            <div className="md:hidden px-4 py-3 pb-3 pt-3 flex items-center justify-between">
                <div className="flex items-center">
                    <Image
                        src="/svg-for-app.svg"
                        alt="ChatterSphere"
                        width={40}
                        height={40}
                        style={{ filter: "invert(1)" }}
                    />
                    <span className="text-xl font-semibold ml-2">
                        ChatterSphere
                    </span>
                </div>
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="text-gray-700 hover:text-indigo-600"
                >
                    <FiMenu className="h-8 w-8" />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`flex flex-col fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-gray-200 transform ${
                    sidebarOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col md:w-80 lg:w-96 md:left-0 md:border-r md:border-l-0`}
            >
                <div className="flex justify-between items-center p-4 md:hidden">
                    <Link
                        href="/dashboard"
                        className="items-center justify-center"
                    >
                        <Image
                            src="/svg-for-app.svg"
                            alt="ChatterSphere"
                            width={100}
                            height={100}
                            style={{ filter: "invert(1)" }}
                        />
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-gray-700 hover:text-indigo-600"
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <Link
                    href="/dashboard"
                    className="hidden md:flex items-center justify-center p-4"
                >
                    <Image
                        src="/svg-for-app.svg"
                        alt="ChatterSphere"
                        width={100}
                        height={100}
                        style={{ filter: "invert(1)" }}
                    />
                </Link>

                <nav className="flex flex-1 flex-col overflow-y-auto">
                    {friends.length > 0 && (
                        <div className="text-xs font-semibold leading-6 text-gray-400 px-4">
                            Your chats
                        </div>
                    )}
                    <ul
                        role="list"
                        className="flex flex-1 flex-col gap-y-3 px-4 overflow-y-auto"
                    >
                        <SidebarChatList
                            sessionId={session.user.id}
                            friends={friends}
                        />
                    </ul>
                </nav>

                {/* Add friends and Friend requests */}
                <div className="px-4 py-3 border-t border-gray-200 bg-white sticky bottom-0">
                    <ul role="list" className="space-y-1">
                        <li>
                            <Link
                                href="/dashboard/add"
                                className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm font-semibold leading-6"
                            >
                                <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium">
                                    <FiUserPlus className="h-4 w-4" />
                                </span>
                                <span className="truncate">Add friends</span>
                            </Link>
                        </li>
                        <li>
                            <FriendRequestSidebarOptions
                                sessionId={session.user.id}
                                initialUnseenRequestCount={unseenRequestCount}
                            />
                        </li>
                    </ul>
                </div>

                {/* User profile and sign out button */}
                <div className="px-6 py-3 border-t border-gray-200">
                    <div className="flex items-center gap-x-4 text-sm font-semibold leading-6 text-gray-900">
                        <div className="relative h-10 w-10 bg-gray-50">
                            <Image
                                fill
                                referrerPolicy="no-referrer"
                                className="rounded-full"
                                src={session.user.image || ""}
                                alt="Your profile picture"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span aria-hidden="true">{session.user.name}</span>
                            <span
                                className="text-xs text-zinc-400"
                                aria-hidden="true"
                            >
                                {session.user.email}
                            </span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <SignOutButton className="w-full py-2 text-center text-sm font-semibold text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
