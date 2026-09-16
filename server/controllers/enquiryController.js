import { Enquiry } from '../models/Enquiry.js';

let fallbackEnquiries = [
  {
    id: 'enq-sample-1',
    _id: 'enq-sample-1',
    propertyId: 'prop-grand-oak',
    propertyTitle: 'The Grand Oak Sanctuary Villa',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@example.com',
    phone: '+91 98451 09876',
    enquiryType: 'buy',
    preferredLocation: 'Whitefield, Bengaluru',
    budget: '₹4.5 - ₹5.5 Cr',
    message: 'Interested in scheduling a private architectural tour this coming Saturday morning.',
    status: 'new',
    createdAt: '2025-02-10T11:30:00.000Z',
  },
];

// @route   POST /api/enquiries
export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message, enquiryType = 'buy', preferredLocation = '', budget = '', propertyId = '', propertyTitle = '' } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    const enquiryData = {
      user: req.user?.id || null,
      name,
      email,
      phone,
      message,
      enquiryType,
      preferredLocation,
      budget,
      propertyId,
      propertyTitle,
      status: 'new',
    };

    try {
      const enquiry = await Enquiry.create(enquiryData);
      fallbackEnquiries.unshift(enquiry);
      return res.status(201).json({ success: true, data: enquiry });
    } catch {
      const newEnquiry = {
        ...enquiryData,
        id: `enq-${Date.now()}`,
        _id: `enq-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      fallbackEnquiries.unshift(newEnquiry);
      return res.status(201).json({ success: true, data: newEnquiry });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @route   GET /api/enquiries
export const getEnquiries = async (req, res) => {
  try {
    try {
      const query = req.user?.role === 'agent' || req.user?.role === 'admin' ? {} : { email: req.user?.email };
      const list = await Enquiry.find(query).sort({ createdAt: -1 });
      if (list && list.length > 0) {
        return res.json({ success: true, count: list.length, data: list });
      }
    } catch {
      // Fallback
    }

    let results = fallbackEnquiries;
    if (req.user?.role !== 'agent' && req.user?.role !== 'admin' && req.user?.email) {
      results = fallbackEnquiries.filter((e) => e.email.toLowerCase() === req.user.email.toLowerCase());
    }

    return res.json({ success: true, count: results.length, data: results });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @route   PATCH /api/enquiries/:id/status
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const updated = await Enquiry.findOneAndUpdate(
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

    const item = fallbackEnquiries.find((e) => e.id === id || e._id === id);
    if (item) {
      item.status = status;
      return res.json({ success: true, data: item });
    }

    return res.status(404).json({ success: false, message: 'Enquiry not found' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
