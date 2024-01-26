import { SignIn } from "./signin";
import { Card } from "@userbase/ui/primitives/card";
import Link from "next/link";
import * as context from "next/headers";
import { auth } from "../../../auth/lucia";
import { redirect } from "next/navigation";

export default async function Home() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();

  if (session) {
    redirect("/");
  }

  return (
    <div className="h-screen">
      <div className="p-5 flex flex-col mx-auto items-center justify-center h-full">
        <SignIn />

        <Card className="mt-8 py-3 px-8 text-sm rounded-full">
          Don’t have an account?{" "}
          <Link href="/signup">
            <span className="text-primary font-medium cursor-pointer">
              Sign up
            </span>
          </Link>
        </Card>
      </div>
    </div>
  );
}
