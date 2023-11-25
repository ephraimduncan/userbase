"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@userbase/ui/primitives/button";

export default function SignInButton() {
  return (
    <div>
      <Button onClick={() => signIn("github")}>Sign In</Button>
    </div>
  );
}
