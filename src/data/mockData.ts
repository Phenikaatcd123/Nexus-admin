// src/data/mockData.ts
import { User, Category, Product, Document, ContentPage, Setting } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'Alex Thompson', email: 'alex@nexus.com', role: 'SUPER ADMIN', status: 'Active' },
  { id: '2', name: 'Sarah Miller', email: 'sarah@nexus.com', role: 'ADMIN', status: 'Inactive' },
  { id: '3', name: 'John Doe', email: 'john@nexus.com', role: 'ADMIN', status: 'Active' },
  { id: '4', name: 'Emma Wilson', email: 'emma@nexus.com', role: 'SUPER ADMIN', status: 'Active' },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Electronics', description: 'Modern gadgets and computing devices', products: 124 },
  { id: '2', name: 'Accessories', description: 'Peripheral items and add-ons', products: 56 },
  { id: '3', name: 'Audio', description: 'Headphones, speakers and sound systems', products: 89 },
  { id: '4', name: 'Home Appliances', description: 'Devices for household usage', products: 32 },
  { id: '5', name: 'Wearables', description: 'Smartwatches and fitness trackers', products: 41 },
];

export const mockProducts: Product[] = [
  { 
    id: '1', 
    name: 'MacBook Pro M3', 
    sku: 'APL-123-MB',
    barcode: '8901234567890',
    category: 'Electronics', 
    brand: 'APPLE', 
    manufacturer: 'Apple Inc.',
    weight: '1.6 kg',
    dimensions: '30.41 x 21.24 x 1.55 cm',
    description: 'The most advanced MacBook Pro ever with M3 chip.',
    tags: ['new', 'premium', 'laptop'],
    featured: true,
    basePrice: 2499, 
    costPrice: 1800,
    discountPrice: 2299,
    stock: 45, 
    lowStockAlert: 5,
    images: [
      { id: 'img1', url: 'https://picsum.photos/200/200?random=1', isPrimary: true, alt: 'MacBook Pro M3' }
    ],
    status: 'IN STOCK',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20'
  },
  { 
    id: '2', 
    name: 'iPhone 15 Pro', 
    sku: 'APL-456-IP',
    barcode: '8901234567891',
    category: 'Electronics', 
    brand: 'APPLE', 
    manufacturer: 'Apple Inc.',
    weight: '0.2 kg',
    dimensions: '14.6 x 7.1 x 0.8 cm',
    description: 'Pro camera system, A17 Pro chip.',
    tags: ['new', 'premium', 'phone'],
    featured: true,
    basePrice: 999, 
    costPrice: 700,
    discountPrice: undefined,
    stock: 120, 
    lowStockAlert: 5,
    images: [
      { id: 'img2', url: 'https://picsum.photos/200/200?random=2', isPrimary: true, alt: 'iPhone 15 Pro' }
    ],
    status: 'IN STOCK',
    createdAt: '2024-02-01',
    updatedAt: '2024-03-19'
  },
  { 
    id: '3', 
    name: 'Logitech MX Master 3S', 
    sku: 'LOG-789-MX',
    barcode: '8901234567892',
    category: 'Accessories', 
    brand: 'LOGITECH', 
    manufacturer: 'Logitech International',
    weight: '0.15 kg',
    dimensions: '12.4 x 8.5 x 5.1 cm',
    description: 'High-performance wireless mouse.',
    tags: ['wireless', 'gaming'],
    featured: false,
    basePrice: 99, 
    costPrice: 60,
    discountPrice: undefined,
    stock: 5, 
    lowStockAlert: 5,
    images: [
      { id: 'img3', url: 'https://picsum.photos/200/200?random=3', isPrimary: true, alt: 'MX Master 3S' }
    ],
    status: 'LOW STOCK',
    createdAt: '2024-02-15',
    updatedAt: '2024-03-18'
  },
  { 
    id: '4', 
    name: 'Sony WH-1000XM5', 
    sku: 'SON-321-WH',
    barcode: '8901234567893',
    category: 'Audio', 
    brand: 'SONY', 
    manufacturer: 'Sony Corporation',
    weight: '0.25 kg',
    dimensions: '18 x 8 x 23 cm',
    description: 'Industry-leading noise canceling headphones.',
    tags: ['wireless', 'audio', 'premium'],
    featured: true,
    basePrice: 399, 
    costPrice: 280,
    discountPrice: 379,
    stock: 23, 
    lowStockAlert: 5,
    images: [
      { id: 'img4', url: 'https://picsum.photos/200/200?random=4', isPrimary: true, alt: 'WH-1000XM5' }
    ],
    status: 'IN STOCK',
    createdAt: '2024-02-20',
    updatedAt: '2024-03-17'
  },
  { 
    id: '5', 
    name: 'Samsung Galaxy Watch 6', 
    sku: 'SAM-654-GW',
    barcode: '8901234567894',
    category: 'Wearables', 
    brand: 'SAMSUNG', 
    manufacturer: 'Samsung Electronics',
    weight: '0.05 kg',
    dimensions: '4.5 x 4.5 x 1.2 cm',
    description: 'Advanced health tracking smartwatch.',
    tags: ['wearable', 'fitness'],
    featured: false,
    basePrice: 329, 
    costPrice: 230,
    discountPrice: undefined,
    stock: 0, 
    lowStockAlert: 5,
    images: [
      { id: 'img5', url: 'https://picsum.photos/200/200?random=5', isPrimary: true, alt: 'Galaxy Watch 6' }
    ],
    status: 'OUT OF STOCK',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-15'
  },
];

