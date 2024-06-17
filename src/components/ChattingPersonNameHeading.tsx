"use client";

import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { CloudFog } from "lucide-react";

interface ChattingPersonNameHeadingProps {
    chatPartner: User;
    chatId: string;
}

const ChattingPersonNameHeading: FC<ChattingPersonNameHeadingProps> = ({
    chatPartner,
    chatId,
}) => {
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const channel = pusherClient.subscribe(toPusherKey(`chat-${chatId}`));

        channel.bind("typing", ({ userId }: { userId: string }) => {
            console.log("userId");
            if (userId === chatPartner.id) {
                setIsTyping(true);
                if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current);
                }
                typingTimeoutRef.current = setTimeout(() => {
                    setIsTyping(false);
                }, 3000); // Reset typing indicator after 3 seconds
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

                <div className="flex flex-col leading-tight">
                    <div className="text-lg flex items-center">
                        <span className="text-gray-800 font-bold  w-auto">
                            {chatPartner.name}
                        </span>
                    </div>

                    <span className="text-sm text-gray-500">
                        {chatPartner.email}
                    </span>

                    {isTyping && (
                        <span className="text-sm text-gray-500">Typing...</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChattingPersonNameHeading;
