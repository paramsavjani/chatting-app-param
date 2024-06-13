import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { messageArrayValidator } from "@/lib/validation/message";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Image from "next/image";

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

const page = async ({ params }: pageProps) => {
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
        <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)] bg-gradient-to-b from-gray-100 to-gray-200">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 shadow-md bg-white">
                <div className="relative flex items-center space-x-4 px-4">
                    <div className="relative">
                        <div className="relative w-10 sm:w-14 h-10 sm:h-14">
                            <Image
                                fill
                                referrerPolicy="no-referrer"
                                src={chatPartner.image}
                                alt={`${chatPartner.name} profile picture`}
                                className="rounded-full border-2 border-gray-300 shadow-lg"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col leading-tight">
                        <div className="text-2xl flex items-center">
                            <span className="text-gray-800 mr-3 font-bold">
                                {chatPartner.name}
                            </span>
                        </div>

                        <span className="text-sm text-gray-500">
                            {chatPartner.email}
                        </span>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default page;
