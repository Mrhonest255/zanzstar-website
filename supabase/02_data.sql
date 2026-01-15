-- ============================================
-- ZANZSTAR Tours Data
-- ============================================

-- Safari Blue
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Safari Blue Full Day Experience',
  'safari-blue-full-day',
  'Experience the ultimate marine adventure with Safari Blue! Sail on traditional dhows through the crystal-clear waters of Menai Bay, snorkel in pristine coral reefs, visit sandbanks that appear at low tide, and enjoy a fresh seafood feast on a secluded beach.',
  'Ultimate marine adventure with dhow cruise, snorkeling, and seafood feast.',
  85,
  'Full Day (8 Hours)',
  'Beach',
  'Fumba, Zanzibar',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b3/b1/c3/the-original-safari-blue.jpg?w=1200&h=900&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b3/b1/c3/the-original-safari-blue.jpg?w=1200&h=900&s=1',
  ARRAY['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b3/b1/c3/the-original-safari-blue.jpg?w=1200&h=900&s=1', 'https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg'],
  ARRAY['Hotel pickup', 'Traditional dhow cruise', 'Snorkeling equipment', 'Fresh seafood lunch', 'Professional guide'],
  ARRAY['Alcoholic beverages', 'Tips', 'Travel insurance'],
  '[{"time": "07:30 AM", "event": "Pickup from hotel"}, {"time": "08:30 AM", "event": "Board dhow"}, {"time": "12:30 PM", "event": "Seafood lunch"}, {"time": "04:00 PM", "event": "Return"}]'::JSONB,
  FALSE, TRUE, TRUE
);

-- Nakupenda Sandbank
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Nakupenda Sandbank Tour',
  'nakupenda-sandbank-tour',
  'Discover Nakupenda - meaning I Love You in Swahili - a stunning sandbank that emerges from the Indian Ocean at low tide. This pristine stretch of white sand surrounded by turquoise waters is pure paradise.',
  'Paradise sandbank with I Love You meaning - white sand, turquoise waters.',
  50,
  'Half Day (5 Hours)',
  'Beach',
  'Stone Town, Zanzibar',
  'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/dc/04/45.jpg',
  'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/dc/04/45.jpg',
  ARRAY['https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/dc/04/45.jpg', 'https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg'],
  ARRAY['Boat transfer', 'Beach mat', 'Fresh seafood lunch', 'Snorkeling gear', 'Guide'],
  ARRAY['Alcoholic drinks', 'Tips', 'Personal expenses'],
  '[{"time": "09:00 AM", "event": "Pickup from hotel"}, {"time": "10:00 AM", "event": "Arrive at sandbank"}, {"time": "12:00 PM", "event": "Seafood lunch"}, {"time": "02:00 PM", "event": "Return"}]'::JSONB,
  FALSE, TRUE, TRUE
);

-- Mnemba Island
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Mnemba Island Snorkeling',
  'mnemba-island-snorkeling',
  'Snorkel in the crystal-clear waters around Mnemba Atoll, home to some of the best coral reefs in East Africa. Swim with tropical fish, sea turtles, and dolphins in this protected marine area.',
  'World-class snorkeling at pristine Mnemba Atoll with turtles and dolphins.',
  95,
  'Full Day',
  'Adventure',
  'Mnemba Atoll, Zanzibar',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ff/7d/42/caption.jpg?w=1200&h=-1&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ff/7d/42/caption.jpg?w=1200&h=-1&s=1',
  ARRAY['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ff/7d/42/caption.jpg?w=1200&h=-1&s=1', 'https://images.pexels.com/photos/1645028/pexels-photo-1645028.jpeg'],
  ARRAY['Boat transfer', 'Snorkeling equipment', 'Seafood lunch', 'Marine guide'],
  ARRAY['Camera rental', 'Tips', 'Marine park fees'],
  '[{"time": "07:00 AM", "event": "Pickup"}, {"time": "09:30 AM", "event": "First snorkeling"}, {"time": "12:30 PM", "event": "Lunch"}, {"time": "04:00 PM", "event": "Return"}]'::JSONB,
  FALSE, TRUE, TRUE
);

