import { db } from "../lib/db";

export default async function Home() {
    await db.set("hi123123", "hello world");

    return "hi";
}
