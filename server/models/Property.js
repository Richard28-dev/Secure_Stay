import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ['Apartment', 'Villa', 'Penthouse', 'Estate', 'Townhouse', 'Duplex'],
      required: true,
    },
    intent: {
      type: String,
      enum: ['buy', 'rent'],
      default: 'buy',
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    priceValue: {
      type: Number,
      required: true,
    },
    pricePerSqFt: {
      type: String,
      default: '₹7,500 / sq.ft',
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    neighbourhood: {
      type: String,
      default: '',
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    furnishing: {
      type: String,
      enum: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
      default: 'Semi-Furnished',
    },
    parkingSpaces: {
      type: Number,
      default: 2,
    },
    yearBuilt: {
      type: Number,
      default: 2024,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    recent: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['available', 'under_offer', 'sold', 'archived'],
      default: 'available',
    },
    agent: {
      name: { type: String, default: 'Vikram Patel' },
      phone: { type: String, default: '+91 98450 18234' },
      email: { type: String, default: 'vikram.patel@securestay.com' },
      avatar: { type: String, default: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80' },
      agencyName: { type: String, default: 'SecureStay Advisory Prime' },
      licenseNumber: { type: String, default: 'RERA-KA-2023-88910' },
    },
  },
  {
    timestamps: true,
  }
);

// Search indexing
propertySchema.index({ title: 'text', location: 'text', city: 'text', description: 'text' });

export const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
