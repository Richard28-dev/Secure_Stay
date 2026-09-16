import { Appointment } from '../models/Appointment.js';

let fallbackAppointments = [
  {
    id: 'vw-sample-1',
    _id: 'vw-sample-1',
    propertyId: 'prop-skyline-crest',
    propertyTitle: 'Skyline Crest Penthouse',
    propertyLocation: 'HITEC City, Hyderabad',
    propertyPrice: '₹3.95 Cr',
    propertyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    date: '2025-03-05',
    time: '11:00 AM',
    visitorName: 'Devraj Kapoor',
    visitorEmail: 'devraj.kapoor@example.com',
    visitorPhone: '+91 98110 54321',
    notes: 'Please ensure private elevator keycard is prepared.',
    status: 'confirmed',
    createdAt: '2025-02-28T09:15:00.000Z',
  },
];

// @route   POST /api/appointments
export const createAppointment = async (req, res) => {
  try {
    const {
      propertyId,
      propertyTitle,
      propertyLocation = '',
      propertyPrice = '',
      propertyImage = '',
      date,
      time,
      visitorName,
      visitorEmail,
      visitorPhone,
      notes = '',
    } = req.body;

    if (!propertyId || !date || !time || !visitorName || !visitorEmail || !visitorPhone) {
      return res.status(400).json({ success: false, message: 'Please complete all appointment details' });
    }

    const data = {
      user: req.user?.id || null,
      propertyId,
      propertyTitle,
      propertyLocation,
      propertyPrice,
      propertyImage,
      date,
      time,
      visitorName,
      visitorEmail,
      visitorPhone,
      notes,
      status: 'confirmed',
    };

    try {
      const appt = await Appointment.create(data);
      fallbackAppointments.unshift(appt);
      return res.status(201).json({ success: true, data: appt });
    } catch {
      const newAppt = {
        ...data,
        id: `vw-${Date.now()}`,
        _id: `vw-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      fallbackAppointments.unshift(newAppt);
      return res.status(201).json({ success: true, data: newAppt });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @route   GET /api/appointments
export const getAppointments = async (req, res) => {
  try {
    try {
      const query = req.user?.role === 'agent' || req.user?.role === 'admin' ? {} : { visitorEmail: req.user?.email };
      const list = await Appointment.find(query).sort({ createdAt: -1 });
      if (list && list.length > 0) {
        return res.json({ success: true, count: list.length, data: list });
      }
    } catch {
      // Fallback
    }

    let results = fallbackAppointments;
    if (req.user?.role !== 'agent' && req.user?.role !== 'admin' && req.user?.email) {
      results = fallbackAppointments.filter((a) => a.visitorEmail.toLowerCase() === req.user.email.toLowerCase());
    }

    return res.json({ success: true, count: results.length, data: results });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @route   PATCH /api/appointments/:id/status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const updated = await Appointment.findOneAndUpdate(
        { $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id }] },
        { status },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, data: updated });
      }
    } catch {
      // Fallback
    }

    const item = fallbackAppointments.find((a) => a.id === id || a._id === id);
    if (item) {
      item.status = status;
      return res.json({ success: true, data: item });
    }

    return res.status(404).json({ success: false, message: 'Appointment not found' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
