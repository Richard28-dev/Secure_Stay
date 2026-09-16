import { useState } from 'react';
import { TrendingUp, ArrowRight, MapPin } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface MarketData {
  id: string;
  name: string;
  city: string;
  avgPriceSqFt: string;
  yoyGrowth: string;
  rentalYield: string;
  demandIndex: string;
  description: string;
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
      demandIndex: 'Very High',
      description: 'Purple Line Metro corridor and prime IT parks driving strong appreciation in luxury villa communities and 3 BHK tech residences.',
    },
    {
      id: 'sarjapur',
      name: 'Sarjapur Road',
      city: 'Bengaluru',
      avgPriceSqFt: '₹7,800 / sq.ft',
      yoyGrowth: '+16.2% YoY',
      rentalYield: '5.4% p.a.',
      demandIndex: 'High',
      description: 'The premier corridor for gated villa communities, top international schools, and dual access to ORR and Electronic City.',
    },
    {
      id: 'hitec-city',
      name: 'HITEC City',
      city: 'Hyderabad',
      avgPriceSqFt: '₹11,400 / sq.ft',
      yoyGrowth: '+18.4% YoY',
      rentalYield: '5.2% p.a.',
      demandIndex: 'Very High',
      description: 'Hyderabad’s premier commercial and sky penthouse hub with rapid institutional infrastructure expansion and high MNC demand.',
    },
    {
      id: 'bandra',
      name: 'Bandra West',
      city: 'Mumbai',
      avgPriceSqFt: '₹48,500 / sq.ft',
      yoyGrowth: '+9.5% YoY',
      rentalYield: '3.8% p.a.',
      demandIndex: 'Extreme',
      description: 'India’s prime seafront residential corridor characterized by low inventory, trophy penthouses, and high capital resilience.',
    },
    {
      id: 'assagao',
      name: 'Assagao & North Goa',
      city: 'Goa',
      avgPriceSqFt: '₹14,500 / sq.ft',
      yoyGrowth: '+21.0% YoY',
      rentalYield: '7.8% p.a.',
      demandIndex: 'High',
      description: 'Bespoke luxury holiday home market supported by Mopa International Airport links and robust luxury vacation rental yields.',
    },
  ];

  const [activeMarket, setActiveMarket] = useState<MarketData>(markets[0]);

  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] text-[12px] font-bold uppercase tracking-wider mb-2">
              <TrendingUp size={14} />
              <span>Real Estate Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1C1A] font-heading tracking-tight">
              Market Insights & Price Trends
            </h2>
            <p className="text-[15px] text-[#5A605B] mt-2 max-w-xl font-normal">
              Verified price indices, rental yield benchmarks, and neighborhood appreciation data to guide your property decisions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/search', { city: activeMarket.city })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#0E2A1E] hover:bg-[#163A29] text-[#FAF8F5] text-[13px] font-semibold transition-colors cursor-pointer w-fit shadow-xs"
          >
            <span>Explore {activeMarket.name} Listings</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Location Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#E5E0D8] pb-4">
          {markets.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveMarket(m)}
              className={`px-4 py-2 rounded-[6px] text-[13.5px] font-semibold transition-all cursor-pointer ${
                activeMarket.id === m.id
                  ? 'bg-[#0E2A1E] text-white shadow-xs'
                  : 'bg-white text-[#5A605B] hover:text-[#1A1C1A] border border-[#E5E0D8]'
              }`}
            >
              <span>{m.name}</span>
              <span className="text-[11.5px] opacity-70 ml-1.5 font-normal">({m.city})</span>
            </button>
          ))}
        </div>

        {/* Practical Real Estate Market Data Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Key Metric Blocks (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-[#E5E0D8] rounded-[8px] p-6 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A605B] block mb-2">
                Average Capital Rate
              </span>
              <div>
                <span className="text-3xl font-bold text-[#0E2A1E] font-heading block mb-1">
                  {activeMarket.avgPriceSqFt}
                </span>
                <span className="inline-flex items-center text-[12px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                  {activeMarket.yoyGrowth}
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#E5E0D8] rounded-[8px] p-6 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A605B] block mb-2">
                Gross Rental Yield
              </span>
              <div>
                <span className="text-3xl font-bold text-[#0E2A1E] font-heading block mb-1">
                  {activeMarket.rentalYield}
                </span>
                <span className="text-[12px] text-[#5A605B]">
                  Based on long-term verified tenancy contracts
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#E5E0D8] rounded-[8px] p-6 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A605B] block mb-2">
                Market Demand Index
              </span>
              <div>
                <span className="text-3xl font-bold text-[#0E2A1E] font-heading block mb-1">
                  {activeMarket.demandIndex}
                </span>
                <span className="text-[12px] text-[#5A605B]">
                  High buyer and tenant search volume
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#E5E0D8] rounded-[8px] p-6 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A605B] block mb-2">
                Regulatory & Title Status
              </span>
              <div>
                <span className="text-3xl font-bold text-[#0E2A1E] font-heading block mb-1">
                  100% RERA
                </span>
                <span className="text-[12px] text-[#5A605B]">
                  All cataloged properties carry certified title deeds
                </span>
              </div>
            </div>
          </div>

          {/* Market Summary Panel (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#E5E0D8] rounded-[8px] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-1.5 text-[12.5px] text-[#0E2A1E] font-bold mb-2">
                <MapPin size={15} />
                <span>{activeMarket.name}, {activeMarket.city}</span>
              </div>
              <h3 className="text-[20px] font-bold text-[#1A1C1A] font-heading mb-3 leading-snug">
                Locality Profile
              </h3>
              <p className="text-[13.5px] text-[#5A605B] leading-relaxed">
                {activeMarket.description}
              </p>
            </div>

            <div className="pt-6 border-t border-[#E5E0D8] mt-6">
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="w-full py-2.5 rounded-[6px] border border-[#0E2A1E] text-[#0E2A1E] hover:bg-[#0E2A1E] hover:text-white text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Custom Market Report</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
