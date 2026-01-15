-- ============================================
-- ZANZSTAR Complete Sample Data
-- ============================================

-- ================== SINGLE TOURS ==================
INSERT INTO tours (title, slug, description, short_description, price, duration, category, location, image_url, header_image_url, gallery, inclusions, exclusions, itinerary, is_safari, is_featured, is_active) VALUES

-- Safari Blue Full Day Experience
(
  'Safari Blue Full Day Experience',
  'safari-blue-full-day',
  'Experience the ultimate marine adventure with Safari Blue! Sail on traditional dhows through the crystal-clear waters of Menai Bay, snorkel in pristine coral reefs, visit sandbanks that appear at low tide, and enjoy a fresh seafood feast on a secluded beach. This award-winning tour showcases the best of Zanzibar''s marine paradise.',
  'Ultimate marine adventure with dhow cruise, snorkeling, and seafood feast.',
  85,
  'Full Day (8 Hours)',
  'Beach',
  'Fumba, Zanzibar',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b3/b1/c3/the-original-safari-blue.jpg?w=1200&h=900&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b3/b1/c3/the-original-safari-blue.jpg?w=1200&h=900&s=1',
  ARRAY['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b3/b1/c3/the-original-safari-blue.jpg?w=1200&h=900&s=1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHJGlwh-SzvJN5vP51hsISJsFyR8BKmZqnA&s', 'https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg'],
  ARRAY['Hotel pickup & drop-off', 'Traditional dhow cruise', 'Snorkeling equipment', 'Fresh seafood lunch', 'Tropical fruits & refreshments', 'Professional guide', 'All entrance fees'],
  ARRAY['Alcoholic beverages', 'Tips for crew', 'Personal expenses', 'Travel insurance'],
  '[{"time": "07:30 AM", "event": "Pickup from your hotel and transfer to Fumba fishing village."}, {"time": "08:30 AM", "event": "Board traditional dhow and set sail through Menai Bay."}, {"time": "09:30 AM", "event": "First snorkeling stop at vibrant coral reef."}, {"time": "11:00 AM", "event": "Visit disappearing sandbank and swim in turquoise waters."}, {"time": "12:30 PM", "event": "Seafood BBQ lunch on secluded beach with fresh fruits."}, {"time": "02:30 PM", "event": "Second snorkeling session and mangrove exploration."}, {"time": "04:00 PM", "event": "Return sail and transfer back to hotel."}]'::jsonb,
  false,
  true,
  true
),

-- Nakupenda Sandbank Tour
(
  'Nakupenda Sandbank Tour',
  'nakupenda-sandbank-tour',
  'Discover ''Nakupenda'' - meaning ''I Love You'' in Swahili - a stunning sandbank that emerges from the Indian Ocean at low tide. This pristine stretch of white sand surrounded by turquoise waters is pure paradise. Relax under beach umbrellas, swim in crystal-clear waters, and enjoy fresh seafood while surrounded by breathtaking ocean views.',
  'Paradise sandbank with I Love You meaning - white sand, turquoise waters.',
  50,
  'Half Day (5 Hours)',
  'Beach',
  'Stone Town, Zanzibar',
  'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/dc/04/45.jpg',
  'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/dc/04/45.jpg',
  ARRAY['https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/dc/04/45.jpg', 'https://zanzibarstartours.net/wp-content/uploads/2023/06/Screenshot1686934046054.jpg', 'https://zanzibarstartours.net/wp-content/uploads/2023/06/Screenshot1686934031246.jpg'],
  ARRAY['Boat transfer', 'Beach mat & umbrella', 'Fresh seafood lunch', 'Tropical fruits', 'Soft drinks & water', 'Snorkeling gear', 'Guide'],
  ARRAY['Alcoholic drinks', 'Tips', 'Personal expenses'],
  '[{"time": "09:00 AM", "event": "Pickup from hotel and transfer to Stone Town harbor."}, {"time": "09:30 AM", "event": "Board boat and cruise to Nakupenda Sandbank."}, {"time": "10:00 AM", "event": "Arrive at the sandbank and set up on the beach."}, {"time": "10:30 AM", "event": "Swimming and snorkeling in crystal-clear waters."}, {"time": "12:00 PM", "event": "Fresh seafood lunch served on the sandbank."}, {"time": "01:30 PM", "event": "More beach time and relaxation."}, {"time": "02:00 PM", "event": "Return to Stone Town and hotel drop-off."}]'::jsonb,
  false,
  true,
  true
),

