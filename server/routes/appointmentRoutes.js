import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
} from '../controllers/appointmentController.js';
import { protect, requireAgent } from '../middleware/auth.js';

const router = express.Router();

// Allow booking viewing appointments
router.post('/', createAppointment);
router.get('/', protect, getAppointments);
router.patch('/:id/status', protect, requireAgent, updateAppointmentStatus);

export default router;
