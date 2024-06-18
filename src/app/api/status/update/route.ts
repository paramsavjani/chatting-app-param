// pages/api/status/update.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
    const { status, userId } = await req.json(); // Assuming you send the userId in the request body
    console.log(status, userId);
    try {
        await pusherServer.trigger(toPusherKey(`status`), `${userId}`, status);

        return new Response("OK", { status: 200 });
    } catch (error) {
        return new Response("Failed to update status", { status: 500 });
    }
}
