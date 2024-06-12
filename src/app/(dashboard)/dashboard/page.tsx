import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { FC } from "react";

const page = async () => {
    const session = await getServerSession(authOptions);
    return <pre>{JSON.stringify(session, null, 2)}</pre>;
};

export default page;
