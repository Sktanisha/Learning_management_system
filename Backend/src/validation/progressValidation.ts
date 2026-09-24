import { z } from "zod"

export const progressParamsSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
    lessonId: z.string().min(1).optional(),
  }),
  body: z.object({}).passthrough(),
  query: z.object({}),
})