-- Stone Town Walking
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Stone Town Private Walking Tour',
  'stone-town-walking-tour',
  'Explore the UNESCO World Heritage Site of Stone Town with our expert local guides. Walk through centuries of history, from the House of Wonders to the Old Fort.',
  'UNESCO World Heritage walking tour with expert guides.',
  40,
  '3-4 Hours',
  'Culture',
  'Stone Town, Zanzibar',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/30/34/de/caption.jpg?w=500&h=400&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/30/34/de/caption.jpg?w=500&h=400&s=1',
  ARRAY['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/30/34/de/caption.jpg?w=500&h=400&s=1', 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg'],
  ARRAY['Professional guide', 'Hotel pickup', 'Entrance fees', 'Bottled water'],
  ARRAY['Lunch', 'Tips', 'Souvenirs'],
  '[{"time": "09:00 AM", "event": "Meet guide"}, {"time": "09:15 AM", "event": "Old Fort"}, {"time": "10:45 AM", "event": "Slave Market"}, {"time": "12:30 PM", "event": "End tour"}]'::JSONB,
  FALSE, TRUE, TRUE
);

-- Jozani Forest
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Jozani Forest Tour',
  'jozani-forest-tour',
  'Visit Zanzibars only national park and encounter the rare Red Colobus Monkeys found nowhere else on Earth. Walk through ancient mahogany forest and explore unique mangrove boardwalks.',
  'Encounter rare Red Colobus Monkeys in Zanzibars only national park.',
  35,
  '3 Hours',
  'Wildlife',
  'Jozani Chwaka Bay National Park',
  'https://www.zanzibar-tours.co.tz/wp-content/uploads/2024/11/tour_gallery_42.jpg',
  'https://www.zanzibar-tours.co.tz/wp-content/uploads/2024/11/tour_gallery_42.jpg',
  ARRAY['https://www.zanzibar-tours.co.tz/wp-content/uploads/2024/11/tour_gallery_42.jpg', 'https://images.pexels.com/photos/4577816/pexels-photo-4577816.jpeg'],
  ARRAY['Hotel pickup', 'Park entrance fees', 'Professional guide', 'Bottled water'],
  ARRAY['Tips', 'Lunch', 'Personal expenses'],
  '[{"time": "09:00 AM", "event": "Pickup"}, {"time": "10:00 AM", "event": "Forest walk"}, {"time": "11:00 AM", "event": "Mangrove trail"}, {"time": "12:00 PM", "event": "Return"}]'::JSONB,
  FALSE, TRUE, TRUE
);

-- Prison Island
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Prison Island Tour',
  'prison-island-tour',
  'Visit historic Prison Island to meet the giant Aldabra tortoises, some over 190 years old. Explore the old prison ruins built in 1893.',
  'Meet giant Aldabra tortoises on historic Prison Island.',
  40,
  '3 Hours',
  'Wildlife',
  'Prison Island (Changuu)',
  'https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/8a/85/05.jpg',
  'https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/8a/85/05.jpg',
  ARRAY['https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/8a/85/05.jpg', 'https://images.pexels.com/photos/789630/pexels-photo-789630.jpeg'],
  ARRAY['Boat transfer', 'Entrance fees', 'Guided tour', 'Snorkeling gear'],
  ARRAY['Tips', 'Food and drinks', 'Personal expenses'],
  '[{"time": "09:00 AM", "event": "Boat departure"}, {"time": "09:45 AM", "event": "Meet tortoises"}, {"time": "11:00 AM", "event": "Swimming"}, {"time": "12:00 PM", "event": "Return"}]'::JSONB,
  FALSE, FALSE, TRUE
);

-- Dolphin Kizimkazi
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Dolphin Tour Kizimkazi',
  'dolphin-tour-kizimkazi',
  'An unforgettable journey to swim with dolphins in their natural habitat. Head to the Kizimkazi coast for a chance to witness bottlenose and spinner dolphins up close.',
  'Swim with dolphins in their natural habitat at Kizimkazi.',
  70,
  'Half Day',
  'Wildlife',
  'Kizimkazi, South Zanzibar',
  'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
  'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
  ARRAY['https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg', 'https://images.pexels.com/photos/64219/dolphin-marine-mammals-water-sea-64219.jpeg'],
  ARRAY['Round-trip transport', 'Boat captain', 'Snorkeling equipment', 'Life jackets'],
  ARRAY['Lunch', 'Tips', 'Marine park fees'],
  '[{"time": "06:00 AM", "event": "Early pickup"}, {"time": "08:00 AM", "event": "Dolphin search"}, {"time": "10:00 AM", "event": "Snorkeling"}, {"time": "12:00 PM", "event": "Return"}]'::JSONB,
  FALSE, FALSE, TRUE
);

