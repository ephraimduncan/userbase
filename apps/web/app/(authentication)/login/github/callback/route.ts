import { auth, githubAuth } from "@/auth/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { cookies, headers } from "next/headers";

import type { NextRequest } from "next/server";

export type GitHubEmail = {
    email: string
    primary: boolean
    verified: boolean
    visibility: "public" | "private"
}

export const GET = async (request: NextRequest) => {
    const storedState = cookies().get("github_oauth_state")?.value;
    const url = new URL(request.url);
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");

    // validate state
    if (!storedState || !state || storedState !== state || !code) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const { getExistingUser, githubUser, githubTokens, createUser } =
            await githubAuth.validateCallback(code);

        const getUser = async () => {
            const existingUser = await getExistingUser();
            if (existingUser) {
                return existingUser
            };

            if (!githubUser.email) {
                const res = await fetch("https://api.github.com/user/emails", {
                    headers: {
                        Authorization: `Bearer ${githubTokens.accessToken}`,
                    },
                })

                console.log("user email", res)

                if (res.ok) {
                    const emails = await res.json();
                    const primaryEmail = (emails.find((e: GitHubEmail) => e.primary) ?? emails[0]).email

                    if (primaryEmail) {
                        return await createUser({
                            attributes: {
                                email: primaryEmail,
                                name: githubUser.name || "",
                                image: githubUser.avatar_url
                            }
                        });
                    }
                }
            }

            const user = await createUser({
                attributes: {
                    email: githubUser.email || "",
                    name: githubUser.name || "",
                    image: githubUser.avatar_url
                }
            });

            return user;
        };

        const user = await getUser();
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });

        const authRequest = auth.handleRequest(request.method, {
            cookies,
            headers
        });
        authRequest.setSession(session);

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/" // redirect to profile page
            }
        });
    } catch (e) {
        if (e instanceof OAuthRequestError) {
            // invalid code
            return new Response(null, {
                status: 400
            });
        }

        console.log(e);

        return new Response(null, {
            status: 500
        });
    }
};