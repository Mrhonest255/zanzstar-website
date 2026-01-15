-- ============================================
-- ZANZSTAR Tours & Safari Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TOURS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  duration VARCHAR(100),
  category VARCHAR(100) NOT NULL DEFAULT 'Adventure',
  location VARCHAR(255),
  image_url TEXT,
  header_image_url TEXT,
  gallery TEXT[] DEFAULT '{}',
  inclusions TEXT[] DEFAULT '{}',
  exclusions TEXT[] DEFAULT '{}',
  itinerary JSONB DEFAULT '[]',
  max_guests INTEGER DEFAULT 10,
  min_guests INTEGER DEFAULT 1,
  is_safari BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  rating DECIMAL(2, 1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0
);

-- ============================================
-- CUSTOMERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100),
  total_bookings INTEGER DEFAULT 0,
  total_spent DECIMAL(10, 2) DEFAULT 0,
  is_vip BOOLEAN DEFAULT FALSE
);

-- ============================================
-- BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reference VARCHAR(50) UNIQUE NOT NULL,
  tour_id UUID REFERENCES tours(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  time VARCHAR(20) DEFAULT '09:00',
  guests INTEGER NOT NULL DEFAULT 1,
  total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  special_requests TEXT
);

-- ============================================
-- VILLAS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS villas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  location VARCHAR(255),
  price_per_night DECIMAL(10, 2) NOT NULL DEFAULT 0,
  bedrooms INTEGER DEFAULT 1,
  bathrooms INTEGER DEFAULT 1,
  max_guests INTEGER DEFAULT 2,
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE
);

-- ============================================
-- SITE SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(50) DEFAULT 'string'
);

-- ============================================
-- CONTACT INQUIRIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  tour_id UUID REFERENCES tours(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived'))
);

