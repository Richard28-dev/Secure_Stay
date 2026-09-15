import { Compass, Search, Home } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export default function NotFoundPage() {
  const { navigate } = useRouter();

  return (
    <div className="pt-32 pb-24 bg-[#FAF8F5] min-h-screen flex items-center justify-center">
      <div className="container-luxury max-w-lg text-center">
        <div className="w-16 h-16 rounded-[8px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center mx-auto mb-6">
          <Compass size={32} />
        </div>

        <span className="text-[12px] uppercase font-bold text-[#C5A880] tracking-widest block mb-1">
          Error 404
        </span>
        <h1 className="text-[32px] md:text-[38px] font-extrabold text-[#1F2421] font-heading leading-tight mb-3">
          Residence Not Found
        </h1>
        <p className="text-[14px] text-[#5E6961] mb-8 leading-relaxed">
          The requested page or property listing may have been moved, archived, or is temporarily undergoing legal verification review.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="btn-forest w-full sm:w-auto px-6 py-3 text-[13.5px] rounded-[8px] flex items-center justify-center gap-2"
          >
            <Home size={16} />
            <span>Return to Home</span>
          </button>
          <button
            onClick={() => navigate('/search')}
            className="btn-outline-forest w-full sm:w-auto px-6 py-3 text-[13.5px] rounded-[8px] flex items-center justify-center gap-2"
          >
            <Search size={16} />
            <span>Search All Properties</span>
          </button>
        </div>
      </div>
    </div>
  );
}
