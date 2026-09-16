import { User } from '../models/User.js';

let fallbackSavedMap = {
  'usr-demo-buyer': ['prop-grand-oak', 'prop-palm-grove-goa'],
  'usr-demo-agent': ['prop-skyline-crest'],
};

// @route   GET /api/saved
export const getSavedProperties = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    try {
      const user = await User.findById(userId);
      if (user) {
        return res.json({ success: true, data: user.savedProperties || [] });
      }
    } catch {
      // Fallback
    }

    const saved = fallbackSavedMap[userId] || [];
    return res.json({ success: true, data: saved });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @route   POST /api/saved/:propertyId
export const saveProperty = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { propertyId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    try {
      const user = await User.findById(userId);
      if (user) {
        if (!user.savedProperties.includes(propertyId)) {
          user.savedProperties.push(propertyId);
          await user.save();
        }
        return res.json({ success: true, data: user.savedProperties });
      }
    } catch {
      // Fallback
    }

    if (!fallbackSavedMap[userId]) fallbackSavedMap[userId] = [];
    if (!fallbackSavedMap[userId].includes(propertyId)) {
      fallbackSavedMap[userId].push(propertyId);
    }

    return res.json({ success: true, data: fallbackSavedMap[userId] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @route   DELETE /api/saved/:propertyId
export const removeSavedProperty = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { propertyId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    try {
      const user = await User.findById(userId);
      if (user) {
        user.savedProperties = user.savedProperties.filter((id) => id !== propertyId);
        await user.save();
        return res.json({ success: true, data: user.savedProperties });
      }
    } catch {
      // Fallback
    }

    if (fallbackSavedMap[userId]) {
      fallbackSavedMap[userId] = fallbackSavedMap[userId].filter((id) => id !== propertyId);
    }

    return res.json({ success: true, data: fallbackSavedMap[userId] || [] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
