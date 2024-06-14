"use client";

import axios from "axios";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import "./FriendRequests.css";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface FriendRequestsProps {
    incomingFriendRequests: IncomingFriendRequest[];
    sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
    incomingFriendRequests,
    sessionId,
}) => {
    const router = useRouter();

    const [friendRequests, setFriendRequests] = useState<
        IncomingFriendRequest[]
    >(incomingFriendRequests);

    useEffect(() => {
        pusherClient.subscribe(
            toPusherKey(`user:${sessionId}:incoming_friend_requests`)
        );

        const friendRequestHandler = ({
            senderId,
            senderEmail,
            senderImage,
            senderName,
        }: IncomingFriendRequest) => {
            console.log("function got called");
            setFriendRequests((prev) => [
                ...prev,
                { senderId, senderEmail, senderImage, senderName },
            ]);
        };

        pusherClient.bind("incoming_friend_requests", friendRequestHandler);

        return () => {
            pusherClient.unsubscribe(
                toPusherKey(`user:${sessionId}:incoming_friend_requests`)
            );
            pusherClient.unbind(
                "incoming_friend_requests",
                friendRequestHandler
            );
        };
    }, [sessionId]);

    const acceptFriend = async (senderId: string) => {
        await axios.post("/api/friends/accept", { id: senderId });

        setFriendRequests((prev) =>
            prev.filter((request) => request.senderId !== senderId)
        );

        router.refresh();
    };

    const denyFriend = async (senderId: string) => {
        await axios.post("/api/friends/deny", { id: senderId });

        setFriendRequests((prev) =>
            prev.filter((request) => request.senderId !== senderId)
        );

        router.refresh();
    };

    return (
        <>
            {friendRequests.length === 0 ? (
                <p className="no-requests-message">Nothing to show here...</p>
            ) : (
                friendRequests.map((request) => (
                    <div key={request.senderId} className="request-container">
                        <Image
                            height={40}
                            width={40}
                            referrerPolicy="no-referrer"
                            className="profile-image"
                            src={request.senderImage || ""}
                            alt="Profile picture"
                        />
                        <div className="sender-info">
                            <p className="sender-name">{request.senderName}</p>
                            <p className="sender-email">
                                {request.senderEmail}
                            </p>
                        </div>
                        <div className="buttons">
                            <button
                                onClick={() => acceptFriend(request.senderId)}
                                aria-label="accept friend"
                                className="button accept"
                            >
                                <Check />
                            </button>
                            <button
                                onClick={() => denyFriend(request.senderId)}
                                aria-label="deny friend"
                                className="button deny"
                            >
                                <X />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default FriendRequests;
