import express from 'express';
import { getSavedProperties, saveProperty, removeSavedProperty } from '../controllers/savedController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getSavedProperties);
router.post('/:propertyId', protect, saveProperty);
router.delete('/:propertyId', protect, removeSavedProperty);

export default router;
