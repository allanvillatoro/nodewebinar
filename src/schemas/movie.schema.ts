import { z } from 'zod';

export const moviePostSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  country: z.string().min(1, { message: 'Invalid country' }).optional(),
  year: z.number().min(1900, { message: 'Invalid year' }).optional(),
});

export const moviePutSchema = z.object({
  title: z.string().min(1).optional(),
  country: z.string().min(1, { message: 'Invalid country' }).optional(),
  year: z.number().min(1900, { message: 'Invalid year' }).optional(),
});

export const movieReviewPostSchema = z.object({
  movieId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  review: z.string().min(1, { message: 'Please provide a review' }).optional(),
});

export const movieReviewPutSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  review: z.string().min(1, { message: 'Please provide a review' }).optional(),
});

export const movieGetSchema = z.object({
  movieId: z.string().uuid(),
});

export const movieReviewGetSchema = z.object({
  movieReviewId: z.string().uuid(),
});
