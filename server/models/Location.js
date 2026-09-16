import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Prime Residential',
    },
    listingCount: {
      type: String,
      default: '25+',
    },
    typicalPrice: {
      type: String,
      default: '₹1.50 Cr – ₹6.50 Cr',
    },
    avgPriceSqFt: {
      type: String,
      default: '₹7,500 / sq.ft',
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);
