import { AddFriendSchema } from "@/lib/validation/add-friend";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email: emailToAdd } = AddFriendSchema.parse(body.email);
        const RESTResponce = await fetch(
            `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${emailToAdd}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
                },
                cache: "no-cache",
            }
        );

        const data = (await RESTResponce.json()) as { result: string | null };
        const idToAdd = data.result;

        if (!idToAdd) {
            return new Response("This person does not exist.", { status: 400 });
        }
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }
        if (idToAdd === session.user.id) {
            return new Response("You cannot add yourself as a friend", {
                status: 400,
            });
        }

    } catch (error) {}
}
