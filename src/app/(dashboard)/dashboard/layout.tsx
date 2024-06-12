import { FiUsers, FiMessageSquare, FiUserPlus } from "react-icons/fi";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";
import FriendRequestSidebarOptions from "@/components/FriendRequestSidebarOptions";
import { fetchRedis } from "@/helpers/redis";
import dashboard from "@/components/Dashboard";
import Dasboard from "@/components/Dashboard";

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

    const unseenRequestCount = (
        (await fetchRedis(
            "smembers",
            `user:${session.user.id}:incoming_friend_requests`
        )) as User[]
    ).length;

    return (
        <div className="flex">
            <Dasboard
                unseenRequestCount={unseenRequestCount}
                friends={friends}
                session={session}
            />
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    );
};

export default Layout;
