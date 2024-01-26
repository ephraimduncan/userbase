import SignOut from "./logout";
import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) {
    redirect("/login")
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="text-7xl">Userbase</div>
      {session && (
        <>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <SignOut />
        </>
      )}
    </div>
  );
}
