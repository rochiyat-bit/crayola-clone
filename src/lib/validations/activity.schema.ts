import { z } from 'zod';

export const activityStepSchema = z.object({
  stepNumber: z.number().int().min(1),
  title: z.string().min(1, 'Step title is required'),
  description: z.string().min(1, 'Step description is required'),
  imageUrl: z.string().url().optional(),
});

export const activitySchema = z.object({
  categoryId: z.string().uuid().optional(),
  title: z.string().min(1, 'Activity title is required').max(255),
  slug: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('easy'),
  ageRange: z.string().optional(),
  duration: z.number().int().min(1, 'Duration must be positive').optional(),
  materialsNeeded: z.array(z.string()).default([]),
  coverImageUrl: z.string().url('Invalid image URL'),
  videoUrl: z.string().url().optional(),
  isPremium: z.boolean().default(false),
  isActive: z.boolean().default(true),
  steps: z.array(activityStepSchema).optional(),
});

export const activityUpdateSchema = activitySchema.partial();

export const activityQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  categoryId: z.string().uuid().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  search: z.string().optional(),
});

export type ActivityInput = z.infer<typeof activitySchema>;
export type ActivityUpdateInput = z.infer<typeof activityUpdateSchema>;
export type ActivityQuery = z.infer<typeof activityQuerySchema>;
export type ActivityStepInput = z.infer<typeof activityStepSchema>;
