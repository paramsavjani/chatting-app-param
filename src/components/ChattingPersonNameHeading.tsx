"use client";

import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";
import { cn, toPusherKey } from "@/lib/utils";

interface ChattingPersonNameHeadingProps {
    chatPartner: User;
    chatId: string;
}

const ChattingPersonNameHeading: FC<ChattingPersonNameHeadingProps> = ({
    chatPartner,
    chatId,
}) => {
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const isOnline = useRef<boolean>(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const channel = pusherClient.subscribe(toPusherKey(`chat-${chatId}`));
        const status = pusherClient.subscribe(toPusherKey(`status`));

        const handlestatus = (data: string) => {
            if (data === "online") {
                isOnline.current = true;
            }
            if (data === "offline") {
                isOnline.current = false;
            }
        };

        status.bind(`${chatPartner.id}`, handlestatus);

        channel.bind("typing", ({ userId }: { userId: string }) => {
            if (userId === chatPartner.id) {
                setIsTyping(true);
                if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current);
                }
                typingTimeoutRef.current = setTimeout(() => {
                    setIsTyping(false);
                }, 500);
            }
        });

        return () => {
            pusherClient.unsubscribe(toPusherKey(`chat-${chatId}`));
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [chatId, chatPartner.id]);

    return (
        <div className="flex items-center justify-between py-2 sm:py-3 border-b-2 border-gray-200 shadow-md bg-white">
            <div className="flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4">
                <div className="relative w-10 h-10">
                    <Image
                        src={chatPartner.image}
                        alt={`${chatPartner.name} profile picture`}
                        className="rounded-full border-2 border-gray-300"
                        width={40}
                        height={40}
                    />
                </div>

                <div className="flex flex-col">
                    <span className="text-gray-800 font-bold text-lg">
                        {chatPartner.name}
                    </span>
                    <span
                        className={cn("text-sm text-gray-500 mt-1", {
                        
                        })}
                    >
                        {isOnline.current ? "Online" : "offline"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChattingPersonNameHeading;
