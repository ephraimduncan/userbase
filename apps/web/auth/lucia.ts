import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma"
import { db as PrismaClient } from "../../../packages/prisma";

import { github } from "@lucia-auth/oauth/providers";

export const auth = lucia({
    env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
    middleware: nextjs_future(),
    sessionCookie: {
        expires: false
    },
    adapter: prisma(PrismaClient),

    getUserAttributes: (data) => {
        return {
            email: data.email
        }
    }

})

export const githubAuth = github(auth, {
    clientId: process.env.GITHUB_CLIENT_ID ?? "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    scope: ["user:email"]
});

export type Auth = typeof auth;