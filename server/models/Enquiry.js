import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    propertyId: {
      type: String,
      default: '',
    },
    propertyTitle: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    enquiryType: {
      type: String,
      enum: ['buy', 'rent', 'valuation', 'general', 'viewing'],
      default: 'buy',
    },
    preferredLocation: {
      type: String,
      default: '',
    },
    budget: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'scheduled', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
