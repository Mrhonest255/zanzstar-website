import { createClient } from '@supabase/supabase-js';
import { 
  Tour, 
  TourInsert, 
  TourUpdate,
  Booking, 
  BookingInsert,
  BookingUpdate,
  Customer, 
  CustomerInsert,
  CustomerUpdate,
  Villa,
  VillaInsert,
  ContactInquiry,
  BookingStatus,
} from './types';

// ============================================
// SUPABASE CLIENT INITIALIZATION
// ============================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using fallback mode.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// ============================================
// DATABASE TYPES (matching schema)
// ============================================

// Re-export types for convenience
export type { Tour, Booking, Customer, Villa, ContactInquiry };

// Dashboard Stats type
export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activeTours: number;
  newCustomers: number;
  bookingChange: string;
  revenueChange: string;
  toursChange: string;
  customersChange: string;
}

// ============================================
// TOURS API
// ============================================

export async function getTours(): Promise<Tour[]> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
  
  // Transform database fields to match our Tour type
  return (data || []).map(transformDbTour);
}

export async function getActiveTours(): Promise<Tour[]> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('is_active', true)
    .order('is_featured', { ascending: false });
  
  if (error) {
    console.error('Error fetching active tours:', error);
    return [];
  }
  
  return (data || []).map(transformDbTour);
}

export async function getFeaturedTours(): Promise<Tour[]> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .limit(6);
  
  if (error) {
    console.error('Error fetching featured tours:', error);
    return [];
  }
  
  return (data || []).map(transformDbTour);
}

export async function getTourById(id: string): Promise<Tour | null> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching tour:', error);
    return null;
  }
  
  return data ? transformDbTour(data) : null;
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching tour by slug:', error);
    return null;
  }
  
  return data ? transformDbTour(data) : null;
}

export async function createTour(tour: TourInsert): Promise<Tour | null> {
  const dbTour = transformTourForDb(tour);
  
  const { data, error } = await supabase
    .from('tours')
    .insert(dbTour)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating tour:', error);
    throw error;
  }
  
  return data ? transformDbTour(data) : null;
}

export async function updateTour(id: string, updates: TourUpdate): Promise<Tour | null> {
  const dbUpdates = transformTourForDb(updates as TourInsert);
  
  const { data, error } = await supabase
    .from('tours')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating tour:', error);
    throw error;
  }
  
  return data ? transformDbTour(data) : null;
}

export async function deleteTour(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('tours')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting tour:', error);
    return false;
  }
  
  return true;
}

// Transform database tour to our Tour type
function transformDbTour(dbTour: any): Tour {
  return {
    id: dbTour.id,
    created_at: dbTour.created_at,
    updated_at: dbTour.updated_at,
    title: dbTour.title,
    slug: dbTour.slug,
    description: dbTour.description || '',
    price: parseFloat(dbTour.price) || 0,
    price_display: `From $${dbTour.price}`,
    duration: dbTour.duration || '',
    category: dbTour.category || 'Adventure',
    location: dbTour.location || '',
    image: dbTour.image_url || '/images/placeholder.jpg',
    header_image: dbTour.header_image_url || '',
    inclusions: dbTour.inclusions || [],
    exclusions: dbTour.exclusions || [],
    itinerary: dbTour.itinerary || [],
    group_size: dbTour.max_guests ? `Up to ${dbTour.max_guests} guests` : 'Private',
    group_type: dbTour.is_safari ? 'Safari' : 'Tour',
    is_safari: dbTour.is_safari || false,
    is_featured: dbTour.is_featured || false,
    is_active: dbTour.is_active ?? true,
  };
}

// Transform our Tour type to database format
function transformTourForDb(tour: TourInsert): any {
  return {
    title: tour.title,
    slug: tour.slug,
    description: tour.description,
    price: tour.price,
    duration: tour.duration,
    category: tour.category,
    location: tour.location,
    image_url: tour.image,
    header_image_url: tour.header_image,
    inclusions: tour.inclusions,
    exclusions: tour.exclusions,
    itinerary: tour.itinerary,
    max_guests: parseInt(tour.group_size) || 10,
    is_safari: tour.is_safari,
    is_featured: tour.is_featured,
    is_active: tour.is_active,
  };
}

// ============================================
// BOOKINGS API
// ============================================