-- ============================================
-- MEDIA FILES TABLE (for image management)
-- ============================================
CREATE TABLE IF NOT EXISTS media_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  filename VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  type VARCHAR(50),
  size INTEGER,
  folder VARCHAR(100) DEFAULT 'general'
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_tours_slug ON tours(slug);
CREATE INDEX IF NOT EXISTS idx_tours_category ON tours(category);
CREATE INDEX IF NOT EXISTS idx_tours_is_active ON tours(is_active);
CREATE INDEX IF NOT EXISTS idx_tours_is_featured ON tours(is_featured);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_tour ON bookings(tour_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_villas_slug ON villas(slug);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_tours_updated_at BEFORE UPDATE ON tours
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_villas_updated_at BEFORE UPDATE ON villas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on all tables
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE villas ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;

-- Public read access for tours and villas (for website)
CREATE POLICY "Public can view active tours" ON tours
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active villas" ON villas
  FOR SELECT USING (is_active = true);

-- Anon users can insert contact inquiries
CREATE POLICY "Anyone can submit contact inquiries" ON contact_inquiries
  FOR INSERT WITH CHECK (true);

-- DEVELOPMENT: Allow all operations for anon key (replace with auth later)
CREATE POLICY "Allow all tours operations" ON tours FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all customers operations" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all bookings operations" ON bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all villas operations" ON villas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all settings operations" ON site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all inquiries operations" ON contact_inquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all media operations" ON media_files FOR ALL USING (true) WITH CHECK (true);
-- ============================================
-- ZANZSTAR Sample Data
-- ============================================

-- Insert sample tours
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, inclusions, exclusions, itinerary, is_safari, is_featured, is_active) VALUES
(
  'Stone Town Heritage Walk',
  'stone-town-heritage-walk',
  'Explore the UNESCO World Heritage Site of Stone Town with our expert local guides. Walk through centuries of history, from the House of Wonders to the Old Fort, and discover the rich cultural tapestry that makes Zanzibar unique.',
  'Discover the UNESCO World Heritage Site with expert guides.',
  50,
  '3-4 Hours',
  'Cultural',
  'Stone Town, Zanzibar',
  'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800',
  ARRAY['Professional English-speaking guide', 'Hotel pickup and drop-off', 'Entrance fees to museums', 'Traditional Swahili refreshments', 'Small group experience'],
  ARRAY['Gratuities', 'Personal expenses', 'Travel insurance'],
  '[{"day": "Day 1", "title": "Stone Town Exploration", "description": "Begin at the Old Fort, visit the House of Wonders, explore the spice markets, and end at a rooftop restaurant for sunset views."}]'::jsonb,
  false,
  true,
  true
),
(
  'Sunset Dhow Cruise',
  'sunset-dhow-cruise',
  'Sail into the sunset aboard a traditional Zanzibari dhow. Enjoy fresh seafood, tropical fruits, and refreshing drinks while watching the sun paint the Indian Ocean in shades of gold and crimson.',
  'Sail the Indian Ocean on a traditional dhow at sunset.',
  85,
  '3 Hours',
  'Nature',
  'Stone Town Harbor, Zanzibar',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
  ARRAY['Traditional dhow cruise', 'Fresh seafood dinner', 'Tropical fruits and snacks', 'Soft drinks and water', 'Live traditional music'],
  ARRAY['Alcoholic beverages', 'Gratuities', 'Hotel transfers'],
  '[{"day": "Evening", "title": "Sunset Sail", "description": "Board the dhow, enjoy the sunset cruise with dinner, and return to shore under the stars."}]'::jsonb,
  false,
  true,
  true
),
(
  'Serengeti Fly-In Safari',
  'serengeti-fly-in-safari',
  'Experience the ultimate African safari with a luxury fly-in trip to the Serengeti. Witness the Great Migration, spot the Big Five, and stay in world-class tented camps under the African sky.',
  'Luxury fly-in safari to witness the Great Migration.',
  2900,
  '3 Days / 2 Nights',
  'Safari',
  'Serengeti National Park, Tanzania',
  'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
  ARRAY['Round-trip flights from Zanzibar', 'Luxury tented camp accommodation', 'All meals and premium drinks', 'Private game drives', 'Park fees and conservation levies', 'Expert naturalist guide'],
  ARRAY['Travel insurance', 'Visa fees', 'Personal items', 'Gratuities'],
  '[{"day": "Day 1", "title": "Arrival & Afternoon Game Drive", "description": "Fly from Zanzibar to Serengeti. Afternoon game drive to spot wildlife. Sundowner drinks and dinner at camp."}, {"day": "Day 2", "title": "Full Day Safari", "description": "Early morning and afternoon game drives. Witness predators, the Great Migration, and African wildlife in their natural habitat."}, {"day": "Day 3", "title": "Morning Safari & Return", "description": "Final morning game drive before flying back to Zanzibar."}]'::jsonb,
  true,
  true,
  true
),
(
  'Spice Plantation Tour',
  'spice-plantation-tour',
  'Discover why Zanzibar is known as the Spice Island on this aromatic journey through working spice plantations. Smell, taste, and learn about cloves, vanilla, cinnamon, and more.',
  'Explore the aromatic world of Zanzibar spices.',
  45,
  '4 Hours',
  'Cultural',
  'Zanzibar Countryside',
  'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800',
  ARRAY['Guided plantation tour', 'Spice tasting session', 'Traditional lunch', 'Spice samples to take home', 'Hotel pickup and drop-off'],
  ARRAY['Gratuities', 'Additional purchases'],
  '[{"day": "Morning", "title": "Spice Discovery", "description": "Visit working spice plantations, learn about cultivation, enjoy tastings, and savor a traditional spice-infused lunch."}]'::jsonb,
  false,
  false,
  true
),
(
  'Mnemba Island Snorkeling',
  'mnemba-island-snorkeling',
  'Snorkel in the crystal-clear waters around Mnemba Atoll, home to some of the best coral reefs in East Africa. Swim with tropical fish, sea turtles, and dolphins.',
  'Snorkel in pristine waters with tropical marine life.',
  95,
  'Full Day',
  'Adventure',
  'Mnemba Atoll, Zanzibar',
  'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800',
  ARRAY['Boat transfer to Mnemba Atoll', 'Snorkeling equipment', 'Fresh seafood lunch on the beach', 'Drinks and snacks', 'Guide and safety briefing'],
  ARRAY['Underwater camera rental', 'Gratuities'],
  '[{"day": "Full Day", "title": "Mnemba Adventure", "description": "Boat ride to Mnemba Atoll, snorkeling sessions, beach BBQ lunch, and relaxation before returning."}]'::jsonb,
  false,
  true,
  true
),
(
  'Prison Island Tour',
  'prison-island-tour',
  'Visit historic Prison Island to meet the giant Aldabra tortoises, some over 100 years old. Explore the old prison ruins and enjoy the beautiful beach.',
  'Meet giant tortoises on historic Prison Island.',
  40,
  '3 Hours',
  'Wildlife',
  'Prison Island, Zanzibar',
  'https://images.unsplash.com/photo-1559666126-84f389727b9a?w=800',
  ARRAY['Boat transfer', 'Entrance fees', 'Guided tour', 'Time to swim and relax'],
  ARRAY['Gratuities', 'Food and drinks'],
  '[{"day": "Half Day", "title": "Prison Island", "description": "Boat to the island, tour the tortoise sanctuary, explore ruins, and enjoy the beach."}]'::jsonb,
  false,
  false,
  true
);
  true
);