-- Spice Tour
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Spice Tour',
  'spice-tour',
  'Discover why Zanzibar is known as the Spice Island on this aromatic journey through working spice plantations. Smell, taste, and learn about cloves, vanilla, cinnamon, and more.',
  'Aromatic journey through Zanzibars famous spice plantations.',
  35,
  '3-4 Hours',
  'Culture',
  'Zanzibar Countryside',
  'https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg',
  'https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg',
  ARRAY['https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg', 'https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg'],
  ARRAY['Guided plantation tour', 'Spice tasting', 'Traditional lunch', 'Spice samples', 'Hotel pickup'],
  ARRAY['Tips', 'Additional purchases', 'Personal expenses'],
  '[{"time": "09:00 AM", "event": "Pickup"}, {"time": "09:45 AM", "event": "Plantation tour"}, {"time": "11:15 AM", "event": "Lunch"}, {"time": "01:00 PM", "event": "Return"}]'::JSONB,
  FALSE, FALSE, TRUE
);

-- Kuza Cave
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Kuza Cave Adventure',
  'kuza-cave-adventure',
  'Discover the hidden gem of Kuza Cave, a stunning natural limestone cave with crystal-clear underground water. Swim in the cool, refreshing waters surrounded by stalactites.',
  'Swim in crystal-clear underground cave waters.',
  25,
  '2-3 Hours',
  'Adventure',
  'Paje, East Zanzibar',
  'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg',
  'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg',
  ARRAY['https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg', 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg'],
  ARRAY['Transport', 'Entrance fees', 'Guide', 'Towel', 'Bottled water'],
  ARRAY['Lunch', 'Tips', 'Underwater camera'],
  '[{"time": "09:00 AM", "event": "Pickup"}, {"time": "10:00 AM", "event": "Cave exploration"}, {"time": "11:30 AM", "event": "Swimming"}, {"time": "12:00 PM", "event": "Return"}]'::JSONB,
  FALSE, FALSE, TRUE
);

-- Mtende Secret Beach
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Mtende Secret Beach',
  'mtende-secret-beach',
  'Escape to the untouched paradise of Mtende Secret Beach, one of Zanzibars best-kept secrets. This pristine stretch of white sand is perfect for those seeking tranquility.',
  'Hidden paradise beach away from the crowds.',
  45,
  'Half Day',
  'Beach',
  'Mtende, Southeast Zanzibar',
  'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg',
  'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg',
  ARRAY['https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg', 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg'],
  ARRAY['Transport', 'Beach mat', 'Seafood lunch', 'Drinks', 'Guide'],
  ARRAY['Tips', 'Personal expenses'],
  '[{"time": "09:00 AM", "event": "Pickup"}, {"time": "10:00 AM", "event": "Beach arrival"}, {"time": "12:30 PM", "event": "Lunch"}, {"time": "02:00 PM", "event": "Return"}]'::JSONB,
  FALSE, FALSE, TRUE
);

-- Village Cultural Tour
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Village Cultural Tour',
  'village-cultural-tour',
  'Experience authentic Zanzibari village life! Visit local families, learn traditional crafts, see how palm wine is made, and participate in daily village activities.',
  'Immersive experience of authentic Zanzibari village life.',
  40,
  '4 Hours',
  'Culture',
  'Rural Zanzibar',
  'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
  'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
  ARRAY['https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg', 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg'],
  ARRAY['Transport', 'Local guide', 'Traditional lunch', 'Cultural activities', 'Village donations'],
  ARRAY['Tips', 'Personal purchases'],
  '[{"time": "09:00 AM", "event": "Pickup"}, {"time": "10:00 AM", "event": "Village tour"}, {"time": "11:30 AM", "event": "Craft making"}, {"time": "12:15 PM", "event": "Lunch"}, {"time": "01:00 PM", "event": "Return"}]'::JSONB,
  FALSE, FALSE, TRUE
);

-- Maalum Cave
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Maalum Cave Exploration',
  'maalum-cave-exploration',
  'Discover the magical Maalum Cave, a natural wonder hidden beneath the Zanzibar landscape. Descend into this beautiful underground cave and swim in its pristine, crystal-clear waters.',
  'Swim in the special underground cave pool.',
  30,
  '2-3 Hours',
  'Adventure',
  'Paje, East Zanzibar',
  'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg',
  'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg',
  ARRAY['https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg', 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg'],
  ARRAY['Transport', 'Entrance fees', 'Guide', 'Towel', 'Water'],
  ARRAY['Lunch', 'Tips'],
  '[{"time": "09:00 AM", "event": "Pickup"}, {"time": "10:00 AM", "event": "Cave descent"}, {"time": "10:15 AM", "event": "Swimming"}, {"time": "11:45 AM", "event": "Return"}]'::JSONB,
  FALSE, FALSE, TRUE
);

