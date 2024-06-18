import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { fetchRedis } from "@/helpers/redis";
import Dasboard from "@/components/Dashboard";
import { pusherServer } from "@/lib/pusher";

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
        )) as string[]
    ).length;

    useEffect(() => {
        const updateStatus = async () => {
            pusherServer.trigger("status", `${session.user.id}`, {
                status: "online",
            });
        };

        updateStatus();

        return () => {
            // Optionally, update status to 'offline' when the component unmounts
            const updateStatusToOffline = async () => {
                pusherServer.trigger("status", `${session.user.id}`, {
                    status: "offline",
                });
            };

            updateStatusToOffline();
        };
    }, [session.user.id]);

    return (
        <div className="md:flex h-dvh">
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
