import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import {
  RotateCw,
  Sun,
  Sunset,
  Moon,
  Layers,
  Maximize2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Sliders,
  Play,
  Pause,
} from 'lucide-react';
import HeroVilla3D, { ARCHITECTURAL_MARKERS, type MarkerInfo } from '../3d/HeroVilla3D';

// Safe Error Boundary for WebGL
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Smooth Camera Controller that interpolates camera position & target during transitions
function SmoothCameraController({
  targetPos,
  lookTarget,
  controlsRef,
}: {
  targetPos: [number, number, number];
  lookTarget: [number, number, number];
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { camera } = useThree();
  const desiredPos = useMemoVector3(targetPos);
  const desiredTarget = useMemoVector3(lookTarget);

  useFrame((_, delta) => {
    const lerpFactor = Math.min(delta * 3.5, 0.15);
    camera.position.lerp(desiredPos, lerpFactor);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(desiredTarget, lerpFactor);
      controlsRef.current.update();
    }
  });

  return null;
}

function useMemoVector3(coords: [number, number, number]) {
  return React.useMemo(() => new THREE.Vector3(coords[0], coords[1], coords[2]), [coords[0], coords[1], coords[2]]);
}

export default function Architectural3DShowcase() {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // 3D Animation & View States
  const [viewMode, setViewMode] = useState<'all' | 'level1' | 'level2' | 'roof' | 'exploded'>('all');
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeMarker, setActiveMarker] = useState<MarkerInfo | null>(null);

  // Camera Target preset coordinates
  const cameraSettings = React.useMemo(() => {
    if (activeMarker) {
      return {
        pos: activeMarker.cameraPos,
        target: activeMarker.cameraTarget,
      };
    }
    switch (viewMode) {
      case 'exploded':
        return { pos: [8.5, 6.2, 9.2] as [number, number, number], target: [0, 1.8, 0] as [number, number, number] };
      case 'level1':
        return { pos: [4.8, 2.6, 6.2] as [number, number, number], target: [0, 0.8, 0] as [number, number, number] };
      case 'level2':
        return { pos: [4.5, 4.0, 5.5] as [number, number, number], target: [0.6, 2.2, 0] as [number, number, number] };
      case 'roof':
        return { pos: [3.0, 7.5, 5.0] as [number, number, number], target: [0.6, 2.5, 0] as [number, number, number] };
      default:
        return { pos: [6.8, 4.2, 7.8] as [number, number, number], target: [0, 1.0, 0] as [number, number, number] };
    }
  }, [viewMode, activeMarker]);

  const handleSelectViewMode = (mode: 'all' | 'level1' | 'level2' | 'roof' | 'exploded') => {
    setActiveMarker(null);
    setViewMode(mode);
  };

  const handleResetCamera = () => {
    setActiveMarker(null);
    setViewMode('all');
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const fallback = (
    <div className="w-full h-full min-h-[440px] bg-[#0E2A1E] flex flex-col items-center justify-center text-[#FAF8F5] p-6 text-center">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
        alt="Architectural Villa"
        className="w-full max-w-md h-56 object-cover rounded-[6px] mb-4 border border-white/10"
      />
      <p className="text-[14px] font-semibold">3D Architectural Model View</p>
    </div>
  );

  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] text-[12px] font-bold uppercase tracking-wider mb-2.5">
              <Sparkles size={14} className="text-[#0E2A1E]" />
              <span>Real-Time 3D Architectural Visualization</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1C1A] font-heading tracking-tight">
              Interactive Architectural Model
            </h2>
            <p className="text-[15px] text-[#5A605B] mt-2 max-w-2xl font-normal">
              Explore spatial engineering, exploded floor separation, solar orientation, and day-to-dusk illumination.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 bg-white border border-[#E5E0D8] px-4 py-2.5 rounded-[8px] shadow-xs">
            <div>
              <p className="text-[11px] font-semibold text-[#5A605B] uppercase tracking-wider">Gross Area</p>
              <p className="text-[15px] font-bold text-[#0E2A1E] font-heading">3,850 sq.ft</p>
            </div>
            <div className="w-[1px] h-7 bg-[#E5E0D8]" />
            <div>
              <p className="text-[11px] font-semibold text-[#5A605B] uppercase tracking-wider">Ceiling</p>
              <p className="text-[15px] font-bold text-[#0E2A1E] font-heading">22 ft Clear</p>
            </div>
            <div className="w-[1px] h-7 bg-[#E5E0D8]" />
            <div>
              <p className="text-[11px] font-semibold text-[#5A605B] uppercase tracking-wider">Solar Yield</p>
              <p className="text-[15px] font-bold text-[#0E2A1E] font-heading">12 kW Matrix</p>
            </div>
          </div>
        </div>

        {/* 3D Showcase Card Frame */}
        <div className="bg-white border border-[#E5E0D8] rounded-[8px] overflow-hidden shadow-sm">
          {/* Top Control Bar with Animated Floor Tabs */}
          <div className="p-3.5 sm:p-4 bg-[#F3EFEA] border-b border-[#E5E0D8] flex flex-wrap items-center justify-between gap-3">
            {/* Floor Separation Modes */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#5A605B] mr-1 hidden sm:inline-block">
                View:
              </span>
              {[
                { id: 'all', label: 'Exterior Perspective' },
                { id: 'exploded', label: 'Exploded Layers' },
                { id: 'level1', label: 'Level 01 Living' },
                { id: 'level2', label: 'Level 02 Master' },
                { id: 'roof', label: 'Rooftop & Solar' },
              ].map((tab) => {
                const isActive = viewMode === tab.id && !activeMarker;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSelectViewMode(tab.id as any)}
                    className={`relative px-3.5 py-1.5 rounded-[6px] text-[12.5px] font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0E2A1E] text-[#FAF8F5] font-semibold shadow-xs'
                        : 'bg-white text-[#1A1C1A] hover:bg-[#E8EFE8] border border-[#E5E0D8]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Time of Day & Wireframe Controls */}
            <div className="flex items-center gap-2">
              {/* Lighting Switch */}
              <div className="bg-white p-1 rounded-[6px] border border-[#E5E0D8] flex items-center gap-1">
                <button
                  onClick={() => setTimeOfDay('day')}
                  className={`p-1.5 rounded-[4px] text-[12px] transition-colors cursor-pointer ${
                    timeOfDay === 'day' ? 'bg-[#E8EFE8] text-[#0E2A1E]' : 'text-[#5A605B] hover:text-[#1A1C1A]'
                  }`}
                  title="Daylight (Noon)"
                >
                  <Sun size={15} />
                </button>
                <button
                  onClick={() => setTimeOfDay('sunset')}
                  className={`p-1.5 rounded-[4px] text-[12px] transition-colors cursor-pointer ${
                    timeOfDay === 'sunset' ? 'bg-[#E8EFE8] text-[#0E2A1E]' : 'text-[#5A605B] hover:text-[#1A1C1A]'
                  }`}
                  title="Sunset (Golden Hour)"
                >
                  <Sunset size={15} />
                </button>
                <button
                  onClick={() => setTimeOfDay('night')}
                  className={`p-1.5 rounded-[4px] text-[12px] transition-colors cursor-pointer ${
                    timeOfDay === 'night' ? 'bg-[#E8EFE8] text-[#0E2A1E]' : 'text-[#5A605B] hover:text-[#1A1C1A]'
                  }`}
                  title="Twilight & Night"
                >
                  <Moon size={15} />
                </button>
              </div>

              {/* Wireframe Mode Toggle */}
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`px-3 py-1.5 rounded-[6px] text-[12px] font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  wireframe
                    ? 'bg-[#0E2A1E] text-[#FAF8F5] border-[#0E2A1E]'
                    : 'bg-white text-[#1A1C1A] border-[#E5E0D8] hover:bg-[#E8EFE8]'
                }`}
                title="Toggle Architectural Wireframe"
              >
                <Layers size={14} />
                <span className="hidden sm:inline">Blueprint</span>
              </button>

              {/* Auto Rotate Play/Pause */}
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-2 rounded-[6px] text-[12px] border transition-colors cursor-pointer ${
                  autoRotate
                    ? 'bg-white text-[#0E2A1E] border-[#E5E0D8]'
                    : 'bg-[#E8EFE8] text-[#0E2A1E] border-[#0E2A1E]/30'
                }`}
                title={autoRotate ? 'Pause Rotation' : 'Resume Rotation'}
              >
                {autoRotate ? <Pause size={14} /> : <Play size={14} />}
              </button>

              {/* Reset Camera */}
              <button
                onClick={handleResetCamera}
                className="p-2 rounded-[6px] bg-white text-[#1A1C1A] border border-[#E5E0D8] hover:bg-[#E8EFE8] transition-colors cursor-pointer"
                title="Reset Camera View"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>

          {/* Main 3D Canvas Viewport */}
          <div className="relative h-[440px] sm:h-[500px] lg:h-[560px] bg-[#071710] overflow-hidden">
            <CanvasErrorBoundary fallback={fallback}>
              <Suspense fallback={fallback}>
                <Canvas
                  shadows
                  camera={{ position: [6.8, 4.2, 7.8], fov: 36 }}
                  dpr={[1, 1.5]}
                  gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
                >
                  <color
                    attach="background"
                    args={[
                      timeOfDay === 'day'
                        ? '#0A1E15'
                        : timeOfDay === 'sunset'
                        ? '#1A1215'
                        : '#040C08',
                    ]}
                  />
                  <fog
                    attach="fog"
                    args={[
                      timeOfDay === 'day'
                        ? '#0A1E15'
                        : timeOfDay === 'sunset'
                        ? '#1A1215'
                        : '#040C08',
                      10,
                      26,
                    ]}
                  />

                  {/* Dynamic Studio Lighting based on Time of Day */}
                  <ambientLight
                    intensity={timeOfDay === 'day' ? 0.75 : timeOfDay === 'sunset' ? 0.5 : 0.25}
                  />
                  <directionalLight
                    position={
                      timeOfDay === 'day'
                        ? [10, 14, 8]
                        : timeOfDay === 'sunset'
                        ? [12, 6, 6]
                        : [6, 10, 6]
                    }
                    intensity={timeOfDay === 'day' ? 1.5 : timeOfDay === 'sunset' ? 1.2 : 0.4}
                    color={
                      timeOfDay === 'day'
                        ? '#FFFFFF'
                        : timeOfDay === 'sunset'
                        ? '#FFA86A'
                        : '#7EB19A'
                    }
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                    shadow-camera-left={-8}
                    shadow-camera-right={8}
                    shadow-camera-top={8}
                    shadow-camera-bottom={-8}
                    shadow-bias={-0.0001}
                  />
                  <directionalLight
                    position={[-8, 6, -6]}
                    intensity={0.35}
                    color={timeOfDay === 'sunset' ? '#804A6A' : '#C5A880'}
                  />

                  {/* Interpolated Camera Glide */}
                  <SmoothCameraController
                    targetPos={cameraSettings.pos}
                    lookTarget={cameraSettings.target}
                    controlsRef={controlsRef}
                  />

                  {/* 3D Villa Geometry with Animated Displacements */}
                  <HeroVilla3D
                    viewMode={viewMode}
                    wireframe={wireframe}
                    timeOfDay={timeOfDay}
                    activeMarkerId={activeMarker?.id || null}
                    onMarkerSelect={(m) => setActiveMarker(m)}
                  />

                  {/* Bounded Orbit Controls */}
                  <OrbitControls
                    ref={controlsRef}
                    enableZoom={true}
                    enablePan={false}
                    minDistance={5}
                    maxDistance={15}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2.15}
                    autoRotate={autoRotate}
                    autoRotateSpeed={0.35}
                    dampingFactor={0.06}
                  />
                </Canvas>
              </Suspense>
            </CanvasErrorBoundary>

            {/* Hint Overlay Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 z-10 pointer-events-none">
              <span className="px-3 py-1.5 rounded-[4px] bg-[#0E2A1E]/90 backdrop-blur-sm text-[#FAF8F5] text-[11px] font-medium border border-white/10 flex items-center gap-1.5 shadow-md">
                <RotateCw size={12} className="animate-spin text-[#C5A880]" style={{ animationDuration: '8s' }} />
                <span>Drag to Rotate · Scroll to Zoom · Click Pins to Inspect</span>
              </span>
            </div>

            {/* Quick Hotspot Focus Bar on Bottom Left */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-10 flex flex-wrap items-center gap-2">
              {ARCHITECTURAL_MARKERS.map((m) => {
                const isSelected = activeMarker?.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveMarker(isSelected ? null : m)}
                    className={`px-3 py-1.5 rounded-[4px] text-[11.5px] font-medium backdrop-blur-md border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#C5A880] text-[#071710] border-[#C5A880] font-bold shadow-md'
                        : 'bg-[#0E2A1E]/80 hover:bg-[#0E2A1E] text-[#FAF8F5] border-white/15'
                    }`}
                  >
                    <span>{m.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Specifications Bar */}
          <div className="p-6 sm:p-8 bg-white border-t border-[#E5E0D8]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[6px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#1A1C1A]">Reinforced Cantilever Engineering</h4>
                  <p className="text-[12.5px] text-[#5A605B] mt-0.5 leading-relaxed">
                    Post-tensioned concrete slabs allowing 4-meter column-free upper floor overhangs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[6px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#1A1C1A]">Thermal Acoustic Barrier</h4>
                  <p className="text-[12.5px] text-[#5A605B] mt-0.5 leading-relaxed">
                    Double-glazed low-emissivity glass cutting solar heat gain by 42% and noise by 38dB.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[6px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center shrink-0">
                  <Sliders size={18} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#1A1C1A]">Integrated Smart Climate</h4>
                  <p className="text-[12.5px] text-[#5A605B] mt-0.5 leading-relaxed">
                    Zone-based VRF cooling paired with automated louvers for natural cross-breeze airflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
