import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { RotateCw, Bed, Bath, Maximize2, Trees, Wifi, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import HeroVilla from '../3d/HeroVilla';
import { useRouter } from '../../context/RouterContext';

export default function StepInside3DSection() {
  const { navigate } = useRouter();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <section className="py-16 lg:py-24 bg-[#F5F1EA] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] text-[12px] font-bold uppercase tracking-wider mb-2.5">
              <Sparkles size={14} className="text-[#0E2A1E]" />
              <span>Interactive Space Exploration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1C1A] font-heading tracking-tight">
              Step Inside Before You Visit
            </h2>
            <p className="text-[15px] text-[#5A605B] mt-2 max-w-xl font-normal">
              Experience the spatial flow, architectural layout, and natural light of our signature residential designs with interactive 3D navigation.
            </p>
          </div>

          <button
            onClick={() => navigate('/property/the-grand-oak-sanctuary-villa')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#0E2A1E] hover:bg-[#163A29] text-[#FAF8F5] text-[13px] font-semibold transition-colors cursor-pointer shadow-xs w-fit"
          >
            <span>View Full Estate Dossier</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* 3D Showcase Card Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main 3D Viewport (8 Cols) */}
          <div className="lg:col-span-8 relative bg-[#0E2A1E] rounded-[8px] overflow-hidden border border-[#E5E0D8] shadow-sm min-h-[420px] lg:min-h-[480px]">
            {/* 3D Canvas */}
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center text-white">
                  Loading 3D Model...
                </div>
              }
            >
              <Canvas
                shadows
                camera={{ position: [5.8, 3.8, 6.8], fov: 38 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true }}
                onPointerDown={() => setIsInteracting(true)}
              >
                <color attach="background" args={['#0E2A1E']} />
                <fog attach="fog" args={['#0E2A1E', 10, 24]} />

                {/* Natural Sun & Ambient Lighting */}
                <ambientLight intensity={0.55} />
                <directionalLight
                  position={[8, 12, 6]}
                  intensity={1.3}
                  castShadow
                  shadow-mapSize={[1024, 1024]}
                  color="#FFF9F0"
                />
                <directionalLight position={[-6, 6, -4]} intensity={0.35} color="#C5A880" />

                <HeroVilla />
                <Environment preset="city" environmentIntensity={0.25} />

                <OrbitControls
                  ref={controlsRef}
                  enableZoom={true}
                  enablePan={false}
                  minDistance={4.5}
                  maxDistance={12}
                  minPolarAngle={Math.PI / 5}
                  maxPolarAngle={Math.PI / 2.2}
                  autoRotate={!isInteracting}
                  autoRotateSpeed={0.25}
                  dampingFactor={0.06}
                />
              </Canvas>
            </Suspense>

            {/* Instruction Overlay Badge */}
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
              <span className="px-3 py-1.5 rounded-[4px] bg-[#071710]/85 backdrop-blur-xs text-[#FAF8F5] text-[11px] font-medium border border-white/10 flex items-center gap-1.5 shadow-xs">
                <RotateCw size={13} className="text-[#C5A880]" />
                <span>Drag to Rotate · Scroll to Zoom</span>
              </span>
            </div>

            {/* Top Status */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-[4px] bg-[#0E2A1E]/90 text-[#FAF8F5] text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs border border-white/15">
                3D Architectural Model
              </span>
            </div>
          </div>

          {/* Right Information Panel (4 Cols) */}
          <div className="lg:col-span-4 bg-white border border-[#E5E0D8] rounded-[8px] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0E2A1E] mb-1">
                <ShieldCheck size={14} className="text-[#0E2A1E]" />
                <span>Verified Spatial Layout</span>
              </div>
              <h3 className="text-[22px] font-bold text-[#1A1C1A] font-heading mb-1.5">
                The Courtyard Pavilion
              </h3>
              <p className="text-[13px] text-[#5A605B] leading-relaxed mb-6">
                A modern biophilic villa designed for seamless indoor-outdoor living, cross-ventilation, and sustainable natural lighting.
              </p>

              {/* Verified Specs Grid */}
              <div className="space-y-3 pt-4 border-t border-[#E5E0D8]">
                <div className="flex items-center justify-between text-[13.5px]">
                  <span className="text-[#5A605B] flex items-center gap-2">
                    <Bed size={15} className="text-[#0E2A1E]" />
                    Bedrooms
                  </span>
                  <span className="font-bold text-[#1A1C1A]">3 Suites</span>
                </div>

                <div className="flex items-center justify-between text-[13.5px]">
                  <span className="text-[#5A605B] flex items-center gap-2">
                    <Bath size={15} className="text-[#0E2A1E]" />
                    Bathrooms
                  </span>
                  <span className="font-bold text-[#1A1C1A]">3 Luxury Baths</span>
                </div>

                <div className="flex items-center justify-between text-[13.5px]">
                  <span className="text-[#5A605B] flex items-center gap-2">
                    <Maximize2 size={15} className="text-[#0E2A1E]" />
                    Total Built Area
                  </span>
                  <span className="font-bold text-[#1A1C1A]">2,400 sq.ft</span>
                </div>

                <div className="flex items-center justify-between text-[13.5px]">
                  <span className="text-[#5A605B] flex items-center gap-2">
                    <Trees size={15} className="text-[#0E2A1E]" />
                    Outdoor Space
                  </span>
                  <span className="font-bold text-[#1A1C1A]">Private Garden</span>
                </div>

                <div className="flex items-center justify-between text-[13.5px]">
                  <span className="text-[#5A605B] flex items-center gap-2">
                    <Wifi size={15} className="text-[#0E2A1E]" />
                    Automation
                  </span>
                  <span className="font-bold text-[#1A1C1A]">Smart Home Enabled</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E0D8] space-y-3">
              <button
                onClick={() => navigate('/contact')}
                className="w-full py-3 rounded-[6px] bg-[#0E2A1E] hover:bg-[#163A29] text-white text-[13.5px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Schedule Private On-Site Viewing</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