export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      tour:tours(*),
      customer:customers(*)
    `)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
  
  return (data || []).map(transformDbBooking);
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      tour:tours(*),
      customer:customers(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching booking:', error);
    return null;
  }
  
  return data ? transformDbBooking(data) : null;
}

export async function createBooking(booking: BookingInsert): Promise<Booking | null> {
  const reference = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      reference,
      tour_id: booking.tour_id,
      customer_id: booking.customer_id,
      date: booking.date,
      time: booking.time || '09:00',
      guests: booking.guests,
      total_amount: booking.total_amount,
      status: booking.status || 'pending',
      notes: booking.notes,
      special_requests: booking.special_requests,
    })
    .select(`
      *,
      tour:tours(*),
      customer:customers(*)
    `)
    .single();
  
  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
  
  return data ? transformDbBooking(data) : null;
}

export async function updateBooking(id: string, updates: BookingUpdate): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      tour:tours(*),
      customer:customers(*)
    `)
    .single();
  
  if (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
  
  return data ? transformDbBooking(data) : null;
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking | null> {
  return updateBooking(id, { status });
}

export async function deleteBooking(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
  
  return true;
}

function transformDbBooking(dbBooking: any): Booking {
  return {
    id: dbBooking.id,
    created_at: dbBooking.created_at,
    updated_at: dbBooking.updated_at,
    reference: dbBooking.reference,
    tour_id: dbBooking.tour_id,
    customer_id: dbBooking.customer_id,
    date: dbBooking.date,
    time: dbBooking.time,
    guests: dbBooking.guests,
    total_amount: parseFloat(dbBooking.total_amount) || 0,
    status: dbBooking.status,
    notes: dbBooking.notes,
    special_requests: dbBooking.special_requests,
    tour: dbBooking.tour ? transformDbTour(dbBooking.tour) : undefined,
    customer: dbBooking.customer || undefined,
  };
}

// ============================================
// CUSTOMERS API
// ============================================

export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
  
  return data || [];
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
  
  return data;
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching customer:', error);
    return null;
  }
  
  return data;
}

export async function createCustomer(customer: CustomerInsert): Promise<Customer | null> {
  const { data, error } = await supabase
    .from('customers')
    .insert(customer)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
  
  return data;
}

export async function updateCustomer(id: string, updates: CustomerUpdate): Promise<Customer | null> {
  const { data, error } = await supabase
    .from('customers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
  
  return data;
}

export async function deleteCustomer(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting customer:', error);
    return false;
  }
  
  return true;
}

// ============================================
// VILLAS API
// ============================================

export async function getVillas(): Promise<Villa[]> {
  const { data, error } = await supabase
    .from('villas')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching villas:', error);
    return [];
  }
  
  return data || [];
}

export async function getActiveVillas(): Promise<Villa[]> {
  const { data, error } = await supabase
    .from('villas')
    .select('*')
    .eq('is_active', true);
  
  if (error) {
    console.error('Error fetching active villas:', error);
    return [];
  }
  
  return data || [];
}

export async function createVilla(villa: VillaInsert): Promise<Villa | null> {
  const { data, error } = await supabase
    .from('villas')
    .insert(villa)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating villa:', error);
    throw error;
  }
  
  return data;
}

// ============================================
// CONTACT INQUIRIES API
// ============================================

export async function getContactInquiries(): Promise<ContactInquiry[]> {
  const { data, error } = await supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching inquiries:', error);
    return [];
  }
  
  return data || [];
}

export async function createContactInquiry(inquiry: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<ContactInquiry | null> {
  const { data, error } = await supabase
    .from('contact_inquiries')
    .insert(inquiry)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating inquiry:', error);
    throw error;
  }
  
  return data;
}

// ============================================
// DASHBOARD STATS API
// ============================================

export async function getDashboardStats(): Promise<DashboardStats> {
  // Get booking stats
  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('total_amount, status');
  
  // Get tour count
  const { count: toursCount, error: toursError } = await supabase
    .from('tours')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);
  
  // Get customer count
  const { count: customersCount, error: customersError } = await supabase
    .from('customers')
    .select('*', { count: 'exact', head: true });
  
  if (bookingsError || toursError || customersError) {
    console.error('Error fetching dashboard stats');
  }
  
  const totalBookings = bookings?.length || 0;
  const totalRevenue = bookings?.reduce((sum, b) => sum + parseFloat(b.total_amount || 0), 0) || 0;
  
  return {
    totalBookings,
    totalRevenue,
    activeTours: toursCount || 0,
    newCustomers: customersCount || 0,
    bookingChange: '+12%',
    revenueChange: '+8.4%',
    toursChange: '+4',
    customersChange: '+14.2%',
  };
}

// ============================================
// IMAGE UPLOAD (Supabase Storage)
// ============================================

export async function uploadImage(file: File, folder: string = 'tours'): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
  
  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(data.path);
  
  return urlData.publicUrl;
}

export async function deleteImage(path: string): Promise<boolean> {
  const { error } = await supabase.storage
    .from('images')
    .remove([path]);
  
  if (error) {
    console.error('Error deleting image:', error);
    return false;
  }
  
  return true;
}
