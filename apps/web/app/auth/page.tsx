import { trpcServer } from "@userbase/trpc/react/server";
import { getServerAuthSession } from "@userbase/lib/auth";
import SignInButton from "./signin-button";

export default async function Home() {
  const data = await trpcServer.hello.get.query();
  const id = await trpcServer.hello.getId.query({ text: "world" });

  const session = await getServerAuthSession();

  return (
    <>
      {session && (
        <div className="text-2xl p-4">
          <h1 className="text-2xl">Hello world</h1>

          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
          {data && <pre>{JSON.stringify(id, null, 2)}</pre>}
          {data && <pre>{JSON.stringify(session, null, 2)}</pre>}
        </div>
      )}

      {!session && (
        <div className="p-5">
          <h1 className="text-4xl font-semibold">Sign in to your account</h1>

          <p className="text-muted-foreground/60 mt-2 text-sm">
            Welcome back, we are lucky to have you.
          </p>

          <SignInButton />
        </div>
      )}
    </>
  );
}
