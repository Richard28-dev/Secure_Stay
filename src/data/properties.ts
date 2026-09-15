export interface Property {
  id: string;
  name: string;
  location: string;
  city: string;
  price: string;
  priceValue: number;
  bedrooms: number;
  bathrooms: number;
  area: string;
  areaValue: number;
  type: string;
  parking: number;
  description: string;
  features: string[];
  amenities: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    title: string;
  };
  images: string[];
  featured: boolean;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  type: string;
  residences: number;
  startingPrice: string;
  description: string;
  image: string;
  completion: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
}

export const properties: Property[] = [
  {
    id: 'grand-oak-residence',
    name: 'The Grand Oak Residence',
    location: 'Whitefield, Bangalore',
    city: 'Bangalore',
    price: '₹4.85 Cr',
    priceValue: 48500000,
    bedrooms: 4,
    bathrooms: 4,
    area: '3,850 sq.ft',
    areaValue: 3850,
    type: 'Villa',
    parking: 2,
    description: 'An expansive luxury villa set among mature oak trees, The Grand Oak Residence offers four bedrooms, contemporary interiors, and a private pool. Designed for families who value space, privacy and connection to nature — all within minutes of Whitefield\'s tech corridor.',
    features: ['Private Swimming Pool', 'Home Theatre', 'Modular Kitchen', 'Smart Home System'],
    amenities: ['24/7 Security', 'Clubhouse', 'Gym', 'Children\'s Play Area', 'Landscaped Gardens', 'Power Backup', 'Rainwater Harvesting', 'Covered Parking'],
    agent: {
      name: 'Vikram Patel',
      phone: '+91 98765 43210',
      email: 'vikram@securestay.com',
      title: 'Senior Property Advisor',
    },
    images: [],
    featured: true,
  },
  {
    id: 'skyline-crest',
    name: 'Skyline Crest',
    location: 'HITEC City, Hyderabad',
    city: 'Hyderabad',
    price: '₹2.95 Cr',
    priceValue: 29500000,
    bedrooms: 3,
    bathrooms: 3,
    area: '2,450 sq.ft',
    areaValue: 2450,
    type: 'Apartment',
    parking: 2,
    description: 'A premium penthouse-level apartment in Hyderabad\'s most sought-after tech district. Skyline Crest offers panoramic city views, contemporary finishes and access to world-class amenities. An ideal address for professionals and families alike.',
    features: ['Floor-to-Ceiling Windows', 'Italian Marble Flooring', 'Premium Kitchen Appliances', 'Balcony Garden'],
    amenities: ['Infinity Pool', 'Sky Lounge', 'Business Centre', 'Gym', 'Concierge', 'EV Charging', 'Jogging Track', 'Multi-purpose Hall'],
    agent: {
      name: 'Sneha Reddy',
      phone: '+91 98765 43211',
      email: 'sneha@securestay.com',
      title: 'Property Consultant',
    },
    images: [],
    featured: true,
  },
  {
    id: 'palm-grove-villa',
    name: 'Palm Grove Villa',
    location: 'Assagao, Goa',
    city: 'Goa',
    price: '₹5.60 Cr',
    priceValue: 56000000,
    bedrooms: 4,
    bathrooms: 5,
    area: '4,200 sq.ft',
    areaValue: 4200,
    type: 'Villa',
    parking: 3,
    description: 'Nestled among coconut palms in Assagao, Palm Grove Villa is a tropical luxury retreat. Designed with open-plan living, private pool, lush gardens and outdoor dining spaces — it captures the essence of modern Goan living with complete privacy.',
    features: ['Infinity Pool', 'Outdoor Kitchen', 'Tropical Landscaping', 'Open-Air Living Room'],
    amenities: ['Private Garden', 'Covered Parking', 'Solar Panels', 'Water Purification', 'Staff Quarters', 'CCTV Security', 'Backup Generator', 'Outdoor Shower'],
    agent: {
      name: 'Rohan Naik',
      phone: '+91 98765 43212',
      email: 'rohan@securestay.com',
      title: 'Goa Property Specialist',
    },
    images: [],
    featured: true,
  },
  {
    id: 'urban-heights',
    name: 'Urban Heights',
    location: 'Bandra West, Mumbai',
    city: 'Mumbai',
    price: '₹3.75 Cr',
    priceValue: 37500000,
    bedrooms: 3,
    bathrooms: 3,
    area: '2,100 sq.ft',
    areaValue: 2100,
    type: 'Apartment',
    parking: 1,
    description: 'Located in the heart of Bandra West, Urban Heights offers refined city living with premium interiors, sea-facing balconies and access to Mumbai\'s finest dining and cultural destinations. A home for those who live at the centre of everything.',
    features: ['Sea-Facing Balcony', 'Wooden Flooring', 'Designer Bathroom', 'Walk-in Wardrobe'],
    amenities: ['Rooftop Pool', 'Fitness Studio', 'Children\'s Play Zone', 'Library', 'Party Hall', 'Visitor Parking', '24/7 Security', 'High-Speed Elevator'],
    agent: {
      name: 'Anita Shah',
      phone: '+91 98765 43213',
      email: 'anita@securestay.com',
      title: 'Mumbai Division Head',
    },
    images: [],
    featured: true,
  },
  {
    id: 'green-valley-estate',
    name: 'Green Valley Estate',
    location: 'Sarjapur Road, Bangalore',
    city: 'Bangalore',
    price: '₹3.25 Cr',
    priceValue: 32500000,
    bedrooms: 3,
    bathrooms: 3,
    area: '2,700 sq.ft',
    areaValue: 2700,
    type: 'Villa',
    parking: 2,
    description: 'A thoughtfully designed villa along Sarjapur Road\'s green belt. Green Valley Estate features spacious living areas, a home office, private garden and proximity to international schools and IT hubs — making it the ideal family home.',
    features: ['Home Office', 'Private Garden', 'Double-Height Living Room', 'Utility Room'],
    amenities: ['Community Pool', 'Tennis Court', 'Walking Trails', 'Clubhouse', 'Children\'s Park', 'Organic Garden', 'Guest Parking', 'Intercom'],
    agent: {
      name: 'Vikram Patel',
      phone: '+91 98765 43210',
      email: 'vikram@securestay.com',
      title: 'Senior Property Advisor',
    },
    images: [],
    featured: true,
  },
  {
    id: 'lakeview-residence',
    name: 'Lakeview Residence',
    location: 'Kharadi, Pune',
    city: 'Pune',
    price: '₹2.40 Cr',
    priceValue: 24000000,
    bedrooms: 3,
    bathrooms: 2,
    area: '2,300 sq.ft',
    areaValue: 2300,
    type: 'Apartment',
    parking: 2,
    description: 'Overlooking a tranquil lake in Kharadi, this premium apartment combines modern architecture with natural serenity. Lakeview Residence offers bright, airy spaces, quality finishes and a balanced lifestyle in one of Pune\'s fastest-growing neighbourhoods.',
    features: ['Lake-Facing Balcony', 'Vitrified Flooring', 'Modular Kitchen', 'Study Room'],
    amenities: ['Swimming Pool', 'Yoga Studio', 'Indoor Games', 'Multi-purpose Court', 'Cycling Track', 'Senior Citizen Zone', 'Power Backup', 'Fire Safety'],
    agent: {
      name: 'Meera Joshi',
      phone: '+91 98765 43214',
      email: 'meera@securestay.com',
      title: 'Pune Property Advisor',
    },
    images: [],
    featured: true,
  },
];

