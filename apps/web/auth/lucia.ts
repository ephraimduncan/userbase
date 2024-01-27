import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { db as PrismaClient } from "../../../packages/prisma";
import { github, google } from "@lucia-auth/oauth/providers";

export const auth = lucia({
	env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
	middleware: nextjs_future(),
	sessionCookie: {
		expires: false,
	},

	adapter: prisma(PrismaClient),
	getUserAttributes: (data) => {
		return {
			email: data.email,
			name: data.name,
			image: data.image,
		};
	},
	getSessionAttributes: (session) => {
		return session;
	},
});

export const githubAuth = github(auth, {
	clientId: process.env.GITHUB_CLIENT_ID ?? "",
	clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
	scope: ["read:user", "user:email"],
});

export const googleAuth = google(auth, {
	clientId: process.env.GOOGLE_CLIENT_ID ?? "",
	clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
	accessType: "offline",
	redirectUri:
		process.env.GOOGLE_REDIRECT_URI ??
		"http://localhost:3000/login/google/callback",
	scope: ["openid", "email", "profile"],
});

export type Auth = typeof auth;
