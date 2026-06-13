export interface VillageInfo {
  id: number;
  name: string;
  subdistrict: string;
  regency: string;
  province: string;
  vision: string;
  mission: string[];
  history: string;
  area_hectares: number;
  population_total: number;
  family_total: number;
  established_year: number;
  updated_at: string;
}

export interface VillageOfficial {
  id: number;
  name: string;
  position: string;
  photo_url: string | null;
  phone: string | null;
  email: string | null;
  period_start: number;
  period_end: number;
  display_order: number;
  created_at: string;
}

export interface News {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'berita' | 'pengumuman' | 'kegiatan';
  image_url: string | null;
  author: string;
  views: number;
  is_featured: boolean;
  published_at: string;
  created_at: string;
}

export interface VillageProduct {
  id: number;
  name: string;
  description: string;
  category: 'kuliner' | 'kerajinan' | 'pertanian' | 'peternakan' | 'lainnya';
  price: number;
  image_url: string | null;
  seller_name: string;
  seller_phone: string;
  seller_address: string;
  is_featured: boolean;
  is_available: boolean;
  created_at: string;
}

export interface TourismSpot {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  address: string;
  ticket_price: number | null;
  opening_hours: string;
  facilities: string[];
  latitude: number | null;
  longitude: number | null;
  is_featured: boolean;
  created_at: string;
}

export interface FinancialReport {
  id: number;
  year: number;
  category: 'pendapatan' | 'belanja' | 'pembiayaan';
  subcategory: string;
  amount: number;
  description: string | null;
  created_at: string;
}

export interface VillageStatistics {
  id: number;
  year: number;
  population_male: number;
  population_female: number;
  family_count: number;
  rt_count: number;
  rw_count: number;
  houses_count: number;
  schools_count: number;
  health_facilities_count: number;
  worship_places_count: number;
  created_at: string;
}

export interface LetterType {
  id: number;
  name: string;
  requirements: string;
  processing_days: number;
  is_active: boolean;
  created_at: string;
}

export interface LetterRequest {
  id: number;
  citizen_id: number | null;
  letter_type: string;
  purpose: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  notes: string | null;
  processed_by: string | null;
  processed_at: string | null;
  created_at: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
