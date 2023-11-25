import { z } from "zod";

export const ZHelloRouterInputSchema = z.object({
  text: z.string(),
});

export type THelloRouterInputSchema = z.infer<typeof ZHelloRouterInputSchema>;
