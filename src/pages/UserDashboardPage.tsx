import { useState } from 'react';
import { User, Heart, Calendar, MessageSquare, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import { useRouter } from '../context/RouterContext';
import PropertyCard from '../components/common/PropertyCard';

export default function UserDashboardPage() {
  const { user, switchRole } = useAuth();
  const { savedProperties, viewings, enquiries } = useProperties();
  const { queryParams, navigate } = useRouter();

  const [activeTab, setActiveTab] = useState<'saved' | 'viewings' | 'enquiries' | 'profile'>(
    (queryParams.tab as any) || 'saved'
  );

  if (!user) {
    return (
      <div className="pt-32 pb-20 text-center container-luxury">
        <h2 className="text-xl font-bold mb-3">Please sign in to access your dashboard</h2>
        <button onClick={() => navigate('/signin')} className="btn-forest">Sign In</button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="container-luxury">
        {/* User Banner Header */}
        <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 md:p-8 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-18 h-18 rounded-[8px] object-cover border-2 border-[#C5A880]"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] text-[11px] font-bold uppercase tracking-wider">
                  {user.role} Account
                </span>
                {user.isEmailVerified && (
                  <span className="flex items-center gap-1 text-[11px] text-[#0E2A1E] font-medium">
                    <ShieldCheck size={14} />
                    Verified ID
                  </span>
                )}
              </div>
              <h1 className="text-[26px] font-extrabold text-[#1F2421] font-heading leading-tight">
                {user.name}
              </h1>
              <p className="text-[13px] text-[#5E6961]">{user.email} · {user.phone}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/search')}
              className="btn-outline-forest text-[13px] py-2 px-4 rounded-[6px]"
            >
              Explore Residences
            </button>
            <button
              onClick={() => {
                switchRole('agent');
                navigate('/agent-dashboard');
              }}
              className="btn-gold text-[13px] py-2 px-4 rounded-[6px]"
            >
              Switch to Agent Portal
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-[#E5E0D8] mb-8 gap-2 overflow-x-auto">
          {[
            { id: 'saved', label: `Saved Collection (${savedProperties.length})`, icon: Heart },
            { id: 'viewings', label: `Viewing Appointments (${viewings.length})`, icon: Calendar },
            { id: 'enquiries', label: `Logged Enquiries (${enquiries.length})`, icon: MessageSquare },
            { id: 'profile', label: 'Account Profile', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-4 text-[13.5px] font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-[#0E2A1E] text-[#0E2A1E]'
                    : 'border-transparent text-[#5E6961] hover:text-[#1F2421]'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Saved Collection */}
        {activeTab === 'saved' && (
          <div>
            {savedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedProperties.map((property) => (
                  <div key={property.id} className="relative">
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-12 text-center max-w-md mx-auto">
                <Heart size={36} className="text-[#C5A880] mx-auto mb-3" />
                <h3 className="text-[17px] font-bold text-[#1F2421] mb-1">No saved residences</h3>
                <p className="text-[13px] text-[#5E6961] mb-4">
                  Browse the catalog and save verified properties here.
                </p>
                <button onClick={() => navigate('/search')} className="btn-forest text-[13px] py-2 px-4 rounded-[6px]">
                  Browse Registry
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Viewing Appointments */}
        {activeTab === 'viewings' && (
          <div className="space-y-4">
            {viewings.length > 0 ? (
              viewings.map((viewing) => (
                <div
                  key={viewing.id}
                  className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex gap-4">
                    {viewing.propertyImage && (
                      <img
                        src={viewing.propertyImage}
                        alt=""
                        className="w-24 h-20 rounded-[6px] object-cover shrink-0"
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded-[4px] text-[10.5px] font-bold uppercase ${
                            viewing.status === 'confirmed'
                              ? 'bg-[#E8EFE8] text-[#0E2A1E]'
                              : viewing.status === 'pending'
                              ? 'bg-[#FFF3CD] text-[#856404]'
                              : 'bg-[#E5E0D8] text-[#5E6961]'
                          }`}
                        >
                          {viewing.status}
                        </span>
                        <span className="text-[12px] text-[#5E6961] font-mono">
                          ID: {viewing.id}
                        </span>
                      </div>
                      <h4 className="text-[16px] font-bold text-[#1F2421]">{viewing.propertyTitle}</h4>
                      <p className="text-[12.5px] text-[#5E6961]">{viewing.propertyLocation} · {viewing.propertyPrice}</p>
                      <div className="flex items-center gap-4 text-[12.5px] text-[#1F2421] mt-2 font-medium">
                        <span className="text-[#0E2A1E]">
                          {viewing.date}
                        </span>
                        <span className="text-[#0E2A1E]">
                          {viewing.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <button
                      onClick={() => navigate(`/property/${viewing.propertyId}`)}
                      className="btn-outline-forest text-[12.5px] py-2 px-4 rounded-[6px]"
                    >
                      View Property
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-12 text-center max-w-md mx-auto">
                <Calendar size={36} className="text-[#0E2A1E] mx-auto mb-3" />
                <h3 className="text-[17px] font-bold text-[#1F2421] mb-1">No scheduled viewings</h3>
                <p className="text-[13px] text-[#5E6961] mb-4">
                  Schedule private viewings on any property details page.
                </p>
                <button onClick={() => navigate('/search')} className="btn-forest text-[13px] py-2 px-4 rounded-[6px]">
                  Find a Home to View
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Enquiries */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {enquiries.length > 0 ? (
              enquiries.map((enq) => (
                <div key={enq.id} className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] text-[11px] font-bold uppercase">
                        {enq.enquiryType} Inquiry
                      </span>
                      <span className="text-[12px] text-[#5E6961]">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#0E2A1E] bg-[#FAF8F5] border border-[#E5E0D8] px-2.5 py-1 rounded-[4px]">
                      Status: {enq.status.toUpperCase()}
                    </span>
                  </div>

                  {enq.propertyTitle && (
                    <h4 className="text-[15px] font-bold text-[#1F2421] mb-1">
                      {enq.propertyTitle}
                    </h4>
                  )}
                  <p className="text-[13px] text-[#5E6961] leading-relaxed mb-3">
                    "{enq.message}"
                  </p>
                  <div className="text-[11.5px] text-[#5E6961] flex gap-4 border-t border-[#E5E0D8] pt-2">
                    <span>Contact: {enq.name} ({enq.phone})</span>
                    {enq.budget && <span>Budget: {enq.budget}</span>}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-12 text-center max-w-md mx-auto">
                <MessageSquare size={36} className="text-[#0E2A1E] mx-auto mb-3" />
                <h3 className="text-[17px] font-bold text-[#1F2421] mb-1">No active enquiries</h3>
                <p className="text-[13px] text-[#5E6961]">
                  Enquiries you send from property pages or contact forms will appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Profile Details */}
        {activeTab === 'profile' && (
          <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-8 max-w-2xl shadow-sm space-y-6">
            <h3 className="text-[18px] font-bold text-[#1F2421] font-heading border-b border-[#E5E0D8] pb-3">
              Client Account Settings
            </h3>
            <div className="grid grid-cols-2 gap-4 text-[13.5px]">
              <div>
                <span className="text-[12px] text-[#5E6961] block">Full Name</span>
                <span className="font-bold text-[#1F2421]">{user.name}</span>
              </div>
              <div>
                <span className="text-[12px] text-[#5E6961] block">Email</span>
                <span className="font-bold text-[#1F2421]">{user.email}</span>
              </div>
              <div>
                <span className="text-[12px] text-[#5E6961] block">Phone</span>
                <span className="font-bold text-[#1F2421]">{user.phone}</span>
              </div>
              <div>
                <span className="text-[12px] text-[#5E6961] block">Account Created</span>
                <span className="font-bold text-[#1F2421]">{user.createdAt}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
