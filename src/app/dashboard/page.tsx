import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { FC } from "react";

const temp = (session: Session | null) => {
    "use client";
    console.log(session);
};
const page = async () => {
    const session = await getServerSession(authOptions);
    temp(session);
    return <pre>{JSON.stringify(session, null, 2)}</pre>;
};

export default page;
