import { Search, Users, KeyRound, ArrowRight } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function HowItWorksSection() {
  const { navigate } = useRouter();

  const steps = [
    {
      step: '01',
      action: 'Browse',
      title: 'Browse Verified Properties',
      description: 'Explore physically inspected listings with certified title deeds, verified floor layouts, and authentic high-resolution photography.',
      icon: Search,
    },
    {
      step: '02',
      action: 'Connect',
      title: 'Speak with an Expert',
      description: 'Consult with a licensed, dedicated SecureStay property advisor assigned to your exact lifestyle and investment requirements.',
      icon: Users,
    },
    {
      step: '03',
      action: 'Visit & Decide',
      title: 'Schedule a Viewing & Decide',
      description: 'Coordinate private on-site viewings, review transparent legal diligence dossiers, and proceed with structured milestone security.',
      icon: KeyRound,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#0E2A1E] block mb-2">
            The Secure Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1C1A] font-heading tracking-tight">
            How It Works
          </h2>
          <p className="text-[15px] text-[#5A605B] mt-2 font-normal">
            A straightforward, transparent three-step pathway to finding and securing your property.
          </p>
        </div>

        {/* Clean 3-Step Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-[8px] p-7 sm:p-8 flex flex-col justify-between hover:border-[#0E2A1E]/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-[6px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <span className="text-[20px] font-bold text-[#C5A880] font-heading">
                      {item.step}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E2A1E] block mb-1">
                    {item.action}
                  </span>
                  <h3 className="text-[19px] font-bold text-[#1A1C1A] font-heading mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] text-[#5A605B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => navigate('/buy')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] bg-[#0E2A1E] hover:bg-[#163A29] text-[#FAF8F5] text-[13.5px] font-semibold transition-colors cursor-pointer shadow-xs"
          >
            <span>Start Exploring Properties</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
