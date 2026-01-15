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
  MediaFile,
  SiteSetting,
  BookingStatus,
  TourCategory
} from './types';

// ============================================
// MOCK DATA - Replace with Supabase calls
// ============================================

// Mock Tours Data
const mockTours: Tour[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    slug: 'tour-stone-town',
    title: 'Stone Town Heritage Walk',
    description: 'Immerse yourself in the winding alleys of the UNESCO World Heritage site.',
    image: 'https://images.unsplash.com/photo-1544644181-14e3532c6680?q=80&w=800',
    header_image: 'https://images.unsplash.com/photo-1544644181-14e3532c6680?q=80&w=2670',
    price: 50,
    price_display: 'From $50',
    duration: '3 - 4 Hours',
    group_type: 'Private Tour',
    group_size: 'Private / Couples',
    location: 'Stone Town, Zanzibar City',
    category: 'Culture',
    is_safari: false,
    is_featured: true,
    is_active: true,
    itinerary: [
      { time: '09:00 AM', event: 'Pickup from your hotel' },
      { time: '09:30 AM', event: 'Visit House of Wonders' },
    ],
    inclusions: ['Private guide', 'Entrance fees', 'Water'],
    exclusions: ['Lunch', 'Tips'],
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    slug: 'tour-sunset-cruise',
    title: 'Private Sunset Cruise',
    description: 'Sail into the golden hour on a traditional wooden Swahili Dhow.',
    image: 'https://images.unsplash.com/photo-1620330101962-d35ed5f21223?q=80&w=800',
    header_image: 'https://images.unsplash.com/photo-1620330101962-d35ed5f21223?q=80&w=2670',
    price: 70,
    price_display: 'From $70',
    duration: '3 Hours',
    group_type: 'Private Boat',
    group_size: 'Up to 6 guests',
    location: 'Stone Town Waterfront',
    category: 'Nature',
    is_safari: false,
    is_featured: true,
    is_active: true,
    itinerary: [],
    inclusions: ['Dhow hire', 'Refreshments'],
    exclusions: ['Alcoholic beverages'],
  },
  {
    id: '3',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    slug: 'serengeti-fly-in-safari',
    title: 'Serengeti Fly-in Safari',
    description: '3-day luxury fly-in safari to witness the Great Migration.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800',
    header_image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2670',
    price: 2500,
    price_display: 'From $2,500',
    duration: '3 Days',
    group_type: 'Private Safari',
    group_size: '2-6 guests',
    location: 'Serengeti National Park',
    category: 'Safari',
    is_safari: true,
    is_featured: true,
    is_active: true,
    itinerary: [],
    inclusions: ['Flights', 'Accommodation', 'Game drives'],
    exclusions: ['Visa fees', 'Travel insurance'],
  },
];

// Mock Bookings Data
const mockBookings: Booking[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    reference: 'BK-8421',
    tour_id: '1',
    customer_id: '1',
    date: '2026-01-15',
    time: '09:00',
    guests: 2,
    total_amount: 150,
    status: 'confirmed',
    notes: '',
    customer: { id: '1', email: 'sarah@example.com', first_name: 'Sarah', last_name: 'Johnson' } as Customer,
    tour: mockTours[0],
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    reference: 'BK-8422',
    tour_id: '3',
    customer_id: '2',
    date: '2026-01-18',
    time: '06:00',
    guests: 4,
    total_amount: 2900,
    status: 'pending',
    customer: { id: '2', email: 'michael@example.com', first_name: 'Michael', last_name: 'Chen' } as Customer,
    tour: mockTours[2],
  },
  {
    id: '3',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    reference: 'BK-8423',
    tour_id: '2',
    customer_id: '3',
    date: '2026-01-14',
    time: '16:30',
    guests: 2,
    total_amount: 210,
    status: 'completed',
    customer: { id: '3', email: 'elena@example.com', first_name: 'Elena', last_name: 'Rossi' } as Customer,
    tour: mockTours[1],
  },
];

// Mock Customers Data
const mockCustomers: Customer[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    email: 'sarah@example.com',
    first_name: 'Sarah',
    last_name: 'Johnson',
    phone: '+1 555-0123',
    country: 'United States',
    total_bookings: 3,
    total_spent: 450,
    is_vip: false,
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    email: 'michael@example.com',
    first_name: 'Michael',
    last_name: 'Chen',
    phone: '+44 20 7123 4567',
    country: 'United Kingdom',
    total_bookings: 5,
    total_spent: 8500,
    is_vip: true,
  },
];

// ============================================
// SUPABASE CLIENT PLACEHOLDER
// ============================================

// TODO: Replace with actual Supabase client
// import { createClient } from '@supabase/supabase-js'
// import { Database } from './types'
// 
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// 
// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// ============================================
// TOURS API
// ============================================

export async function getTours(): Promise<Tour[]> {
  // TODO: Replace with Supabase
  // const { data, error } = await supabase.from('tours').select('*').order('created_at', { ascending: false })
  // if (error) throw error
  // return data
  
  return mockTours;
}

