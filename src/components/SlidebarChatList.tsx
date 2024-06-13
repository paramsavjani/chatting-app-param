"use cient";

import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { chatHrefConstructor, toPusherKey } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";
import toast from "react-hot-toast";
import UnseenChatToast from "./UnseenChatToast";

interface SlidebarChatListProps {
    friends: User[];
    sessionId: string;
}
interface ExtendedMessage extends Message {
    senderImg: string;
    senderName: string;
}
const SlidebarChatList: FC<SlidebarChatListProps> = ({
    friends,
    sessionId,
}) => {
    const pathname = usePathname();
    const [unseeenMessages, setUnseenMessages] = useState<Message[]>([]);
    const [activeChats, setActiveChats] = useState<User[]>(friends);

    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
        pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

        const newFriendHandler = (newFriend: User) => {
            console.log("received new user", newFriend);
            setActiveChats((prev) => [...prev, newFriend]);
        };

        const chatHandler = (message: ExtendedMessage) => {
            const shouldNotify =
                pathname !==
                `/dashboard/chat/${chatHrefConstructor(
                    sessionId,
                    message.senderId
                )}`;

            if (!shouldNotify) return;

            // should be notified
            toast.custom((t) => (
                <UnseenChatToast
                    t={t}
                    sessionId={sessionId}
                    senderId={message.senderId}
                    senderImg={message.senderImg}
                    senderMessage={message.text}
                    senderName={message.senderName}
                />
            ));

            setUnseenMessages((prev) => [...prev, message]);
        };

        pusherClient.bind("new_message", chatHandler);
        pusherClient.bind("new_friend", newFriendHandler);

        return () => {
            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

            pusherClient.unbind("new_message", chatHandler);
            pusherClient.unbind("new_friend", newFriendHandler);
        };
    }, [pathname, sessionId]);

    useEffect(() => {
        if (pathname?.includes("chat")) {
            setUnseenMessages((prev) => {
                return prev.filter((msg) => !pathname.includes(msg.senderId));
            });
        }
    }, [pathname]);

    return (
        <>
            {activeChats.sort().map((friend) => {
                const unseeenMessagesCount = unseeenMessages.filter(
                    (unseenmsg) => {
                        return unseenmsg.senderId === friend.id;
                    }
                ).length;

                return (
                    <li key={friend.id}>
                        <a
                            href={`/dashboard/chat/${chatHrefConstructor(
                                sessionId,
                                friend.id
                            )}`}
                            className="flex gap-3 items-center text-gray-700 hover:text-indigo-700 hover:bg-gray-50 group rounded-md p-1 text-sm font-semibold leading-6"
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
                            <span className="truncate">{friend.name}</span>
                            {unseeenMessagesCount > 0 ? (
                                <div className="bg-indigo-600 font-medium text-xs text-white w-6 h-6 rounded-full flex justify-center items-center">
                                    {unseeenMessagesCount}
                                </div>
                            ) : null}
                        </a>
                    </li>
                );
            })}
        </>
    );
};

export default SlidebarChatList;
