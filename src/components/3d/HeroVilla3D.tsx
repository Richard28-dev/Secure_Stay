import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export interface MarkerInfo {
  id: string;
  position: [number, number, number];
  title: string;
  detail: string;
  badge: string;
  cameraTarget: [number, number, number];
  cameraPos: [number, number, number];
}

export const ARCHITECTURAL_MARKERS: MarkerInfo[] = [
  {
    id: 'marker-master-suite',
    position: [1.8, 2.8, 1.8],
    badge: 'Level 02',
    title: 'Cantilevered Primary Suite',
    detail: 'Private 180° sundeck, custom walnut walk-in dressing, and acoustic triple-glazed windows.',
    cameraTarget: [1.2, 2.4, 0.5],
    cameraPos: [4.8, 3.8, 5.2],
  },
  {
    id: 'marker-lap-pool',
    position: [1.8, 0.35, 2.4],
    badge: 'Wellness',
    title: '40ft Heated Mosaic Lap Pool',
    detail: 'Italian glass mosaic pool with underwater luminescence, teak deck lounge, and counter-current swimming.',
    cameraTarget: [1.8, 0.2, 1.5],
    cameraPos: [4.5, 2.5, 5.8],
  },
  {
    id: 'marker-living-pavilion',
    position: [-0.5, 1.2, 1.9],
    badge: 'Level 01',
    title: 'Double-Height Living Pavilion',
    detail: '22ft high ceilings opening directly onto the manicured garden and basalt terrace.',
    cameraTarget: [0, 1.0, 0],
    cameraPos: [3.5, 2.8, 6.2],
  },
  {
    id: 'marker-solar-canopy',
    position: [0.6, 3.6, 0.2],
    badge: 'Eco Tech',
    title: 'Integrated Solar Pergola & Roof',
    detail: 'High-efficiency monocrystalline solar matrix delivering 12kW peak clean power and rainwater capture.',
    cameraTarget: [0.6, 3.2, 0],
    cameraPos: [3.0, 6.5, 5.0],
  },
];

interface HeroVilla3DProps {
  viewMode?: 'all' | 'level1' | 'level2' | 'roof' | 'exploded';
  wireframe?: boolean;
  timeOfDay?: 'day' | 'sunset' | 'night';
  activeMarkerId?: string | null;
  onMarkerSelect?: (marker: MarkerInfo | null) => void;
}