-- Mnemba Island Snorkeling
(
  'Mnemba Island Snorkeling',
  'mnemba-island-snorkeling',
  'Snorkel in the crystal-clear waters around Mnemba Atoll, home to some of the best coral reefs in East Africa. Swim with tropical fish, sea turtles, and dolphins in this protected marine area. The pristine waters offer visibility up to 30 meters, making it a world-class snorkeling destination.',
  'World-class snorkeling at pristine Mnemba Atoll with turtles and dolphins.',
  95,
  'Full Day',
  'Adventure',
  'Mnemba Atoll, Zanzibar',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ff/7d/42/caption.jpg?w=1200&h=-1&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ff/7d/42/caption.jpg?w=1200&h=-1&s=1',
  ARRAY['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ff/7d/42/caption.jpg?w=1200&h=-1&s=1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGBXPgIR-ampNqlEGIwxP3_8t2EXLEiaPjQ&s', 'https://images.pexels.com/photos/1645028/pexels-photo-1645028.jpeg'],
  ARRAY['Boat transfer to Mnemba Atoll', 'Professional snorkeling equipment', 'Fresh seafood lunch on the beach', 'Drinks and snacks', 'Marine guide', 'Safety briefing'],
  ARRAY['Underwater camera rental', 'Gratuities', 'Marine park fees ($3)'],
  '[{"time": "07:00 AM", "event": "Early pickup from hotel."}, {"time": "08:00 AM", "event": "Arrive at Muyuni Beach and board boat."}, {"time": "08:30 AM", "event": "Cruise to Mnemba Atoll marine reserve."}, {"time": "09:30 AM", "event": "First snorkeling session - coral gardens."}, {"time": "11:00 AM", "event": "Second snorkeling spot - turtle encounters."}, {"time": "12:30 PM", "event": "Seafood BBQ lunch on the beach."}, {"time": "02:00 PM", "event": "Final snorkeling and dolphin spotting."}, {"time": "04:00 PM", "event": "Return to hotel."}]'::jsonb,
  false,
  true,
  true
),

