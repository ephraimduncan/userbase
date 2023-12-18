"use client";

import { Button } from "@userbase/ui/primitives/button";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
}
