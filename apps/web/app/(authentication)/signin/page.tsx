import { trpcServer } from "@userbase/trpc/react/server";
import { getServerAuthSession } from "@userbase/lib/auth";
import { SignIn } from "./signin";
import { Card } from "@userbase/ui/primitives/card";
import Link from "next/link";

export default async function Home() {
  const data = await trpcServer.hello.get.query();
  const id = await trpcServer.hello.getId.query({ text: "world" });

  const session = await getServerAuthSession();

  return (
    <div className="h-screen">
      {session && (
        <div className="text-2xl p-4">
          <h1 className="text-2xl">Hello world</h1>

          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
          {data && <pre>{JSON.stringify(id, null, 2)}</pre>}
          {data && <pre>{JSON.stringify(session, null, 2)}</pre>}
        </div>
      )}

      {!session && (
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
      )}
    </div>
  );
}
