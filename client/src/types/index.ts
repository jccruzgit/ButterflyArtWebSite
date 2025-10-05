export type Category = { id: string; name: string; slug: string; icon?: string; order?: number }
export type ProductImage = { url: string; alt: string; width?: number; height?: number; variant?: 'cover'|'card'|'thumb' }
export type Product = {
  id: string; title: string; slug: string; categoryId: string; description?: string;
  materials?: string; size?: string; leadTimeDays?: number; priceMin?: number; priceMax?: number;
  customizable?: boolean; images?: ProductImage[]; tags?: string[]; status: 'draft'|'published';
  createdAt?: number; updatedAt?: number
}
export type Testimonial = { id: string; author: string; text: string; rating?: number; createdAt?: number }
export type Order = {
  id: string; customerName: string; email: string; description: string;
  colors?: string[]; refImageUrl?: string; desiredDate?: string;
  status: 'new'|'in_review'|'quoted'|'in_progress'|'done'; createdAt?: number
}
