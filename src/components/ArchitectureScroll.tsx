import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import ScrollReveal from './ScrollReveal';
import { Compass, Sparkles } from 'lucide-react';

const stages = [
  {
    number: '01',
    title: 'Biophilic Structural Form',
    description: 'Cantilevered geometries, natural cross-ventilation corridors, and double-height light wells harmonize modern concrete with tropical elements.',
  },
  {
    number: '02',
    title: 'Curated Material Palette',
    description: 'Honed Italian travertine, weathered bronze accents, sustainably harvested teak, and acoustic glass panels assembled with millimeter tolerance.',
  },
  {
    number: '03',
    title: 'Sanctuary Landscapes',
    description: 'Microclimatic courtyards, reflective water pavilions, and secluded infinity decks engineered to dissolve the threshold between indoor and outdoor.',
  },
];

function ArchVilla() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.15 - Math.PI / 5;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.04 - 0.7;
  });

  return (
    <group ref={group}>
      {/* Architectural Villa Block */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[2.5, 1.2, 2.0]} />
        <meshStandardMaterial color="#E8E5DF" roughness={0.6} />
      </mesh>
      <mesh position={[1.5, 0.9, -0.5]} castShadow>
        <boxGeometry args={[1.5, 1.8, 1.5]} />
        <meshStandardMaterial color="#FAF9F5" roughness={0.6} />
      </mesh>
      {/* Overhanging Slabs */}
      <mesh position={[0, 1.22, 0]} castShadow>
        <boxGeometry args={[2.8, 0.05, 2.3]} />
        <meshStandardMaterial color="#22262B" roughness={0.4} />
      </mesh>
      <mesh position={[1.5, 1.82, -0.5]} castShadow>
        <boxGeometry args={[1.8, 0.05, 1.8]} />
        <meshStandardMaterial color="#22262B" roughness={0.4} />
      </mesh>
      {/* Glazing */}
      <mesh position={[-0.5, 0.65, 1.01]}>
        <boxGeometry args={[1.2, 0.8, 0.02]} />
        <meshPhysicalMaterial color="#A5D6A7" transmission={0.6} transparent opacity={0.5} roughness={0.1} />
      </mesh>
      <mesh position={[1.5, 1.0, 0.26]}>
        <boxGeometry args={[0.8, 1.2, 0.02]} />
        <meshPhysicalMaterial color="#A5D6A7" transmission={0.6} transparent opacity={0.5} roughness={0.1} />
      </mesh>
      {/* Plinth */}
      <mesh position={[0.5, 0, 0.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color="#1A2A20" roughness={0.9} />
      </mesh>
      {/* Architectural Trees */}
      {[[-2.5, 0, 1], [2.8, 0, 1.5], [-1.5, 0, -1.5]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.03, 0.06, 0.8, 6]} /><meshStandardMaterial color="#4E342E" /></mesh>
          <mesh position={[0, 1.0, 0]}><sphereGeometry args={[0.35, 8, 8]} /><meshStandardMaterial color="#1B5E20" /></mesh>
        </group>
      ))}
    </group>
  );
}

export default function ArchitectureScroll() {
  return (
    <section id="philosophy" className="section-wrapper bg-[#0C1410] text-[#FAF9F5] relative overflow-hidden">
      <div className="container-luxury relative z-10">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <span className="eyebrow text-[#C5A880] mb-4 flex items-center gap-2">
              <Compass size={13} />
              Design Philosophy
            </span>
            <h2 className="section-title text-[#FAF9F5]">
              Built for the Way You Live
            </h2>
            <p className="text-[1.05rem] text-[#8E9199] mt-4 font-light leading-relaxed">
              We design spaces that elevate everyday living into an art form — prioritizing natural light, timeless materials, and spatial harmony.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 3D Canvas Box (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={100}>
              <div className="h-[420px] md:h-[520px] bg-[#080E0B] border border-white/10 rounded-[2px] overflow-hidden relative shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
                <Canvas
                  shadows
                  camera={{ position: [4.5, 3.2, 5.5], fov: 36 }}
                  dpr={[1, 1.5]}
                  gl={{ antialias: true }}
                >
                  <color attach="background" args={['#080E0B']} />
                  <fog attach="fog" args={['#080E0B', 8, 20]} />
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[6, 9, 5]} intensity={1.3} castShadow />
                  <Suspense fallback={null}>
                    <ArchVilla />
                    <Environment preset="city" environmentIntensity={0.2} />
                  </Suspense>
                  <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={0.2}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2.3}
                  />
                </Canvas>

                {/* Floating Architectural Badge */}
                <div className="absolute bottom-5 left-5 bg-[#0C1410]/80 backdrop-blur-md border border-white/15 px-4 py-2 rounded-[2px]">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-semibold">
                    Studio Blueprint · Prototype Model 01
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Philosophy Pillars (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {stages.map((stage, index) => (
              <ScrollReveal key={stage.number} delay={200 + index * 120}>
                <div className="group border-b border-white/10 pb-7 last:border-none">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-2xl font-serif-editorial text-[#C5A880] font-normal">
                      {stage.number}
                    </span>
                    <h3 className="text-lg font-medium text-[#FAF9F5] group-hover:text-[#C5A880] transition-colors">
                      {stage.title}
                    </h3>
                  </div>
                  <p className="text-[13.5px] text-[#8E9199] leading-[1.8] font-light pl-9">
                    {stage.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
