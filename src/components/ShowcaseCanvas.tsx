import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../hooks/useIsMobile';

function RotatingRobot({ lite = false }: { lite?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  const seg = lite ? 6 : 12;
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        <mesh position={[0, 1.2, 0]}><boxGeometry args={[0.8, 0.6, 0.6]} /><meshStandardMaterial color="#0a0a0c" metalness={0.95} roughness={0.05} /></mesh>
        <mesh position={[-0.2, 1.25, 0.31]}><sphereGeometry args={[0.1, seg, seg]} /><meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={3} /></mesh>
        <mesh position={[0.2, 1.25, 0.31]}><sphereGeometry args={[0.1, seg, seg]} /><meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={3} /></mesh>
        <mesh position={[0, 0.3, 0]}><boxGeometry args={[1, 1.2, 0.6]} /><meshStandardMaterial color="#0a0a0c" metalness={0.95} roughness={0.05} /></mesh>
        <mesh position={[0, 0.4, 0.31]}><MeshDistortMaterial color="#7B61FF" distort={lite ? 0.2 : 0.4} speed={3} emissive="#7B61FF" emissiveIntensity={1} /><sphereGeometry args={[0.18, seg, seg]} /></mesh>
      </group>
    </Float>
  );
}

function NeuralSphere({ lite = false }: { lite?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  const seg = lite ? 12 : 24;
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, seg, seg]} />
        <MeshDistortMaterial color="#00D4FF" distort={lite ? 0.15 : 0.3} speed={2} roughness={0.1} metalness={0.9} emissive="#7B61FF" emissiveIntensity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 6, lite ? 24 : 48]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={2} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

function CircuitBoard({ lite = false }: { lite?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const traceCount = lite ? 5 : 10;
  const traces = useMemo(() => 
    Array.from({ length: traceCount }).map(() => ({
      pos: [(Math.random() - 0.5) * 2.5, 0.06, (Math.random() - 0.5) * 2] as [number, number, number],
      width: Math.random() * 0.6 + 0.1,
    })), [traceCount]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={meshRef}>
        <mesh><boxGeometry args={[3, 0.1, 2.5]} /><meshStandardMaterial color="#0a1a0a" metalness={0.3} roughness={0.6} /></mesh>
        {traces.map((t, i) => (
          <mesh key={i} position={t.pos}>
            <boxGeometry args={[t.width, 0.01, 0.015]} />
            <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1} metalness={1} roughness={0} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

const components = [RotatingRobot, NeuralSphere, CircuitBoard];

export default function ShowcaseCanvas({ activeIndex }: { activeIndex: number }) {
  const isMobile = useIsMobile();
  const ActiveComponent = components[activeIndex];
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={isMobile ? [1, 1] : [1, 2]}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00D4FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7B61FF" />
      
      <ActiveComponent lite={isMobile} />
    </Canvas>
  );
}
