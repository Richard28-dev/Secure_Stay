import { useState } from 'react';
import { Plus, Building, Users, Calendar, Eye, Trash2, Archive, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import { useRouter } from '../context/RouterContext';

export default function AgentDashboardPage() {
  const { user } = useAuth();
  const { properties, viewings, enquiries, deleteProperty, archiveProperty, updateViewingStatus, updateEnquiryStatus } =
    useProperties();
  const { navigate } = useRouter();

  const [activeTab, setActiveTab] = useState<'listings' | 'leads' | 'viewings'>('listings');

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="container-luxury">
        {/* Agent Header */}
        <div className="bg-[#0E2A1E] text-[#FAF8F5] border border-[#163A29] rounded-[8px] p-6 md:p-8 shadow-md mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'}
              alt={user?.name || 'Agent'}
              className="w-16 h-16 rounded-[8px] object-cover border-2 border-[#C5A880]"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-[4px] bg-[#C5A880] text-[#071710] text-[10.5px] font-bold uppercase tracking-wider">
                  Verified Advisor Portal
                </span>
                <span className="text-[11px] text-[#D2DFD2] font-mono">
                  RERA-KA-2023-88910
                </span>
              </div>
              <h1 className="text-[26px] font-extrabold font-heading text-[#FAF8F5] leading-tight">
                {user?.name || 'Vikram Patel'} · {user?.agencyName || 'SecureStay Advisory Prime'}
              </h1>
              <p className="text-[13px] text-[#D2DFD2]">
                Portfolio Management & Client Concierge Console
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/list-property')}
            className="btn-gold flex items-center gap-2 text-[13.5px] py-3 px-5 rounded-[8px] shadow-md cursor-pointer"
          >
            <Plus size={16} />
            <span>Publish New Property</span>
          </button>
        </div>

        {/* Analytics Snapshot */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-5 shadow-sm">
            <span className="text-[11px] font-semibold text-[#5E6961] uppercase tracking-wider block">
              Active Listings
            </span>
            <span className="text-[28px] font-extrabold text-[#0E2A1E] font-heading block mt-1">
              {properties.length}
            </span>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-5 shadow-sm">
            <span className="text-[11px] font-semibold text-[#5E6961] uppercase tracking-wider block">
              Incoming Inquiries
            </span>
            <span className="text-[28px] font-extrabold text-[#0E2A1E] font-heading block mt-1">
              {enquiries.length}
            </span>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-5 shadow-sm">
            <span className="text-[11px] font-semibold text-[#5E6961] uppercase tracking-wider block">
              Scheduled Viewings
            </span>
            <span className="text-[28px] font-extrabold text-[#0E2A1E] font-heading block mt-1">
              {viewings.length}
            </span>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-5 shadow-sm">
            <span className="text-[11px] font-semibold text-[#5E6961] uppercase tracking-wider block">
              Advisory Rating
            </span>
            <span className="text-[28px] font-extrabold text-[#C5A880] font-heading block mt-1">
              4.98 / 5.0
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#E5E0D8] mb-8 gap-2">
          {[
            { id: 'listings', label: `Property Inventory (${properties.length})`, icon: Building },
            { id: 'leads', label: `Leads & Inquiries (${enquiries.length})`, icon: Users },
            { id: 'viewings', label: `Viewing Requests (${viewings.length})`, icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-4 text-[13.5px] font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
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

        {/* TAB 1: Property Inventory Table */}
        {activeTab === 'listings' && (
          <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#FAF8F5] border-b border-[#E5E0D8] text-[11.5px] uppercase font-bold text-[#5E6961] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Property</th>
                    <th className="py-3.5 px-4">City / Area</th>
                    <th className="py-3.5 px-4">Intent</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Audit Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D8]">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={property.images[0]}
                            alt=""
                            className="w-12 h-10 rounded-[4px] object-cover"
                          />
                          <div>
                            <span className="font-bold text-[#1F2421] block leading-tight">
                              {property.title}
                            </span>
                            <span className="text-[11px] text-[#5E6961]">
                              {property.bedrooms} Beds · {property.area}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-[#5E6961]">{property.city}</td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] text-[10.5px] font-bold uppercase">
                          {property.intent}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-[#0E2A1E] font-heading">
                        {property.price}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-[#0E2A1E]">
                          <ShieldCheck size={14} />
                          Verified
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => navigate(`/property/${property.id}`)}
                          className="p-1.5 text-[#0E2A1E] hover:bg-[#E8EFE8] rounded-[4px] cursor-pointer"
                          title="View live page"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => archiveProperty(property.id)}
                          className="p-1.5 text-[#5E6961] hover:bg-[#E8EFE8] rounded-[4px] cursor-pointer"
                          title="Archive listing"
                        >
                          <Archive size={15} />
                        </button>
                        <button
                          onClick={() => deleteProperty(property.id)}
                          className="p-1.5 text-[#842029] hover:bg-[#FFF0F0] rounded-[4px] cursor-pointer"
                          title="Delete listing"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Leads & Inquiries */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {enquiries.map((enq) => (
              <div key={enq.id} className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-[4px] bg-[#0E2A1E] text-[#FAF8F5] text-[10.5px] font-bold uppercase mr-2">
                      {enq.enquiryType}
                    </span>
                    <span className="font-bold text-[15px] text-[#1F2421]">{enq.name}</span>
                    <span className="text-[12.5px] text-[#5E6961] ml-2">({enq.email} · {enq.phone})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={enq.status}
                      onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                      className="px-2.5 py-1 text-[11.5px] rounded-[4px] border border-[#E5E0D8] bg-[#FAF8F5] focus:outline-none"
                    >
                      <option value="new">New Lead</option>
                      <option value="contacted">Advisor Contacted</option>
                      <option value="resolved">Resolved / Closed</option>
                    </select>
                  </div>
                </div>

                <p className="text-[13.5px] text-[#1F2421] bg-[#FAF8F5] p-3 rounded-[6px] border border-[#E5E0D8] mb-2">
                  "{enq.message}"
                </p>

                {enq.propertyTitle && (
                  <p className="text-[12px] text-[#0E2A1E] font-medium">
                    Referenced Property: {enq.propertyTitle} ({enq.budget})
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Viewing Requests */}
        {activeTab === 'viewings' && (
          <div className="space-y-4">
            {viewings.map((vw) => (
              <div key={vw.id} className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] font-mono text-[#5E6961]">ID: {vw.id}</span>
                    <span className="font-bold text-[#0E2A1E]">{vw.visitorName}</span>
                    <span className="text-[12px] text-[#5E6961]">({vw.visitorPhone})</span>
                  </div>
                  <h4 className="text-[15px] font-bold text-[#1F2421]">{vw.propertyTitle}</h4>
                  <p className="text-[13px] text-[#5E6961] mt-1">
                    Requested Date: <strong>{vw.date}</strong> at <strong>{vw.time}</strong>
                  </p>
                  {vw.notes && <p className="text-[12px] text-[#5E6961] italic mt-1">Note: {vw.notes}</p>}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateViewingStatus(vw.id, 'confirmed')}
                    className="btn-forest text-[12px] py-1.5 px-3 rounded-[4px]"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateViewingStatus(vw.id, 'completed')}
                    className="btn-outline-forest text-[12px] py-1.5 px-3 rounded-[4px]"
                  >
                    Mark Completed
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
