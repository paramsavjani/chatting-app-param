import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { fetchRedis } from "@/helpers/redis";

function getCredentials(provider: String) {
    const clientId = process.env[`${provider}_CLIENT_ID`];
    const clientSecret = process.env[`${provider}_CLIENT_SECRET`];

    if (!clientId || clientId.length === 0) {
        throw new Error(`Missing ${provider}_CLIENT_ID`);
    }

    if (!clientSecret || clientSecret.length === 0) {
        throw new Error(`Missing ${provider}_CLIENT_SECRET`);
    }

    return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    providers: [
        GoogleProvider(getCredentials("GOOGLE")),
        GitHubProvider(getCredentials("GITHUB")),
    ],
    callbacks: {
        async jwt({ token, user }) {
            try {
                const dbUserResult = (await fetchRedis(
                    "get",
                    `user:${token.id}`
                )) as string | null;

                if (!dbUserResult) {
                    if (user) {
                        token.id = user.id;
                    }
                    return token;
                }

                const dbUser = JSON.parse(dbUserResult);

                return {
                    ...token,
                    id: dbUser.id,
                    name: dbUser.name,
                    email: dbUser.email,
                    picture: dbUser.image,
                };
            } catch (error) {
                console.error("JWT callback error:", error);
                return token;
            }
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }

            return session;
        },
        redirect() {
            return "/dashboard";
        },
    },
};
