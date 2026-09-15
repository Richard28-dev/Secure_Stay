import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>
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

export default function ShowcaseVilla() {
  const groupRef = useRef<THREE.Group>(null);

  const concreteMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#F5F5F0', roughness: 0.75, metalness: 0.05 }), []);
  const darkConcrete = useMemo(() => new THREE.MeshStandardMaterial({ color: '#4A4A4A', roughness: 0.6, metalness: 0.1 }), []);
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#8EC8E8', metalness: 0.1, roughness: 0.05, transmission: 0.6, transparent: true, opacity: 0.4,
  }), []);
  const woodMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#8D6E63', roughness: 0.7, metalness: 0.05 }), []);
  const poolMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#4FC3F7', roughness: 0.1, metalness: 0.3, transparent: true, opacity: 0.8,
  }), []);
  const terracottaMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#D7CCC8', roughness: 0.8 }), []);

  return (
    <group ref={groupRef} position={[0, -1, 0]} rotation={[0, -Math.PI / 5, 0]}>
      {/* ===== MAIN BUILDING — L-SHAPE ===== */}
      {/* Main block */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 1.6, 2.5]} />
        <primitive object={concreteMat} attach="material" />
      </mesh>
      {/* Side wing */}
      <mesh position={[2.2, 0.65, -1.5]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.3, 2.0]} />
        <primitive object={concreteMat} attach="material" />
      </mesh>
      {/* Upper floor / loft */}
      <mesh position={[-0.5, 1.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.9, 2.2]} />
        <primitive object={concreteMat} attach="material" />
      </mesh>

      {/* ===== ROOFS ===== */}
      <mesh position={[0, 1.62, 0]} castShadow>
        <boxGeometry args={[3.8, 0.08, 2.8]} />
        <primitive object={darkConcrete} attach="material" />
      </mesh>
      <mesh position={[-0.5, 2.33, 0]} castShadow>
        <boxGeometry args={[2.3, 0.08, 2.5]} />
        <primitive object={darkConcrete} attach="material" />
      </mesh>
      <mesh position={[2.2, 1.33, -1.5]} castShadow>
        <boxGeometry args={[1.8, 0.06, 2.3]} />
        <primitive object={darkConcrete} attach="material" />
      </mesh>

      {/* ===== LARGE WINDOWS — FRONT ===== */}
      {/* Living room — large glass wall */}
      <mesh position={[-0.5, 0.8, 1.26]} castShadow>
        <boxGeometry args={[1.8, 1.2, 0.03]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      {/* Kitchen window */}
      <mesh position={[1.2, 0.75, 1.26]} castShadow>
        <boxGeometry args={[0.8, 0.6, 0.03]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      {/* Upper floor windows */}
      <mesh position={[-0.8, 1.9, 1.11]} castShadow>
        <boxGeometry args={[0.7, 0.6, 0.03]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      <mesh position={[-0.1, 1.9, 1.11]} castShadow>
        <boxGeometry args={[0.5, 0.6, 0.03]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
      {/* Side wing windows */}
      <mesh position={[2.96, 0.7, -1.2]} castShadow>
        <boxGeometry args={[0.03, 0.8, 0.9]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* ===== DOOR ===== */}
      <mesh position={[0.6, 0.4, 1.26]}>
        <boxGeometry args={[0.5, 0.8, 0.04]} />
        <primitive object={woodMat} attach="material" />
      </mesh>

      {/* ===== TERRACE / BALCONY ===== */}
      <mesh position={[-0.5, 1.4, 1.45]} castShadow>
        <boxGeometry args={[2.2, 0.05, 0.7]} />
        <primitive object={terracottaMat} attach="material" />
      </mesh>
      {/* Railing */}
      <mesh position={[-0.5, 1.55, 1.78]}>
        <boxGeometry args={[2.2, 0.25, 0.03]} />
        <meshStandardMaterial color="#BDBDBD" metalness={0.6} roughness={0.3} transparent opacity={0.5} />
      </mesh>

      {/* ===== WOODEN DECK ===== */}
      <mesh position={[0, 0.02, 1.8]} receiveShadow>
        <boxGeometry args={[3.0, 0.04, 0.8]} />
        <primitive object={woodMat} attach="material" />
      </mesh>

      {/* ===== SWIMMING POOL ===== */}
      <mesh position={[0.3, -0.05, 2.8]} receiveShadow>
        <boxGeometry args={[2.4, 0.15, 1.2]} />
        <primitive object={poolMat} attach="material" />
      </mesh>
      <mesh position={[0.3, 0.03, 2.8]}>
        <boxGeometry args={[2.6, 0.06, 1.4]} />
        <meshStandardMaterial color="#E0E0E0" roughness={0.5} />
      </mesh>

      {/* ===== GARDEN / DRIVEWAY ===== */}
      <mesh position={[-2.5, 0.003, 2.0]} receiveShadow>
        <boxGeometry args={[1.2, 0.01, 3.0]} />
        <meshStandardMaterial color="#757575" roughness={0.9} />
      </mesh>

      {/* ===== GROUND ===== */}
      <mesh position={[0, -0.01, 1]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#6B8F5E" roughness={0.95} />
      </mesh>

      {/* ===== LANDSCAPING ===== */}
      <Tree position={[-3.2, 0, 0.5]} scale={1.3} />
      <Tree position={[-3.0, 0, 2.5]} scale={1.0} />
      <Tree position={[3.5, 0, 0]} scale={1.2} />
      <Tree position={[3.0, 0, 3.0]} scale={0.9} />
      <Tree position={[-1.5, 0, -2.0]} scale={1.1} />
      <Tree position={[1.0, 0, -2.5]} scale={1.4} />
      <Tree position={[3.5, 0, -2.0]} scale={1.0} />

      {/* Garden lights */}
      {[[-1.5, 0, 2.0], [1.5, 0, 2.0], [-2.5, 0, 1.0], [2.5, 0, 1.0]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
            <meshStandardMaterial color="#37474F" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.55, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#FFF9C4" emissive="#FFF176" emissiveIntensity={0.6} />
          </mesh>
          <pointLight position={[0, 0.55, 0]} intensity={0.2} distance={2} color="#FFF176" />
        </group>
      ))}
    </group>
  );
}
