-- ============================================
-- ZANZSTAR - Clear Mock Data and Reset for Production
-- Run this SQL in Supabase SQL Editor to remove example data
-- ============================================

-- First, let's see what data exists
-- SELECT * FROM customers;
-- SELECT * FROM bookings;

-- OPTION 1: DELETE ALL MOCK DATA (Uncomment to run)
-- This will delete all customers with @example.com emails and their bookings

-- Delete bookings linked to mock customers first
DELETE FROM bookings 
WHERE customer_id IN (
    SELECT id FROM customers 
    WHERE email LIKE '%@example.com'
);

-- Delete mock customers
DELETE FROM customers 
WHERE email LIKE '%@example.com';

-- OPTION 2: DELETE ALL DATA AND START FRESH (Uncomment to run)
-- WARNING: This deletes ALL data - use only if you want to start completely fresh

-- TRUNCATE bookings CASCADE;
-- TRUNCATE customers CASCADE;
-- Note: Tours should be kept as they are actual tour offerings

-- ============================================
-- After clearing, you can verify with:
-- SELECT COUNT(*) FROM customers;
-- SELECT COUNT(*) FROM bookings;
-- ============================================
