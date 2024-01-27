// app/api/signup/route.ts
import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";
import { Prisma } from "@userbase/prisma";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");

	// TODO: Replace Validation with Zod
	if (typeof email !== "string" || email.length < 4 || email.length > 31) {
		return NextResponse.json(
			{
				error: "Invalid email",
			},
			{
				status: 400,
			},
		);
	}

	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return NextResponse.json(
			{
				error: "Invalid password",
			},
			{
				status: 400,
			},
		);
	}

	try {
		const user = await auth.createUser({
			key: {
				providerId: "email",
				providerUserId: email.toLowerCase(),
				password, // hashed by Lucia
			},
			attributes: {
				email,
				// TODO: Accept Username
				name: "",
				image: "",
			},
		});

		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});

		const authRequest = auth.handleRequest(request.method, context);
		authRequest.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/", // redirect to profile page
			},
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
					error: "email already taken",
				},
				{
					status: 400,
				},
			);
		}

		return NextResponse.json(
			{
				error: "An unknown error occurred",
			},
			{
				status: 500,
			},
		);
	}
};