-- Nungwi Beach
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Nungwi & Kendwa Beach Tour',
  'nungwi-kendwa-beach-tour',
  'Visit the most beautiful beaches in Zanzibar! Explore the vibrant fishing village of Nungwi, relax on the stunning white sands of Kendwa Beach.',
  'Visit Zanzibars most beautiful beaches.',
  55,
  'Full Day',
  'Beach',
  'Nungwi & Kendwa, North Zanzibar',
  'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg',
  'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg',
  ARRAY['https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg', 'https://images.pexels.com/photos/1074448/pexels-photo-1074448.jpeg'],
  ARRAY['Private transport', 'Guide', 'Seafood lunch', 'Bottled water', 'Beach time'],
  ARRAY['Drinks', 'Tips', 'Personal expenses'],
  '[{"time": "09:00 AM", "event": "Pickup"}, {"time": "10:30 AM", "event": "Nungwi village"}, {"time": "12:30 PM", "event": "Lunch"}, {"time": "02:30 PM", "event": "Kendwa Beach"}, {"time": "05:00 PM", "event": "Return"}]'::JSONB,
  FALSE, FALSE, TRUE
);

-- Quad Bike
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Quad Bike Adventure in Zanzibar',
  'quad-bike-adventure',
  'Get your adrenaline pumping on a thrilling quad bike adventure! Ride through rural villages, coconut plantations, and along stunning coastlines.',
  'Thrilling quad bike ride through villages and coastlines.',
  90,
  '3-4 Hours',
  'Adventure',
  'Paje, East Zanzibar',
  'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg',
  'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg',
  ARRAY['https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg', 'https://images.pexels.com/photos/3889755/pexels-photo-3889755.jpeg'],
  ARRAY['Quad bike rental', 'Helmet', 'Guide', 'Bottled water', 'Transport'],
  ARRAY['Lunch', 'Tips', 'Insurance'],
  '[{"time": "09:00 AM", "event": "Pickup"}, {"time": "10:00 AM", "event": "Safety briefing"}, {"time": "10:30 AM", "event": "Adventure start"}, {"time": "01:00 PM", "event": "Return"}]'::JSONB,
  FALSE, FALSE, TRUE
);

-- ================== SAFARI TOURS ==================

-- Ngorongoro Crater
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Ngorongoro Crater Day Trip',
  'ngorongoro-crater-day-trip',
  'Descend into the worlds largest intact volcanic caldera, often called Africas Garden of Eden. The Ngorongoro Crater is a natural sanctuary for the Big Five.',
  'Explore Africas Garden of Eden - the magnificent Ngorongoro Crater.',
  650,
  'Full Day',
  'Safari',
  'Ngorongoro Conservation Area, Tanzania',
  'https://images.pexels.com/photos/3699522/pexels-photo-3699522.jpeg',
  'https://images.pexels.com/photos/3699522/pexels-photo-3699522.jpeg',
  ARRAY['https://images.pexels.com/photos/3699522/pexels-photo-3699522.jpeg', 'https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg', 'https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg'],
  ARRAY['Return flights', 'Private 4x4 vehicle', 'Expert guide', 'Crater fees', 'Picnic lunch', 'Binoculars'],
  ARRAY['Tips', 'Travel insurance', 'Personal expenses'],
  '[{"time": "05:30 AM", "event": "Flight from Zanzibar"}, {"time": "09:30 AM", "event": "Enter crater"}, {"time": "12:30 PM", "event": "Picnic lunch"}, {"time": "04:00 PM", "event": "Ascend crater"}, {"time": "06:00 PM", "event": "Return flight"}]'::JSONB,
  TRUE, TRUE, TRUE
);

