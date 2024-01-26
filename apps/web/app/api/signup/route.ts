// app/api/signup/route.ts
import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";
import { Prisma } from "@userbase/prisma";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    // TODO: Replace Validation with Zod
    if (
        typeof username !== "string" ||
        username.length < 4 ||
        username.length > 31
    ) {
        return NextResponse.json(
            {
                error: "Invalid username"
            },
            {
                status: 400
            }
        );
    }

    if (
        typeof password !== "string" ||
        password.length < 6 ||
        password.length > 255
    ) {
        return NextResponse.json(
            {
                error: "Invalid password"
            },
            {
                status: 400
            }
        );
    }

    try {
        const user = await auth.createUser({
            key: {
                providerId: "username",
                providerUserId: username.toLowerCase(),
                password // hashed by Lucia
            },
            attributes: {
                username
            }
        });

        const session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });

        console.log("lucia session", session)

        const authRequest = auth.handleRequest(request.method, context);
        authRequest.setSession(session);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/" // redirect to profile page
            }
        });
    } catch (e) {
        // this part depends on the database you're using
        // check for unique constraint error in user table
        if (
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === "P2002"
        ) {
            return NextResponse.json(
                {
                    error: "Username already taken"
                },
                {
                    status: 400
                }
            );
        }

        return NextResponse.json(
            {
                error: "An unknown error occurred"
            },
            {
                status: 500
            }
        );
    }
};