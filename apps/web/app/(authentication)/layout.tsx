import React from "react";

import { redirect } from "next/navigation";

import { getServerAuthSession } from "@userbase/lib/auth";
import { NextAuthProvider } from "@/providers/next-auth";

export type AuthenticatedDashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthenticatedDashboardLayout({
  children,
}: AuthenticatedDashboardLayoutProps) {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return <NextAuthProvider session={session}>{children}</NextAuthProvider>;
}
