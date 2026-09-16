import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Property } from '../models/Property.js';
import { Location } from '../models/Location.js';
import { User } from '../models/User.js';
import { seedProperties, seedLocations } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/securestay_db';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully for seeding.');

    // Clear existing data
    await Property.deleteMany({});
    await Location.deleteMany({});
    console.log('Cleared existing properties and locations.');

    // Prepare properties with sanitized id handling if needed
    const propsToInsert = seedProperties.map(p => {
      const { id, ...rest } = p;
      return rest;
    });

    // Insert Properties
    const insertedProps = await Property.insertMany(propsToInsert);
    console.log(`Successfully seeded ${insertedProps.length} verified properties!`);

    // Insert Locations
    const insertedLocs = await Location.insertMany(seedLocations);
    console.log(`Successfully seeded ${insertedLocs.length} prime locations!`);

    // Create demo users if not present
    const demoBuyer = await User.findOne({ email: 'demo@securestay.com' });
    if (!demoBuyer) {
      await User.create({
        name: 'Aarav Sharma',
        email: 'demo@securestay.com',
        password: 'password123',
        role: 'buyer',
        phone: '+91 98765 43210'
      });
      console.log('Created demo buyer account: demo@securestay.com / password123');
    }

    const demoAgent = await User.findOne({ email: 'agent@securestay.com' });
    if (!demoAgent) {
      await User.create({
        name: 'Vikram Patel',
        email: 'agent@securestay.com',
        password: 'password123',
        role: 'agent',
        phone: '+91 98450 18234',
        agencyName: 'SecureStay Advisory Prime',
        licenseNumber: 'RERA-KA-2023-88910'
      });
      console.log('Created demo agent account: agent@securestay.com / password123');
    }

    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

seedDatabase();
