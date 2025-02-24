import { z } from 'zod';

export const moviePostSchema = z.object({
  movieId: z.string().uuid().optional(),
  title: z.string().min(1, { message: 'Title is required' }).max(100),
  country: z.string().min(1, { message: 'Invalid country' }).max(60).optional(),
  year: z.number().int().min(1900, { message: 'Invalid year' }).optional(),
});

export const moviePutSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  country: z.string().min(1, { message: 'Invalid country' }).max(60).optional(),
  year: z.number().int().min(1900, { message: 'Invalid year' }).optional(),
});

export const movieReviewPostSchema = z.object({
  movieReviewId: z.string().uuid().optional(),
  movieId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  review: z
    .string()
    .min(1, { message: 'Please provide a review' })
    .max(4000)
    .optional(),
});

export const movieReviewPutSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  review: z
    .string()
    .min(1, { message: 'Please provide a review' })
    .max(4000)
    .optional(),
});

export const movieGetSchema = z.object({
  movieId: z.string().uuid(),
});

export const movieReviewGetSchema = z.object({
  movieReviewId: z.string().uuid(),
});
