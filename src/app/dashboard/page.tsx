import { FC } from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async ({}) => {
    // const session = await getServerSession(authOptions);

    return <div>hi parm</div>;
};

export default page;
