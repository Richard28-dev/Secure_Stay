import { useState, useMemo } from 'react';
import { Calculator, ShieldCheck, Sparkles } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function MortgageCalculatorSection() {
  const { navigate } = useRouter();

  // Calculation States
  const [propertyPrice, setPropertyPrice] = useState<number>(25000000); // 2.50 Cr default for luxury sanctuary
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25); // 25%
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years

  // Calculations
  const downPaymentAmount = useMemo(() => {
    return (propertyPrice * downPaymentPercent) / 100;
  }, [propertyPrice, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return propertyPrice - downPaymentAmount;
  }, [propertyPrice, downPaymentAmount]);

  const monthlyEMI = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    if (monthlyRate === 0) return loanAmount / totalMonths;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return isNaN(emi) ? 0 : Math.round(emi);
  }, [loanAmount, interestRate, tenureYears]);

  const totalPayment = useMemo(() => {
    return monthlyEMI * tenureYears * 12;
  }, [monthlyEMI, tenureYears]);

  const totalInterest = useMemo(() => {
    return Math.max(0, totalPayment - loanAmount);
  }, [totalPayment, loanAmount]);

  const stampDutyEst = useMemo(() => {
    return Math.round(propertyPrice * 0.056); // 5.6% standard registration & stamp duty
  }, [propertyPrice]);

  const formatINR = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#E5DFD5]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4ECE7] text-[#0A2A1D] text-[12px] font-bold tracking-wider mb-3 border border-[#0A2A1D]/15">
              <Calculator size={14} className="text-[#0A2A1D]" />
              <span>Private Wealth Planning</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1E1C] font-heading tracking-tight">
              Estate Financing & Investment Estimator
            </h2>
            <p className="text-[15.5px] text-[#57605B] mt-2 max-w-xl font-normal leading-relaxed">
              Model your capital allocation, monthly commitments, and legal acquisition stamp duty for high-value sanctuaries.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#0A2A1D] bg-white border border-[#E5DFD5] px-4 py-2.5 rounded-full shadow-xs">
            <ShieldCheck size={16} className="text-[#0A2A1D]" />
            <span>Pre-approved tie-ups with Private Banks</span>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white border border-[#E5DFD5] rounded-[16px] p-6 sm:p-8 lg:p-12 shadow-xl">
          {/* Left Column: Interactive Sliders */}
          <div className="lg:col-span-7 space-y-7">
            {/* Slider 1: Property Value */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-[12.5px] font-bold uppercase tracking-wider text-[#57605B]">
                  Sanctuary Valuation
                </label>
                <span className="text-2xl font-bold text-[#0A2A1D] font-heading">
                  {formatINR(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min={5000000}
                max={80000000}
                step={500000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-[#E4ECE7] rounded-lg appearance-none cursor-pointer accent-[#0A2A1D]"
              />
              <div className="flex justify-between text-[11px] text-[#8C938E] mt-1.5 font-medium">
                <span>₹50 Lakhs</span>
                <span>₹4.0 Cr</span>
                <span>₹8.0 Cr</span>
              </div>
            </div>

            {/* Slider 2: Down Payment Percentage */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-[12.5px] font-bold uppercase tracking-wider text-[#57605B]">
                  Initial Equity ({downPaymentPercent}%)
                </label>
                <span className="text-lg font-bold text-[#1A1E1C]">
                  {formatINR(downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-[#E4ECE7] rounded-lg appearance-none cursor-pointer accent-[#0A2A1D]"
              />
              <div className="flex justify-between text-[11px] text-[#8C938E] mt-1.5 font-medium">
                <span>10% (Minimum)</span>
                <span>25% (Standard)</span>
                <span>50%</span>
              </div>
            </div>

            {/* Two-Column Sliders: Interest Rate & Loan Tenure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[12px] font-bold uppercase tracking-wider text-[#57605B]">
                    Interest Rate
                  </label>
                  <span className="text-base font-bold text-[#1A1E1C]">
                    {interestRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min={7.5}
                  max={12}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-[#E4ECE7] rounded-lg appearance-none cursor-pointer accent-[#0A2A1D]"
                />
                <div className="flex justify-between text-[11px] text-[#8C938E] mt-1">
                  <span>7.5%</span>
                  <span>12.0%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[12px] font-bold uppercase tracking-wider text-[#57605B]">
                    Tenure
                  </label>
                  <span className="text-base font-bold text-[#1A1E1C]">
                    {tenureYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-[#E4ECE7] rounded-lg appearance-none cursor-pointer accent-[#0A2A1D]"
                />
                <div className="flex justify-between text-[11px] text-[#8C938E] mt-1">
                  <span>5 Yrs</span>
                  <span>30 Yrs</span>
                </div>
              </div>
            </div>

            {/* Micro Disclaimers */}
            <div className="pt-2 text-[12px] text-[#8C938E] leading-relaxed border-t border-[#E5DFD5]">
              *Indicative calculation only. Rates subject to financial profile, RERA appraisal, and lending institutional underwriting.
            </div>
          </div>

          {/* Right Column: Private Wealth Commitment Summary Card */}
          <div className="lg:col-span-5 bg-[#0A2A1D] text-[#FAF8F5] rounded-[14px] p-6 sm:p-8 shadow-2xl border border-[#C5A880]/30 space-y-6">
            <div className="border-b border-white/15 pb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A3B8A8] block mb-1">
                Estimated Monthly Commitment
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#C5A880] font-heading tracking-tight">
                {formatINR(monthlyEMI)} <span className="text-base font-normal text-[#FAF8F5]">/ month</span>
              </div>
            </div>

            {/* Key Metrics Breakdown */}
            <div className="space-y-3.5 text-[13px]">
              <div className="flex justify-between items-center text-[#D2DFD2]">
                <span>Principal Financed</span>
                <span className="font-semibold text-[#FAF8F5]">{formatINR(loanAmount)}</span>
              </div>

              <div className="flex justify-between items-center text-[#D2DFD2]">
                <span>Total Interest Payable</span>
                <span className="font-semibold text-[#FAF8F5]">{formatINR(totalInterest)}</span>
              </div>

              <div className="flex justify-between items-center text-[#D2DFD2]">
                <span>Est. Stamp Duty & Legal (5.6%)</span>
                <span className="font-semibold text-[#FAF8F5]">{formatINR(stampDutyEst)}</span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-white/15 text-[14px]">
                <span className="font-bold text-[#FAF8F5]">Total Outlay Over Tenure</span>
                <span className="font-bold text-[#C5A880]">{formatINR(totalPayment + downPaymentAmount)}</span>
              </div>
            </div>

            {/* Direct Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="w-full py-3.5 rounded-[8px] bg-[#C5A880] hover:bg-[#D4BC96] text-[#0A2A1D] text-[13.5px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
              >
                <Sparkles size={16} />
                <span>Inquire for Private Pre-Approval</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
