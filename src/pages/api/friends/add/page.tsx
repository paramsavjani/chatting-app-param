import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        res.status(200).json({ message: "POST request handled successfully" });
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
export function POST() {
    return {
        status: 200,
        body: { message: "POST request handled successfully" },
    };
}
