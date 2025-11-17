import { z } from 'zod';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const ACCEPTED_DOCUMENT_TYPES = ['application/pdf'];

export const mediaUploadSchema = z.object({
  folderId: z.string().optional(),
  category: z.enum(['products', 'activities', 'cms', 'general']).optional(),
});

export const fileValidationSchema = z.object({
  size: z.number().max(MAX_FILE_SIZE, 'File size must be less than 50MB'),
  type: z.string().refine(
    (type) =>
      ACCEPTED_IMAGE_TYPES.includes(type) ||
      ACCEPTED_VIDEO_TYPES.includes(type) ||
      ACCEPTED_DOCUMENT_TYPES.includes(type),
    'Invalid file type'
  ),
});

export type MediaUploadInput = z.infer<typeof mediaUploadSchema>;
export type FileValidation = z.infer<typeof fileValidationSchema>;
