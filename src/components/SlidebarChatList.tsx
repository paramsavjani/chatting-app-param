"use cient";

import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { chatHrefConstructor } from "@/lib/utils";

interface SlidebarChatListProps {
    friends: User[];
    sessionId: string;
}

const SlidebarChatList: FC<SlidebarChatListProps> = ({
    friends,
    sessionId,
}) => {
    const pathname = usePathname();
    const [unseeenMessages, setUnseenMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (pathname?.includes("chat")) {
            setUnseenMessages((prev) => {
                return prev.filter((msg) => !pathname.includes(msg.senderId));
            });
        }
    }, [pathname]);

    return (
        <>
            {friends.sort().map((friend) => {
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
                        </a>
                    </li>
                );
            })}
        </>
    );
};

export default SlidebarChatList;