export async function getTourById(id: string): Promise<Tour | null> {
  // TODO: Replace with Supabase
  // const { data, error } = await supabase.from('tours').select('*').eq('id', id).single()
  // if (error) return null
  // return data
  
  return mockTours.find(t => t.id === id) || null;
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  // TODO: Replace with Supabase
  // const { data, error } = await supabase.from('tours').select('*').eq('slug', slug).single()
  // if (error) return null
  // return data
  
  return mockTours.find(t => t.slug === slug) || null;
}

export async function createTour(tour: TourInsert): Promise<Tour> {
  // TODO: Replace with Supabase
  // const { data, error } = await supabase.from('tours').insert(tour).select().single()
  // if (error) throw error
  // return data
  
  const newTour: Tour = {
    id: String(mockTours.length + 1),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...tour,
    image: tour.image || '',
    header_image: tour.header_image || '',
    is_safari: tour.is_safari || false,
    is_featured: tour.is_featured || false,
    is_active: tour.is_active !== false,
    itinerary: tour.itinerary || [],
    inclusions: tour.inclusions || [],
    exclusions: tour.exclusions || [],
  };
  mockTours.push(newTour);
  return newTour;
}

export async function updateTour(id: string, updates: TourUpdate): Promise<Tour> {
  // TODO: Replace with Supabase
  // const { data, error } = await supabase.from('tours').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  // if (error) throw error
  // return data
  
  const index = mockTours.findIndex(t => t.id === id);
  if (index === -1) throw new Error('Tour not found');
  mockTours[index] = { ...mockTours[index], ...updates, updated_at: new Date().toISOString() };
  return mockTours[index];
}

export async function deleteTour(id: string): Promise<void> {
  // TODO: Replace with Supabase
  // const { error } = await supabase.from('tours').delete().eq('id', id)
  // if (error) throw error
  
  const index = mockTours.findIndex(t => t.id === id);
  if (index !== -1) mockTours.splice(index, 1);
}

// ============================================
// BOOKINGS API
// ============================================

export async function getBookings(): Promise<Booking[]> {
  // TODO: Replace with Supabase with joins
  // const { data, error } = await supabase
  //   .from('bookings')
  //   .select('*, tour:tours(*), customer:customers(*)')
  //   .order('created_at', { ascending: false })
  // if (error) throw error
  // return data
  
  return mockBookings;
}

export async function getBookingById(id: string): Promise<Booking | null> {
  return mockBookings.find(b => b.id === id) || null;
}

export async function createBooking(booking: BookingInsert): Promise<Booking> {
  // TODO: Replace with Supabase
  const newBooking: Booking = {
    id: String(mockBookings.length + 1),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    reference: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    tour_id: booking.tour_id,
    customer_id: booking.customer_id,
    date: booking.date,
    time: booking.time || '09:00',
    guests: booking.guests,
    total_amount: booking.total_amount,
    status: booking.status || 'pending',
    notes: booking.notes,
    special_requests: booking.special_requests,
  };
  mockBookings.push(newBooking);
  return newBooking;
}

export async function updateBooking(id: string, updates: BookingUpdate): Promise<Booking> {
  const index = mockBookings.findIndex(b => b.id === id);
  if (index === -1) throw new Error('Booking not found');
  mockBookings[index] = { ...mockBookings[index], ...updates, updated_at: new Date().toISOString() };
  return mockBookings[index];
}

export async function deleteBooking(id: string): Promise<void> {
  const index = mockBookings.findIndex(b => b.id === id);
  if (index !== -1) mockBookings.splice(index, 1);
}

// ============================================
// CUSTOMERS API
// ============================================

export async function getCustomers(): Promise<Customer[]> {
  return mockCustomers;
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  return mockCustomers.find(c => c.id === id) || null;
}

export async function createCustomer(customer: CustomerInsert): Promise<Customer> {
  const newCustomer: Customer = {
    id: String(mockCustomers.length + 1),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...customer,
    total_bookings: 0,
    total_spent: 0,
    is_vip: false,
  };
  mockCustomers.push(newCustomer);
  return newCustomer;
}

// ============================================
// STATS API
// ============================================

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

export async function getDashboardStats(): Promise<DashboardStats> {
  // TODO: Replace with actual Supabase aggregation queries
  return {
    totalBookings: mockBookings.length,
    totalRevenue: mockBookings.reduce((sum, b) => sum + b.total_amount, 0),
    activeTours: mockTours.filter(t => t.is_active).length,
    newCustomers: mockCustomers.length,
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
  // TODO: Replace with Supabase Storage
  // const fileName = `${folder}/${Date.now()}-${file.name}`
  // const { data, error } = await supabase.storage.from('images').upload(fileName, file)
  // if (error) throw error
  // const { data: urlData } = supabase.storage.from('images').getPublicUrl(data.path)
  // return urlData.publicUrl
  
  // Mock: Return a placeholder URL
  console.log('Mock upload:', file.name, 'to', folder);
  return `https://images.unsplash.com/photo-1544644181-14e3532c6680?q=80&w=800`;
}

export async function deleteImage(url: string): Promise<void> {
  // TODO: Replace with Supabase Storage
  // const path = url.split('/').pop()
  // const { error } = await supabase.storage.from('images').remove([path])
  // if (error) throw error
  
  console.log('Mock delete image:', url);
}

// ============================================
// EXPORT TYPES FOR CONVENIENCE
// ============================================

export type { 
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
  MediaFile,
  SiteSetting,
  BookingStatus,
  TourCategory
};
