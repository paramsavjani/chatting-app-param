import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { messageArrayValidator } from "@/lib/validation/message";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Image from "next/image";
import ChatInput from "@/components/ChatInput";
import Messages from "@/components/Messages";

interface pageProps {
    params: {
        chatId: string;
    };
}

async function getChatMessages(chatId: string) {
    try {
        const result: string[] = await fetchRedis(
            "zrange",
            `chat:${chatId}:messages`,
            0,
            -1
        );
        const dbMessages = result.map(
            (message) => JSON.parse(message) as Message
        );

        const ReversedDbMessages = dbMessages.reverse();

        const messages = messageArrayValidator.parse(ReversedDbMessages);

        return messages;
    } catch (e) {
        notFound();
    }
}

const Page = async ({ params }: pageProps) => {
    const { chatId } = params;
    const session = await getServerSession(authOptions);
    if (!session) {
        notFound();
    }

    const { user } = session;
    const [userId1, userId2] = chatId.split("--");

    if (userId1 !== user.id && userId2 !== user.id) {
        notFound();
    }

    if (userId1 === userId2) {
        notFound();
    }

    const chatPartnerId = userId1 === user.id ? userId2 : userId1;
    const chatPartnerString = (await fetchRedis(
        "get",
        `user:${chatPartnerId}`
    )) as string;
    const chatPartner = JSON.parse(chatPartnerString) as User;
    const initialMessages = await getChatMessages(chatId);

    return (
        <div
            className="flex flex-col bg-gradient-to-b from-gray-100 to-gray-200 
             h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-3.5rem)] md:h-screen lg:h-screen xl:h-screen"
        >
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
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto relative">
                <Messages
                    chatId={chatId}
                    initialMessages={initialMessages}
                    chatPartner={chatPartner}
                    sessionId={session.user.id}
                    sessionImg={session.user.image}
                />
            </div>

            {/* <div className="relative"> */}
            <ChatInput chatId={chatId} chatPartner={chatPartner} />
            {/* </div>   */}
        </div>
    );
};

export default Page;
