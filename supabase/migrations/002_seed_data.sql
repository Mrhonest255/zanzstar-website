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
