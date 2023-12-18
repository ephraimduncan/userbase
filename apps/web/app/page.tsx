import { getServerAuthSession } from "@userbase/lib/auth";
import SignOut from "./logout";

export default async function Page() {
  const session = await getServerAuthSession();

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
