import { procedure, router } from "../trpc";
import { ZHelloRouterInputSchema } from "./schema";

export const helloRouter = router({
  get: procedure.query(() => "Hello, world!"),
  getId: procedure.input(ZHelloRouterInputSchema).query((opts) => {
    return {
      greeting: `hello ${opts.input.text}`,
    };
  }),
});
