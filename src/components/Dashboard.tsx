"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiUserPlus } from "react-icons/fi";
import FriendRequestSidebarOptions from "./FriendRequestSidebarOptions";
import { Session } from "next-auth";
import SignOutButton from "./SignOutButton";

interface LayoutProps {
    unseenRequestCount: number;
    friends: User[];
    session: Session;
}

const Dasboard: FC<LayoutProps> = ({
    session,
    unseenRequestCount,
    friends,
}) => {
    return (
        <div className="hidden md:flex h-full overflow-hidden max-w-xs flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white">
            <Link href="/dashboard" className="items-center justify-center">
                <Image
                    src="/svg-for-app.svg"
                    alt="ChatterSphere"
                    width={100}
                    height={100}
                    style={{ filter: "invert(1)" }}
                />
            </Link>
            {friends.length >= 0 && (
                <div className="text-xs font-semibold leading-6 text-gray-400 px-4">
                    Your chats
                </div>
            )}

            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-3 px-4">
                    {friends.map((friend) => {
                        return (
                            <li key={friend.id}>
                                <Link
                                    href={`/dashboard/chat/${friend.id}`}
                                    className="flex gap-3 items-center text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group rounded-md p-1 text-sm font-semibold leading-6"
                                >
                                    <div className="relative h-10 w-10 bg-gray-50">
                                        <Image
                                            fill
                                            referrerPolicy="no-referrer"
                                            className="rounded-full"
                                            src={friend.image || ""}
                                            alt="Friend's profile picture"
                                        />
                                    </div>
                                    <span className="truncate">
                                        {friend.name}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                    <li>
                        <div className="text-xs font-semibold leading-6 text-gray-400">
                            Overview
                        </div>

                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                            <li>
                                <Link
                                    href="/dashboard/add"
                                    className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm font-semibold leading-6"
                                >
                                    <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium">
                                        <FiUserPlus className="h-4 w-4" />
                                    </span>
                                    <span className="truncate">
                                        Add friends
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <FriendRequestSidebarOptions
                                    sessionId={session.user.id}
                                    initialUnseenRequestCount={
                                        unseenRequestCount
                                    }
                                />
                            </li>
                        </ul>
                    </li>
                    <li className="-mx-6 mt-auto flex items-center">
                        <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                            <div className="relative h-10 w-10 bg-gray-50">
                                <Image
                                    fill
                                    referrerPolicy="no-referrer"
                                    className="rounded-full"
                                    src={session.user.image || ""}
                                    alt="Your profile picture"
                                />
                            </div>
                            <span className="sr-only">Your profile</span>
                            <div className="flex flex-col">
                                <span aria-hidden="true">
                                    {session.user.name}
                                </span>
                                <span
                                    className="text-xs text-zinc-400"
                                    aria-hidden="true"
                                >
                                    {session.user.email}
                                </span>
                            </div>
                            <SignOutButton className="h-full aspect-square" />
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Dasboard;
