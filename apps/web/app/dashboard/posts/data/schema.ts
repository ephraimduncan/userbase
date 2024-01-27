import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  author: z.string(),
  content: z.string(),
  upvotes: z.number(),
})

export type PostSchema = z.infer<typeof postSchema>
