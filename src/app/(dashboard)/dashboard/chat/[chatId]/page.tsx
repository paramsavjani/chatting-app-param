import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { messageArrayValidator } from "@/lib/validation/message";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Image from "next/image";
import ChatInput from "@/components/ChatInput";
import Messages from "@/components/Messages";
import ChattingPersonNameHeading from "@/components/ChattingPersonNameHeading";

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
           <ChattingPersonNameHeading chatPartner={chatPartner} chatId={chatId} />

            <div className="flex-1 overflow-y-auto bg-white relative">
                <Messages
                    chatId={chatId}
                    initialMessages={initialMessages}
                    chatPartner={chatPartner}
                    sessionId={session.user.id}
                    sessionImg={session.user.image}
                />
            </div>

            {/* <div className="relative"> */}
            <ChatInput
                chatId={chatId}
                userId={session.user.id}
                chatPartner={chatPartner}
            />
            {/* </div>   */}
        </div>
    );
};

export default Page;
