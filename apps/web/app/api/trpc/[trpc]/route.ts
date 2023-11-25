import { fetchRequestHandler } from "@userbase/trpc/server";
import { createTRPCContext } from "@userbase/trpc/server/context";
import { type NextRequest } from "next/server";
import { appRouter } from "@userbase/trpc/server/router";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
