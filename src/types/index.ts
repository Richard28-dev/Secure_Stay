export type PropertyIntent = 'buy' | 'rent';

export type PropertyType = 'Villa' | 'Apartment' | 'Penthouse' | 'Estate' | 'Townhouse';

export type FurnishedStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';

export type PropertyStatus = 'available' | 'under_offer' | 'sold' | 'archived';

export interface FloorRoom {
  name: string;
  size: string;
  description: string;
}

export interface FloorPlan {
  level: string;
  title: string;
  area: string;
  rooms: FloorRoom[];
}

export interface NearbyPlace {
  category: 'education' | 'transit' | 'dining' | 'health' | 'leisure';
  name: string;
  distance: string;
  travelTime: string;
}

export interface AgentContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  activeListingsCount: number;
  verified: boolean;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  location: string;
  city: string;
  neighbourhood: string;
  intent: PropertyIntent;
  price: string;
  priceValue: number;
  pricePerSqFt?: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  areaValue: number; // in sq ft
  type: PropertyType;
  parking: number;
  furnished: FurnishedStatus;
  verified: boolean;
  verificationBadgeText?: string;
  status: PropertyStatus;
  description: string;
  overview: string;
  highlights: string[];
  features: string[];
  amenities: string[];
  floorPlans: FloorPlan[];
  nearby: NearbyPlace[];
  agent: AgentContact;
  images: string[];
  featured: boolean;
  recent: boolean;
  yearBuilt: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  sampleIndicator?: boolean;
}

export interface LocationData {
  id: string;
  name: string;
  state: string;
  listingCount: number;
  typicalPrice: string;
  category: string;
  image: string;
  coordinates: { lat: number; lng: number };
}

export type UserRole = 'buyer' | 'agent' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  avatar: string;
  agencyName?: string;
  licenseNumber?: string;
  isEmailVerified: boolean;
  savedPropertyIds: string[];
  createdAt: string;
}

export interface EnquirySubmission {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  name: string;
  email: string;
  phone: string;
  enquiryType: 'buy' | 'rent' | 'valuation' | 'general' | 'viewing';
  preferredLocation?: string;
  budget?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface ViewingAppointment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyPrice: string;
  propertyImage: string;
  date: string;
  time: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface FilterState {
  intent: 'all' | 'buy' | 'rent';
  city: string;
  neighbourhood: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'any';
  bathrooms: number | 'any';
  minArea: number;
  furnished: string;
  verifiedOnly: boolean;
  amenities: string[];
  sortBy: 'newest' | 'price_low' | 'price_high' | 'featured' | 'area';
  query: string;
}
