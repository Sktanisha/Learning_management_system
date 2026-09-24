import { z } from "zod"

export const enrollSchema = z.object({
  body: z.object({
    courseId: z.string().min(1),
  }),
  params: z.object({}),
  query: z.object({}),
})