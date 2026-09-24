import { z } from "zod"

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(200),
    description: z.string().trim().min(1),
    thumbnail: z.string().trim().optional(),
    price: z.number().min(0).optional(),
    category: z.string().trim().min(1),
  }),
  params: z.object({}),
  query: z.object({}),
})

export const updateCourseSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(200).optional(),
    description: z.string().trim().min(1).optional(),
    thumbnail: z.string().trim().optional(),
    price: z.number().min(0).optional(),
    category: z.string().trim().min(1).optional(),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
  query: z.object({}),
})