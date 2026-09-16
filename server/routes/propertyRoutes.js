import express from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';
import { protect, requireAgent } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/', protect, requireAgent, createProperty);
router.put('/:id', protect, requireAgent, updateProperty);
router.delete('/:id', protect, requireAgent, deleteProperty);

export default router;
