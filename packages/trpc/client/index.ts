import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";

// TODO: Create lib/utils package and steal this from documenso
import { getBaseUrl } from "@documenso/lib/universal/get-base-url";

import { AppRouter } from "../server/router";

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: SuperJSON,

  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

export { TRPCClientError } from "@trpc/client";
