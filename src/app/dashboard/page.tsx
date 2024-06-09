import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC, useId } from "react";

const page = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        console.log(session);
    }

    return <pre>bbbcvvb</pre>;
};

export default page;
