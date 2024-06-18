// app/(dashboard)/layout.tsx
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";
import { fetchRedis } from "@/helpers/redis";
import Dasboard from "@/components/Dashboard";
import PresenceUpdater from "@/components/PresenceUpdater";

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
        <div className="md:flex h-dvh">
            {/* Client-side presence updater */}
            <PresenceUpdater userId={session.user.id} />
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
