import { Product } from '@prisma/client';

// omit types
export type CreateProductDto = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
