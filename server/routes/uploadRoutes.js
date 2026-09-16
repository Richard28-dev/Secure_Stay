import express from 'express';
import { upload } from '../middleware/upload.js';
import { protect, requireAgent } from '../middleware/auth.js';

const router = express.Router();

// @route POST /api/upload
router.post('/', protect, requireAgent, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image file' });
    }

    const host = req.get('host');
    const protocol = req.protocol;
    const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    return res.json({
      success: true,
      url: imageUrl,
      filename: req.file.filename,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
