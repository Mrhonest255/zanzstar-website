-- ============================================
-- ZANZSTAR Image Storage Setup
-- Run this in Supabase SQL Editor
-- ============================================

-- Create storage bucket for tour images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tour-images',
  'tour-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Drop existing storage policies first
DROP POLICY IF EXISTS "Public read access for tour images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload tour images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update tour images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete tour images" ON storage.objects;

-- Allow public read access to tour images
CREATE POLICY "Public read access for tour images"
ON storage.objects FOR SELECT
USING (bucket_id = 'tour-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload tour images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tour-images');

-- Allow authenticated users to update their images
CREATE POLICY "Authenticated users can update tour images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'tour-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete tour images"
ON storage.objects FOR DELETE
USING (bucket_id = 'tour-images');

-- ============================================
-- Add gallery column if not exists
-- ============================================
ALTER TABLE tours ADD COLUMN IF NOT EXISTS gallery TEXT[] DEFAULT '{}';

-- ============================================
-- Create function to auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tours table
DROP TRIGGER IF EXISTS update_tours_updated_at ON tours;
CREATE TRIGGER update_tours_updated_at
    BEFORE UPDATE ON tours
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to bookings table
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to customers table
DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- RLS Policies for tours table
-- ============================================
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Public can view active tours" ON tours;
DROP POLICY IF EXISTS "Admins can do everything with tours" ON tours;

-- Allow public read access to active tours
CREATE POLICY "Public can view active tours"
ON tours FOR SELECT
USING (is_active = true);

-- Allow all operations for authenticated users (admin)
CREATE POLICY "Admins can do everything with tours"
ON tours FOR ALL
USING (auth.role() = 'authenticated');

-- ============================================
-- RLS Policies for bookings table
-- ============================================
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Admins can view all bookings" ON bookings;
DROP POLICY IF EXISTS "Admins can manage bookings" ON bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;

-- Allow authenticated users to view all bookings
CREATE POLICY "Admins can view all bookings"
ON bookings FOR SELECT
USING (auth.role() = 'authenticated');

-- Allow authenticated users to manage bookings
CREATE POLICY "Admins can manage bookings"
ON bookings FOR ALL
USING (auth.role() = 'authenticated');

-- Allow anyone to create bookings (for public booking form)
CREATE POLICY "Anyone can create bookings"
ON bookings FOR INSERT
WITH CHECK (true);

-- ============================================
-- RLS Policies for customers table
-- ============================================
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Admins can view all customers" ON customers;
DROP POLICY IF EXISTS "Admins can manage customers" ON customers;
DROP POLICY IF EXISTS "Anyone can create customers" ON customers;

-- Allow authenticated users to view all customers
CREATE POLICY "Admins can view all customers"
ON customers FOR SELECT
USING (auth.role() = 'authenticated');

-- Allow authenticated users to manage customers
CREATE POLICY "Admins can manage customers"
ON customers FOR ALL
USING (auth.role() = 'authenticated');

-- Allow anyone to create customers (for public booking form)
CREATE POLICY "Anyone can create customers"
ON customers FOR INSERT
WITH CHECK (true);
