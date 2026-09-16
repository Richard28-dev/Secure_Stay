import { Location } from '../models/Location.js';
import { seedLocations } from '../seeds/seedData.js';

let fallbackLocations = [...seedLocations];

// @route   GET /api/locations
export const getLocations = async (req, res) => {
  try {
    try {
      const locations = await Location.find({});
      if (locations && locations.length > 0) {
        return res.json({ success: true, count: locations.length, data: locations });
      }
    } catch {
      // Fallback
    }

    return res.json({ success: true, count: fallbackLocations.length, data: fallbackLocations });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
