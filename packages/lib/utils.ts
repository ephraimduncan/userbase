function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  const vc = process.env.VERCEL_URL;
  const localServer = process.env.APP_URL || "http://localhost:3000";

  if (vc) return "https://" + vc;

  return localServer;
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}
