import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        notFound();
    }

    return (
        <div>
            <div className="flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-gray-200 bg-white">
                
            </div>
            {children}
        </div>
    );
};

export default Layout;
