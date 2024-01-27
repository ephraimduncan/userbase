import { auth, githubAuth } from "@/auth/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { cookies, headers } from "next/headers";
import { db } from "@userbase/prisma";

import type { NextRequest } from "next/server";

export type GitHubEmail = {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility: "public" | "private";
};

export const GET = async (request: NextRequest) => {
	const storedState = cookies().get("github_oauth_state")?.value;
	const url = new URL(request.url);
	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");

	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const { getExistingUser, githubUser, githubTokens, createUser, createKey } =
			await githubAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) {
				return existingUser;
			}

			const emailResponse = await fetch("https://api.github.com/user/emails", {
				headers: {
					Authorization: `Bearer ${githubTokens.accessToken}`,
				},
			});

			const emails: GitHubEmail[] = await emailResponse.json();
			const primaryEmail =
				emails.find((email: GitHubEmail) => email.primary) ?? null;

			if (!primaryEmail) {
				throw new Error("No primary email found");
			}

			if (!primaryEmail.verified) {
				throw new Error("Primary email not verified");
			}

			const existingDatabaseUserWithEmail = await db.user.findFirst({
				where: {
					email: primaryEmail.email,
				},
			});

			if (existingDatabaseUserWithEmail) {
				const user = auth.transformDatabaseUser({
					email: existingDatabaseUserWithEmail.email,
					name: existingDatabaseUserWithEmail.name || githubUser.name || "",
					image: existingDatabaseUserWithEmail.image || githubUser.avatar_url,
					id: existingDatabaseUserWithEmail.id,
				});

				await createKey(user.userId);
				return user;
			}

			return await createUser({
				attributes: {
					email: primaryEmail.email,
					name: githubUser.name || "",
					image: githubUser.avatar_url,
				},
			});
		};

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});

		const authRequest = auth.handleRequest(request.method, {
			cookies,
			headers,
		});
		authRequest.setSession(session);

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/", // redirect to profile page
			},
		});
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
			});
		}

		console.log(e);

		return new Response(null, {
			status: 500,
		});
	}
};
