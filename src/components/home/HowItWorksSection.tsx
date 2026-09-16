import { Search, Users, KeyRound, ArrowRight } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function HowItWorksSection() {
  const { navigate } = useRouter();

  const steps = [
    {
      step: '01',
      action: 'DISCOVER',
      title: 'Browse Verified Properties',
      description: 'Explore physically inspected listings with certified title deeds, verified layouts, and real HD photography.',
      icon: Search,
    },
    {
      step: '02',
      action: 'CONNECT',
      title: 'Speak With an Advisor',
      description: 'Consult with a licensed, non-commission-driven fiduciary property advisor dedicated to your exact criteria.',
      icon: Users,
    },
    {
      step: '03',
      action: 'MOVE FORWARD',
      title: 'Visit & Close with Confidence',
      description: 'Schedule private on-site viewings, receive legal diligence files, and proceed with transparent milestone support.',
      icon: KeyRound,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#0E2A1E] block mb-2">
            Seamless Customer Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1C1A] font-heading tracking-tight">
            How SecureStay Works
          </h2>
          <p className="text-[15px] text-[#5A605B] mt-2 font-normal">
            A straightforward, transparent process designed to give you clarity and peace of mind at every step.
          </p>
        </div>

        {/* 3-Step Horizontal Timeline on Desktop / Vertical on Mobile */}
        <div className="relative">
          {/* Subtle connecting line across cards on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-[#E5E0D8] -translate-y-8 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-[8px] p-7 sm:p-8 flex flex-col justify-between hover:border-[#0E2A1E]/40 transition-all duration-300 shadow-xs hover:shadow-sm"
                >
                  <div>
                    {/* Step Indicator & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-[8px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center font-bold text-[18px]">
                        <Icon size={22} strokeWidth={2} />
                      </div>
                      <span className="text-[28px] font-extrabold text-[#C5A880] font-heading leading-none">
                        {item.step}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E2A1E] block mb-1">
                      Step {item.step} · {item.action}
                    </span>

                    <h3 className="text-[18px] font-bold text-[#1A1C1A] font-heading mb-2.5">
                      {item.title}
                    </h3>

                    <p className="text-[13.5px] text-[#5A605B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-6 border-t border-[#E5E0D8] flex items-center justify-between text-[12.5px] font-semibold text-[#0E2A1E]">
                    <span>0{idx + 1} of 03 Complete Clarity</span>
                    <ArrowRight size={14} className="text-[#0E2A1E]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[8px] bg-[#0E2A1E] hover:bg-[#163A29] text-[#FAF8F5] text-[13.5px] font-semibold transition-all cursor-pointer shadow-xs"
          >
            <span>Start Your Property Journey Today</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
