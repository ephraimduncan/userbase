import { auth } from "../../../auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import { SignUp } from "./signup";
import { Card } from "@userbase/ui/primitives/card";
import Link from "next/link";

export default async function Home() {
	const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();

	if (session) {
		redirect("/");
	}

	return (
		<div className="h-screen">
			<div className="p-5 flex flex-col mx-auto items-center justify-center h-full">
				<SignUp />

				<Card className="mt-8 py-3 px-8 text-sm rounded-full">
					Already have an account?{" "}
					<Link href="/signin">
						<span className="text-primary font-medium">Sign in</span>
					</Link>
				</Card>
			</div>
		</div>
	);
}
