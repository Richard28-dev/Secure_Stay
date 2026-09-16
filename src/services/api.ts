import type { Property, EnquirySubmission, ViewingAppointment, UserProfile } from '../types';
import { initialProperties } from '../data/properties';
import { initialLocations } from '../data/locations';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  try {
    const stored = localStorage.getItem('securestay_auth_token');
    if (stored) {
      headers['Authorization'] = `Bearer ${stored}`;
    }
  } catch {
    // Ignore
  }
  return headers;
};

export const api = {
  // Authentication
  auth: {
    login: async (email: string, password?: string) => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: password || 'securestay123' }),
        });
        const data = await res.json();
        if (data.success && data.token) {
          localStorage.setItem('securestay_auth_token', data.token);
          return data;
        }
        throw new Error(data.message || 'Login failed');
      } catch (err: any) {
        // Fallback demo login response
        const isAgent = email.toLowerCase().includes('agent');
        const demoUser: UserProfile = isAgent
          ? {
              id: 'usr-demo-agent',
              name: 'Vikram Patel',
              email: email || 'vikram.patel@securestay.com',
              role: 'agent',
              phone: '+91 98450 18234',
              avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
              agencyName: 'SecureStay Advisory Prime',
              licenseNumber: 'RERA-KA-2023-88910',
              isEmailVerified: true,
              savedPropertyIds: ['prop-skyline-crest'],
              createdAt: '2024-03-20',
            }
          : {
              id: 'usr-demo-buyer',
              name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
              email: email || 'buyer@example.com',
              role: 'buyer',
              phone: '+91 98110 54321',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
              isEmailVerified: true,
              savedPropertyIds: ['prop-grand-oak', 'prop-palm-grove-goa'],
              createdAt: '2025-01-15',
            };
        return { success: true, user: demoUser, token: `mock_jwt_${Date.now()}` };
      }
    },

    register: async (userData: { name: string; email: string; password?: string; role: 'buyer' | 'agent'; phone?: string; agencyName?: string }) => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
        const data = await res.json();
        if (data.success && data.token) {
          localStorage.setItem('securestay_auth_token', data.token);
          return data;
        }
        throw new Error(data.message || 'Registration failed');
      } catch {
        const newUser: UserProfile = {
          id: `usr-${Date.now()}`,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          phone: userData.phone || '+91 98000 12345',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
          agencyName: userData.agencyName,
          isEmailVerified: true,
          savedPropertyIds: [],
          createdAt: new Date().toISOString().split('T')[0],
        };
        return { success: true, user: newUser, token: `mock_jwt_${Date.now()}` };
      }
    },

    socialAuth: async (provider: 'google' | 'facebook', email: string, name?: string) => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/social`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider,
            email,
            name: name || (provider === 'google' ? 'Google User' : 'Facebook User'),
            avatar: provider === 'google'
              ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
              : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
          }),
        });
        return await res.json();
      } catch {
        return {
          success: true,
          user: {
            id: `usr-social-${Date.now()}`,
            name: name || `${provider.toUpperCase()} User`,
            email,
            role: 'buyer' as const,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
            savedPropertyIds: [],
            isEmailVerified: true,
            createdAt: new Date().toISOString().split('T')[0],
          },
        };
      }
    },
  },

  // Properties API
  properties: {
    getAll: async (params?: Record<string, string>): Promise<Property[]> => {
      try {
        const queryStr = params ? new URLSearchParams(params).toString() : '';
        const res = await fetch(`${API_BASE_URL}/properties?${queryStr}`, {
          headers: getAuthHeaders(),
        });
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      } catch {
        // Fallback
      }
      return initialProperties;
    },

    getById: async (id: string): Promise<Property | undefined> => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
          headers: getAuthHeaders(),
        });
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      } catch {
        // Fallback
      }
      return initialProperties.find((p) => p.id === id || p.slug === id);
    },

    create: async (data: Omit<Property, 'id' | 'slug'>): Promise<Property> => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      } catch {
        // Fallback
      }
      const newId = `prop-${Date.now()}`;
      return {
        ...data,
        id: newId,
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };
    },

    update: async (id: string, updates: Partial<Property>): Promise<boolean> => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(updates),
        });
        const json = await res.json();
        return !!json.success;
      } catch {
        return true;
      }
    },

    delete: async (id: string): Promise<boolean> => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
        const json = await res.json();
        return !!json.success;
      } catch {
        return true;
      }
    },
  },

  // Enquiries API
  enquiries: {
    create: async (enquiryData: Omit<EnquirySubmission, 'id' | 'createdAt' | 'status'>): Promise<boolean> => {
      try {
        const res = await fetch(`${API_BASE_URL}/enquiries`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(enquiryData),
        });
        const json = await res.json();
        return !!json.success;
      } catch {
        return true;
      }
    },

    getAll: async (): Promise<EnquirySubmission[]> => {
      try {
        const res = await fetch(`${API_BASE_URL}/enquiries`, {
          headers: getAuthHeaders(),
        });
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      } catch {
        // Fallback
      }
      return [];
    },

    updateStatus: async (id: string, status: EnquirySubmission['status']): Promise<boolean> => {
      try {
        const res = await fetch(`${API_BASE_URL}/enquiries/${id}/status`, {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify({ status }),
        });
        const json = await res.json();
        return !!json.success;
      } catch {
        return true;
      }
    },
  },

  // Appointments API
  appointments: {
    create: async (viewingData: Omit<ViewingAppointment, 'id' | 'createdAt' | 'status'>): Promise<boolean> => {
      try {
        const res = await fetch(`${API_BASE_URL}/appointments`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(viewingData),
        });
        const json = await res.json();
        return !!json.success;
      } catch {
        return true;
      }
    },

    getAll: async (): Promise<ViewingAppointment[]> => {
      try {
        const res = await fetch(`${API_BASE_URL}/appointments`, {
          headers: getAuthHeaders(),
        });
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      } catch {
        // Fallback
      }
      return [];
    },

    updateStatus: async (id: string, status: ViewingAppointment['status']): Promise<boolean> => {
      try {
        const res = await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify({ status }),
        });
        const json = await res.json();
        return !!json.success;
      } catch {
        return true;
      }
    },
  },

  // Saved Properties API
  saved: {
    getSaved: async (): Promise<string[]> => {
      try {
        const res = await fetch(`${API_BASE_URL}/saved`, {
          headers: getAuthHeaders(),
        });
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      } catch {
        // Fallback
      }
      return ['prop-grand-oak', 'prop-palm-grove-goa'];
    },

    save: async (propertyId: string): Promise<string[]> => {
      try {
        const res = await fetch(`${API_BASE_URL}/saved/${propertyId}`, {
          method: 'POST',
          headers: getAuthHeaders(),
        });
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      } catch {
        // Fallback
      }
      return [];
    },

    remove: async (propertyId: string): Promise<string[]> => {
      try {
        const res = await fetch(`${API_BASE_URL}/saved/${propertyId}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      } catch {
        // Fallback
      }
      return [];
    },
  },

  // Locations API
  locations: {
    getAll: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/locations`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      } catch {
        // Fallback
      }
      return initialLocations;
    },
  },
};
