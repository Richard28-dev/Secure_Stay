import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import ShowcaseVilla from './3d/ShowcaseVilla';
import ScrollReveal from './ScrollReveal';
import { X, Compass, Sparkles } from 'lucide-react';

interface Hotspot {
  id: string;
  label: string;
  position: [number, number, number];
  description: string;
  spec: string;
}

const hotspots: Hotspot[] = [
  {
    id: 'living',
    label: 'Grand Atrium & Living',
    position: [-0.5, 1.2, 1.5],
    description: 'Double-height volume with acoustic ceiling treatment and motorized floor-to-ceiling glass fenestration.',
    spec: '850 sq.ft · Italian Marble',
  },
  {
    id: 'bedroom',
    label: 'Owner’s Penthouse Suite',
    position: [-0.8, 2.2, 1.3],
    description: 'Private upper sanctuary with dedicated walk-in dressing salon and private sunset cantilever balcony.',
    spec: '720 sq.ft · Teakwood Floors',
  },
  {
    id: 'kitchen',
    label: 'Culinary Studio & Pantry',
    position: [1.2, 1.1, 1.5],
    description: 'Integrated German cabinetry with quartz preparation island and concealed prep kitchen.',
    spec: 'Custom Miele Suite',
  },
  {
    id: 'pool',
    label: 'Infinity Lap Pool & Deck',
    position: [0.3, 0.4, 3.0],
    description: 'Ozone-treated swimming pool bordered by thermally modified ash timber deck and submerged sunbeds.',
    spec: '15m Length · LED Ambient',
  },
  {
    id: 'garden',
    label: 'Zen Landscape Courtyard',
    position: [-3.0, 0.8, 1.5],
    description: 'Indigenous flora curated by master arborists, featuring water cascade and limestone pathways.',
    spec: '1,400 sq.ft · Microclimate',
  },
  {
    id: 'terrace',
    label: 'Starlight Sky Lounge',
    position: [2.2, 1.2, -1.5],
    description: 'Covered rooftop pavilion with outdoor fireplace and panoramic 270-degree canopy views.',
    spec: '600 sq.ft · Fire Feature',
  },
];