export const projects: Project[] = [
  {
    id: 'securestay-residences',
    name: 'SecureStay Residences',
    location: 'Bangalore',
    type: 'Premium Apartments',
    residences: 120,
    startingPrice: '₹1.85 Cr onwards',
    description: 'A flagship residential project offering contemporary apartments with world-class amenities in the heart of Bangalore.',
    image: '',
    completion: 'Q4 2026',
  },
  {
    id: 'the-grove-villas',
    name: 'The Grove Villas',
    location: 'Goa',
    type: 'Luxury Villas',
    residences: 36,
    startingPrice: '₹3.90 Cr onwards',
    description: 'An exclusive collection of luxury villas surrounded by tropical landscapes in North Goa.',
    image: '',
    completion: 'Q2 2027',
  },
  {
    id: 'skyline-one',
    name: 'Skyline One',
    location: 'Hyderabad',
    type: 'High-Rise Apartments',
    residences: 200,
    startingPrice: '₹1.45 Cr onwards',
    description: 'A landmark high-rise development offering panoramic city views and premium living in HITEC City.',
    image: '',
    completion: 'Q1 2027',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'SecureStay made the entire property-buying process simple. Their team understood exactly what we were looking for and helped us find a home that exceeded our expectations.',
    name: 'Arjun Mehta',
    location: 'Bangalore',
  },
  {
    id: '2',
    quote: 'The property options were carefully selected and the entire experience felt professional from beginning to end. We never felt pressured, just supported.',
    name: 'Priya Sharma',
    location: 'Hyderabad',
  },
  {
    id: '3',
    quote: 'We appreciated the transparency and support throughout the process. From the first property visit to signing the documents, SecureStay was there at every step.',
    name: 'Rahul & Ananya',
    location: 'Pune',
  },
];

export const locations = [
  { name: 'Bangalore', properties: 24, lat: 12.97, lng: 77.59 },
  { name: 'Hyderabad', properties: 18, lat: 17.39, lng: 78.49 },
  { name: 'Chennai', properties: 15, lat: 13.08, lng: 80.27 },
  { name: 'Mumbai', properties: 21, lat: 19.08, lng: 72.88 },
  { name: 'Pune', properties: 16, lat: 18.52, lng: 73.86 },
  { name: 'Goa', properties: 12, lat: 15.30, lng: 74.12 },
];

export const services = [
  {
    id: 'buying',
    title: 'Property Buying',
    description: 'Find the right property based on your requirements, budget and lifestyle goals. We handle the search so you can focus on the decision.',
    icon: 'Home',
  },
  {
    id: 'selling',
    title: 'Property Selling',
    description: 'Professional property marketing, pricing strategy and buyer assistance to help you achieve the best value for your property.',
    icon: 'TrendingUp',
  },
  {
    id: 'investment',
    title: 'Property Investment',
    description: 'Identify opportunities with long-term investment potential. We analyse markets, locations and projects to guide your decisions.',
    icon: 'BarChart3',
  },
  {
    id: 'management',
    title: 'Property Management',
    description: 'Reliable support for property owners — from tenant management to maintenance, so your property stays in excellent condition.',
    icon: 'Settings',
  },
];
