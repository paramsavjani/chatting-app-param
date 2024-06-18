import type { NextApiRequest, NextApiResponse } from "next";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
    const { chatId, userId } = await req.json();
    await pusherServer.trigger(toPusherKey(`chat-${chatId}`), "typing", {
        userId,
    });
    return new Response("OK", { status: 200 });
}
