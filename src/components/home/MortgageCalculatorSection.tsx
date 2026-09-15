import { useState, useMemo } from 'react';
import { Calculator, ShieldCheck, ArrowRight } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function MortgageCalculatorSection() {
  const { navigate } = useRouter();

  // Calculation States
  const [propertyPrice, setPropertyPrice] = useState<number>(12500000); // 1.25 Cr default
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20%
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
    return Math.round(propertyPrice * 0.056); // 5.6% standard registration & stamp duty in Karnataka
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
    <section className="py-16 lg:py-24 bg-white border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] text-[12px] font-bold uppercase tracking-wider mb-2.5">
              <Calculator size={14} className="text-[#0E2A1E]" />
              <span>Financial Planning</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1C1A] font-heading tracking-tight">
              Interactive Mortgage & EMI Estimator
            </h2>
            <p className="text-[15px] text-[#5A605B] mt-2 max-w-xl font-normal">
              Calculate realistic monthly commitments, down payment amounts, and verified loan-to-value allocations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#0E2A1E] bg-[#FAF8F5] border border-[#E5E0D8] px-4 py-2 rounded-[6px]">
            <ShieldCheck size={16} />
            <span>Pre-approved bank tie-ups (HDFC, SBI, ICICI)</span>
          </div>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#FAF8F5] border border-[#E5E0D8] rounded-[8px] p-6 sm:p-8 lg:p-10 shadow-xs">
          {/* Left Column: Interactive Sliders */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slider 1: Property Value */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[13px] font-bold uppercase tracking-wider text-[#5A605B]">
                  Property Value
                </label>
                <span className="text-[18px] font-extrabold text-[#0E2A1E] font-heading">
                  {formatINR(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min={5000000}
                max={60000000}
                step={500000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-[#E5E0D8] rounded-lg appearance-none cursor-pointer accent-[#0E2A1E]"
              />
              <div className="flex justify-between text-[11px] text-[#8C938E] mt-1 font-medium">
                <span>₹50 Lakhs</span>
                <span>₹3.0 Cr</span>
                <span>₹6.0 Cr</span>
              </div>
            </div>

            {/* Slider 2: Down Payment Percentage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[13px] font-bold uppercase tracking-wider text-[#5A605B]">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="text-[16px] font-bold text-[#1A1C1A]">
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
                className="w-full h-2 bg-[#E5E0D8] rounded-lg appearance-none cursor-pointer accent-[#0E2A1E]"
              />
              <div className="flex justify-between text-[11px] text-[#8C938E] mt-1 font-medium">
                <span>10% (Minimum)</span>
                <span>20% (Standard)</span>
                <span>50%</span>
              </div>
            </div>

            {/* Two-Column Sliders: Interest Rate & Loan Tenure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[13px] font-bold uppercase tracking-wider text-[#5A605B]">
                    Interest Rate
                  </label>
                  <span className="text-[16px] font-bold text-[#1A1C1A]">
                    {interestRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min={7.5}
                  max={11.0}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-[#E5E0D8] rounded-lg appearance-none cursor-pointer accent-[#0E2A1E]"
                />
                <div className="flex justify-between text-[11px] text-[#8C938E] mt-1 font-medium">
                  <span>7.5%</span>
                  <span>9.0%</span>
                  <span>11.0%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[13px] font-bold uppercase tracking-wider text-[#5A605B]">
                    Loan Tenure
                  </label>
                  <span className="text-[16px] font-bold text-[#1A1C1A]">
                    {tenureYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={5}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-[#E5E0D8] rounded-lg appearance-none cursor-pointer accent-[#0E2A1E]"
                />
                <div className="flex justify-between text-[11px] text-[#8C938E] mt-1 font-medium">
                  <span>5 Yrs</span>
                  <span>20 Yrs</span>
                  <span>30 Yrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results Summary Card */}
          <div className="lg:col-span-5 bg-white border border-[#E5E0D8] rounded-[8px] p-6 sm:p-7 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A605B] block mb-1">
              Estimated Monthly Outlay
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0E2A1E] font-heading mb-6 leading-none">
              ₹{monthlyEMI.toLocaleString('en-IN')}{' '}
              <span className="text-[14px] text-[#5A605B] font-normal font-sans">/ month</span>
            </div>

            {/* Visual Breakdown Bar */}
            <div className="space-y-2 mb-6">
              <div className="h-3 w-full bg-[#E5E0D8] rounded-full overflow-hidden flex">
                <div
                  className="bg-[#0E2A1E] h-full transition-all duration-300"
                  style={{ width: `${(loanAmount / (totalPayment || 1)) * 100}%` }}
                  title="Principal Loan Amount"
                />
                <div
                  className="bg-[#C5A880] h-full transition-all duration-300"
                  style={{ width: `${(totalInterest / (totalPayment || 1)) * 100}%` }}
                  title="Total Interest"
                />
              </div>
              <div className="flex justify-between text-[11.5px] text-[#5A605B] font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0E2A1E]" />
                  Principal: {formatINR(loanAmount)}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
                  Interest: {formatINR(totalInterest)}
                </span>
              </div>
            </div>

            {/* Key Data Summary List */}
            <div className="space-y-2.5 pt-4 border-t border-[#E5E0D8] text-[13px]">
              <div className="flex justify-between">
                <span className="text-[#5A605B]">Down Payment ({downPaymentPercent}%)</span>
                <span className="font-bold text-[#1A1C1A]">{formatINR(downPaymentAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A605B]">Est. Registration & Stamp Duty (5.6%)</span>
                <span className="font-bold text-[#1A1C1A]">{formatINR(stampDutyEst)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A605B]">Total Loan Payable</span>
                <span className="font-bold text-[#0E2A1E]">{formatINR(totalPayment)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/contact')}
              className="mt-6 w-full py-3 rounded-[6px] bg-[#0E2A1E] hover:bg-[#163A29] text-[#FAF8F5] text-[13.5px] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Get Bank Pre-Approval Assistance</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
