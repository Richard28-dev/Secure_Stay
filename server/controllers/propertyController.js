import { Property } from '../models/Property.js';
import { seedProperties } from '../seeds/seedData.js';

// Fallback in-memory property store
let propertyStore = [...seedProperties];

// @route   GET /api/properties
// @desc    Get all properties with filtering, searching, sorting and pagination
export const getProperties = async (req, res) => {
  try {
    const {
      intent,
      city,
      type,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      verifiedOnly,
      query,
      sort = 'newest',
      page = 1,
      limit = 50,
    } = req.query;

    try {
      const filter = { status: { $ne: 'archived' } };

      if (intent && intent !== 'all') {
        filter.intent = intent;
      }

      if (city && city !== 'All Cities' && city !== '') {
        filter.city = { $regex: city, $options: 'i' };
      }

      if (type && type !== 'All Types' && type !== '') {
        filter.type = { $regex: `^${type}$`, $options: 'i' };
      }

      if (minPrice || maxPrice) {
        filter.priceValue = {};
        if (minPrice) filter.priceValue.$gte = Number(minPrice);
        if (maxPrice) filter.priceValue.$lte = Number(maxPrice);
      }

      if (bedrooms && bedrooms !== 'any') {
        filter.bedrooms = { $gte: Number(bedrooms) };
      }

      if (bathrooms && bathrooms !== 'any') {
        filter.bathrooms = { $gte: Number(bathrooms) };
      }

      if (verifiedOnly === 'true') {
        filter.verified = true;
      }

      if (query && query.trim()) {
        const q = query.trim();
        filter.$or = [
          { title: { $regex: q, $options: 'i' } },
          { location: { $regex: q, $options: 'i' } },
          { city: { $regex: q, $options: 'i' } },
          { neighbourhood: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
        ];
      }

      // Sort
      let sortOption = { createdAt: -1 };
      if (sort === 'price_asc') sortOption = { priceValue: 1 };
      if (sort === 'price_desc') sortOption = { priceValue: -1 };
      if (sort === 'area') sortOption = { area: -1 };

      const properties = await Property.find(filter)
        .sort(sortOption)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      const total = await Property.countDocuments(filter);

      if (properties && properties.length > 0) {
        return res.json({
          success: true,
          count: properties.length,
          total,
          data: properties,
        });
      }
    } catch {
      // Fallback in-memory query processing
    }

    // Process from memory store
    let results = propertyStore.filter((item) => {
      if (item.status === 'archived') return false;

      if (intent && intent !== 'all' && item.intent !== intent) return false;

      if (city && city !== 'All Cities' && city !== '') {
        if (!item.city.toLowerCase().includes(city.toLowerCase()) && !item.location.toLowerCase().includes(city.toLowerCase())) {
          return false;
        }
      }

      if (type && type !== 'All Types' && type !== '') {
        if (item.type.toLowerCase() !== type.toLowerCase()) return false;
      }

      if (minPrice && item.priceValue < Number(minPrice)) return false;
      if (maxPrice && item.priceValue > Number(maxPrice)) return false;

      if (bedrooms && bedrooms !== 'any' && item.bedrooms < Number(bedrooms)) return false;
      if (bathrooms && bathrooms !== 'any' && item.bathrooms < Number(bathrooms)) return false;

      if (verifiedOnly === 'true' && !item.verified) return false;

      if (query && query.trim() !== '') {
        const q = query.toLowerCase();
        const matches =
          item.title.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q) ||
          item.neighbourhood.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });

    // Sorting
    if (sort === 'price_asc') {
      results.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sort === 'price_desc') {
      results.sort((a, b) => b.priceValue - a.priceValue);
    } else {
      results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return res.json({
      success: true,
      count: results.length,
      total: results.length,
      data: results,
    });
  } catch (err) {
    console.error('getProperties error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @route   GET /api/properties/:id
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      const property = await Property.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id }, { slug: id }],
      });
      if (property) {
        return res.json({ success: true, data: property });
      }
    } catch {
      // Fallback
    }

    const item = propertyStore.find((p) => p.id === id || p.slug === id);
    if (item) {
      return res.json({ success: true, data: item });
    }

    return res.status(404).json({ success: false, message: 'Property listing not found' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @route   POST /api/properties
export const createProperty = async (req, res) => {
  try {
    const propertyData = req.body;
    const slug = propertyData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `prop-${Date.now()}`;

    try {
      const newProperty = await Property.create({
        ...propertyData,
        id,
        slug,
      });
      propertyStore.unshift(newProperty);
      return res.status(201).json({ success: true, data: newProperty });
    } catch {
      const newProperty = {
        ...propertyData,
        id,
        slug,
        createdAt: new Date().toISOString(),
      };
      propertyStore.unshift(newProperty);
      return res.status(201).json({ success: true, data: newProperty });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @route   PUT /api/properties/:id
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    try {
      const updated = await Property.findOneAndUpdate(
        { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
        updates,
        { new: true }
      );
      if (updated) {
        propertyStore = propertyStore.map((p) => (p.id === id ? { ...p, ...updates } : p));
        return res.json({ success: true, data: updated });
      }
    } catch {
      // Fallback
    }

    const index = propertyStore.findIndex((p) => p.id === id);
    if (index !== -1) {
      propertyStore[index] = { ...propertyStore[index], ...updates };
      return res.json({ success: true, data: propertyStore[index] });
    }

    return res.status(404).json({ success: false, message: 'Property not found' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @route   DELETE /api/properties/:id
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await Property.findOneAndDelete({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
    } catch {
      // Fallback
    }

    propertyStore = propertyStore.filter((p) => p.id !== id);
    return res.json({ success: true, message: 'Property listing removed successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
