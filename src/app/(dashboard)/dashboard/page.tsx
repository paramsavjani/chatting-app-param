import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { FC } from "react";

const page = async () => {
    const session = await getServerSession(authOptions);
    return <h1>hiii</h1>;
};

export default page;
