import { FiUsers, FiMessageSquare, FiUserPlus } from "react-icons/fi";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";

// Optional: add page metadata
export const metadata = {
    title: "ChatterSphere | Dashboard",
    description: "Your dashboard",
};

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        notFound();
    }

    const friends = await getFriendsByUserId(session.user.id);

    return (
        <div className="w-full flex h-screen overflow-hidden">
            <div className="flex h-full overflow-hidden max-w-xs flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white">
                <Link
                    href="/dashboard"
                    className="invert(1) items-center justify-center"
                >
                    <Image
                        src="/svg-for-app.svg"
                        alt="ChatterSphere"
                        width={600}
                        height={600}
                        style={{ filter: "invert(1)" }}
                    />
                </Link>
                {friends.length >= 0 && (
                    <div className="text-xs font-semibold leading-6 text-gray-400 px-4">
                        Your chats
                    </div>
                )}

                <nav className="flex flex-1 flex-col">
                    <ul
                        role="list"
                        className="flex flex-1 flex-col gap-y-7 px-4"
                    >
                        <li>(//your chats)</li>
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
                                <li>(your incoming requests)</li>
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
                                     <SignOutButton className="h-full aspect-square" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    );
};

export default Layout;