export const mockDocuments: Document[] = [
  { id: '1', name: 'Q3 Financial Report', type: 'PDF', size: '2.4 MB', owner: 'Alex Thompson', updatedAt: '2024-03-15' },
  { id: '2', name: 'Product Roadmap 2024', type: 'DOCX', size: '1.1 MB', owner: 'Sarah Miller', updatedAt: '2024-03-12' },
  { id: '3', name: 'User Guide v2.1', type: 'PDF', size: '3.7 MB', owner: 'John Doe', updatedAt: '2024-03-10' },
];

// SỬA LẠI PHẦN NÀY - ContentPages với đầy đủ thuộc tính
export const mockContentPages: ContentPage[] = [
  { 
    id: '1', 
    title: 'About Us', 
    slug: 'about-us',
    content: '<h1>About Nexus Admin</h1><p>We are a leading provider of admin solutions...</p>',
    excerpt: 'Learn more about our company and mission',
    featuredImage: 'https://picsum.photos/800/400?random=1',
    status: 'PUBLISHED', 
    createdAt: '2024-01-10T08:00:00Z', 
    updatedAt: '2024-03-05T14:30:00Z',
    publishedAt: '2024-01-15T09:00:00Z',
    author: 'Alex Thompson',
    authorId: '1',
    categories: ['News', 'Blog'],
    tags: ['company', 'about', 'mission'],
    seo: {
      title: 'About Nexus Admin | Company Information',
      description: 'Learn about Nexus Admin, our mission, and the team behind the platform',
      keywords: ['about us', 'company', 'team', 'mission'],
      ogImage: 'https://picsum.photos/1200/630?random=1'
    },
    views: 1245,
    version: 3
  },
  { 
    id: '2', 
    title: 'Contact', 
    slug: 'contact',
    content: '<h1>Contact Us</h1><p>Get in touch with our team...</p>',
    excerpt: 'Reach out to us for support or inquiries',
    featuredImage: 'https://picsum.photos/800/400?random=2',
    status: 'DRAFT', 
    createdAt: '2024-02-15T10:00:00Z', 
    updatedAt: '2024-02-15T16:45:00Z',
    author: 'Sarah Miller',
    authorId: '2',
    categories: ['News'],
    tags: ['contact', 'support', 'help'],
    seo: {
      title: 'Contact Nexus Admin | Get in Touch',
      description: 'Contact our team for support, sales inquiries, or general questions',
      keywords: ['contact', 'support', 'help', 'sales'],
      ogImage: 'https://picsum.photos/1200/630?random=2'
    },
    views: 0,
    version: 1
  },
  { 
    id: '3', 
    title: 'Terms of Service', 
    slug: 'terms-of-service',
    content: '<h1>Terms of Service</h1><p>Please read these terms carefully...</p>',
    excerpt: 'Our terms and conditions for using the platform',
    featuredImage: 'https://picsum.photos/800/400?random=3',
    status: 'PUBLISHED', 
    createdAt: '2024-01-01T08:00:00Z', 
    updatedAt: '2024-02-28T11:20:00Z',
    publishedAt: '2024-01-05T10:00:00Z',
    author: 'John Doe',
    authorId: '3',
    categories: ['Legal'],
    tags: ['terms', 'legal', 'conditions'],
    seo: {
      title: 'Terms of Service | Nexus Admin',
      description: 'Our terms of service and conditions for using the Nexus Admin platform',
      keywords: ['terms', 'conditions', 'legal', 'agreement'],
      ogImage: 'https://picsum.photos/1200/630?random=3'
    },
    views: 892,
    version: 2
  },
  { 
    id: '4', 
    title: 'Privacy Policy', 
    slug: 'privacy-policy',
    content: '<h1>Privacy Policy</h1><p>How we handle your data...</p>',
    excerpt: 'Our commitment to protecting your privacy',
    featuredImage: 'https://picsum.photos/800/400?random=4',
    status: 'PUBLISHED', 
    createdAt: '2024-01-01T08:00:00Z', 
    updatedAt: '2024-03-01T09:15:00Z',
    publishedAt: '2024-01-05T10:00:00Z',
    author: 'Emma Wilson',
    authorId: '4',
    categories: ['Legal'],
    tags: ['privacy', 'data', 'gdpr'],
    seo: {
      title: 'Privacy Policy | Nexus Admin',
      description: 'Learn how we collect, use, and protect your personal information',
      keywords: ['privacy', 'data protection', 'gdpr', 'cookies'],
      ogImage: 'https://picsum.photos/1200/630?random=4'
    },
    views: 756,
    version: 2
  },
  { 
    id: '5', 
    title: 'Getting Started Guide', 
    slug: 'getting-started',
    content: '<h1>Getting Started with Nexus Admin</h1><p>A comprehensive guide...</p>',
    excerpt: 'Everything you need to know to get started',
    featuredImage: 'https://picsum.photos/800/400?random=5',
    status: 'PUBLISHED', 
    createdAt: '2024-02-10T13:00:00Z', 
    updatedAt: '2024-03-10T10:30:00Z',
    publishedAt: '2024-02-15T14:00:00Z',
    author: 'Michael Brown',
    authorId: '5',
    categories: ['Tutorials'],
    tags: ['guide', 'tutorial', 'beginner'],
    seo: {
      title: 'Getting Started Guide | Nexus Admin',
      description: 'A comprehensive guide to help you get started with Nexus Admin',
      keywords: ['getting started', 'guide', 'tutorial', 'beginner'],
      ogImage: 'https://picsum.photos/1200/630?random=5'
    },
    views: 2341,
    version: 1
  }
];

export const mockSettings: Setting[] = [
  { key: 'auth_session_timeout', description: 'Duration of an active user session.', value: '30 minutes', type: 'select' },
  { key: 'max_upload_size', description: 'Maximum file upload size.', value: '10 MB', type: 'text' },
  { key: 'enable_notifications', description: 'Enable email notifications.', value: 'true', type: 'boolean' },
  { key: 'company_name', description: 'Company name displayed in emails.', value: 'Nexus Store', type: 'text' },
];

// Dashboard stats
export const dashboardStats = {
  totalUsers: 4,
  publishedPages: mockContentPages.filter(p => p.status === 'PUBLISHED').length,
  storedDocuments: 3,
  totalProducts: mockProducts.reduce((acc, p) => acc + p.stock, 0),
};