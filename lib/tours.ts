export interface Tour {
  slug: string;
  title: string;
  image: string;
  headerImage: string;
  gallery?: string[];
  price: string;
  duration: string;
  groupType: string;
  groupSize: string;
  location: string;
  category: string;
  description: string;
  itinerary: { time: string; event: string }[];
  inclusions: string[];
  exclusions: string[];
  isSafari?: boolean;
  isPackage?: boolean;
}

export const tours: Tour[] = [
  // ================== SINGLE TOURS ==================
  {
    slug: "safari-blue-full-day",
    title: "Safari Blue Full Day Experience",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b3/b1/c3/the-original-safari-blue.jpg?w=1200&h=900&s=1",
    headerImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b3/b1/c3/the-original-safari-blue.jpg?w=1200&h=900&s=1",
    gallery: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b3/b1/c3/the-original-safari-blue.jpg?w=1200&h=900&s=1",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHJGlwh-SzvJN5vP51hsISJsFyR8BKmZqnA&s",
      "https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg"
    ],
    price: "From $85",
    duration: "Full Day (8 Hours)",
    groupType: "Group / Private",
    groupSize: "2-20 Guests",
    location: "Fumba, Zanzibar",
    category: "Beach",
    description: "Experience the ultimate marine adventure with Safari Blue! Sail on traditional dhows through the crystal-clear waters of Menai Bay, snorkel in pristine coral reefs, visit sandbanks that appear at low tide, and enjoy a fresh seafood feast on a secluded beach. This award-winning tour showcases the best of Zanzibar's marine paradise.",
    itinerary: [
      { time: "07:30 AM", event: "Pickup from your hotel and transfer to Fumba fishing village." },
      { time: "08:30 AM", event: "Board traditional dhow and set sail through Menai Bay." },
      { time: "09:30 AM", event: "First snorkeling stop at vibrant coral reef." },
      { time: "11:00 AM", event: "Visit disappearing sandbank and swim in turquoise waters." },
      { time: "12:30 PM", event: "Seafood BBQ lunch on secluded beach with fresh fruits." },
      { time: "02:30 PM", event: "Second snorkeling session and mangrove exploration." },
      { time: "04:00 PM", event: "Return sail and transfer back to hotel." }
    ],
    inclusions: ["Hotel pickup & drop-off", "Traditional dhow cruise", "Snorkeling equipment", "Fresh seafood lunch", "Tropical fruits & refreshments", "Professional guide", "All entrance fees"],
    exclusions: ["Alcoholic beverages", "Tips for crew", "Personal expenses", "Travel insurance"]
  },
  {
    slug: "nakupenda-sandbank-tour",
    title: "Nakupenda Sandbank Tour",
    image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/dc/04/45.jpg",
    headerImage: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/dc/04/45.jpg",
    gallery: [
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/dc/04/45.jpg",
      "https://zanzibarstartours.net/wp-content/uploads/2023/06/Screenshot1686934046054.jpg",
      "https://zanzibarstartours.net/wp-content/uploads/2023/06/Screenshot1686934031246.jpg"
    ],
    price: "From $50",
    duration: "Half Day (5 Hours)",
    groupType: "Group / Private",
    groupSize: "2-15 Guests",
    location: "Stone Town, Zanzibar",
    category: "Beach",
    description: "Discover 'Nakupenda' - meaning 'I Love You' in Swahili - a stunning sandbank that emerges from the Indian Ocean at low tide. This pristine stretch of white sand surrounded by turquoise waters is pure paradise. Relax under beach umbrellas, swim in crystal-clear waters, and enjoy fresh seafood while surrounded by breathtaking ocean views.",
    itinerary: [
      { time: "09:00 AM", event: "Pickup from hotel and transfer to Stone Town harbor." },
      { time: "09:30 AM", event: "Board boat and cruise to Nakupenda Sandbank." },
      { time: "10:00 AM", event: "Arrive at the sandbank and set up on the beach." },
      { time: "10:30 AM", event: "Swimming and snorkeling in crystal-clear waters." },
      { time: "12:00 PM", event: "Fresh seafood lunch served on the sandbank." },
      { time: "01:30 PM", event: "More beach time and relaxation." },
      { time: "02:00 PM", event: "Return to Stone Town and hotel drop-off." }
    ],
    inclusions: ["Boat transfer", "Beach mat & umbrella", "Fresh seafood lunch", "Tropical fruits", "Soft drinks & water", "Snorkeling gear", "Guide"],
    exclusions: ["Alcoholic drinks", "Tips", "Personal expenses"]
  },
  {
    slug: "mnemba-island-snorkeling",
    title: "Mnemba Island Snorkeling",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ff/7d/42/caption.jpg?w=1200&h=-1&s=1",
    headerImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ff/7d/42/caption.jpg?w=1200&h=-1&s=1",
    gallery: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ff/7d/42/caption.jpg?w=1200&h=-1&s=1",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGBXPgIR-ampNqlEGIwxP3_8t2EXLEiaPjQ&s",
      "https://images.pexels.com/photos/1645028/pexels-photo-1645028.jpeg"
    ],
    price: "From $95",
    duration: "Full Day",
    groupType: "Private",
    groupSize: "1-8 Guests",
    location: "Mnemba Atoll, Zanzibar",
    category: "Adventure",
    description: "Snorkel in the crystal-clear waters around Mnemba Atoll, home to some of the best coral reefs in East Africa. Swim with tropical fish, sea turtles, and dolphins in this protected marine area. The pristine waters offer visibility up to 30 meters, making it a world-class snorkeling destination.",
    itinerary: [
      { time: "07:00 AM", event: "Early pickup from hotel." },
      { time: "08:00 AM", event: "Arrive at Muyuni Beach and board boat." },
      { time: "08:30 AM", event: "Cruise to Mnemba Atoll marine reserve." },
      { time: "09:30 AM", event: "First snorkeling session - coral gardens." },
      { time: "11:00 AM", event: "Second snorkeling spot - turtle encounters." },
      { time: "12:30 PM", event: "Seafood BBQ lunch on the beach." },
      { time: "02:00 PM", event: "Final snorkeling and dolphin spotting." },
      { time: "04:00 PM", event: "Return to hotel." }
    ],
    inclusions: ["Boat transfer to Mnemba Atoll", "Professional snorkeling equipment", "Fresh seafood lunch on the beach", "Drinks and snacks", "Marine guide", "Safety briefing"],
    exclusions: ["Underwater camera rental", "Gratuities", "Marine park fees ($3)"]
  },
  {
    slug: "stone-town-walking-tour",
    title: "Stone Town Private Walking Tour",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/30/34/de/caption.jpg?w=500&h=400&s=1",
    headerImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/30/34/de/caption.jpg?w=500&h=400&s=1",
    gallery: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/30/34/de/caption.jpg?w=500&h=400&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/32/a7/81/caption.jpg?w=500&h=400&s=1",
      "https://travel-buddies.com/wp-content/uploads/2024/11/1_private-city-tour-in-stone-town.jpg"
    ],
    price: "From $40",
    duration: "3-4 Hours",
    groupType: "Private Tour",
    groupSize: "1-6 Guests",
    location: "Stone Town, Zanzibar",
    category: "Culture",
    description: "Explore the UNESCO World Heritage Site of Stone Town with our expert local guides. Walk through centuries of history, from the House of Wonders to the Old Fort. Discover the rich cultural tapestry of Arab, Persian, Indian, and African influences that make Stone Town unique. Visit the slave market memorial, beautiful mosques, and iconic carved wooden doors.",
    itinerary: [
      { time: "09:00 AM", event: "Meet your guide at your hotel lobby." },
      { time: "09:15 AM", event: "Visit the Old Fort (Ngome Kongwe) and House of Wonders." },
      { time: "10:00 AM", event: "Explore the winding alleys and famous carved doors." },
      { time: "10:45 AM", event: "Visit the Old Slave Market and Anglican Cathedral." },
      { time: "11:30 AM", event: "Discover Freddie Mercury's birthplace." },
      { time: "12:00 PM", event: "Fresh fruit tasting at Darajani Market." },
      { time: "12:30 PM", event: "Optional rooftop lunch with ocean views (extra)." }
    ],
    inclusions: ["Professional English-speaking guide", "Hotel pickup and drop-off", "Entrance fees to museums", "Traditional Swahili refreshments", "Bottled water"],
    exclusions: ["Lunch", "Gratuities", "Personal expenses", "Souvenirs"]
  },
  {
    slug: "jozani-forest-tour",
    title: "Jozani Forest Tour",
    image: "https://www.zanzibar-tours.co.tz/wp-content/uploads/2024/11/tour_gallery_42.jpg",
    headerImage: "https://www.zanzibar-tours.co.tz/wp-content/uploads/2024/11/tour_gallery_42.jpg",
    gallery: [
      "https://www.zanzibar-tours.co.tz/wp-content/uploads/2024/11/tour_gallery_42.jpg",
      "https://www.exploretanzaniatours.com/wp-content/uploads/2022/02/Jozani-Chwaka-Bay-National-park.jpg",
      "https://images.pexels.com/photos/4577816/pexels-photo-4577816.jpeg"
    ],
    price: "From $35",
    duration: "3 Hours",
    groupType: "Private / Group",
    groupSize: "1-10 Guests",
    location: "Jozani Chwaka Bay National Park",
    category: "Wildlife",
    description: "Visit Zanzibar's only national park and encounter the rare Red Colobus Monkeys found nowhere else on Earth. Walk through ancient mahogany forest, explore unique mangrove boardwalks, and learn about the island's diverse ecosystem. This is a must-do experience for nature lovers.",
    itinerary: [
      { time: "09:00 AM", event: "Pickup from your hotel." },
      { time: "09:45 AM", event: "Arrive at Jozani Forest entrance." },
      { time: "10:00 AM", event: "Forest walk with guide to spot Red Colobus Monkeys." },
      { time: "11:00 AM", event: "Explore the mangrove boardwalk trail." },
      { time: "11:30 AM", event: "Learn about medicinal plants and forest ecology." },
      { time: "12:00 PM", event: "Return transfer to hotel." }
    ],
    inclusions: ["Hotel pickup & drop-off", "Park entrance fees", "Professional guide", "Bottled water"],
    exclusions: ["Tips", "Lunch", "Personal expenses"]
  },
  {
    slug: "prison-island-tour",
    title: "Prison Island Tour",
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/8a/85/05.jpg",
    headerImage: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/8a/85/05.jpg",
    gallery: [
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/8a/85/05.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/fb/f4/56/prison-island.jpg?w=500&h=300&s=1",
      "https://www.tanzaniatourism.com/images/uploads/Zanzibar_Prison_Island_01.jpg"
    ],
    price: "From $40",
    duration: "3 Hours",
    groupType: "Group / Private",
    groupSize: "Any Size",
    location: "Prison Island (Changuu)",
    category: "Wildlife",
    description: "Visit historic Prison Island to meet the giant Aldabra tortoises, some over 190 years old. Explore the old prison ruins built in 1893, swim and snorkel in crystal-clear waters, and relax on pristine white sandy beaches. A perfect half-day escape from Stone Town.",
    itinerary: [
      { time: "09:00 AM", event: "Boat departure from Stone Town waterfront." },
      { time: "09:30 AM", event: "Arrive at Prison Island." },
      { time: "09:45 AM", event: "Meet and feed the Giant Aldabra Tortoises." },
      { time: "10:30 AM", event: "Explore the historic prison ruins." },
      { time: "11:00 AM", event: "Swimming and snorkeling on the beach." },
      { time: "12:00 PM", event: "Return boat to Stone Town." }
    ],
    inclusions: ["Boat transfer", "Entrance fees", "Guided tour", "Snorkeling gear", "Time to swim and relax"],
    exclusions: ["Gratuities", "Food and drinks", "Personal expenses"]
  },
  {
    slug: "dolphin-tour-kizimkazi",
    title: "Dolphin Tour Kizimkazi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKf9J7jUoEO5ifwNmFYgtvytKTNw9bkVnfgA&s",
    headerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKf9J7jUoEO5ifwNmFYgtvytKTNw9bkVnfgA&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKf9J7jUoEO5ifwNmFYgtvytKTNw9bkVnfgA&s",
      "https://zanzibarworld.com/wp-content/uploads/2021/01/boat-rentals-kizimkazi-mtendeni-zanzibar-central-south-region-processed.jpg",
      "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg"
    ],
    price: "From $70",
    duration: "Half Day",
    groupType: "Private / Group",
    groupSize: "1-8 Guests",
    location: "Kizimkazi, South Zanzibar",
    category: "Wildlife",
    description: "An unforgettable journey to swim with dolphins in their natural habitat. Head to the Kizimkazi coast for a chance to witness bottlenose and spinner dolphins up close. Snorkel in pristine waters and visit the ancient Kizimkazi Mosque, one of the oldest Islamic buildings in East Africa.",
    itinerary: [
      { time: "06:00 AM", event: "Early morning pickup (best time for dolphins)." },
      { time: "07:30 AM", event: "Arrive at Kizimkazi fishing village." },
      { time: "08:00 AM", event: "Board boat and search for dolphins." },
      { time: "08:30 AM", event: "Dolphin swimming and observation." },
      { time: "10:00 AM", event: "Snorkeling at coral reef." },
      { time: "11:00 AM", event: "Visit ancient Kizimkazi Mosque." },
      { time: "12:00 PM", event: "Return to hotel." }
    ],
    inclusions: ["Round-trip transport", "Professional boat captain", "Snorkeling equipment", "Bottled water", "Life jackets"],
    exclusions: ["Lunch", "Tips", "Marine park fees"]
  },
  {
    slug: "spice-tour",
    title: "Spice Tour",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LOjo6A1pvnvysGaS_pMeZGYCzYT6VjAoxg&s",
    headerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LOjo6A1pvnvysGaS_pMeZGYCzYT6VjAoxg&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LOjo6A1pvnvysGaS_pMeZGYCzYT6VjAoxg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYXq6ijO6Z7EfDCQlCBo1eiTyNPyn3cQUxbA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51ofb8BalKEKkZxJUsL88B9pU3YOwGwWGcw&s"
    ],
    price: "From $35",
    duration: "3-4 Hours",
    groupType: "Private / Group",
    groupSize: "1-15 Guests",
    location: "Zanzibar Countryside",
    category: "Culture",
    description: "Discover why Zanzibar is known as the 'Spice Island' on this aromatic journey through working spice plantations. Smell, taste, and learn about cloves, vanilla, cinnamon, nutmeg, black pepper, and more. Experience how these precious spices shaped world history and continue to define Zanzibari cuisine.",
    itinerary: [
      { time: "09:00 AM", event: "Pickup from hotel." },
      { time: "09:30 AM", event: "Arrive at spice plantation." },
      { time: "09:45 AM", event: "Guided tour through spice gardens." },
      { time: "10:30 AM", event: "Taste fresh spices and tropical fruits." },
      { time: "11:15 AM", event: "Traditional spice-infused lunch." },
      { time: "12:30 PM", event: "Visit local market to purchase spices." },
      { time: "01:00 PM", event: "Return to hotel." }
    ],
    inclusions: ["Guided plantation tour", "Spice tasting session", "Traditional lunch", "Spice samples to take home", "Hotel pickup and drop-off"],
    exclusions: ["Gratuities", "Additional spice purchases", "Personal expenses"]
  },
  {
    slug: "nungwi-kendwa-beach-tour",
    title: "Nungwi & Kendwa Beach Tour",
    image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/d8/e4/cd.jpg",
    headerImage: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/d8/e4/cd.jpg",
    gallery: [
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/d8/e4/cd.jpg",
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/92/41/82.jpg",
      "https://images.pexels.com/photos/1074448/pexels-photo-1074448.jpeg"
    ],
    price: "From $55",
    duration: "Full Day",
    groupType: "Private",
    groupSize: "1-6 Guests",
    location: "Nungwi & Kendwa, North Zanzibar",
    category: "Beach",
    description: "Visit the most beautiful beaches in Zanzibar! Explore the vibrant fishing village of Nungwi, relax on the stunning white sands of Kendwa Beach, and witness traditional dhow building. Swim in turquoise waters that stay deep even at low tide.",
    itinerary: [
      { time: "09:00 AM", event: "Pickup from hotel and scenic drive north." },
      { time: "10:30 AM", event: "Arrive at Nungwi fishing village." },
      { time: "10:45 AM", event: "Watch traditional dhow boat builders at work." },
      { time: "11:30 AM", event: "Beach time and swimming at Nungwi Beach." },
      { time: "12:30 PM", event: "Seafood lunch at beachfront restaurant." },
      { time: "02:00 PM", event: "Transfer to Kendwa Beach." },
      { time: "02:30 PM", event: "Relax and swim at Kendwa Beach." },
      { time: "05:00 PM", event: "Return to hotel." }
    ],
    inclusions: ["Private transport", "English-speaking guide", "Seafood lunch", "Bottled water", "Beach time"],
    exclusions: ["Drinks", "Tips", "Personal expenses"]
  },
  {
    slug: "nungwi-cooking-class",
    title: "Nungwi Beach & Cooking Class Tour",
    image: "https://cdn.getyourguide.com/img/tour/9f979c2ea6578e2463452c93c0c1bb07833a9fb3c70ede80c9f9dc0a0ede8f1d.jpg/146.jpg",
    headerImage: "https://cdn.getyourguide.com/img/tour/9f979c2ea6578e2463452c93c0c1bb07833a9fb3c70ede80c9f9dc0a0ede8f1d.jpg/146.jpg",
    gallery: [
      "https://cdn.getyourguide.com/img/tour/9f979c2ea6578e2463452c93c0c1bb07833a9fb3c70ede80c9f9dc0a0ede8f1d.jpg/146.jpg",
      "https://www.easytravel.co.tz/wp-content/uploads/2023/06/Nungwi-Beach-Zanzibar.jpg",
      "https://images.pexels.com/photos/1074448/pexels-photo-1074448.jpeg"
    ],
    price: "From $75",
    duration: "Full Day",
    groupType: "Private",
    groupSize: "1-8 Guests",
    location: "Nungwi, North Zanzibar",
    category: "Culture",
    description: "Combine beach paradise with culinary adventure! Learn to cook authentic Zanzibari dishes using fresh spices and local ingredients. Visit the local market, prepare traditional meals, and enjoy your creations on the beautiful Nungwi Beach.",
    itinerary: [
      { time: "08:30 AM", event: "Pickup from hotel." },
      { time: "10:00 AM", event: "Visit local market for fresh ingredients." },
      { time: "11:00 AM", event: "Cooking class begins - learn Zanzibari recipes." },
      { time: "01:00 PM", event: "Enjoy the meal you prepared." },
      { time: "02:30 PM", event: "Beach time at Nungwi Beach." },
      { time: "05:00 PM", event: "Return to hotel." }
    ],
    inclusions: ["Transport", "Cooking class", "All ingredients", "Recipe booklet", "Lunch", "Beach time"],
    exclusions: ["Drinks", "Tips"]
  },
  {
    slug: "quad-bike-adventure",
    title: "Quad Bike Adventure in Zanzibar",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2GaFVE4bGqH31qTYYT2J6AY_nrtx8ArhMcQ&s",
    headerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2GaFVE4bGqH31qTYYT2J6AY_nrtx8ArhMcQ&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2GaFVE4bGqH31qTYYT2J6AY_nrtx8ArhMcQ&s",
      "https://tuliazanzibar.com/wp-content/uploads/2019/09/01222E32A478423CB60DBA681674DE77.jpg",
      "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg"
    ],
    price: "From $90",
    duration: "3-4 Hours",
    groupType: "Private / Group",
    groupSize: "1-10 Guests",
    location: "Paje, East Zanzibar",
    category: "Adventure",
    description: "Get your adrenaline pumping on a thrilling quad bike adventure! Ride through rural villages, coconut plantations, and along stunning coastlines. Experience the real Zanzibar away from tourist areas while enjoying the thrill of off-road driving.",
    itinerary: [
      { time: "09:00 AM", event: "Pickup from hotel." },
      { time: "10:00 AM", event: "Safety briefing and quad bike introduction." },
      { time: "10:30 AM", event: "Start the adventure through villages and plantations." },
      { time: "11:30 AM", event: "Stop at local village for refreshments." },
      { time: "12:00 PM", event: "Continue ride along the beach." },
      { time: "01:00 PM", event: "Return and transfer back to hotel." }
    ],
    inclusions: ["Quad bike rental", "Helmet & goggles", "Guide", "Bottled water", "Transport"],
    exclusions: ["Lunch", "Tips", "Insurance"]
  },
  {
    slug: "kuza-cave-adventure",
    title: "Kuza Cave Adventure",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrxPEFPBN4oGZZrFszPYMh3udN4LesvE2Yw&s",
    headerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrxPEFPBN4oGZZrFszPYMh3udN4LesvE2Yw&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrxPEFPBN4oGZZrFszPYMh3udN4LesvE2Yw&s",
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0f/84/ce/fc.jpg",
      "https://www.travelnotesonline.com/wp-content/uploads/2019/11/img_20190908_123604-scaled.jpg"
    ],
    price: "From $25",
    duration: "2-3 Hours",
    groupType: "Private / Group",
    groupSize: "1-20 Guests",
    location: "Paje, East Zanzibar",
    category: "Adventure",
    description: "Discover the hidden gem of Kuza Cave, a stunning natural limestone cave with crystal-clear underground water. Swim in the cool, refreshing waters surrounded by impressive stalactites and stalagmites. This mystical cave offers a unique and magical swimming experience.",
    itinerary: [
      { time: "09:00 AM", event: "Pickup from hotel." },
      { time: "09:45 AM", event: "Arrive at Kuza Cave entrance." },
      { time: "10:00 AM", event: "Descend into the cave and explore." },
      { time: "10:30 AM", event: "Swimming in the crystal-clear cave waters." },
      { time: "11:30 AM", event: "Photo session and relaxation." },
      { time: "12:00 PM", event: "Return to hotel." }
    ],
    inclusions: ["Transport", "Entrance fees", "Guide", "Towel", "Bottled water"],
    exclusions: ["Lunch", "Tips", "Underwater camera"]
  },
  {
    slug: "mtende-secret-beach",
    title: "Mtende Secret Beach",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_TkBZtFnm3ZbSGJfshMoK6nUXVsrk1QLMw&s",
    headerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_TkBZtFnm3ZbSGJfshMoK6nUXVsrk1QLMw&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_TkBZtFnm3ZbSGJfshMoK6nUXVsrk1QLMw&s",
      "https://static.wixstatic.com/media/646042_0fafc3060fdb405c8e350eac60693e1d~mv2.jpg/v1/fill/w_187,h_187,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/mtende-beach.jpg",
      "https://cdn.getyourguide.com/img/tour/c94e8969f6279020b91e41f1ee15315ef44395c11a40fb9a3f5d8cb566f249a1.jpg/146.jpg"
    ],
    price: "From $45",
    duration: "Half Day",
    groupType: "Private",
    groupSize: "1-10 Guests",
    location: "Mtende, Southeast Zanzibar",
    category: "Beach",
    description: "Escape to the untouched paradise of Mtende Secret Beach, one of Zanzibar's best-kept secrets. This pristine stretch of white sand is perfect for those seeking tranquility away from crowds. Swim in warm turquoise waters and experience authentic local beach culture.",
    itinerary: [
      { time: "09:00 AM", event: "Pickup from hotel." },
      { time: "10:00 AM", event: "Arrive at Mtende Secret Beach." },
      { time: "10:15 AM", event: "Beach setup and relaxation." },
      { time: "11:00 AM", event: "Swimming and exploring the coastline." },
      { time: "12:30 PM", event: "Fresh seafood lunch on the beach." },
      { time: "02:00 PM", event: "Return to hotel." }
    ],
    inclusions: ["Transport", "Beach mat", "Seafood lunch", "Drinks", "Guide"],
    exclusions: ["Tips", "Personal expenses"]
  },
  {
    slug: "village-cultural-tour",
    title: "Village Cultural Tour",
    image: "https://zanzibarleisuretours.co.tz/wp-content/uploads/2020/11/villagetour2.jpg",
    headerImage: "https://zanzibarleisuretours.co.tz/wp-content/uploads/2020/11/villagetour2.jpg",
    gallery: [
      "https://zanzibarleisuretours.co.tz/wp-content/uploads/2020/11/villagetour2.jpg",
      "https://zanzibarstartours.net/wp-content/uploads/2018/11/102.jpg",
      "https://minneriyasafari.com/wp-content/uploads/2023/08/Sigiriya_Village_Tour-600x600.jpg"
    ],
    price: "From $40",
    duration: "4 Hours",
    groupType: "Private",
    groupSize: "1-8 Guests",
    location: "Rural Zanzibar",
    category: "Culture",
    description: "Experience authentic Zanzibari village life! Visit local families, learn traditional crafts, see how palm wine is made, and participate in daily village activities. This immersive tour offers genuine cultural exchange and supports local communities.",
    itinerary: [
      { time: "09:00 AM", event: "Pickup from hotel." },
      { time: "09:45 AM", event: "Arrive at traditional village." },
      { time: "10:00 AM", event: "Meet local families and tour the village." },
      { time: "10:45 AM", event: "Watch traditional craft-making." },
      { time: "11:30 AM", event: "Palm wine tasting and coconut harvesting demo." },
      { time: "12:15 PM", event: "Traditional Swahili lunch with a local family." },
      { time: "01:00 PM", event: "Return to hotel." }
    ],
    inclusions: ["Transport", "Local guide", "Traditional lunch", "Cultural activities", "Village donations"],
    exclusions: ["Tips", "Personal purchases"]
  },
  {
    slug: "maalum-cave-exploration",
    title: "Maalum Cave Exploration",
    image: "https://zanzibarstartours.net/wp-content/uploads/2023/10/1000029754-scaled.jpg",
    headerImage: "https://zanzibarstartours.net/wp-content/uploads/2023/10/1000029754-scaled.jpg",
    gallery: [
      "https://zanzibarstartours.net/wp-content/uploads/2023/10/1000029754-scaled.jpg",
      "https://maalumzanzibar.com/images/instagram-2.jpg",
      "https://worldoflina.com/wp-content/uploads/2024/09/DSC_0789-1-850x680.jpg"
    ],
    price: "From $30",
    duration: "2-3 Hours",
    groupType: "Private / Group",
    groupSize: "1-15 Guests",
    location: "Paje, East Zanzibar",
    category: "Adventure",
    description: "Discover the magical Maalum Cave, a natural wonder hidden beneath the Zanzibar landscape. Descend into this beautiful underground cave and swim in its pristine, crystal-clear waters. The name 'Maalum' means 'special' in Swahili, and this hidden gem truly lives up to its name.",
    itinerary: [
      { time: "09:00 AM", event: "Pickup from hotel." },
      { time: "09:45 AM", event: "Arrive at Maalum Cave." },
      { time: "10:00 AM", event: "Guided introduction and descent into cave." },
      { time: "10:15 AM", event: "Swimming in the crystal-clear underground pool." },
      { time: "11:15 AM", event: "Relaxation and photo opportunities." },
      { time: "11:45 AM", event: "Return to hotel." }
    ],
    inclusions: ["Transport", "Entrance fees", "Guide", "Towel", "Water"],
    exclusions: ["Lunch", "Tips"]
  },

  // ================== PACKAGE TOURS ==================
  {
    slug: "jozani-spice-stonetown-package",
    title: "Jozani + Spice Farm + Stone Town Tour",
    image: "https://www.exploretanzaniatours.com/wp-content/uploads/2022/02/Jozani-Chwaka-Bay-National-park.jpg",
    headerImage: "https://www.exploretanzaniatours.com/wp-content/uploads/2022/02/Jozani-Chwaka-Bay-National-park.jpg",
    gallery: [
      "https://www.exploretanzaniatours.com/wp-content/uploads/2022/02/Jozani-Chwaka-Bay-National-park.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LOjo6A1pvnvysGaS_pMeZGYCzYT6VjAoxg&s",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/30/34/de/caption.jpg?w=500&h=400&s=1"
    ],
    price: "From $85",
    duration: "Full Day",
    groupType: "Private",
    groupSize: "1-8 Guests",
    location: "Multiple Locations, Zanzibar",
    category: "Culture",
    description: "The ultimate Zanzibar cultural experience! Combine three of the island's most popular attractions in one full-day tour. Encounter rare Red Colobus Monkeys in Jozani Forest, explore aromatic spice plantations, and walk through the historic streets of UNESCO-listed Stone Town.",
    itinerary: [
      { time: "08:00 AM", event: "Pickup from hotel." },
      { time: "09:00 AM", event: "Jozani Forest - Red Colobus Monkey encounter." },
      { time: "10:30 AM", event: "Mangrove boardwalk exploration." },
      { time: "11:30 AM", event: "Spice plantation tour and tasting." },
      { time: "01:00 PM", event: "Traditional lunch at spice farm." },
      { time: "02:30 PM", event: "Stone Town walking tour begins." },
      { time: "04:30 PM", event: "Visit markets and historic sites." },
      { time: "05:30 PM", event: "Return to hotel." }
    ],
    inclusions: ["Private transport", "All entrance fees", "Professional guide", "Traditional lunch", "Spice samples", "Bottled water"],
    exclusions: ["Tips", "Personal purchases", "Dinner"],
    isPackage: true
  },
  {
    slug: "salam-cave-jozani-spice-package",
    title: "Salam Cave + Jozani Forest + Spice Farm",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrxPEFPBN4oGZZrFszPYMh3udN4LesvE2Yw&s",
    headerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrxPEFPBN4oGZZrFszPYMh3udN4LesvE2Yw&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrxPEFPBN4oGZZrFszPYMh3udN4LesvE2Yw&s",
      "https://www.exploretanzaniatours.com/wp-content/uploads/2022/02/Jozani-Chwaka-Bay-National-park.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LOjo6A1pvnvysGaS_pMeZGYCzYT6VjAoxg&s"
    ],
    price: "From $75",
    duration: "Full Day",
    groupType: "Private",
    groupSize: "1-10 Guests",
    location: "Central & East Zanzibar",
    category: "Adventure",
    description: "Adventure meets nature and culture! Swim in the magical underground Salam Cave, encounter rare Red Colobus Monkeys in Jozani Forest, and discover the aromatic world of Zanzibar's famous spice plantations.",
    itinerary: [
      { time: "08:00 AM", event: "Pickup from hotel." },
      { time: "09:00 AM", event: "Salam Cave swimming experience." },
      { time: "10:30 AM", event: "Transfer to Jozani Forest." },
      { time: "11:00 AM", event: "Red Colobus Monkey encounter." },
      { time: "12:30 PM", event: "Spice plantation tour." },
      { time: "01:30 PM", event: "Traditional lunch at spice farm." },
      { time: "02:30 PM", event: "Return to hotel." }
    ],
    inclusions: ["Transport", "All entrance fees", "Guide", "Lunch", "Spice samples"],
    exclusions: ["Tips", "Personal items"],
    isPackage: true
  },
  {
    slug: "prison-island-nakupenda-package",
    title: "Prison Island + Nakupenda Sandbank",
    image: "https://cdn.getyourguide.com/img/location/5c4def5d967c6.jpeg/99.jpg",
    headerImage: "https://cdn.getyourguide.com/img/location/5c4def5d967c6.jpeg/99.jpg",
    gallery: [
      "https://cdn.getyourguide.com/img/location/5c4def5d967c6.jpeg/99.jpg",
      "https://www.tanzaniatourism.com/images/uploads/Zanzibar_Prison_Island.jpg",
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/dc/04/45.jpg"
    ],
    price: "From $70",
    duration: "Full Day",
    groupType: "Group / Private",
    groupSize: "2-15 Guests",
    location: "Stone Town Waters, Zanzibar",
    category: "Beach",
    description: "Two island paradises in one day! Meet giant Aldabra tortoises on historic Prison Island, then relax on the stunning Nakupenda Sandbank. Enjoy swimming, snorkeling, and a fresh seafood lunch surrounded by turquoise waters.",
    itinerary: [
      { time: "09:00 AM", event: "Boat departure from Stone Town." },
      { time: "09:30 AM", event: "Arrive at Prison Island." },
      { time: "09:45 AM", event: "Giant tortoise encounter and feeding." },
      { time: "10:30 AM", event: "Explore prison ruins and beach." },
      { time: "11:30 AM", event: "Boat to Nakupenda Sandbank." },
      { time: "12:00 PM", event: "Seafood BBQ lunch on the sandbank." },
      { time: "01:30 PM", event: "Swimming and snorkeling." },
      { time: "03:00 PM", event: "Return to Stone Town." }
    ],
    inclusions: ["Boat transfers", "All entrance fees", "Seafood lunch", "Drinks", "Snorkeling gear", "Beach setup"],
    exclusions: ["Tips", "Alcoholic drinks"],
    isPackage: true
  },
  {
    slug: "stonetown-prison-jozani-package",
    title: "Stone Town + Prison Island + Jozani Forest",
    image: "https://serengetinationalparksafaris.com/wp-content/uploads/2022/10/Stone-Town-Zanzibar-zanzibar-tourists-800x450-1-750x450.jpg",
    headerImage: "https://serengetinationalparksafaris.com/wp-content/uploads/2022/10/Stone-Town-Zanzibar-zanzibar-tourists-800x450-1-750x450.jpg",
    gallery: [
      "https://serengetinationalparksafaris.com/wp-content/uploads/2022/10/Stone-Town-Zanzibar-zanzibar-tourists-800x450-1-750x450.jpg",
      "https://www.tanzaniatourism.com/images/uploads/Zanzibar_Prison_Island.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/eb/2c/52/jozan-forest-is-a-national.jpg?w=900&h=500&s=1"
    ],
    price: "From $95",
    duration: "Full Day",
    groupType: "Private",
    groupSize: "1-6 Guests",
    location: "Zanzibar",
    category: "Culture",
    description: "Experience the best of Zanzibar's history, wildlife, and nature in one comprehensive tour. Explore UNESCO-listed Stone Town, meet giant tortoises on Prison Island, and encounter rare Red Colobus Monkeys in Jozani Forest.",
    itinerary: [
      { time: "08:00 AM", event: "Stone Town walking tour begins." },
      { time: "10:00 AM", event: "Boat to Prison Island." },
      { time: "10:30 AM", event: "Giant tortoise encounter." },
      { time: "11:30 AM", event: "Snorkeling and beach time." },
      { time: "12:30 PM", event: "Return to Stone Town for lunch." },
      { time: "02:00 PM", event: "Transfer to Jozani Forest." },
      { time: "02:45 PM", event: "Red Colobus Monkey encounter." },
      { time: "04:00 PM", event: "Mangrove boardwalk." },
      { time: "05:00 PM", event: "Return to hotel." }
    ],
    inclusions: ["All transport", "Boat transfers", "Entrance fees", "Lunch", "Guide"],
    exclusions: ["Tips", "Drinks", "Personal expenses"],
    isPackage: true
  },

  // ================== SAFARI TOURS ==================
  {
    slug: "selous-game-reserve-safari",
    title: "Selous Game Reserve Safari",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrpXhIynX1HELPZ7J5Ei-Ezzk6SSmO-jsVw&s",
    headerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrpXhIynX1HELPZ7J5Ei-Ezzk6SSmO-jsVw&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrpXhIynX1HELPZ7J5Ei-Ezzk6SSmO-jsVw&s",
      "https://www.tanzaniaodyssey.com/site/odyssey-image-proxy/park/selous=401199-320.jpg",
      "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg"
    ],
    price: "From $450",
    duration: "1-3 Days",
    groupType: "Private Fly-in",
    groupSize: "2-6 Guests",
    location: "Nyerere National Park (Selous)",
    category: "Safari",
    description: "Experience the wild heart of Africa in one of the largest game reserves on the continent. Selous (now Nyerere National Park) offers incredible wildlife encounters with elephants, lions, wild dogs, and hippos. Enjoy game drives, boat safaris, and walking safaris in this untouched wilderness.",
    itinerary: [
      { time: "Day 1 06:00 AM", event: "Flight from Zanzibar to Selous airstrip." },
      { time: "Day 1 09:00 AM", event: "Morning game drive." },
      { time: "Day 1 01:00 PM", event: "Lunch at safari camp." },
      { time: "Day 1 04:00 PM", event: "Afternoon boat safari on Rufiji River." },
      { time: "Day 1 07:00 PM", event: "Dinner under the stars." },
      { time: "Day 2 06:00 AM", event: "Full day game drive with picnic lunch." },
      { time: "Day 3 06:00 AM", event: "Walking safari and flight back to Zanzibar." }
    ],
    inclusions: ["Return flights", "All game activities", "Luxury camp accommodation", "All meals", "Park fees", "Expert guide"],
    exclusions: ["Travel insurance", "Alcoholic drinks", "Tips", "Personal items"],
    isSafari: true
  },
  {
    slug: "mikumi-national-park-safari",
    title: "Mikumi National Park Full-Day Tour",
    image: "https://www.ngorongorocratertanzania.org/wp-content/uploads/2023/03/1-Day-Trip-Mikumi-National-Park-1.jpg",
    headerImage: "https://www.ngorongorocratertanzania.org/wp-content/uploads/2023/03/1-Day-Trip-Mikumi-National-Park-1.jpg",
    gallery: [
      "https://www.ngorongorocratertanzania.org/wp-content/uploads/2023/03/1-Day-Trip-Mikumi-National-Park-1.jpg",
      "https://www.focuseastafricatours.com/wp-content/uploads/Mikumi-National-Park-1.jpg",
      "https://www.leopard-tours.com/wp-content/uploads/2015/12/Mikumi-National-Park-4-1024x680.jpg",
      "https://enosaexpeditions.com/images/2022/05/19/mikumi.jpg"
    ],
    price: "From $350",
    duration: "Full Day",
    groupType: "Private",
    groupSize: "2-6 Guests",
    location: "Mikumi National Park, Tanzania",
    category: "Safari",
    description: "The closest safari destination from Dar es Salaam! Mikumi National Park offers excellent game viewing with lions, elephants, giraffes, zebras, and wildebeest. Known as 'Little Serengeti,' this park provides an authentic safari experience in a single day.",
    itinerary: [
      { time: "05:00 AM", event: "Early departure from Dar es Salaam." },
      { time: "09:00 AM", event: "Arrive at Mikumi and begin morning game drive." },
      { time: "12:00 PM", event: "Picnic lunch at viewpoint." },
      { time: "01:30 PM", event: "Continue afternoon game drive." },
      { time: "04:30 PM", event: "Final wildlife viewing." },
      { time: "05:00 PM", event: "Depart for Dar es Salaam." },
      { time: "09:00 PM", event: "Arrive back in Dar es Salaam." }
    ],
    inclusions: ["Private 4x4 vehicle", "Professional driver-guide", "Park fees", "Picnic lunch", "Bottled water", "Binoculars"],
    exclusions: ["Dar es Salaam hotel", "Tips", "Personal expenses"],
    isSafari: true
  },
  {
    slug: "serengeti-national-park-safari",
    title: "Serengeti National Park Safari",
    image: "https://www.safariventures.com/wp-content/uploads/Untitled-design-1-1.png",
    headerImage: "https://www.safariventures.com/wp-content/uploads/Untitled-design-1-1.png",
    gallery: [
      "https://www.safariventures.com/wp-content/uploads/Untitled-design-1-1.png",
      "https://www.greatadventuresafaris.com/wp-content/uploads/Safaro-tours-to-serengeti-national-park.jpg",
      "https://roamwildadventure.com/wp-content/uploads/2021/02/5-day-safari-tarangire-ngorongoro-serengeti-manyara-olduvai-gallery-09-blurred-1-1024x654.jpg",
      "https://www.achieveglobalsafaris.com/wp-content/uploads/2021/01/4-Days-Serengeti-Wildlife-Safari.jpg"
    ],
    price: "From $1,800",
    duration: "3 Days / 2 Nights",
    groupType: "Private Fly-in",
    groupSize: "2-6 Guests",
    location: "Serengeti National Park, Tanzania",
    category: "Safari",
    description: "Witness the greatest wildlife spectacle on Earth in the legendary Serengeti! Home to the Great Migration with over 1.5 million wildebeest and zebras, and the highest concentration of predators in Africa. Spot the Big Five and experience the endless plains under the African sky.",
    itinerary: [
      { time: "Day 1 07:00 AM", event: "Flight from Zanzibar to Serengeti." },
      { time: "Day 1 10:00 AM", event: "Arrive and begin game drive." },
      { time: "Day 1 01:00 PM", event: "Lunch at luxury tented camp." },
      { time: "Day 1 04:00 PM", event: "Afternoon game drive." },
      { time: "Day 1 07:00 PM", event: "Sundowner drinks and dinner." },
      { time: "Day 2", event: "Full day game drive tracking the Great Migration." },
      { time: "Day 3 06:00 AM", event: "Sunrise game drive." },
      { time: "Day 3 11:00 AM", event: "Flight back to Zanzibar." }
    ],
    inclusions: ["Return flights", "Luxury tented accommodation", "All meals & drinks", "Expert naturalist guide", "Game drives", "Park fees"],
    exclusions: ["Travel insurance", "Tips", "Premium drinks", "Visa fees"],
    isSafari: true
  },
  {
    slug: "ngorongoro-crater-day-trip",
    title: "Ngorongoro Crater Day Trip",
    image: "https://www.andbeyond.com/wp-content/uploads/sites/5/ngorongoro-crater-floor-teaming-with-game.jpg",
    headerImage: "https://www.andbeyond.com/wp-content/uploads/sites/5/ngorongoro-crater-floor-teaming-with-game.jpg",
    gallery: [
      "https://www.andbeyond.com/wp-content/uploads/sites/5/ngorongoro-crater-floor-teaming-with-game.jpg",
      "https://abundadiscoveriesuganda.com/wp-content/uploads/2025/01/Ngorongoro-National-Park-Tanzania-by-Licious-Adventure-%E2%80%94-YouPic.jpg",
      "https://www.discoverafrica.com/wp-content/uploads/2019/06/iStock-536747875.jpg",
      "https://www.africanmeccasafaris.com/wp-content/uploads/gibbsfarm2.jpg",
      "https://www.ngorongorocratertanzania.org/wp-content/uploads/2020/02/asas-1.jpg",
      "https://www.ngorongorocratertanzania.org/wp-content/uploads/2019/04/Ngorongoro-Facts-750x450.jpg"
    ],
    price: "From $650",
    duration: "Full Day",
    groupType: "Private Fly-in",
    groupSize: "2-6 Guests",
    location: "Ngorongoro Conservation Area, Tanzania",
    category: "Safari",
    description: "Descend into the world's largest intact volcanic caldera, often called 'Africa's Garden of Eden.' The Ngorongoro Crater is a natural sanctuary for the Big Five, with one of the highest wildlife densities on Earth. This UNESCO World Heritage Site offers breathtaking scenery and unparalleled game viewing.",
    itinerary: [
      { time: "05:30 AM", event: "Flight from Zanzibar to Kilimanjaro/Arusha." },
      { time: "08:30 AM", event: "Transfer to Ngorongoro Crater rim." },
      { time: "09:30 AM", event: "Descend into the crater floor." },
      { time: "10:00 AM", event: "Game drive on crater floor - lions, elephants, rhinos." },
      { time: "12:30 PM", event: "Picnic lunch at Ngoitokitok Springs." },
      { time: "01:30 PM", event: "Continue game drive - hippo pool, flamingos." },
      { time: "04:00 PM", event: "Ascend crater and transfer to airstrip." },
      { time: "06:00 PM", event: "Flight back to Zanzibar." }
    ],
    inclusions: ["Return flights", "Private 4x4 vehicle", "Expert guide", "Crater fees", "Picnic lunch", "Bottled water", "Binoculars"],
    exclusions: ["Tips", "Travel insurance", "Personal expenses"],
    isSafari: true
  }
];

// Helper functions
export const getTourBySlug = (slug: string): Tour | undefined => {
  return tours.find(t => t.slug === slug);
};

export const getToursByCategory = (category: string): Tour[] => {
  if (category === "All") return tours;
  return tours.filter(t => t.category === category);
};

export const getSafariTours = (): Tour[] => {
  return tours.filter(t => t.isSafari);
};

export const getPackageTours = (): Tour[] => {
  return tours.filter(t => t.isPackage);
};

export const getSingleTours = (): Tour[] => {
  return tours.filter(t => !t.isSafari && !t.isPackage);
};

export const getCategories = (): string[] => {
  return ["All", ...Array.from(new Set(tours.map(t => t.category)))];
};
