import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import HeroVilla from './3d/HeroVilla';
import ScrollReveal from './ScrollReveal';
import { ArrowRight, Compass } from 'lucide-react';

function HeroCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [5.2, 3.2, 6.8], fov: 38 }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0C1015']} />
      <fog attach="fog" args={['#0C1015', 12, 28]} />

      {/* Atmospheric Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[6, 9, 5]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={22}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
      />
      <directionalLight position={[-4, 4, -3]} intensity={0.35} color="#A7C7E7" />
      <pointLight position={[1, 2.5, 3]} intensity={0.5} color="#F5DEB3" />

      <Suspense fallback={null}>
        <HeroVilla />
        <Environment preset="night" environmentIntensity={0.25} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={5}
        maxDistance={12}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.3}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.25}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center justify-between overflow-hidden bg-[#0C1015]"
    >
      {/* 3D Canvas with intentional offset right positioning for negative space */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Cinematic Gradient Overlays for Editorial Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C1015] via-[#0C1015]/60 to-transparent pointer-events-none z-[1] w-full lg:w-3/5" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0C1015] to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0C1015]/80 to-transparent pointer-events-none z-[1]" />

      {/* Hero Narrative Overlay */}
      <div className="relative z-10 w-full container-luxury pt-32 pb-24 md:pt-40 md:pb-28">
        <div className="max-w-2xl lg:max-w-3xl">
          <ScrollReveal delay={150}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              <span className="eyebrow text-[#C5A880]">
                Private Residences & Estates
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <h1 className="hero-title text-[#FAF9F5] mb-7">
              Find a Place
              <br />
              <span className="italic font-normal font-serif-editorial text-[#FAF9F5]/90">
                Worth Calling Home.
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={450}>
            <p className="text-[1.05rem] md:text-[1.125rem] text-[#8E9199] leading-[1.75] font-light max-w-xl mb-11">
              Curated luxury properties and architectural landmark residences across India’s most prestigious enclaves, crafted for those who value enduring quality.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href="#properties"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#properties')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-editorial-gold"
              >
                <span>Explore Residences</span>
                <ArrowRight size={14} strokeWidth={1.5} />
              </a>

              <a
                href="#showcase"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#showcase')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-editorial-light"
              >
                <Compass size={14} strokeWidth={1.5} />
                <span>3D Architectural View</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Editorial Architectural Spec Badge (Bottom Right) */}
      <div className="absolute bottom-10 right-8 lg:right-16 z-10 hidden md:block">
        <ScrollReveal delay={800}>
          <div className="bg-[#0C1015]/75 backdrop-blur-md border border-white/10 px-6 py-4 rounded-[2px] flex items-center gap-8">
            <div>
              <span className="block text-[9px] tracking-[0.2em] text-[#8E9199] uppercase">
                Featured Villa
              </span>
              <span className="text-[13px] font-medium text-[#FAF9F5] tracking-wide">
                The Obsidian Pavilions
              </span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="block text-[9px] tracking-[0.2em] text-[#C5A880] uppercase">
                Estate Scale
              </span>
              <span className="text-[13px] font-medium text-[#FAF9F5] tracking-wide">
                4,600 sq.ft · Bengaluru
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Editorial Minimal Scroll Line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-3">
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#8E9199]/70 font-medium">
          Scroll
        </span>
        <div className="w-[1px] h-9 bg-gradient-to-b from-[#C5A880]/60 to-transparent" />
      </div>
    </section>
  );
}