-- Stone Town Private Walking Tour
(
  'Stone Town Private Walking Tour',
  'stone-town-walking-tour',
  'Explore the UNESCO World Heritage Site of Stone Town with our expert local guides. Walk through centuries of history, from the House of Wonders to the Old Fort. Discover the rich cultural tapestry of Arab, Persian, Indian, and African influences that make Stone Town unique. Visit the slave market memorial, beautiful mosques, and iconic carved wooden doors.',
  'UNESCO World Heritage walking tour with expert guides.',
  40,
  '3-4 Hours',
  'Culture',
  'Stone Town, Zanzibar',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/30/34/de/caption.jpg?w=500&h=400&s=1',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/30/34/de/caption.jpg?w=500&h=400&s=1',
  ARRAY['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/30/34/de/caption.jpg?w=500&h=400&s=1', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/32/a7/81/caption.jpg?w=500&h=400&s=1', 'https://travel-buddies.com/wp-content/uploads/2024/11/1_private-city-tour-in-stone-town.jpg'],
  ARRAY['Professional English-speaking guide', 'Hotel pickup and drop-off', 'Entrance fees to museums', 'Traditional Swahili refreshments', 'Bottled water'],
  ARRAY['Lunch', 'Gratuities', 'Personal expenses', 'Souvenirs'],
  '[{"time": "09:00 AM", "event": "Meet your guide at your hotel lobby."}, {"time": "09:15 AM", "event": "Visit the Old Fort (Ngome Kongwe) and House of Wonders."}, {"time": "10:00 AM", "event": "Explore the winding alleys and famous carved doors."}, {"time": "10:45 AM", "event": "Visit the Old Slave Market and Anglican Cathedral."}, {"time": "11:30 AM", "event": "Discover Freddie Mercury birthplace."}, {"time": "12:00 PM", "event": "Fresh fruit tasting at Darajani Market."}, {"time": "12:30 PM", "event": "Optional rooftop lunch with ocean views (extra)."}]'::jsonb,
  false,
  true,
  true
),

-- Jozani Forest Tour
(
  'Jozani Forest Tour',
  'jozani-forest-tour',
  'Visit Zanzibar''s only national park and encounter the rare Red Colobus Monkeys found nowhere else on Earth. Walk through ancient mahogany forest, explore unique mangrove boardwalks, and learn about the island''s diverse ecosystem. This is a must-do experience for nature lovers.',
  'Encounter rare Red Colobus Monkeys in Zanzibar''s only national park.',
  35,
  '3 Hours',
  'Wildlife',
  'Jozani Chwaka Bay National Park',
  'https://www.zanzibar-tours.co.tz/wp-content/uploads/2024/11/tour_gallery_42.jpg',
  'https://www.zanzibar-tours.co.tz/wp-content/uploads/2024/11/tour_gallery_42.jpg',
  ARRAY['https://www.zanzibar-tours.co.tz/wp-content/uploads/2024/11/tour_gallery_42.jpg', 'https://www.exploretanzaniatours.com/wp-content/uploads/2022/02/Jozani-Chwaka-Bay-National-park.jpg', 'https://images.pexels.com/photos/4577816/pexels-photo-4577816.jpeg'],
  ARRAY['Hotel pickup & drop-off', 'Park entrance fees', 'Professional guide', 'Bottled water'],
  ARRAY['Tips', 'Lunch', 'Personal expenses'],
  '[{"time": "09:00 AM", "event": "Pickup from your hotel."}, {"time": "09:45 AM", "event": "Arrive at Jozani Forest entrance."}, {"time": "10:00 AM", "event": "Forest walk with guide to spot Red Colobus Monkeys."}, {"time": "11:00 AM", "event": "Explore the mangrove boardwalk trail."}, {"time": "11:30 AM", "event": "Learn about medicinal plants and forest ecology."}, {"time": "12:00 PM", "event": "Return transfer to hotel."}]'::jsonb,
  false,
  true,
  true
),

-- Prison Island Tour
(
  'Prison Island Tour',
  'prison-island-tour',
  'Visit historic Prison Island to meet the giant Aldabra tortoises, some over 190 years old. Explore the old prison ruins built in 1893, swim and snorkel in crystal-clear waters, and relax on pristine white sandy beaches. A perfect half-day escape from Stone Town.',
  'Meet giant Aldabra tortoises on historic Prison Island.',
  40,
  '3 Hours',
  'Wildlife',
  'Prison Island (Changuu)',
  'https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/8a/85/05.jpg',
  'https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/8a/85/05.jpg',
  ARRAY['https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/8a/85/05.jpg', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/fb/f4/56/prison-island.jpg?w=500&h=300&s=1', 'https://www.tanzaniatourism.com/images/uploads/Zanzibar_Prison_Island_01.jpg'],
  ARRAY['Boat transfer', 'Entrance fees', 'Guided tour', 'Snorkeling gear', 'Time to swim and relax'],
  ARRAY['Gratuities', 'Food and drinks', 'Personal expenses'],
  '[{"time": "09:00 AM", "event": "Boat departure from Stone Town waterfront."}, {"time": "09:30 AM", "event": "Arrive at Prison Island."}, {"time": "09:45 AM", "event": "Meet and feed the Giant Aldabra Tortoises."}, {"time": "10:30 AM", "event": "Explore the historic prison ruins."}, {"time": "11:00 AM", "event": "Swimming and snorkeling on the beach."}, {"time": "12:00 PM", "event": "Return boat to Stone Town."}]'::jsonb,
  false,
  false,
  true
),

-- Dolphin Tour Kizimkazi
(
  'Dolphin Tour Kizimkazi',
  'dolphin-tour-kizimkazi',
  'An unforgettable journey to swim with dolphins in their natural habitat. Head to the Kizimkazi coast for a chance to witness bottlenose and spinner dolphins up close. Snorkel in pristine waters and visit the ancient Kizimkazi Mosque, one of the oldest Islamic buildings in East Africa.',
  'Swim with dolphins in their natural habitat at Kizimkazi.',
  70,
  'Half Day',
  'Wildlife',
  'Kizimkazi, South Zanzibar',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKf9J7jUoEO5ifwNmFYgtvytKTNw9bkVnfgA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKf9J7jUoEO5ifwNmFYgtvytKTNw9bkVnfgA&s',
  ARRAY['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKf9J7jUoEO5ifwNmFYgtvytKTNw9bkVnfgA&s', 'https://zanzibarworld.com/wp-content/uploads/2021/01/boat-rentals-kizimkazi-mtendeni-zanzibar-central-south-region-processed.jpg', 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg'],
  ARRAY['Round-trip transport', 'Professional boat captain', 'Snorkeling equipment', 'Bottled water', 'Life jackets'],
  ARRAY['Lunch', 'Tips', 'Marine park fees'],
  '[{"time": "06:00 AM", "event": "Early morning pickup (best time for dolphins)."}, {"time": "07:30 AM", "event": "Arrive at Kizimkazi fishing village."}, {"time": "08:00 AM", "event": "Board boat and search for dolphins."}, {"time": "08:30 AM", "event": "Dolphin swimming and observation."}, {"time": "10:00 AM", "event": "Snorkeling at coral reef."}, {"time": "11:00 AM", "event": "Visit ancient Kizimkazi Mosque."}, {"time": "12:00 PM", "event": "Return to hotel."}]'::jsonb,
  false,
  false,
  true
),

-- Spice Tour
(
  'Spice Tour',
  'spice-tour',
  'Discover why Zanzibar is known as the ''Spice Island'' on this aromatic journey through working spice plantations. Smell, taste, and learn about cloves, vanilla, cinnamon, nutmeg, black pepper, and more. Experience how these precious spices shaped world history and continue to define Zanzibari cuisine.',
  'Aromatic journey through Zanzibar''s famous spice plantations.',
  35,
  '3-4 Hours',
  'Culture',
  'Zanzibar Countryside',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LOjo6A1pvnvysGaS_pMeZGYCzYT6VjAoxg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LOjo6A1pvnvysGaS_pMeZGYCzYT6VjAoxg&s',
  ARRAY['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LOjo6A1pvnvysGaS_pMeZGYCzYT6VjAoxg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYXq6ijO6Z7EfDCQlCBo1eiTyNPyn3cQUxbA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51ofb8BalKEKkZxJUsL88B9pU3YOwGwWGcw&s'],
  ARRAY['Guided plantation tour', 'Spice tasting session', 'Traditional lunch', 'Spice samples to take home', 'Hotel pickup and drop-off'],
  ARRAY['Gratuities', 'Additional spice purchases', 'Personal expenses'],
  '[{"time": "09:00 AM", "event": "Pickup from hotel."}, {"time": "09:30 AM", "event": "Arrive at spice plantation."}, {"time": "09:45 AM", "event": "Guided tour through spice gardens."}, {"time": "10:30 AM", "event": "Taste fresh spices and tropical fruits."}, {"time": "11:15 AM", "event": "Traditional spice-infused lunch."}, {"time": "12:30 PM", "event": "Visit local market to purchase spices."}, {"time": "01:00 PM", "event": "Return to hotel."}]'::jsonb,
  false,
  false,
  true
),

-- Kuza Cave Adventure
(
  'Kuza Cave Adventure',
  'kuza-cave-adventure',
  'Discover the hidden gem of Kuza Cave, a stunning natural limestone cave with crystal-clear underground water. Swim in the cool, refreshing waters surrounded by impressive stalactites and stalagmites. This mystical cave offers a unique and magical swimming experience.',
  'Swim in crystal-clear underground cave waters.',
  25,
  '2-3 Hours',
  'Adventure',
  'Paje, East Zanzibar',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrxPEFPBN4oGZZrFszPYMh3udN4LesvE2Yw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrxPEFPBN4oGZZrFszPYMh3udN4LesvE2Yw&s',
  ARRAY['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrxPEFPBN4oGZZrFszPYMh3udN4LesvE2Yw&s', 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0f/84/ce/fc.jpg', 'https://www.travelnotesonline.com/wp-content/uploads/2019/11/img_20190908_123604-scaled.jpg'],
  ARRAY['Transport', 'Entrance fees', 'Guide', 'Towel', 'Bottled water'],
  ARRAY['Lunch', 'Tips', 'Underwater camera'],
  '[{"time": "09:00 AM", "event": "Pickup from hotel."}, {"time": "09:45 AM", "event": "Arrive at Kuza Cave entrance."}, {"time": "10:00 AM", "event": "Descend into the cave and explore."}, {"time": "10:30 AM", "event": "Swimming in the crystal-clear cave waters."}, {"time": "11:30 AM", "event": "Photo session and relaxation."}, {"time": "12:00 PM", "event": "Return to hotel."}]'::jsonb,
  false,
  false,
  true
),

-- Mtende Secret Beach
(
  'Mtende Secret Beach',
  'mtende-secret-beach',
  'Escape to the untouched paradise of Mtende Secret Beach, one of Zanzibar''s best-kept secrets. This pristine stretch of white sand is perfect for those seeking tranquility away from crowds. Swim in warm turquoise waters and experience authentic local beach culture.',
  'Hidden paradise beach away from the crowds.',
  45,
  'Half Day',
  'Beach',
  'Mtende, Southeast Zanzibar',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_TkBZtFnm3ZbSGJfshMoK6nUXVsrk1QLMw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_TkBZtFnm3ZbSGJfshMoK6nUXVsrk1QLMw&s',
  ARRAY['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_TkBZtFnm3ZbSGJfshMoK6nUXVsrk1QLMw&s', 'https://static.wixstatic.com/media/646042_0fafc3060fdb405c8e350eac60693e1d~mv2.jpg/v1/fill/w_187,h_187,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/mtende-beach.jpg', 'https://cdn.getyourguide.com/img/tour/c94e8969f6279020b91e41f1ee15315ef44395c11a40fb9a3f5d8cb566f249a1.jpg/146.jpg'],
  ARRAY['Transport', 'Beach mat', 'Seafood lunch', 'Drinks', 'Guide'],
  ARRAY['Tips', 'Personal expenses'],
  '[{"time": "09:00 AM", "event": "Pickup from hotel."}, {"time": "10:00 AM", "event": "Arrive at Mtende Secret Beach."}, {"time": "10:15 AM", "event": "Beach setup and relaxation."}, {"time": "11:00 AM", "event": "Swimming and exploring the coastline."}, {"time": "12:30 PM", "event": "Fresh seafood lunch on the beach."}, {"time": "02:00 PM", "event": "Return to hotel."}]'::jsonb,
  false,
  false,
  true
),

-- Village Cultural Tour
(
  'Village Cultural Tour',
  'village-cultural-tour',
  'Experience authentic Zanzibari village life! Visit local families, learn traditional crafts, see how palm wine is made, and participate in daily village activities. This immersive tour offers genuine cultural exchange and supports local communities.',
  'Immersive experience of authentic Zanzibari village life.',
  40,
  '4 Hours',
  'Culture',
  'Rural Zanzibar',
  'https://zanzibarleisuretours.co.tz/wp-content/uploads/2020/11/villagetour2.jpg',
  'https://zanzibarleisuretours.co.tz/wp-content/uploads/2020/11/villagetour2.jpg',
  ARRAY['https://zanzibarleisuretours.co.tz/wp-content/uploads/2020/11/villagetour2.jpg', 'https://zanzibarstartours.net/wp-content/uploads/2018/11/102.jpg', 'https://minneriyasafari.com/wp-content/uploads/2023/08/Sigiriya_Village_Tour-600x600.jpg'],
  ARRAY['Transport', 'Local guide', 'Traditional lunch', 'Cultural activities', 'Village donations'],
  ARRAY['Tips', 'Personal purchases'],
  '[{"time": "09:00 AM", "event": "Pickup from hotel."}, {"time": "09:45 AM", "event": "Arrive at traditional village."}, {"time": "10:00 AM", "event": "Meet local families and tour the village."}, {"time": "10:45 AM", "event": "Watch traditional craft-making."}, {"time": "11:30 AM", "event": "Palm wine tasting and coconut harvesting demo."}, {"time": "12:15 PM", "event": "Traditional Swahili lunch with a local family."}, {"time": "01:00 PM", "event": "Return to hotel."}]'::jsonb,
  false,
  false,
  true
),

-- Maalum Cave Exploration
(
  'Maalum Cave Exploration',
  'maalum-cave-exploration',
  'Discover the magical Maalum Cave, a natural wonder hidden beneath the Zanzibar landscape. Descend into this beautiful underground cave and swim in its pristine, crystal-clear waters. The name ''Maalum'' means ''special'' in Swahili, and this hidden gem truly lives up to its name.',
  'Swim in the ''special'' underground cave pool.',
  30,
  '2-3 Hours',
  'Adventure',
  'Paje, East Zanzibar',
  'https://zanzibarstartours.net/wp-content/uploads/2023/10/1000029754-scaled.jpg',
  'https://zanzibarstartours.net/wp-content/uploads/2023/10/1000029754-scaled.jpg',
  ARRAY['https://zanzibarstartours.net/wp-content/uploads/2023/10/1000029754-scaled.jpg', 'https://maalumzanzibar.com/images/instagram-2.jpg', 'https://worldoflina.com/wp-content/uploads/2024/09/DSC_0789-1-850x680.jpg'],
  ARRAY['Transport', 'Entrance fees', 'Guide', 'Towel', 'Water'],
  ARRAY['Lunch', 'Tips'],
  '[{"time": "09:00 AM", "event": "Pickup from hotel."}, {"time": "09:45 AM", "event": "Arrive at Maalum Cave."}, {"time": "10:00 AM", "event": "Guided introduction and descent into cave."}, {"time": "10:15 AM", "event": "Swimming in the crystal-clear underground pool."}, {"time": "11:15 AM", "event": "Relaxation and photo opportunities."}, {"time": "11:45 AM", "event": "Return to hotel."}]'::jsonb,
  false,
  false,
  true
),

-- Nungwi & Kendwa Beach Tour
(
  'Nungwi & Kendwa Beach Tour',
  'nungwi-kendwa-beach-tour',
  'Visit the most beautiful beaches in Zanzibar! Explore the vibrant fishing village of Nungwi, relax on the stunning white sands of Kendwa Beach, and witness traditional dhow building. Swim in turquoise waters that stay deep even at low tide.',
  'Visit Zanzibar''s most beautiful beaches.',
  55,
  'Full Day',
  'Beach',
  'Nungwi & Kendwa, North Zanzibar',
  'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/d8/e4/cd.jpg',
  'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/d8/e4/cd.jpg',
  ARRAY['https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/d8/e4/cd.jpg', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/92/41/82.jpg', 'https://images.pexels.com/photos/1074448/pexels-photo-1074448.jpeg'],
  ARRAY['Private transport', 'English-speaking guide', 'Seafood lunch', 'Bottled water', 'Beach time'],
  ARRAY['Drinks', 'Tips', 'Personal expenses'],
  '[{"time": "09:00 AM", "event": "Pickup from hotel and scenic drive north."}, {"time": "10:30 AM", "event": "Arrive at Nungwi fishing village."}, {"time": "10:45 AM", "event": "Watch traditional dhow boat builders at work."}, {"time": "11:30 AM", "event": "Beach time and swimming at Nungwi Beach."}, {"time": "12:30 PM", "event": "Seafood lunch at beachfront restaurant."}, {"time": "02:00 PM", "event": "Transfer to Kendwa Beach."}, {"time": "02:30 PM", "event": "Relax and swim at Kendwa Beach."}, {"time": "05:00 PM", "event": "Return to hotel."}]'::jsonb,
  false,
  false,
  true
),

-- Quad Bike Adventure
(
  'Quad Bike Adventure in Zanzibar',
  'quad-bike-adventure',
  'Get your adrenaline pumping on a thrilling quad bike adventure! Ride through rural villages, coconut plantations, and along stunning coastlines. Experience the real Zanzibar away from tourist areas while enjoying the thrill of off-road driving.',
  'Thrilling quad bike ride through villages and coastlines.',
  90,
  '3-4 Hours',
  'Adventure',
  'Paje, East Zanzibar',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2GaFVE4bGqH31qTYYT2J6AY_nrtx8ArhMcQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2GaFVE4bGqH31qTYYT2J6AY_nrtx8ArhMcQ&s',
  ARRAY['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2GaFVE4bGqH31qTYYT2J6AY_nrtx8ArhMcQ&s', 'https://tuliazanzibar.com/wp-content/uploads/2019/09/01222E32A478423CB60DBA681674DE77.jpg', 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg'],
  ARRAY['Quad bike rental', 'Helmet & goggles', 'Guide', 'Bottled water', 'Transport'],
  ARRAY['Lunch', 'Tips', 'Insurance'],
  '[{"time": "09:00 AM", "event": "Pickup from hotel."}, {"time": "10:00 AM", "event": "Safety briefing and quad bike introduction."}, {"time": "10:30 AM", "event": "Start the adventure through villages and plantations."}, {"time": "11:30 AM", "event": "Stop at local village for refreshments."}, {"time": "12:00 PM", "event": "Continue ride along the beach."}, {"time": "01:00 PM", "event": "Return and transfer back to hotel."}]'::jsonb,
  false,
  false,
  true
),

-- ================== SAFARI TOURS ==================

-- Ngorongoro Crater Day Trip
(
  'Ngorongoro Crater Day Trip',
  'ngorongoro-crater-day-trip',
  'Descend into the world''s largest intact volcanic caldera, often called ''Africa''s Garden of Eden.'' The Ngorongoro Crater is a natural sanctuary for the Big Five, with one of the highest wildlife densities on Earth. This UNESCO World Heritage Site offers breathtaking scenery and unparalleled game viewing.',
  'Explore Africa''s Garden of Eden - the magnificent Ngorongoro Crater.',
  650,
  'Full Day',
  'Safari',
  'Ngorongoro Conservation Area, Tanzania',
  'https://www.andbeyond.com/wp-content/uploads/sites/5/ngorongoro-crater-floor-teaming-with-game.jpg',
  'https://www.andbeyond.com/wp-content/uploads/sites/5/ngorongoro-crater-floor-teaming-with-game.jpg',
  ARRAY['https://www.andbeyond.com/wp-content/uploads/sites/5/ngorongoro-crater-floor-teaming-with-game.jpg', 'https://abundadiscoveriesuganda.com/wp-content/uploads/2025/01/Ngorongoro-National-Park-Tanzania-by-Licious-Adventure-%E2%80%94-YouPic.jpg', 'https://www.discoverafrica.com/wp-content/uploads/2019/06/iStock-536747875.jpg', 'https://www.ngorongorocratertanzania.org/wp-content/uploads/2019/04/Ngorongoro-Facts-750x450.jpg'],
  ARRAY['Return flights', 'Private 4x4 vehicle', 'Expert guide', 'Crater fees', 'Picnic lunch', 'Bottled water', 'Binoculars'],
  ARRAY['Tips', 'Travel insurance', 'Personal expenses'],
  '[{"time": "05:30 AM", "event": "Flight from Zanzibar to Kilimanjaro/Arusha."}, {"time": "08:30 AM", "event": "Transfer to Ngorongoro Crater rim."}, {"time": "09:30 AM", "event": "Descend into the crater floor."}, {"time": "10:00 AM", "event": "Game drive on crater floor - lions, elephants, rhinos."}, {"time": "12:30 PM", "event": "Picnic lunch at Ngoitokitok Springs."}, {"time": "01:30 PM", "event": "Continue game drive - hippo pool, flamingos."}, {"time": "04:00 PM", "event": "Ascend crater and transfer to airstrip."}, {"time": "06:00 PM", "event": "Flight back to Zanzibar."}]'::jsonb,
  true,
  true,
  true
),

-- Mikumi National Park Full-Day Tour
(
  'Mikumi National Park Full-Day Tour',
  'mikumi-national-park-safari',
  'The closest safari destination from Dar es Salaam! Mikumi National Park offers excellent game viewing with lions, elephants, giraffes, zebras, and wildebeest. Known as ''Little Serengeti,'' this park provides an authentic safari experience in a single day.',
  'Little Serengeti - full-day safari from Dar es Salaam.',
  350,
  'Full Day',
  'Safari',
  'Mikumi National Park, Tanzania',
  'https://www.ngorongorocratertanzania.org/wp-content/uploads/2023/03/1-Day-Trip-Mikumi-National-Park-1.jpg',
  'https://www.ngorongorocratertanzania.org/wp-content/uploads/2023/03/1-Day-Trip-Mikumi-National-Park-1.jpg',
  ARRAY['https://www.ngorongorocratertanzania.org/wp-content/uploads/2023/03/1-Day-Trip-Mikumi-National-Park-1.jpg', 'https://www.focuseastafricatours.com/wp-content/uploads/Mikumi-National-Park-1.jpg', 'https://www.leopard-tours.com/wp-content/uploads/2015/12/Mikumi-National-Park-4-1024x680.jpg', 'https://enosaexpeditions.com/images/2022/05/19/mikumi.jpg'],
  ARRAY['Private 4x4 vehicle', 'Professional driver-guide', 'Park fees', 'Picnic lunch', 'Bottled water', 'Binoculars'],
  ARRAY['Dar es Salaam hotel', 'Tips', 'Personal expenses'],
  '[{"time": "05:00 AM", "event": "Early departure from Dar es Salaam."}, {"time": "09:00 AM", "event": "Arrive at Mikumi and begin morning game drive."}, {"time": "12:00 PM", "event": "Picnic lunch at viewpoint."}, {"time": "01:30 PM", "event": "Continue afternoon game drive."}, {"time": "04:30 PM", "event": "Final wildlife viewing."}, {"time": "05:00 PM", "event": "Depart for Dar es Salaam."}, {"time": "09:00 PM", "event": "Arrive back in Dar es Salaam."}]'::jsonb,
  true,
  true,
  true
),

-- Serengeti National Park Safari
(
  'Serengeti National Park Safari',
  'serengeti-national-park-safari',
  'Witness the greatest wildlife spectacle on Earth in the legendary Serengeti! Home to the Great Migration with over 1.5 million wildebeest and zebras, and the highest concentration of predators in Africa. Spot the Big Five and experience the endless plains under the African sky.',
  'Witness the Great Migration in the legendary Serengeti.',
  1800,
  '3 Days / 2 Nights',
  'Safari',
  'Serengeti National Park, Tanzania',
  'https://www.safariventures.com/wp-content/uploads/Untitled-design-1-1.png',
  'https://www.safariventures.com/wp-content/uploads/Untitled-design-1-1.png',
  ARRAY['https://www.safariventures.com/wp-content/uploads/Untitled-design-1-1.png', 'https://www.greatadventuresafaris.com/wp-content/uploads/Safaro-tours-to-serengeti-national-park.jpg', 'https://roamwildadventure.com/wp-content/uploads/2021/02/5-day-safari-tarangire-ngorongoro-serengeti-manyara-olduvai-gallery-09-blurred-1-1024x654.jpg', 'https://www.achieveglobalsafaris.com/wp-content/uploads/2021/01/4-Days-Serengeti-Wildlife-Safari.jpg'],
  ARRAY['Return flights', 'Luxury tented accommodation', 'All meals & drinks', 'Expert naturalist guide', 'Game drives', 'Park fees'],
  ARRAY['Travel insurance', 'Tips', 'Premium drinks', 'Visa fees'],
  '[{"time": "Day 1 07:00 AM", "event": "Flight from Zanzibar to Serengeti."}, {"time": "Day 1 10:00 AM", "event": "Arrive and begin game drive."}, {"time": "Day 1 01:00 PM", "event": "Lunch at luxury tented camp."}, {"time": "Day 1 04:00 PM", "event": "Afternoon game drive."}, {"time": "Day 1 07:00 PM", "event": "Sundowner drinks and dinner."}, {"time": "Day 2", "event": "Full day game drive tracking the Great Migration."}, {"time": "Day 3 06:00 AM", "event": "Sunrise game drive."}, {"time": "Day 3 11:00 AM", "event": "Flight back to Zanzibar."}]'::jsonb,
  true,
  true,
  true
),

-- Selous Game Reserve Safari
(
  'Selous Game Reserve Safari',
  'selous-game-reserve-safari',
  'Experience the wild heart of Africa in one of the largest game reserves on the continent. Selous (now Nyerere National Park) offers incredible wildlife encounters with elephants, lions, wild dogs, and hippos. Enjoy game drives, boat safaris, and walking safaris in this untouched wilderness.',
  'Africa''s largest game reserve with boat safaris and walking safaris.',
  450,
  '1-3 Days',
  'Safari',
  'Nyerere National Park (Selous)',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrpXhIynX1HELPZ7J5Ei-Ezzk6SSmO-jsVw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrpXhIynX1HELPZ7J5Ei-Ezzk6SSmO-jsVw&s',
  ARRAY['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrpXhIynX1HELPZ7J5Ei-Ezzk6SSmO-jsVw&s', 'https://www.tanzaniaodyssey.com/site/odyssey-image-proxy/park/selous=401199-320.jpg', 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg'],
  ARRAY['Return flights', 'All game activities', 'Luxury camp accommodation', 'All meals', 'Park fees', 'Expert guide'],
  ARRAY['Travel insurance', 'Alcoholic drinks', 'Tips', 'Personal items'],
  '[{"time": "Day 1 06:00 AM", "event": "Flight from Zanzibar to Selous airstrip."}, {"time": "Day 1 09:00 AM", "event": "Morning game drive."}, {"time": "Day 1 01:00 PM", "event": "Lunch at safari camp."}, {"time": "Day 1 04:00 PM", "event": "Afternoon boat safari on Rufiji River."}, {"time": "Day 1 07:00 PM", "event": "Dinner under the stars."}, {"time": "Day 2 06:00 AM", "event": "Full day game drive with picnic lunch."}, {"time": "Day 3 06:00 AM", "event": "Walking safari and flight back to Zanzibar."}]'::jsonb,
  true,
  false,
  true
);

-- Insert sample customers
INSERT INTO customers (email, first_name, last_name, phone, country, total_bookings, total_spent, is_vip) VALUES
('sarah.johnson@example.com', 'Sarah', 'Johnson', '+1 555-0123', 'United States', 3, 650.00, false),
('michael.chen@example.com', 'Michael', 'Chen', '+44 20 7123 4567', 'United Kingdom', 8, 15200.00, true),
('elena.rossi@example.com', 'Elena', 'Rossi', '+39 02 1234 5678', 'Italy', 2, 420.00, false),
('david.miller@example.com', 'David', 'Miller', '+1 555-9876', 'United States', 1, 90.00, false),
('james.brown@example.com', 'James', 'Brown', '+61 2 1234 5678', 'Australia', 5, 8900.00, true);

-- Insert sample bookings
DO $$
DECLARE
  tour1_id UUID;
  tour2_id UUID;
  tour3_id UUID;
  cust1_id UUID;
  cust2_id UUID;
  cust3_id UUID;
BEGIN
  SELECT id INTO tour1_id FROM tours WHERE slug = 'safari-blue-full-day' LIMIT 1;
  SELECT id INTO tour2_id FROM tours WHERE slug = 'nakupenda-sandbank-tour' LIMIT 1;
  SELECT id INTO tour3_id FROM tours WHERE slug = 'serengeti-national-park-safari' LIMIT 1;
  SELECT id INTO cust1_id FROM customers WHERE email = 'sarah.johnson@example.com' LIMIT 1;
  SELECT id INTO cust2_id FROM customers WHERE email = 'michael.chen@example.com' LIMIT 1;
  SELECT id INTO cust3_id FROM customers WHERE email = 'elena.rossi@example.com' LIMIT 1;
  
  INSERT INTO bookings (reference, tour_id, customer_id, date, time, guests, total_amount, status, notes) VALUES
  ('BK-8421', tour1_id, cust1_id, '2026-01-20', '07:30', 2, 170.00, 'confirmed', 'Honeymoon trip'),
  ('BK-8422', tour3_id, cust2_id, '2026-01-25', '06:00', 4, 7200.00, 'pending', 'VIP client - special arrangements'),
  ('BK-8423', tour2_id, cust3_id, '2026-01-18', '09:00', 2, 100.00, 'completed', NULL),
  ('BK-8424', tour1_id, cust1_id, '2026-02-05', '07:30', 3, 255.00, 'confirmed', 'Birthday celebration'),
  ('BK-8425', tour2_id, cust2_id, '2026-02-10', '09:00', 6, 300.00, 'confirmed', 'Group booking');
END $$;

-- Insert default site settings
INSERT INTO site_settings (key, value, type) VALUES
('site_name', 'ZANZSTAR', 'string'),
('tagline', 'Premium Tours & Safari', 'string'),
('contact_email', 'info@zanzstar.com', 'string'),
('contact_phone', '+255 776 654 215', 'string'),
('whatsapp_number', '+255 776 654 215', 'string'),
('address', 'Stone Town, Zanzibar, Tanzania', 'string'),
('facebook_url', 'https://facebook.com/zanzstar', 'string'),
('instagram_url', 'https://instagram.com/zanzstar', 'string'),
('primary_color', '#2d5a52', 'string'),
('booking_enabled', 'true', 'boolean'),
('maintenance_mode', 'false', 'boolean');
