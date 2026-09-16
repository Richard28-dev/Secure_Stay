import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

import { connectDB } from './config/db.js';
import { Property } from './models/Property.js';
import { Location } from './models/Location.js';
import { seedProperties, seedLocations } from './seeds/seedData.js';

import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import savedRoutes from './routes/savedRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(morgan('dev'));

// Static Uploads Folder
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'SecureStay Real Estates API',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/upload', uploadRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Seed Database on startup if connected & empty
const seedDatabaseIfEmpty = async () => {
  try {
    const propCount = await Property.countDocuments();
    if (propCount === 0) {
      console.log('[Seed] Auto-seeding initial luxury property listings to MongoDB...');
      await Property.insertMany(seedProperties);
      console.log(`[Seed] Seeded ${seedProperties.length} verified listings.`);
    }

    const locCount = await Location.countDocuments();
    if (locCount === 0) {
      await Location.insertMany(seedLocations);
      console.log(`[Seed] Seeded ${seedLocations.length} geographic regions.`);
    }
  } catch (err) {
    // If mongo isn't connected, fallback in-memory store handles all queries automatically
  }
};

// Start Server
const startServer = async () => {
  const dbConnected = await connectDB();
  if (dbConnected) {
    await seedDatabaseIfEmpty();
  }

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  SecureStay Real Estates - REST API Server Running`);
    console.log(`  Port: ${PORT} | Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log(`  REST API URL: http://localhost:${PORT}/api`);
    console.log(`======================================================\n`);
  });
};

startServer();
