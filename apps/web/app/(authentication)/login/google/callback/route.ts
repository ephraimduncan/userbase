import { auth, googleAuth } from "@/auth/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { cookies, headers } from "next/headers";
import { db } from "@userbase/prisma"

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    const storedState = cookies().get("google_oauth_state")?.value;
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
        const { getExistingUser, googleUser, createUser, createKey } =
            await googleAuth.validateCallback(code);

        const getUser = async () => {
            const existingUser = await getExistingUser();
            if (existingUser) {
                return existingUser
            };

            const primaryEmail = googleUser.email ?? null;

            if (!primaryEmail) {
                throw new Error("No primary email found")
            }

            if (!googleUser.email_verified) {
                throw new Error("Primary email not verified")
            }

            const existingDatabaseUserWithEmail = await db.user.findFirst({
                where: {
                    email: primaryEmail
                },
            });

            if (existingDatabaseUserWithEmail) {
                const user = auth.transformDatabaseUser({
                    email: existingDatabaseUserWithEmail.email,
                    name: existingDatabaseUserWithEmail.name || googleUser.name || "",
                    image: existingDatabaseUserWithEmail.image || googleUser.picture || "",
                    id: existingDatabaseUserWithEmail.id
                });

                await createKey(user.userId);
                return user;
            }

            const user = await createUser({
                attributes: {
                    name: googleUser.name,
                    image: googleUser.picture,
                    email: googleUser.email ?? null
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
                Location: "/"
            }
        });
    } catch (e) {
        console.log(e);

        if (e instanceof OAuthRequestError) {
            // invalid code
            return new Response(null, {
                status: 400
            });
        }

        return new Response(null, {
            status: 500
        });
    }
};