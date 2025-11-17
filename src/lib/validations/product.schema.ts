import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(255),
  categoryId: z.string().uuid('Invalid category ID'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  salePrice: z.number().min(0, 'Sale price must be positive').optional(),
  sku: z.string().optional(),
  stockQuantity: z.number().int().min(0, 'Stock must be non-negative').default(0),
  specifications: z.record(z.any()).optional(),
  ageRange: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  images: z.array(z.object({
    url: z.string().url(),
    megaFileId: z.string(),
    altText: z.string().optional(),
  })).optional(),
});

export const productUpdateSchema = productSchema.partial();

export const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  categoryId: z.string().uuid().optional(),
  search: z.string().optional(),
  featured: z.enum(['true', 'false']).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  sortBy: z.enum(['newest', 'price-asc', 'price-desc', 'popular']).optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
