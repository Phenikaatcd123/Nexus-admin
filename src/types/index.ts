// src/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'SUPER ADMIN' | 'ADMIN' | 'USER';
  status: 'Active' | 'Inactive';
  avatar?: string;
  password?: string; // Thêm để lưu password (chỉ dùng trong mock)
  createdAt?: string; // Thêm thuộc tính này
  lastLogin?: string; // Thêm thuộc tính này
}

// src/types/index.ts (thêm vào interface Product)
export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  brand: string;
  manufacturer: string;
  weight?: string;
  dimensions?: string;
  description?: string;
  tags: string[];
  featured: boolean;
  basePrice: number;
  costPrice: number;
  discountPrice?: number;
  stock: number;
  lowStockAlert: number;
  images: ProductImage[];
  status: 'IN STOCK' | 'LOW STOCK' | 'OUT OF STOCK';
  createdAt: string;
  updatedAt: string;
  margin?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  isPrimary: boolean;
  alt?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  products: number;
  parentId?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  owner: string;
  updatedAt: string;
}

export interface ContentPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  author: string;
  authorId: string;
  categories: string[];
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  views: number;
  version: number;
}

export interface ContentCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  count: number;
}

export interface Setting {
  key: string;
  description: string;
  value: string;
  type: 'text' | 'number' | 'boolean' | 'select';
}