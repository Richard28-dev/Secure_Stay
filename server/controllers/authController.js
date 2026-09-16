import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'securestay_jwt_super_secret_production_key_2026', {
    expiresIn: '30d',
  });
};

// Fallback in-memory user registry for instant startup / offline mode
let fallbackUsers = [
  {
    id: 'usr-demo-buyer',
    _id: 'usr-demo-buyer',
    name: 'Devraj Kapoor',
    email: 'devraj.kapoor@example.com',
    passwordHash: bcrypt.hashSync('securestay123', 10),
    role: 'buyer',
    phone: '+91 98110 54321',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    isEmailVerified: true,
    savedProperties: ['prop-grand-oak', 'prop-palm-grove-goa'],
    createdAt: '2025-01-15T00:00:00.000Z',
  },
  {
    id: 'usr-demo-agent',
    _id: 'usr-demo-agent',
    name: 'Vikram Patel',
    email: 'vikram.patel@securestay.com',
    passwordHash: bcrypt.hashSync('securestay123', 10),
    role: 'agent',
    phone: '+91 98450 18234',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    agencyName: 'SecureStay Advisory Prime',
    licenseNumber: 'RERA-KA-2023-88910',
    isEmailVerified: true,
    savedProperties: ['prop-skyline-crest'],
    createdAt: '2024-03-20T00:00:00.000Z',
  },
];

// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password, role = 'buyer', phone = '', agencyName = '' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists' });
      }

      const user = await User.create({
        name,
        email,
        password,
        role,
        phone,
        agencyName,
      });

      const token = generateToken(user._id, user.role);

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar,
          agencyName: user.agencyName,
          savedProperties: user.savedProperties,
        },
      });
    } catch {
      // In-memory fallback
      const existing = fallbackUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = {
        id: `usr-${Date.now()}`,
        _id: `usr-${Date.now()}`,
        name,
        email,
        passwordHash,
        role,
        phone,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        agencyName,
        isEmailVerified: true,
        savedProperties: [],
        createdAt: new Date().toISOString(),
      };
      fallbackUsers.push(newUser);

      const token = generateToken(newUser.id, newUser.role);
      return res.status(201).json({
        success: true,
        token,
        user: newUser,
      });
    }
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error during registration' });
  }
};

// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    try {
      const user = await User.findOne({ email }).select('+password');
      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id, user.role);
        return res.json({
          success: true,
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            avatar: user.avatar,
            agencyName: user.agencyName,
            licenseNumber: user.licenseNumber,
            savedProperties: user.savedProperties,
          },
        });
      }
    } catch {
      // In-memory fallback check
    }

    const fallbackUser = fallbackUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (fallbackUser && (await bcrypt.compare(password, fallbackUser.passwordHash))) {
      const token = generateToken(fallbackUser.id, fallbackUser.role);
      return res.json({
        success: true,
        token,
        user: fallbackUser,
      });
    }

    // Support instant demo login passwords
    if (password === 'securestay123' || password === 'demo1234') {
      const role = email.includes('agent') ? 'agent' : 'buyer';
      const demoUser = role === 'agent' ? fallbackUsers[1] : fallbackUsers[0];
      const token = generateToken(demoUser.id, demoUser.role);
      return res.json({
        success: true,
        token,
        user: demoUser,
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error during login' });
  }
};

// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    if (req.user) {
      return res.json({
        success: true,
        user: req.user,
      });
    }
    return res.status(404).json({ success: false, message: 'User not found' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @route   POST /api/auth/social
export const socialLogin = async (req, res) => {
  try {
    const { provider, email, name, avatar } = req.body;

    if (!email || !provider) {
      return res.status(400).json({ success: false, message: 'Invalid social auth payload' });
    }

    const userEmail = email.toLowerCase();
    let user;

    try {
      user = await User.findOne({ email: userEmail });
      if (!user) {
        user = await User.create({
          name: name || userEmail.split('@')[0],
          email: userEmail,
          password: `social_${Date.now()}_${Math.random()}`,
          avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
          role: 'buyer',
          isEmailVerified: true,
        });
      }
    } catch {
      user = fallbackUsers.find((u) => u.email.toLowerCase() === userEmail);
      if (!user) {
        user = {
          id: `usr-${Date.now()}`,
          _id: `usr-${Date.now()}`,
          name: name || userEmail.split('@')[0],
          email: userEmail,
          role: 'buyer',
          avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
          savedProperties: [],
          createdAt: new Date().toISOString(),
        };
        fallbackUsers.push(user);
      }
    }

    const token = generateToken(user._id || user.id, user.role);
    return res.json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
