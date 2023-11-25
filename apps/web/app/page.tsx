import Client from "./client";
import { DemoCreateAccount } from "./create-account";

export default function Page() {
  return (
    <div className="space-y-8 p-10">
      <h1>Web</h1>
      <Client />

      <div className="w-96">
        <DemoCreateAccount />
      </div>
    </div>
  );
}