-- Mikumi
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Mikumi National Park Full-Day Tour',
  'mikumi-national-park-safari',
  'The closest safari destination from Dar es Salaam! Mikumi National Park offers excellent game viewing with lions, elephants, giraffes, zebras, and wildebeest.',
  'Little Serengeti - full-day safari from Dar es Salaam.',
  350,
  'Full Day',
  'Safari',
  'Mikumi National Park, Tanzania',
  'https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg',
  'https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg',
  ARRAY['https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg', 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg', 'https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg'],
  ARRAY['Private 4x4 vehicle', 'Professional guide', 'Park fees', 'Picnic lunch', 'Bottled water', 'Binoculars'],
  ARRAY['Dar es Salaam hotel', 'Tips', 'Personal expenses'],
  '[{"time": "05:00 AM", "event": "Early departure"}, {"time": "09:00 AM", "event": "Morning game drive"}, {"time": "12:00 PM", "event": "Picnic lunch"}, {"time": "04:30 PM", "event": "Final viewing"}, {"time": "09:00 PM", "event": "Return"}]'::JSONB,
  TRUE, TRUE, TRUE
);

-- Serengeti
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Serengeti National Park Safari',
  'serengeti-national-park-safari',
  'Witness the greatest wildlife spectacle on Earth in the legendary Serengeti! Home to the Great Migration with over 1.5 million wildebeest and zebras.',
  'Witness the Great Migration in the legendary Serengeti.',
  1800,
  '3 Days / 2 Nights',
  'Safari',
  'Serengeti National Park, Tanzania',
  'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg',
  'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg',
  ARRAY['https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg', 'https://images.pexels.com/photos/3699522/pexels-photo-3699522.jpeg', 'https://images.pexels.com/photos/631292/pexels-photo-631292.jpeg'],
  ARRAY['Return flights', 'Luxury tented accommodation', 'All meals', 'Expert naturalist guide', 'Game drives', 'Park fees'],
  ARRAY['Travel insurance', 'Tips', 'Premium drinks', 'Visa fees'],
  '[{"time": "Day 1 07:00 AM", "event": "Flight to Serengeti"}, {"time": "Day 1 04:00 PM", "event": "Afternoon game drive"}, {"time": "Day 2", "event": "Full day game drive"}, {"time": "Day 3 11:00 AM", "event": "Return flight"}]'::JSONB,
  TRUE, TRUE, TRUE
);

-- Selous
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active)
VALUES (
  'Selous Game Reserve Safari',
  'selous-game-reserve-safari',
  'Experience the wild heart of Africa in one of the largest game reserves on the continent. Selous offers incredible wildlife encounters with elephants, lions, wild dogs, and hippos.',
  'Africas largest game reserve with boat safaris and walking safaris.',
  450,
  '1-3 Days',
  'Safari',
  'Nyerere National Park (Selous)',
  'https://images.pexels.com/photos/631292/pexels-photo-631292.jpeg',
  'https://images.pexels.com/photos/631292/pexels-photo-631292.jpeg',
  ARRAY['https://images.pexels.com/photos/631292/pexels-photo-631292.jpeg', 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg', 'https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg'],
  ARRAY['Return flights', 'All game activities', 'Luxury camp', 'All meals', 'Park fees', 'Expert guide'],
  ARRAY['Travel insurance', 'Alcoholic drinks', 'Tips', 'Personal items'],
  '[{"time": "Day 1 06:00 AM", "event": "Flight to Selous"}, {"time": "Day 1 04:00 PM", "event": "Boat safari"}, {"time": "Day 2 06:00 AM", "event": "Full day game drive"}, {"time": "Day 3 06:00 AM", "event": "Walking safari and return"}]'::JSONB,
  TRUE, FALSE, TRUE
);

-- ============================================
-- CUSTOMERS (Real customers will be added through the booking system)
-- ============================================
-- No mock data - customers will be created when real bookings are made

-- ============================================
-- BOOKINGS (Real bookings will be added through the booking system)
-- ============================================
-- No mock data - bookings will be created when customers book tours

-- ============================================
-- SITE SETTINGS
-- ============================================
INSERT INTO site_settings (key, value, type) VALUES
('site_name', 'ZANZSTAR', 'string'),
('tagline', 'Premium Tours & Safari', 'string'),
('contact_email', 'info@zanzstar.com', 'string'),
('contact_phone', '+255 656 443 740', 'string'),
('whatsapp_number', '+255 656 443 740', 'string'),
('address', 'Stone Town, Zanzibar, Tanzania', 'string'),
('facebook_url', 'https://facebook.com/zanzstar', 'string'),
('instagram_url', 'https://instagram.com/zanzstar', 'string'),
('primary_color', '#2d5a52', 'string'),
('booking_enabled', 'true', 'boolean'),
('maintenance_mode', 'false', 'boolean');
