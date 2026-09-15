import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>
      {/* Foliage layers */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <sphereGeometry args={[0.4, 12, 10]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.45, 0]} castShadow>
        <sphereGeometry args={[0.3, 10, 8]} />
        <meshStandardMaterial color="#388E3C" roughness={0.85} />
      </mesh>
    </group>
  );
}

function Bush({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.15, 8, 6]} />
      <meshStandardMaterial color="#43A047" roughness={0.9} />
    </mesh>
  );
}

function GardenLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
        <meshStandardMaterial color="#37474F" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#FFF9C4" emissive="#FFF176" emissiveIntensity={0.8} />
      </mesh>
      <pointLight position={[0, 0.55, 0]} intensity={0.3} distance={2} color="#FFF176" />
    </group>
  );
}

export default function HeroVilla() {
  const groupRef = useRef<THREE.Group>(null);
  const idleTimer = useRef(0);

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#8EC8E8',
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.6,
        transparent: true,
        opacity: 0.4,
        ior: 1.5,
      }),
    []
  );

  const concreteMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F5F5F0',
        roughness: 0.75,
        metalness: 0.05,
      }),
    []
  );

  const darkConcrete = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4A4A4A',
        roughness: 0.6,
        metalness: 0.1,
      }),
    []
  );

  const woodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#8D6E63',
        roughness: 0.7,
        metalness: 0.05,
      }),
    []
  );

  const poolMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4FC3F7',
        roughness: 0.1,
        metalness: 0.3,
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    idleTimer.current += delta;
    // Gentle idle sway
    groupRef.current.rotation.y += Math.sin(idleTimer.current * 0.3) * 0.0003;
  });

  return (
    <group ref={groupRef} position={[0, -0.8, 0]} rotation={[0, -Math.PI / 6, 0]}>
      {/* ===== MAIN BUILDING ===== */}
      {/* Left Wing */}
      <mesh position={[-1.2, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.3, 2.2]} />
        <primitive object={concreteMat} attach="material" />
      </mesh>
      {/* Right Wing (taller) */}
      <mesh position={[1.0, 0.85, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 1.7, 2.6]} />
        <primitive object={concreteMat} attach="material" />
      </mesh>
      {/* Connector */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 1.0, 1.8]} />
        <primitive object={concreteMat} attach="material" />
      </mesh>

      {/* ===== ROOF SLABS ===== */}
      <mesh position={[-1.2, 1.35, 0]} castShadow>
        <boxGeometry args={[2.7, 0.08, 2.5]} />
        <primitive object={darkConcrete} attach="material" />
      </mesh>
      <mesh position={[1.0, 1.75, -0.2]} castShadow>
        <boxGeometry args={[2.3, 0.08, 2.9]} />
        <primitive object={darkConcrete} attach="material" />
      </mesh>

      {/* ===== WINDOWS — LEFT WING ===== */}
      {/* Front windows */}
      <mesh position={[-1.8, 0.7, 1.11]} castShadow>
        <boxGeometry args={[0.7, 0.8, 0.03]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      <mesh position={[-0.8, 0.7, 1.11]} castShadow>
        <boxGeometry args={[0.7, 0.8, 0.03]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      {/* Window frames */}
      <mesh position={[-1.8, 0.7, 1.12]}>
        <boxGeometry args={[0.74, 0.04, 0.01]} />
        <primitive object={darkConcrete} attach="material" />
      </mesh>
      <mesh position={[-0.8, 0.7, 1.12]}>
        <boxGeometry args={[0.74, 0.04, 0.01]} />
        <primitive object={darkConcrete} attach="material" />
      </mesh>

      {/* ===== WINDOWS — RIGHT WING ===== */}
      <mesh position={[0.5, 0.9, 1.11]} castShadow>
        <boxGeometry args={[0.9, 1.2, 0.03]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      <mesh position={[1.5, 0.9, 1.11]} castShadow>
        <boxGeometry args={[0.5, 1.2, 0.03]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      {/* Side window */}
      <mesh position={[2.01, 0.9, -0.2]} castShadow>
        <boxGeometry args={[0.03, 1.0, 1.2]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* ===== ENTRANCE ===== */}
      {/* Door */}
      <mesh position={[-0.15, 0.4, 1.11]}>
        <boxGeometry args={[0.45, 0.8, 0.04]} />
        <primitive object={woodMat} attach="material" />
      </mesh>
      {/* Door frame */}
      <mesh position={[-0.15, 0.82, 1.12]}>
        <boxGeometry args={[0.55, 0.04, 0.02]} />
        <primitive object={darkConcrete} attach="material" />
      </mesh>
      {/* Entry path */}
      <mesh position={[-0.15, 0.005, 1.6]} receiveShadow>
        <boxGeometry args={[0.6, 0.01, 1.0]} />
        <meshStandardMaterial color="#9E9E9E" roughness={0.8} />
      </mesh>

      {/* ===== WOODEN DECK ===== */}
      <mesh position={[-1.2, 0.02, 1.6]} receiveShadow>
        <boxGeometry args={[1.8, 0.04, 0.8]} />
        <primitive object={woodMat} attach="material" />
      </mesh>

      {/* ===== SWIMMING POOL ===== */}
      <mesh position={[1.3, -0.05, 1.8]} receiveShadow>
        <boxGeometry args={[1.6, 0.15, 0.9]} />
        <primitive object={poolMat} attach="material" />
      </mesh>
      {/* Pool edge */}
      <mesh position={[1.3, 0.03, 1.8]}>
        <boxGeometry args={[1.8, 0.06, 1.1]} />
        <meshStandardMaterial color="#E0E0E0" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[1.3, -0.02, 1.8]}>
        <boxGeometry args={[1.6, 0.08, 0.9]} />
        <primitive object={poolMat} attach="material" />
      </mesh>

      {/* ===== DRIVEWAY ===== */}
      <mesh position={[-0.5, 0.003, 2.8]} receiveShadow rotation={[0, 0, 0]}>
        <boxGeometry args={[2.0, 0.01, 1.6]} />
        <meshStandardMaterial color="#757575" roughness={0.9} />
      </mesh>

      {/* ===== GROUND PLANE ===== */}
      <mesh position={[0, -0.01, 0.5]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#6B8F5E" roughness={0.95} />
      </mesh>

      {/* ===== LANDSCAPING ===== */}
      <Tree position={[-3.0, 0, 0.5]} scale={1.2} />
      <Tree position={[-2.6, 0, 2.0]} scale={0.9} />
      <Tree position={[2.8, 0, -0.5]} scale={1.1} />
      <Tree position={[2.5, 0, 2.5]} scale={0.8} />
      <Tree position={[-1.5, 0, -1.5]} scale={1.0} />
      <Tree position={[0.5, 0, -1.8]} scale={1.3} />

      <Bush position={[-2.4, 0.1, 1.1]} />
      <Bush position={[-1.8, 0.1, 1.5]} />
      <Bush position={[2.2, 0.1, 1.1]} />
      <Bush position={[0.3, 0.1, 1.5]} />
      <Bush position={[-0.8, 0.1, 1.5]} />

      {/* ===== GARDEN LIGHTS ===== */}
      <GardenLight position={[-0.6, 0, 1.5]} />
      <GardenLight position={[0.3, 0, 2.0]} />
      <GardenLight position={[-2.0, 0, 1.8]} />
      <GardenLight position={[2.3, 0, 1.5]} />
    </group>
  );
}
