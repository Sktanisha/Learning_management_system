import { z } from "zod"

export const createLessonSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2).max(200),
    description: z.string().trim().optional(),
    videoUrl: z.string().trim().min(1),
    duration: z.number().min(0),
    order: z.number().int().min(1),
  }),
  params: z.object({
    courseId: z.string().min(1),
  }),
  query: z.object({}),
})

export const updateLessonSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2).max(200).optional(),
    description: z.string().trim().optional(),
    videoUrl: z.string().trim().min(1).optional(),
    duration: z.number().min(0).optional(),
    order: z.number().int().min(1).optional(),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
  query: z.object({}),
})