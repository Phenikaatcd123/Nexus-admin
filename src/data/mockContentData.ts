// src/data/mockContentData.ts
import { ContentPage, ContentCategory } from '../types';

export const mockContentCategories: ContentCategory[] = [
  { id: '1', name: 'News', slug: 'news', description: 'Company news and announcements', count: 12 },
  { id: '2', name: 'Blog', slug: 'blog', description: 'Articles and blog posts', count: 24 },
  { id: '3', name: 'Product Updates', slug: 'product-updates', description: 'New product announcements', count: 8 },
  { id: '4', name: 'Tutorials', slug: 'tutorials', description: 'How-to guides and tutorials', count: 15 },
  { id: '5', name: 'Events', slug: 'events', description: 'Upcoming events and webinars', count: 6 },
];

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