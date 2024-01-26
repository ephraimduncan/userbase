"use client";

import { Button } from "@userbase/ui/primitives/button";
import Form from "./(authentication)/form";

export default function SignOut() {
  return (
    <Form action="/api/logout">
      <Button type="submit">Sign Out</Button>
    </Form>
  )
}
