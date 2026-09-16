import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Property, EnquirySubmission, ViewingAppointment, FilterState } from '../types';
import { initialProperties } from '../data/properties';
import { api } from '../services/api';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface PropertyContextType {
  properties: Property[];
  savedPropertyIds: string[];
  savedProperties: Property[];
  comparePropertyIds: string[];
  compareProperties: Property[];
  enquiries: EnquirySubmission[];
  viewings: ViewingAppointment[];
  toasts: ToastMessage[];
  isLoading: boolean;
  toggleSaveProperty: (id: string) => void;
  isSaved: (id: string) => boolean;
  toggleCompareProperty: (id: string) => void;
  isCompared: (id: string) => boolean;
  clearCompare: () => void;
  getPropertyById: (id: string) => Property | undefined;
  addProperty: (property: Omit<Property, 'id' | 'slug'>) => Promise<Property>;
  updateProperty: (id: string, updates: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  archiveProperty: (id: string) => Promise<void>;
  addEnquiry: (enquiry: Omit<EnquirySubmission, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  addViewing: (viewing: Omit<ViewingAppointment, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateViewingStatus: (id: string, status: ViewingAppointment['status']) => Promise<void>;
  updateEnquiryStatus: (id: string, status: EnquirySubmission['status']) => Promise<void>;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  filterProperties: (filters: Partial<FilterState>) => Property[];
}

const PROPERTIES_KEY = 'securestay_properties_db';
const SAVED_KEY = 'securestay_saved_properties';
const ENQUIRIES_KEY = 'securestay_enquiries_db';
const VIEWINGS_KEY = 'securestay_viewings_db';

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem(PROPERTIES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return initialProperties;
    } catch {
      return initialProperties;
    }
  });

  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_KEY);
      return stored ? JSON.parse(stored) : ['prop-grand-oak', 'prop-palm-grove-goa'];
    } catch {
      return ['prop-grand-oak', 'prop-palm-grove-goa'];
    }
  });

  const [comparePropertyIds, setComparePropertyIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>(() => {
    try {
      const stored = localStorage.getItem(ENQUIRIES_KEY);
      return stored
        ? JSON.parse(stored)
        : [
            {
              id: 'enq-sample-1',
              propertyId: 'prop-grand-oak',
              propertyTitle: 'The Grand Oak Sanctuary Villa',
              name: 'Arjun Mehta',
              email: 'arjun.mehta@example.com',
              phone: '+91 98451 09876',
              enquiryType: 'buy',
              preferredLocation: 'Whitefield, Bengaluru',
              budget: '₹4.5 - ₹5.5 Cr',
              message: 'Interested in scheduling a private architectural tour this coming Saturday morning.',
              createdAt: '2025-02-10T11:30:00Z',
              status: 'new',
            },
          ];
    } catch {
      return [];
    }
  });

  const [viewings, setViewings] = useState<ViewingAppointment[]>(() => {
    try {
      const stored = localStorage.getItem(VIEWINGS_KEY);
      return stored
        ? JSON.parse(stored)
        : [
            {
              id: 'vw-sample-1',
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
              createdAt: '2025-02-28T09:15:00Z',
            },
          ];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initial fetch from backend REST API
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [propsData, enqData, viewData, savedData] = await Promise.allSettled([
          api.properties.getAll(),
          api.enquiries.getAll(),
          api.appointments.getAll(),
          api.saved.getSaved(),
        ]);

        if (propsData.status === 'fulfilled' && propsData.value.length > 0) {
          setProperties(propsData.value);
        }
        if (enqData.status === 'fulfilled' && enqData.value.length > 0) {
          setEnquiries(enqData.value);
        }
        if (viewData.status === 'fulfilled' && viewData.value.length > 0) {
          setViewings(viewData.value);
        }
        if (savedData.status === 'fulfilled' && savedData.value.length > 0) {
          setSavedPropertyIds(savedData.value);
        }
      } catch (err) {
        console.error('Initial data sync error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(PROPERTIES_KEY, JSON.stringify(properties));
    } catch (e) {
      console.error('Error saving properties:', e);
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(savedPropertyIds));
    } catch (e) {
      console.error('Error saving saved properties:', e);
    }
  }, [savedPropertyIds]);

  useEffect(() => {
    try {
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
    } catch (e) {
      console.error('Error saving enquiries:', e);
    }
  }, [enquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(VIEWINGS_KEY, JSON.stringify(viewings));
    } catch (e) {
      console.error('Error saving viewings:', e);
    }
  }, [viewings]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSaveProperty = async (id: string) => {
    const isAlreadySaved = savedPropertyIds.includes(id);
    if (isAlreadySaved) {
      setSavedPropertyIds((prev) => prev.filter((item) => item !== id));
      showToast('Property removed from saved collection', 'info');
      await api.saved.remove(id);
    } else {
      setSavedPropertyIds((prev) => [...prev, id]);
      showToast('Property added to saved collection', 'success');
      await api.saved.save(id);
    }
  };

  const isSaved = (id: string) => savedPropertyIds.includes(id);

  const toggleCompareProperty = (id: string) => {
    setComparePropertyIds((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from property comparison', 'info');
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        showToast('You can compare up to 3 properties at a time', 'error');
        return prev;
      }
      showToast('Added to property comparison', 'success');
      return [...prev, id];
    });
  };

  const isCompared = (id: string) => comparePropertyIds.includes(id);

  const clearCompare = () => setComparePropertyIds([]);

  const savedProperties = properties.filter((p) => savedPropertyIds.includes(p.id));
  const compareProperties = properties.filter((p) => comparePropertyIds.includes(p.id));

  const getPropertyById = (id: string) => {
    return properties.find((p) => p.id === id || p.slug === id);
  };

  const addProperty = async (data: Omit<Property, 'id' | 'slug'>): Promise<Property> => {
    const newProp = await api.properties.create(data);
    setProperties((prev) => [newProp, ...prev]);
    showToast('Listing successfully published to SecureStay registry', 'success');
    return newProp;
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    await api.properties.update(id, updates);
    showToast('Listing details updated successfully', 'success');
  };

  const deleteProperty = async (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    await api.properties.delete(id);
    showToast('Listing removed from registry', 'info');
  };

  const archiveProperty = async (id: string) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'archived' } : p)));
    await api.properties.update(id, { status: 'archived' });
    showToast('Listing marked as archived', 'info');
  };

  const addEnquiry = async (
    enquiryData: Omit<EnquirySubmission, 'id' | 'createdAt' | 'status'>
  ): Promise<boolean> => {
    const newEnquiry: EnquirySubmission = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    await api.enquiries.create(enquiryData);
    showToast('Your enquiry has been securely logged. An advisor will contact you within 24 hours.', 'success');
    return true;
  };

  const addViewing = async (
    viewingData: Omit<ViewingAppointment, 'id' | 'createdAt' | 'status'>
  ): Promise<boolean> => {
    const newViewing: ViewingAppointment = {
      ...viewingData,
      id: `vw-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };
    setViewings((prev) => [newViewing, ...prev]);
    await api.appointments.create(viewingData);
    showToast(`Viewing appointment confirmed for ${viewingData.date} at ${viewingData.time}`, 'success');
    return true;
  };

  const updateViewingStatus = async (id: string, status: ViewingAppointment['status']) => {
    setViewings((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
    await api.appointments.updateStatus(id, status);
    showToast(`Appointment status updated to ${status}`, 'info');
  };

  const updateEnquiryStatus = async (id: string, status: EnquirySubmission['status']) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    await api.enquiries.updateStatus(id, status);
    showToast(`Enquiry status updated to ${status}`, 'info');
  };

  const filterProperties = (filters: Partial<FilterState>): Property[] => {
    return properties.filter((item) => {
      if (item.status === 'archived') return false;

      if (filters.intent && filters.intent !== 'all' && item.intent !== filters.intent) {
        return false;
      }

      if (filters.city && filters.city !== 'All Cities' && filters.city !== '') {
        if (!item.city.toLowerCase().includes(filters.city.toLowerCase()) && !item.location.toLowerCase().includes(filters.city.toLowerCase())) {
          return false;
        }
      }

      if (filters.type && filters.type !== 'All Types' && filters.type !== '') {
        if (item.type.toLowerCase() !== filters.type.toLowerCase()) return false;
      }

      if (filters.minPrice && item.priceValue < filters.minPrice) return false;
      if (filters.maxPrice && item.priceValue > filters.maxPrice) return false;

      if (filters.bedrooms && filters.bedrooms !== 'any') {
        if (item.bedrooms < Number(filters.bedrooms)) return false;
      }

      if (filters.bathrooms && filters.bathrooms !== 'any') {
        if (item.bathrooms < Number(filters.bathrooms)) return false;
      }

      if (filters.verifiedOnly && !item.verified) return false;

      if (filters.query && filters.query.trim() !== '') {
        const q = filters.query.toLowerCase();
        const matches =
          item.title.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q) ||
          item.neighbourhood.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        savedPropertyIds,
        savedProperties,
        comparePropertyIds,
        compareProperties,
        enquiries,
        viewings,
        toasts,
        isLoading,
        toggleSaveProperty,
        isSaved,
        toggleCompareProperty,
        isCompared,
        clearCompare,
        getPropertyById,
        addProperty,
        updateProperty,
        deleteProperty,
        archiveProperty,
        addEnquiry,
        addViewing,
        updateViewingStatus,
        updateEnquiryStatus,
        showToast,
        removeToast,
        filterProperties,
      }}
    >
      {children}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3.5 rounded-[8px] text-[13px] font-medium shadow-xl border flex items-center justify-between gap-3 transition-all duration-300 animate-fadeIn ${
              toast.type === 'success'
                ? 'bg-[#0A2A1D] text-[#FDFBF7] border-[#133D2B]'
                : toast.type === 'error'
                ? 'bg-[#842029] text-[#FDFBF7] border-[#58151c]'
                : 'bg-[#1A1E1C] text-[#FDFBF7] border-[#2A302D]'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white text-base leading-none p-1 cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </PropertyContext.Provider>
  );
};

export const useProperties = (): PropertyContextType => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