function HotspotMarker({
  hotspot,
  isActive,
  onClick,
}: {
  hotspot: Hotspot;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Html position={hotspot.position} center distanceFactor={7.5}>
      <div className="relative font-sans select-none">
        {/* Minimal Marker Button */}
        <button
          onClick={onClick}
          className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-[#0C1015]/90 border border-[#C5A880] transition-transform duration-300 hover:scale-110 cursor-pointer"
        >
          <div className="w-2 h-2 rounded-full bg-[#C5A880]" />
          <div className="absolute inset-0 rounded-full border border-[#C5A880]/40 animate-ping" style={{ animationDuration: '3s' }} />
        </button>

        {/* Minimal Label Hover/Always on Desktop */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none hidden sm:block">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#FAF9F5] bg-[#0C1015]/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-[2px]">
            {hotspot.label}
          </span>
        </div>

        {/* Info Card Drawer */}
        {isActive && (
          <div
            className="absolute left-10 top-6 w-72 bg-[#FAF9F5] border border-[#E5E1D8] p-5 shadow-[0_25px_50px_rgba(0,0,0,0.3)] rounded-[2px] z-50 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-[10px] font-bold text-[#C5A880] tracking-[0.2em] uppercase">
                {hotspot.spec}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="text-[#8E9199] hover:text-[#17181C] p-1"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>
            <h4 className="text-base font-medium text-[#17181C] mb-2 font-serif">
              {hotspot.label}
            </h4>
            <p className="text-[12px] text-[#5A5D64] leading-relaxed font-light">
              {hotspot.description}
            </p>
          </div>
        )}
      </div>
    </Html>
  );
}

export default function PropertyShowcase3D() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'exterior' | 'interior' | 'aerial'>('exterior');

  return (
    <section id="showcase" className="section-wrapper bg-[#101418] text-[#FAF9F5] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0E2519]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-luxury relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
          <ScrollReveal>
            <div className="max-w-xl">
              <span className="eyebrow text-[#C5A880] mb-3 flex items-center gap-2">
                <Sparkles size={13} />
                Spatial Architecture Interactive
              </span>
              <h2 className="section-title text-[#FAF9F5]">
                3D Architectural Exploration
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="text-[0.95rem] text-[#8E9199] max-w-md font-light leading-relaxed">
              Rotate, inspect, and uncover architectural specifications of our flagship residential design. Select interactive markers to review spatial blueprints.
            </p>
          </ScrollReveal>
        </div>

        {/* 3D Canvas Container */}
        <ScrollReveal delay={200}>
          <div className="relative w-full h-[520px] md:h-[640px] bg-[#0C0F12] border border-white/10 rounded-[2px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <Canvas
              shadows
              camera={{ position: [6.5, 4.2, 8.5], fov: 38 }}
              dpr={[1, 1.5]}
              style={{ width: '100%', height: '100%' }}
              gl={{ antialias: true, alpha: false }}
            >
              <color attach="background" args={['#0C0F12']} />
              <fog attach="fog" args={['#0C0F12', 12, 30]} />

              <ambientLight intensity={0.35} />
              <directionalLight
                position={[7, 12, 7]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={26}
                shadow-camera-left={-8}
                shadow-camera-right={8}
                shadow-camera-top={8}
                shadow-camera-bottom={-8}
              />
              <directionalLight position={[-5, 6, -4]} intensity={0.35} color="#A7C7E7" />
              <pointLight position={[0, 3, 2]} intensity={0.5} color="#F5DEB3" />

              <Suspense fallback={null}>
                <ShowcaseVilla />
                <Environment preset="night" environmentIntensity={0.2} />

                {hotspots.map((hotspot) => (
                  <HotspotMarker
                    key={hotspot.id}
                    hotspot={hotspot}
                    isActive={activeHotspot === hotspot.id}
                    onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                  />
                ))}
              </Suspense>

              <OrbitControls
                enablePan={true}
                enableZoom={true}
                minDistance={5}
                maxDistance={15}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.2}
                autoRotate
                autoRotateSpeed={0.15}
                enableDamping
                dampingFactor={0.05}
              />
            </Canvas>

            {/* Top Right Architectural Preset Pills */}
            <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
              <div className="bg-[#101418]/80 backdrop-blur-md border border-white/15 p-1 rounded-[2px] flex items-center gap-1">
                {(['exterior', 'interior', 'aerial'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3.5 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-[2px] transition-colors ${
                      activeTab === tab
                        ? 'bg-[#C5A880] text-[#0C0F12]'
                        : 'text-[#8E9199] hover:text-[#FAF9F5]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Bar: Instructions & Quick Specs */}
            <div className="absolute bottom-6 inset-x-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-none z-10">
              <div className="bg-[#101418]/85 backdrop-blur-md border border-white/15 px-4 py-2 rounded-[2px] pointer-events-auto flex items-center gap-3">
                <Compass size={14} className="text-[#C5A880]" />
                <span className="text-[11px] text-[#8E9199] tracking-wider uppercase font-medium">
                  360° Interactive Orbit · Click Hotspots for Blueprints
                </span>
              </div>

              <div className="bg-[#101418]/85 backdrop-blur-md border border-white/15 px-4 py-2 rounded-[2px] pointer-events-auto hidden md:flex items-center gap-4">
                <div className="text-[11px] text-[#FAF9F5] font-medium">
                  <span className="text-[#8E9199] mr-1.5">Model:</span>The Monolith Villa 04
                </div>
                <div className="w-[1px] h-3 bg-white/20" />
                <div className="text-[11px] text-[#FAF9F5] font-medium">
                  <span className="text-[#8E9199] mr-1.5">Scale:</span>1:1 CAD Architecture
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
