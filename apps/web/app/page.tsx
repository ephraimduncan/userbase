import SignOut from "./logout";
import { auth } from "@/auth/lucia";
import { Button } from "@userbase/ui/primitives/button";
import * as context from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
	const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
	if (!session) {
		redirect("/login");
	}

	return (
		<div className="flex justify-center items-center flex-col h-screen space-y-4">
			<div className="text-7xl">Userbase</div>

			<Link href="/dashboard">
				<Button variant="link" size="lg">Go to Dashboard</Button>
			</Link>

			<pre>{JSON.stringify(session, null, 2)}</pre>
			<SignOut />
		</div>
	);
}
