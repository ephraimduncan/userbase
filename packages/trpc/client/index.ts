import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";

import { AppRouter } from "../server/router";
import { getUrl } from "../react/shared";

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: SuperJSON,

  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
});

export { TRPCClientError } from "@trpc/client";