-- Insert sample customers
INSERT INTO customers (email, first_name, last_name, phone, country, total_bookings, total_spent, is_vip) VALUES
('sarah.johnson@example.com', 'Sarah', 'Johnson', '+1 555-0123', 'United States', 3, 650.00, false),
('michael.chen@example.com', 'Michael', 'Chen', '+44 20 7123 4567', 'United Kingdom', 8, 15200.00, true),
('elena.rossi@example.com', 'Elena', 'Rossi', '+39 02 1234 5678', 'Italy', 2, 420.00, false),
('david.miller@example.com', 'David', 'Miller', '+1 555-9876', 'United States', 1, 90.00, false),
('james.brown@example.com', 'James', 'Brown', '+61 2 1234 5678', 'Australia', 5, 8900.00, true);

-- Insert sample bookings (we'll need to reference the tour and customer IDs)
-- First, let's create a function to get IDs and insert bookings
DO $$
DECLARE
  tour1_id UUID;
  tour2_id UUID;
  tour3_id UUID;
  cust1_id UUID;
  cust2_id UUID;
  cust3_id UUID;
BEGIN
  SELECT id INTO tour1_id FROM tours WHERE slug = 'stone-town-heritage-walk' LIMIT 1;
  SELECT id INTO tour2_id FROM tours WHERE slug = 'sunset-dhow-cruise' LIMIT 1;
  SELECT id INTO tour3_id FROM tours WHERE slug = 'serengeti-fly-in-safari' LIMIT 1;
  SELECT id INTO cust1_id FROM customers WHERE email = 'sarah.johnson@example.com' LIMIT 1;
  SELECT id INTO cust2_id FROM customers WHERE email = 'michael.chen@example.com' LIMIT 1;
  SELECT id INTO cust3_id FROM customers WHERE email = 'elena.rossi@example.com' LIMIT 1;
  
  INSERT INTO bookings (reference, tour_id, customer_id, date, time, guests, total_amount, status, notes) VALUES
  ('BK-8421', tour1_id, cust1_id, '2026-01-15', '09:00', 2, 100.00, 'confirmed', 'Anniversary trip'),
  ('BK-8422', tour3_id, cust2_id, '2026-01-18', '06:00', 4, 11600.00, 'pending', 'VIP client - special arrangements'),
  ('BK-8423', tour2_id, cust3_id, '2026-01-14', '16:30', 2, 170.00, 'completed', NULL),
  ('BK-8424', tour1_id, cust1_id, '2026-01-20', '10:00', 3, 150.00, 'cancelled', 'Customer requested cancellation'),
  ('BK-8425', tour2_id, cust2_id, '2026-02-02', '17:00', 6, 510.00, 'confirmed', 'Group booking');
END $$;

-- Insert default site settings
INSERT INTO site_settings (key, value, type) VALUES
('site_name', 'ZANZSTAR', 'string'),
('tagline', 'Premium Tours & Safari', 'string'),
('contact_email', 'info@zanzstar.com', 'string'),
('contact_phone', '+255 123 456 789', 'string'),
('whatsapp_number', '+255 123 456 789', 'string'),
('address', 'Stone Town, Zanzibar, Tanzania', 'string'),
('facebook_url', 'https://facebook.com/zanzstar', 'string'),
('instagram_url', 'https://instagram.com/zanzstar', 'string'),
('primary_color', '#2d5a52', 'string'),
('booking_enabled', 'true', 'boolean'),
('maintenance_mode', 'false', 'boolean');
