import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";
import "./page.css"; // Import the CSS file for this page

const Page: FC = async () => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    // ids of people who sent current logged in user a friend requests
    const incomingSenderIds = (await fetchRedis(
        "smembers",
        `user:${session.user.id}:incoming_friend_requests`
    )) as string[];

    const incomingFriendRequests = await Promise.all(
        incomingSenderIds.map(async (senderId) => {
            const sender = (await fetchRedis(
                "get",
                `user:${senderId}`
            )) as string;
            const senderParsed = JSON.parse(sender) as User;

            return {
                senderId: senderParsed?.id,
                senderEmail: senderParsed?.email,
                senderImage: senderParsed?.image,
                senderName: senderParsed?.name,
            };
        })
    );

    return (
        <main className="main-container">
            <h1 className="page-title-1">Add friends</h1>
            <div className="friend-requests-container">
                <FriendRequests
                    incomingFriendRequests={incomingFriendRequests}
                    sessionId={session.user.id}
                />
            </div>
        </main>
    );
};

export default Page;
