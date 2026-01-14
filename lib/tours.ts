export interface Tour {
  slug: string;
  title: string;
  image: string;
  headerImage: string;
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
}

export const tours: Tour[] = [
  {
    slug: "tour-stone-town",
    title: "Stone Town Heritage Walk",
    image: "https://images.unsplash.com/photo-1544644181-14e3532c6680?q=80&w=800",
    headerImage: "https://images.unsplash.com/photo-1544644181-14e3532c6680?q=80&w=2670",
    price: "From $50",
    duration: "3 - 4 Hours",
    groupType: "Private Tour",
    groupSize: "Private / Couples",
    location: "Stone Town, Zanzibar City",
    category: "Culture",
    description: "Immerse yourself in the winding alleys of the UNESCO World Heritage site. Discover the rich history of the Sultanate, the spice trade, and Zanzibar's unique Swahili culture.",
    itinerary: [
      { time: "09:00 AM", event: "Pickup from your hotel and transfer to Stone Town." },
      { time: "09:30 AM", event: "Visit the House of Wonders and Sultan's Palace museum." },
      { time: "10:30 AM", event: "Guided walk through the narrow streets and iconic carved doors." },
      { time: "11:30 AM", event: "Visit the Old Slave Market and Anglican Cathedral." },
      { time: "12:30 PM", event: "Fresh fruit tasting at the Darajani Market." }
    ],
    inclusions: ["Private licensed guide", "Entrance fees", "Bottled water", "Hotel pickup/drop-off"],
    exclusions: ["Lunch", "Optional tips", "Souvenirs"]
  },
  {
    slug: "tour-sunset-cruise",
    title: "Private Sunset Cruise",
    image: "https://images.unsplash.com/photo-1620330101962-d35ed5f21223?q=80&w=800",
    headerImage: "https://images.unsplash.com/photo-1620330101962-d35ed5f21223?q=80&w=2670",
    price: "From $70",
    duration: "3 Hours",
    groupType: "Private Boat",
    groupSize: "Up to 6 guests",
    location: "Stone Town Waterfront",
    category: "Nature",
    description: "Sail into the golden hour on a traditional wooden Swahili Dhow. Experience the serenity of the Indian Ocean as the sun sets behind the horizon, complete with local music and refreshments.",
    itinerary: [
      { time: "04:30 PM", event: "Boarding at the waterfront dock." },
      { time: "05:00 PM", event: "Setting sail with traditional music (Taraab)." },
      { time: "06:00 PM", event: "Sunset viewing with drinks and snacks." },
      { time: "07:00 PM", event: "Return to shore." }
    ],
    inclusions: ["Traditional Dhow hire", "Refreshments & Snacks", "Local musicians", "Life jackets"],
    exclusions: ["Alcoholic beverages (available on request)", "Tips"]
  },
  {
    slug: "tour-prison-island",
    title: "Prison Island Adventure",
    image: "https://images.unsplash.com/photo-1606240724602-5b21f8963974?q=80&w=800",
    headerImage: "https://images.unsplash.com/photo-1606240724602-5b21f8963974?q=80&w=2670",
    price: "From $40",
    duration: "Half Day",
    groupType: "Group/Private",
    groupSize: "Any Size",
    location: "Prison Island",
    category: "Adventure",
    description: "Visit the Giant Aldabra Tortoises, some over 150 years old! Explore the historic quarantine station and enjoy snorkelling in the crystal clear turquoise waters surrounding the island.",
    itinerary: [
        { time: "09:00 AM", event: "Boat departure from Stone Town." },
        { time: "09:30 AM", event: "Feed and take photos with the Giant Tortoises." },
        { time: "10:30 AM", event: "Snorkelling at the nearby coral reef." },
        { time: "11:30 AM", event: "Relaxing on the white sandy beach." }
    ],
    inclusions: ["Boat transport", "Snorkelling gear", "Entry fees", "Bottled water"],
    exclusions: ["Lunch", "Sunscreen"]
  },
  {
    slug: "tour-dolphin",
    title: "Dolphin Spotting & Snorkeling",
    image: "https://images.unsplash.com/photo-1544111306-03f6f1406dc0?q=80&w=800",
    headerImage: "https://images.unsplash.com/photo-1544111306-03f6f1406dc0?q=80&w=1200",
    price: "From $85",
    duration: "Full Day",
    groupType: "Private",
    groupSize: "1-8 Guests",
    location: "Kizimkazi / Mnemba",
    category: "Wildlife",
    description: "An unforgettable journey to swim with dolphins in their natural habitat. Head out to the Kizimkazi coast or Mnemba Atoll for a chance to witness these majestic creatures up close.",
    itinerary: [
        { time: "06:00 AM", event: "Early morning pickup for best dolphin sighting chances." },
        { time: "07:30 AM", event: "Boat departure into the Indian Ocean." },
        { time: "08:00 AM", event: "Dolphin swimming and observation." },
        { time: "10:00 AM", event: "Snorkeling at Mnemba reef." },
        { time: "12:30 PM", event: "Seafood lunch on the beach." }
    ],
    inclusions: ["Round-trip transport", "Professional boat captain", "Full lunch", "Snorkelling equipment"],
    exclusions: ["Marine park fees (where applicable)", "Personal items"]
  },
  {
    slug: "safari-selous-2-day",
    title: "2-Day Selous Game Reserve Safari",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800",
    headerImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200",
    price: "From $850",
    duration: "2 Days / 1 Night",
    groupType: "Private / Fly-in",
    groupSize: "Min 2 Guests",
    location: "Nyerere National Park",
    category: "Safari",
    description: "Take a short flight from Zanzibar to the heart of the African wilderness. Selous (Nyerere NP) offers incredible sightings of elephants, lions, and the rare African wild dog.",
    itinerary: [
        { time: "Day 1 07:00 AM", event: "Flight from Zanzibar to Selous Mtemere Airstrip." },
        { time: "Day 1 09:30 AM", event: "Full day game drive with picnic lunch." },
        { time: "Day 1 06:00 PM", event: "Check-in at Luxury Tented Camp for dinner." },
        { time: "Day 2 06:30 AM", event: "Early morning walking safari or boat safari." },
        { time: "Day 2 04:00 PM", event: "Flight back to Zanzibar." }
    ],
    inclusions: ["Return flights from Zanzibar", "Professional guide", "4x4 Safari Jeep", "All meals", "Luxury accommodation", "Park fees"],
    exclusions: ["Drinks at the camp", "Tips"]
  },
  {
    slug: "safari-serengeti-3-day",
    title: "3-Day Serengeti & Ngorongoro Explorer",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800",
    headerImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200",
    price: "From $1,450",
    duration: "3 Days / 2 Nights",
    groupType: "Private Fly-in",
    groupSize: "Min 2 Guests",
    location: "Northern Tanzania",
    category: "Safari",
    description: "The ultimate Tanzanian adventure. Experience the endless plains of the Serengeti and the magnificent Ngorongoro Crater, a natural wonder of the world.",
    itinerary: [
        { time: "Day 1", event: "Fly to Serengeti, afternoon game drive." },
        { time: "Day 2", event: "Full day in Serengeti tracking the Great Migration." },
        { time: "Day 3", event: "Morning Ngorongoro Crater tour, flight back to Zanzibar." }
    ],
    inclusions: ["All flights", "All park & crater fees", "Professional naturalist guide", "Full-board luxury lodges"],
    exclusions: ["International flights", "Visas", "Gratuities"]
  }
];
