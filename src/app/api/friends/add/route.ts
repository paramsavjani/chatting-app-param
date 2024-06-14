import { AddFriendSchema } from "@/lib/validation/add-friend";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchRedis } from "@/helpers/redis";
import { db } from "@/lib/db";
import { z } from "zod";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email: emailToAdd } = AddFriendSchema.parse(body.email);

        const idToAdd = (await fetchRedis(
            "get",
            `user:email:${emailToAdd}`
        )) as string;

        if (!idToAdd) {
            return new Response(
                "This person does not have account in Chatter Sphere.",
                { status: 400 }
            );
        }
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response("Please login first", { status: 401 });
        }

        if (idToAdd === session.user.id) {
            return new Response("You cannot add yourself as a friend", {
                status: 400,
            });
        }

        const isAlreadyAdded = (await fetchRedis(
            "sismember",
            `user:${idToAdd}:incoming_friend_requests`,
            session.user.id
        )) as 0 | 1;

        if (isAlreadyAdded) {
            return new Response(
                "You have already sent a friend request to this person",
                { status: 400 }
            );
        }

        const isAlreadyAddedinme = (await fetchRedis(
            "sismember",
            `user:${session.user.id}:incoming_friend_requests`,
            idToAdd
        )) as 0 | 1;

        if (isAlreadyAddedinme) {
            return new Response(
                "This person has already sent you a friend request",
                { status: 400 }
            );
        }

        // check if user is already added
        const isAlreadyFriends = (await fetchRedis(
            "sismember",
            `user:${session.user.id}:friends`,
            idToAdd
        )) as 0 | 1;

        if (isAlreadyFriends) {
            return new Response("Already friends with this user", {
                status: 400,
            });
        }

        await pusherServer.trigger(
            toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
            "incoming_friend_requests",
            {
                senderId: session.user.id,
                senderEmail: session.user.email,
                senderName: session.user.name,
                senderImage: session.user.image,
            }
        );

        await db.sadd(
            `user:${idToAdd}:incoming_friend_requests`,
            session.user.id
        );

        return new Response("ok");
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response("Invalid request payload", { status: 422 });
        }
        console.log(error)
        return new Response("Something went wrong", { status: 400 });
    }
}
