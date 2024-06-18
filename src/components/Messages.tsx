"use client";

import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { cn, toPusherKey } from "@/lib/utils";
import { Message } from "@/lib/validation/message";
import { pusherClient } from "@/lib/pusher";
import styles from "./Messages.module.css";

interface MessagesProps {
    initialMessages: Message[];
    sessionId: string;
    chatId: string;
    sessionImg: string | null | undefined;
    chatPartner: User;
}

const Messages: FC<MessagesProps> = ({
    initialMessages,
    sessionId,
    chatId,
    chatPartner,
    sessionImg,
}) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);

    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

        const messageHandler = (message: Message) => {
            setMessages((prev) => [message, ...prev]);
        };

        pusherClient.bind("incoming-message", messageHandler);

        return () => {
            pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
            pusherClient.unbind("incoming-message", messageHandler);
        };
    }, [chatId]);

    const scrollDownRef = useRef<HTMLDivElement | null>(null);

    const formatTimestamp = (timestamp: number) => {
        return format(timestamp, "HH:mm");
    };

    useEffect(() => {
        scrollDownRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div
            id="messages"
            className="flex h-full flex-1 flex-col-reverse gap-1 px-4 pb-2 pt-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
            <div ref={scrollDownRef} />

            {messages.map((message, index) => {
                const isCurrentUser = message.senderId === sessionId;
                const hasNextMessageFromSameUser =
                    messages[index - 1]?.senderId === messages[index].senderId;

                return (
                    <div
                        className={`chat-message ${styles.fadeIn}`}
                        key={`${message.id}-${message.timestamp}`}
                    >
                        <div
                            className={cn("flex items-end", {
                                "justify-end": isCurrentUser,
                            })}
                        >
                            <div
                                className={cn(
                                    "flex flex-col space-y-1 text-sm max-w-[70%] mr-1 ml-2",
                                    {
                                        "order-1 items-end": isCurrentUser,
                                        "order-2 items-start": !isCurrentUser,
                                    }
                                )}
                            >
                                <span
                                    className={cn(
                                        "px-4 py-2 rounded-3xl inline-block shadow-lg",
                                        {
                                            "bg-gradient-to-r from-indigo-500 via-indigo-500 to-indigo-600 text-white":
                                                isCurrentUser,
                                            "bg-gradient-to-r from-gray-200 via-gray-250 to-gray-300 text-gray-1000":
                                                !isCurrentUser,
                                            "rounded-br-none":
                                                !hasNextMessageFromSameUser &&
                                                isCurrentUser,
                                            "rounded-bl-none":
                                                !hasNextMessageFromSameUser &&
                                                !isCurrentUser,
                                        }
                                    )}
                                    style={{ wordBreak: "break-word" }}
                                >
                                    {message.text}
                                    <span
                                        className={cn("ml-2 text-xs", {
                                            "text-gray-200": isCurrentUser,
                                            "text-gray-500": !isCurrentUser,
                                        })}
                                    >
                                        {formatTimestamp(message.timestamp)}
                                    </span>
                                </span>
                            </div>

                            <div
                                className={cn(
                                    "relative w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10",
                                    {
                                        "order-2": isCurrentUser,
                                        "order-1": !isCurrentUser,
                                        invisible: hasNextMessageFromSameUser,
                                    }
                                )}
                            >
                                <Image
                                    layout="fill"
                                    quality={75}
                                    priority={false}
                                    src={
                                        isCurrentUser
                                            ? (sessionImg as string)
                                            : chatPartner.image
                                    }
                                    alt="Profile picture"
                                    referrerPolicy="no-referrer"
                                    className="rounded-full shadow-xl transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Messages;
