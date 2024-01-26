"use client";

import { Button } from "@userbase/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@userbase/ui/primitives/card";
import { Input } from "@userbase/ui/primitives/input";
import { Label } from "@userbase/ui/primitives/label";
import { Icons } from "../login/signin";
import Form from "../form";

export function SignUp() {
  return (
    <Form action="/api/signup">
      <Card>
        <CardHeader className="space-y-1 py-8">
          <CardTitle className="text-2xl font-medium text-center">
            Create an account with
            <div className="text-primary">Userbase</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Icons.google className="mr-2 h-4 w-4" />
              Sign up with Google
            </Button>
            <Button variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Sign up with Github
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email" placeholder="duncan" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" name="confirm-password" type="confirm-password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" size={"lg"}>
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
