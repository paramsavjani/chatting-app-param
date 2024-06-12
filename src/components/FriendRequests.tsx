"use client";

import axios from "axios";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import Image from "next/image";
import "./FriendRequests.css"; // Import the CSS file

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

    const handleAccept = async (senderId: string) => {
        try {
            await axios.post(`/api/friend-requests/accept`, {
                senderId,
                sessionId,
            });
            setFriendRequests((prev) =>
                prev.filter((request) => request.senderId !== senderId)
            );
            router.refresh(); // Assuming this refreshes the data
        } catch (error) {
            console.error("Error accepting friend request:", error);
        }
    };

    const handleDeny = async (senderId: string) => {
        try {
            await axios.post(`/api/friend-requests/deny`, {
                senderId,
                sessionId,
            });
            setFriendRequests((prev) =>
                prev.filter((request) => request.senderId !== senderId)
            );
            router.refresh(); // Assuming this refreshes the data
        } catch (error) {
            console.error("Error denying friend request:", error);
        }
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
                        <p className="sender-email">{request.senderEmail}</p>
                        <button
                            onClick={() => handleAccept(request.senderId)}
                            aria-label="accept friend"
                            className="button accept"
                        >
                            <Check />
                        </button>
                        <button
                            onClick={() => handleDeny(request.senderId)}
                            aria-label="deny friend"
                            className="button deny"
                        >
                            <X />
                        </button>
                    </div>
                ))
            )}
        </>
    );
};

export default FriendRequests;
