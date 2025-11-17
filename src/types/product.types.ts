export interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  sku: string;
  stockQuantity: number;
  specifications?: Record<string, any>;
  ageRange?: string;
  isFeatured: boolean;
  isActive: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  megaFileId: string;
  altText?: string;
  sortOrder: number;
  isPrimary: boolean;
  createdAt: Date;
}

export interface ProductWithImages extends Product {
  images: ProductImage[];
}
