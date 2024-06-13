"use client";

import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/validation/message";
// import { User } from "@/lib/types/user"; // Assuming User type is defined here

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
            className="flex h-full flex-1 flex-col-reverse gap-0.5 p-2 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
            <div ref={scrollDownRef} />

            {messages.map((message, index) => {
                const isCurrentUser = message.senderId === sessionId;
                const hasNextMessageFromSameUser =
                    messages[index - 1]?.senderId === messages[index].senderId;

                return (
                    <div
                        className="chat-message transition-transform duration-300 ease-in-out"
                        key={`${message.id}-${message.timestamp}`}
                        style={{ transform: "translateY(0)" }}
                    >
                        <div
                            className={cn("flex items-end", {
                                "justify-end": isCurrentUser,
                            })}
                        >
                            <div
                                className={cn(
                                    "flex flex-col space-y-1 text-sm max-w-xs mx-2 md:max-w-md lg:max-w-lg",
                                    {
                                        "order-1 items-end": isCurrentUser,
                                        "order-2 items-start": !isCurrentUser,
                                    }
                                )}
                            >
                                <span
                                    className={cn(
                                        "px-4 py-2 rounded-2xl inline-block",
                                        {
                                            "bg-indigo-600 text-white":
                                                isCurrentUser,
                                            "bg-gray-200 text-gray-900":
                                                !isCurrentUser,
                                            "rounded-br-none":
                                                !hasNextMessageFromSameUser &&
                                                isCurrentUser,
                                            "rounded-bl-none":
                                                !hasNextMessageFromSameUser &&
                                                !isCurrentUser,
                                        }
                                    )}
                                >
                                    {message.text}
                                    <span className="ml-2 text-xs text-gray-400">
                                        {formatTimestamp(message.timestamp)}
                                    </span>
                                </span>
                            </div>

                            <div
                                className={cn(
                                    "relative w-8 h-8 md:w-8 md:h-8 lg:w-8 lg:h-8",
                                    {
                                        "order-2": isCurrentUser,
                                        "order-1": !isCurrentUser,
                                        invisible: hasNextMessageFromSameUser,
                                    }
                                )}
                            >
                                <Image
                                    fill
                                    src={
                                        isCurrentUser
                                            ? (sessionImg as string)
                                            : chatPartner.image
                                    }
                                    alt="Profile picture"
                                    referrerPolicy="no-referrer"
                                    className="rounded-full transition-transform duration-200 hover:scale-105"
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