export default function HeroVilla3D({
  viewMode = 'all',
  wireframe = false,
  timeOfDay = 'day',
  activeMarkerId = null,
  onMarkerSelect,
}: HeroVilla3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const foliageRef = useRef<THREE.Group>(null);
  const poolWaterRef = useRef<THREE.Mesh>(null);
  const level1GroupRef = useRef<THREE.Group>(null);
  const level2GroupRef = useRef<THREE.Group>(null);
  const roofGroupRef = useRef<THREE.Group>(null);

  // Smooth lerp values for exploded view animations
  const animState = useRef({
    roofOffset: 0,
    level2Offset: 0,
    deckOffset: 0,
  });

  // Calculate target vertical displacements based on view mode
  const targetOffsets = useMemo(() => {
    switch (viewMode) {
      case 'exploded':
        return { roof: 2.2, level2: 1.1, deck: 0.2 };
      case 'level1':
        return { roof: 3.0, level2: 1.8, deck: 0 };
      case 'level2':
        return { roof: 1.8, level2: 0, deck: 0 };
      case 'roof':
        return { roof: 0, level2: 0, deck: 0 };
      default:
        return { roof: 0, level2: 0, deck: 0 };
    }
  }, [viewMode]);

  // Dynamic colors based on time of day
  const colors = useMemo(() => {
    if (timeOfDay === 'night') {
      return {
        wall: '#C8C4BE',
        basalt: '#151A18',
        wood: '#3D2817',
        glass: '#0D211A',
        interiorLight: 3.2,
      };
    }
    if (timeOfDay === 'sunset') {
      return {
        wall: '#F5E3D0',
        basalt: '#282320',
        wood: '#6A4428',
        glass: '#1E2D28',
        interiorLight: 2.2,
      };
    }
    return {
      wall: '#EDE9E3',
      basalt: '#1C2120',
      wood: '#5C3D24',
      glass: '#1A2D24',
      interiorLight: 1.2,
    };
  }, [timeOfDay]);

  // Frame animation loop for organic motion & smooth floor transitions
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth spring interpolation for architectural floor separation
    const lerpSpeed = Math.min(delta * 4.5, 0.2);
    animState.current.roofOffset += (targetOffsets.roof - animState.current.roofOffset) * lerpSpeed;
    animState.current.level2Offset += (targetOffsets.level2 - animState.current.level2Offset) * lerpSpeed;
    animState.current.deckOffset += (targetOffsets.deck - animState.current.deckOffset) * lerpSpeed;

    if (roofGroupRef.current) {
      roofGroupRef.current.position.y = animState.current.roofOffset;
    }
    if (level2GroupRef.current) {
      level2GroupRef.current.position.y = animState.current.level2Offset;
    }

    // Natural breeze in trees
    if (foliageRef.current) {
      foliageRef.current.children.forEach((tree, idx) => {
        tree.rotation.z = Math.sin(t * 1.4 + idx * 1.6) * 0.025;
        tree.rotation.x = Math.cos(t * 1.1 + idx * 1.2) * 0.015;
      });
    }

    // Organic pool water shimmer
    if (poolWaterRef.current) {
      const mat = poolWaterRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.roughness = 0.08 + Math.sin(t * 2.2) * 0.03;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* ================= 1. BASE LANDSCAPE & FOUNDATION ================= */}
      <mesh receiveShadow position={[0, -0.15, 0]}>
        <boxGeometry args={[16, 0.3, 14]} />
        <meshStandardMaterial
          color="#141C16"
          roughness={0.9}
          metalness={0.1}
          wireframe={wireframe}
        />
      </mesh>

      {/* Manicured Lawn Base */}
      <mesh receiveShadow position={[0, 0.02, 0]}>
        <boxGeometry args={[13.5, 0.05, 11.5]} />
        <meshStandardMaterial
          color="#1A3320"
          roughness={0.85}
          metalness={0.05}
          wireframe={wireframe}
        />
      </mesh>

      {/* Granite Driveway & Paved Walkway */}
      <mesh receiveShadow position={[-2.8, 0.06, 2.5]}>
        <boxGeometry args={[3.2, 0.06, 5]} />
        <meshStandardMaterial
          color="#2A2F2D"
          roughness={0.7}
          metalness={0.15}
          wireframe={wireframe}
        />
      </mesh>

      {/* ================= 2. SWIMMING POOL & TEAK DECK ================= */}
      <group position={[1.8, 0.04, 2.2]}>
        {/* Pool Border / Coping */}
        <mesh receiveShadow position={[0, 0.02, 0]}>
          <boxGeometry args={[3.8, 0.08, 2.2]} />
          <meshStandardMaterial color="#333835" roughness={0.4} wireframe={wireframe} />
        </mesh>
        {/* Water Surface */}
        <mesh ref={poolWaterRef} position={[0, 0.05, 0]}>
          <boxGeometry args={[3.4, 0.02, 1.8]} />
          <meshStandardMaterial
            color="#226F68"
            roughness={0.08}
            metalness={0.85}
            transparent
            opacity={0.88}
            wireframe={wireframe}
          />
        </mesh>
        {/* Underwater Accent Glow */}
        <pointLight position={[0, 0.2, 0]} intensity={0.6} color="#5DF2D6" distance={3.8} />
      </group>

      {/* Teak Wood Pool Deck */}
      <mesh receiveShadow position={[1.8, 0.07, 0.4]}>
        <boxGeometry args={[4.2, 0.06, 1.2]} />
        <meshStandardMaterial
          color={colors.wood}
          roughness={0.65}
          metalness={0.1}
          wireframe={wireframe}
        />
      </mesh>

      {/* ================= 3. LEVEL 01 — GROUND LIVING PAVILION ================= */}
      <group ref={level1GroupRef}>
        {/* Main Ground Floor Structure */}
        <mesh castShadow receiveShadow position={[0, 1.0, -0.4]}>
          <boxGeometry args={[6.8, 1.8, 4.4]} />
          <meshStandardMaterial
            color={colors.wall}
            roughness={0.4}
            metalness={0.05}
            wireframe={wireframe}
          />
        </mesh>

        {/* Charcoal Basalt Feature Wall */}
        <mesh castShadow receiveShadow position={[-2.2, 1.0, 0.8]}>
          <boxGeometry args={[2.2, 1.8, 1.8]} />
          <meshStandardMaterial
            color={colors.basalt}
            roughness={0.75}
            metalness={0.2}
            wireframe={wireframe}
          />
        </mesh>

        {/* Floor-to-Ceiling Ground Floor Glass Facades */}
        <mesh position={[1.4, 0.95, 1.82]}>
          <boxGeometry args={[3.6, 1.5, 0.08]} />
          <meshStandardMaterial
            color={colors.glass}
            roughness={0.04}
            metalness={0.92}
            transparent
            opacity={0.65}
            wireframe={wireframe}
          />
        </mesh>

        {/* Ground Floor Interior Ambient Warmth */}
        <pointLight
          position={[1.2, 1.1, 0.5]}
          intensity={colors.interiorLight}
          color="#FFD599"
          distance={6}
        />
        <pointLight
          position={[-1.5, 1.0, 0.2]}
          intensity={colors.interiorLight * 0.75}
          color="#FFDFB0"
          distance={4.5}
        />
      </group>

      {/* ================= 4. LEVEL 02 — CANTILEVERED MASTER WING ================= */}
      <group ref={level2GroupRef}>
        {/* Upper Level Main Box */}
        <mesh castShadow receiveShadow position={[0.6, 2.45, -0.2]}>
          <boxGeometry args={[5.8, 1.4, 3.8]} />
          <meshStandardMaterial
            color={colors.wall}
            roughness={0.35}
            metalness={0.05}
            wireframe={wireframe}
          />
        </mesh>

        {/* Lower Canopy / Middle Slab */}
        <mesh castShadow receiveShadow position={[1.2, 1.85, 1.2]}>
          <boxGeometry args={[4.2, 0.15, 2.0]} />
          <meshStandardMaterial
            color="#141A17"
            roughness={0.3}
            metalness={0.5}
            wireframe={wireframe}
          />
        </mesh>

        {/* Upper Level Master Glass Windows */}
        <mesh position={[1.6, 2.45, 1.72]}>
          <boxGeometry args={[3.2, 1.1, 0.08]} />
          <meshStandardMaterial
            color={colors.glass}
            roughness={0.04}
            metalness={0.92}
            transparent
            opacity={0.65}
            wireframe={wireframe}
          />
        </mesh>

        {/* Glass Balustrade on Terrace */}
        <mesh position={[1.2, 2.15, 2.15]}>
          <boxGeometry args={[4.0, 0.45, 0.04]} />
          <meshStandardMaterial
            color="#9BB6A8"
            roughness={0.1}
            metalness={0.7}
            transparent
            opacity={0.45}
            wireframe={wireframe}
          />
        </mesh>

        {/* Level 2 Interior Light */}
        <pointLight
          position={[1.6, 2.4, 0.5]}
          intensity={colors.interiorLight}
          color="#FFD9A0"
          distance={5}
        />
      </group>

      {/* ================= 5. ROOF & SOLAR CANOPY ================= */}
      <group ref={roofGroupRef}>
        <mesh castShadow receiveShadow position={[0.6, 3.25, 0]}>
          <boxGeometry args={[6.4, 0.2, 4.4]} />
          <meshStandardMaterial
            color="#141A17"
            roughness={0.3}
            metalness={0.55}
            wireframe={wireframe}
          />
        </mesh>

        {/* Solar Cell Grid Panels on Roof */}
        <mesh position={[0.6, 3.36, 0]}>
          <boxGeometry args={[5.6, 0.02, 3.6]} />
          <meshStandardMaterial
            color="#0B1A24"
            roughness={0.15}
            metalness={0.9}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* ================= 6. LANDSCAPE FOLIAGE ================= */}
      <group ref={foliageRef}>
        {/* Tree 1 - Rear Left */}
        <group position={[-4.5, 0, -3.2]}>
          <mesh castShadow position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.14, 0.2, 2.4, 8]} />
            <meshStandardMaterial color="#332418" roughness={0.9} wireframe={wireframe} />
          </mesh>
          <mesh castShadow position={[0, 2.6, 0]}>
            <sphereGeometry args={[1.3, 14, 14]} />
            <meshStandardMaterial color="#163C25" roughness={0.8} wireframe={wireframe} />
          </mesh>
        </group>

        {/* Tree 2 - Rear Right */}
        <group position={[4.6, 0, -3.0]}>
          <mesh castShadow position={[0, 1.3, 0]}>
            <cylinderGeometry args={[0.15, 0.22, 2.6, 8]} />
            <meshStandardMaterial color="#332418" roughness={0.9} wireframe={wireframe} />
          </mesh>
          <mesh castShadow position={[0, 2.9, 0]}>
            <sphereGeometry args={[1.4, 14, 14]} />
            <meshStandardMaterial color="#1E4D30" roughness={0.8} wireframe={wireframe} />
          </mesh>
        </group>

        {/* Tree 3 - Front Left Pathway */}
        <group position={[-4.6, 0, 2.8]}>
          <mesh castShadow position={[0, 0.9, 0]}>
            <cylinderGeometry args={[0.1, 0.16, 1.8, 8]} />
            <meshStandardMaterial color="#332418" roughness={0.9} wireframe={wireframe} />
          </mesh>
          <mesh castShadow position={[0, 1.9, 0]}>
            <sphereGeometry args={[0.95, 12, 12]} />
            <meshStandardMaterial color="#143621" roughness={0.8} wireframe={wireframe} />
          </mesh>
        </group>

        {/* Low Shrubbery */}
        <mesh castShadow position={[-0.8, 0.25, 2.4]}>
          <boxGeometry args={[1.4, 0.35, 0.6]} />
          <meshStandardMaterial color="#1E442B" roughness={0.85} wireframe={wireframe} />
        </mesh>
        <mesh castShadow position={[4.1, 0.25, 1.2]}>
          <boxGeometry args={[1.0, 0.35, 1.8]} />
          <meshStandardMaterial color="#1B3F27" roughness={0.85} wireframe={wireframe} />
        </mesh>
      </group>

      {/* ================= 7. INTERACTIVE 3D HOTSPOT PINS ================= */}
      {ARCHITECTURAL_MARKERS.map((marker) => {
        const isActive = activeMarkerId === marker.id;
        return (
          <group key={marker.id} position={marker.position}>
            {/* 3D Pulsing Beacon Pin */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onMarkerSelect?.(isActive ? null : marker);
              }}
              scale={isActive ? 1.25 : 1}
            >
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={isActive ? '#DFC7A5' : '#C5A880'}
                emissive="#C5A880"
                emissiveIntensity={isActive ? 1.0 : 0.4}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Pulsing Target Ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.2, 0.26, 24]} />
              <meshBasicMaterial
                color="#C5A880"
                transparent
                opacity={isActive ? 0.9 : 0.4}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* HTML Pin Popover Tooltip */}
            <Html
              position={[0, 0.35, 0]}
              center
              distanceFactor={8.5}
              zIndexRange={[100, 0]}
              style={{
                pointerEvents: 'auto',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: isActive ? 1 : 0.88,
                transform: isActive ? 'scale(1)' : 'scale(0.92)',
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkerSelect?.(isActive ? null : marker);
                }}
                className={`cursor-pointer transition-all duration-300 select-none ${
                  isActive
                    ? 'bg-[#0E2A1E]/95 border-[#C5A880] shadow-2xl p-3 min-w-[220px]'
                    : 'bg-[#0E2A1E]/80 hover:bg-[#0E2A1E] border-white/20 px-2.5 py-1 min-w-max'
                } backdrop-blur-md border rounded-[8px] text-left text-[#FAF8F5]`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-semibold tracking-wider uppercase text-[#C5A880]">
                    {marker.badge}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                </div>
                <div className="text-[13px] font-semibold text-[#FAF8F5] leading-tight mt-0.5">
                  {marker.title}
                </div>
                {isActive && (
                  <p className="text-[11px] text-[#D2DFD2] mt-1.5 leading-relaxed border-t border-white/10 pt-1.5">
                    {marker.detail}
                  </p>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
