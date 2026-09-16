import express from 'express';
import { createEnquiry, getEnquiries, updateEnquiryStatus } from '../controllers/enquiryController.js';
import { protect, requireAgent } from '../middleware/auth.js';

const router = express.Router();

// Allow visitors and logged in users to submit enquiries
router.post('/', createEnquiry);
router.get('/', protect, getEnquiries);
router.patch('/:id/status', protect, requireAgent, updateEnquiryStatus);

export default router;
