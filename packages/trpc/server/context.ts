import { getServerAuthSession } from "@userbase/lib/auth";

interface CreateContextOptions {
  headers: Headers;
}

export const createInnerTRPCContext = async (opts: CreateContextOptions) => {
  const session = await getServerAuthSession();

  return {
    session,
    headers: opts.headers,
  };
};

export const createTRPCContext = async (opts: { req: Request }) => {
  return await createInnerTRPCContext({
    headers: opts.req.headers,
  });
};
