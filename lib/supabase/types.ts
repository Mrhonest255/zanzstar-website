// Supabase Database Types for ZANZSTAR
// These types define the structure for the database tables

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ============== TOURS ==============
export interface Tour {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  header_image: string;
  gallery?: string[];
  price: number;
  price_display: string;
  duration: string;
  group_type: string;
  group_size: string;
  location: string;
  category: TourCategory;
  is_safari: boolean;
  is_featured: boolean;
  is_active: boolean;
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
}

export interface ItineraryItem {
  time: string;
  event: string;
}

export type TourCategory = 
  | 'Culture' 
  | 'Nature' 
  | 'Adventure' 
  | 'Wildlife' 
  | 'Beach' 
  | 'Safari'
  | 'Luxury';

export interface TourInsert {
  slug: string;
  title: string;
  description: string;
  image?: string;
  header_image?: string;
  gallery?: string[];
  price: number;
  price_display: string;
  duration: string;
  group_type: string;
  group_size: string;
  location: string;
  category: TourCategory;
  is_safari?: boolean;
  is_featured?: boolean;
  is_active?: boolean;
  itinerary?: ItineraryItem[];
  inclusions?: string[];
  exclusions?: string[];
}

export interface TourUpdate extends Partial<TourInsert> {
  updated_at?: string;
}

// ============== BOOKINGS ==============
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  created_at: string;
  updated_at: string;
  reference: string;
  tour_id: string;
  customer_id: string;
  date: string;
  time: string;
  guests: number;
  total_amount: number;
  status: BookingStatus;
  notes?: string;
  special_requests?: string;
  // Joined data
  tour?: Tour;
  customer?: Customer;
}

export interface BookingInsert {
  tour_id: string;
  customer_id: string;
  date: string;
  time?: string;
  guests: number;
  total_amount: number;
  status?: BookingStatus;
  notes?: string;
  special_requests?: string;
}

export interface BookingUpdate extends Partial<BookingInsert> {
  updated_at?: string;
}

// ============== CUSTOMERS ==============
export interface Customer {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  country?: string;
  avatar_url?: string;
  total_bookings: number;
  total_spent: number;
  is_vip: boolean;
  notes?: string;
}

export interface CustomerInsert {
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  country?: string;
  avatar_url?: string;
}

export interface CustomerUpdate extends Partial<CustomerInsert> {
  updated_at?: string;
  is_vip?: boolean;
  notes?: string;
}

// ============== VILLAS ==============
export interface Villa {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  name: string;
  description: string;
  location: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  amenities: string[];
  images: string[];
  is_featured: boolean;
  is_active: boolean;
}

export interface VillaInsert {
  slug: string;
  name: string;
  description: string;
  location: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  amenities?: string[];
  images?: string[];
  is_featured?: boolean;
  is_active?: boolean;
}

// ============== SETTINGS ==============
export interface SiteSetting {
  id: string;
  key: string;
  value: Json;
  description?: string;
  updated_at: string;
}

// ============== MEDIA ==============
export interface MediaFile {
  id: string;
  created_at: string;
  name: string;
  url: string;
  size: number;
  type: string;
  folder?: string;
  alt_text?: string;
  uploaded_by?: string;
}

// ============== CONTACT INQUIRIES ==============
export interface ContactInquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  tour_id?: string;
  is_read: boolean;
  replied_at?: string;
}

// ============== DATABASE SCHEMA ==============
export interface Database {
  public: {
    Tables: {
      tours: {
        Row: Tour;
        Insert: TourInsert;
        Update: TourUpdate;
      };
      bookings: {
        Row: Booking;
        Insert: BookingInsert;
        Update: BookingUpdate;
      };
      customers: {
        Row: Customer;
        Insert: CustomerInsert;
        Update: CustomerUpdate;
      };
      villas: {
        Row: Villa;
        Insert: VillaInsert;
        Update: Partial<VillaInsert>;
      };
      settings: {
        Row: SiteSetting;
        Insert: Omit<SiteSetting, 'id' | 'updated_at'>;
        Update: Partial<SiteSetting>;
      };
      media: {
        Row: MediaFile;
        Insert: Omit<MediaFile, 'id' | 'created_at'>;
        Update: Partial<MediaFile>;
      };
      contact_inquiries: {
        Row: ContactInquiry;
        Insert: Omit<ContactInquiry, 'id' | 'created_at' | 'is_read'>;
        Update: Partial<ContactInquiry>;
      };
    };
  };
}
