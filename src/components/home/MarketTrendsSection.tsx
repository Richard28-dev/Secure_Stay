import { useState } from 'react';
import { TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface MarketData {
  id: string;
  name: string;
  city: string;
  avgPriceSqFt: string;
  yoyGrowth: string;
  rentalYield: string;
  metroScore: string;
  topAmenity: string;
  description: string;
  keyDrivers: string[];
}

export default function MarketTrendsSection() {
  const { navigate } = useRouter();

  const markets: MarketData[] = [
    {
      id: 'whitefield',
      name: 'Whitefield',
      city: 'Bengaluru',
      avgPriceSqFt: '₹7,250 / sq.ft',
      yoyGrowth: '+14.6% YoY',
      rentalYield: '5.8% p.a.',
      metroScore: '9.5 / 10',
      topAmenity: 'Purple Line Metro & ITPL Corridor',
      description: 'A mature technology and residential enclave featuring top international schools, tertiary hospitals, and excellent East Bengaluru arterial connectivity.',
      keyDrivers: ['Direct Purple Line Metro Extension', 'Proximity to ITPL & EPIP Tech Zone', 'Over 12 International Baccalaureate Schools'],
    },
    {
      id: 'sarjapur',
      name: 'Sarjapur Road',
      city: 'Bengaluru',
      avgPriceSqFt: '₹7,800 / sq.ft',
      yoyGrowth: '+16.2% YoY',
      rentalYield: '5.4% p.a.',
      metroScore: '8.8 / 10',
      topAmenity: 'Gated Villa Communities & Green Belts',
      description: 'The preferred destination for luxury independent villas, wide green avenues, and seamless dual access to Outer Ring Road and Electronic City.',
      keyDrivers: ['Upcoming PRR & Sarjapur Metro Line', 'Surrounded by Prime Educational Hubs', 'High Demand for 4 BHK Gated Villas'],
    },
    {
      id: 'electronic-city',
      name: 'Electronic City',
      city: 'Bengaluru',
      avgPriceSqFt: '₹6,500 / sq.ft',
      yoyGrowth: '+12.8% YoY',
      rentalYield: '6.4% p.a.',
      metroScore: '9.6 / 10',
      topAmenity: 'Yellow Line Metro & Elevated Expressway',
      description: 'High rental yield powerhouse catering to over 200,000 tech professionals in Phase 1 & Phase 2 with modern clubhouse apartments.',
      keyDrivers: ['Operational Yellow Line Metro', 'Proximity to Infosys, Wipro & Biocon', 'Consistent High Rental Occupancy (~98%)'],
    },
    {
      id: 'hitec-city',
      name: 'HITEC City',
      city: 'Hyderabad',
      avgPriceSqFt: '₹11,400 / sq.ft',
      yoyGrowth: '+18.4% YoY',
      rentalYield: '5.2% p.a.',
      metroScore: '9.8 / 10',
      topAmenity: 'Durgam Cheruvu & Financial Corridor',
      description: 'Hyderabad’s premier commercial and luxury residential epicenter with modern high-rise sky penthouses and direct access to Outer Ring Road.',
      keyDrivers: ['Direct Blue Line Metro Links', 'Massive Multinational Tech Headquarters', 'Uninterrupted Power & High-Speed Transit'],
    },
    {
      id: 'assagao',
      name: 'Assagao & North Goa',
      city: 'Goa',
      avgPriceSqFt: '₹14,500 / sq.ft',
      yoyGrowth: '+21.0% YoY',
      rentalYield: '7.8% p.a.',
      metroScore: '8.5 / 10 (Airport Access)',
      topAmenity: 'Heritage Portuguese Estates & Culinary Hub',
      description: 'The ultimate luxury lifestyle and holiday home micro-market in India, driven by high-capital HNIs and bespoke heritage restorations.',
      keyDrivers: ['Mopa International Airport Connectivity', 'High Capital Appreciation & Holiday Rental Yield', 'Strict Low-Density Environmental Zoning'],
    },
  ];

  const [activeMarket, setActiveMarket] = useState<MarketData>(markets[0]);

  return (
    <section className="py-16 lg:py-24 bg-[#F0F5ED] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] text-[12px] font-bold uppercase tracking-wider mb-2.5">
              <TrendingUp size={14} className="text-[#0E2A1E]" />
              <span>Micro-Market Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1C1A] font-heading tracking-tight">
              Real-Time Neighborhood Data & Trends
            </h2>
            <p className="text-[15px] text-[#5A605B] mt-2 max-w-xl font-normal">
              Empower your property decisions with verified price indices, rental yields, and infrastructure drivers.
            </p>
          </div>

          <button
            onClick={() => navigate('/search', { city: activeMarket.city })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#0E2A1E] hover:bg-[#163A29] text-[#FAF8F5] text-[13px] font-semibold transition-all cursor-pointer shadow-xs w-fit"
          >
            <span>Explore {activeMarket.name} Homes</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Interactive Locality Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#E5E0D8] pb-4">
          {markets.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMarket(m)}
              className={`px-4 py-2 rounded-[6px] text-[13.5px] font-semibold transition-all cursor-pointer ${
                activeMarket.id === m.id
                  ? 'bg-[#0E2A1E] text-white shadow-xs'
                  : 'bg-white text-[#5A605B] hover:text-[#1A1C1A] hover:bg-[#E8EFE8] border border-[#E5E0D8]'
              }`}
            >
              <span>{m.name}</span>
              <span className="text-[11px] opacity-70 ml-1.5">({m.city})</span>
            </button>
          ))}
        </div>

        {/* Selected Market KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-[#E5E0D8] rounded-[8px] p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A605B] block mb-1">
              Average Capital Rate
            </span>
            <div className="text-2xl font-bold text-[#0E2A1E] font-heading mb-1">
              {activeMarket.avgPriceSqFt}
            </div>
            <span className="inline-flex items-center text-[12px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {activeMarket.yoyGrowth}
            </span>
          </div>

          <div className="bg-white border border-[#E5E0D8] rounded-[8px] p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A605B] block mb-1">
              Gross Rental Yield
            </span>
            <div className="text-2xl font-bold text-[#0E2A1E] font-heading mb-1">
              {activeMarket.rentalYield}
            </div>
            <span className="text-[12px] text-[#5A605B]">High tenant demand index</span>
          </div>

          <div className="bg-white border border-[#E5E0D8] rounded-[8px] p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A605B] block mb-1">
              Transit & Metro Score
            </span>
            <div className="text-2xl font-bold text-[#0E2A1E] font-heading mb-1">
              {activeMarket.metroScore}
            </div>
            <span className="text-[12px] text-[#5A605B]">Seamless corridor link</span>
          </div>

          <div className="bg-white border border-[#E5E0D8] rounded-[8px] p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A605B] block mb-1">
              Title Due Diligence
            </span>
            <div className="text-2xl font-bold text-[#0E2A1E] font-heading mb-1">
              100% Verified
            </div>
            <span className="text-[12px] text-[#5A605B]">Zero unvetted land listings</span>
          </div>
        </div>

        {/* Overview & Key Growth Drivers Card */}
        <div className="bg-white border border-[#E5E0D8] rounded-[8px] p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3">
              <h3 className="text-[20px] font-bold text-[#1A1C1A] font-heading">
                Market Outlook for {activeMarket.name}, {activeMarket.city}
              </h3>
              <p className="text-[14px] text-[#5A605B] leading-relaxed">
                {activeMarket.description}
              </p>
            </div>

            <div className="lg:col-span-6 space-y-2.5 border-t lg:border-t-0 lg:border-l border-[#E5E0D8] pt-6 lg:pt-0 lg:pl-8">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#0E2A1E] block mb-2">
                Primary Growth Drivers
              </span>
              {activeMarket.keyDrivers.map((driver, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-[13.5px] text-[#1A1C1A]">
                  <ShieldCheck size={16} className="text-[#0E2A1E] shrink-0" />
                  <span>{driver}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
