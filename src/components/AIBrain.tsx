import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../hooks/useIsMobile';

function NeuralCore({ lite = false }: { lite?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const seg = lite ? 24 : 64;

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <Sphere args={[lite ? 1.4 : 1.8, seg, seg]}>
          <MeshDistortMaterial
            color="#00D4FF"
            attach="material"
            distort={lite ? 0.15 : 0.25}
            speed={1.5}
            roughness={0.05}
            metalness={0.95}
            emissive="#7B61FF"
            emissiveIntensity={0.15}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

function OrbitingNodes({ count = 15, lite = false }: { count?: number; lite?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const actualCount = lite ? Math.min(count, 8) : count;
  
  const nodes = useMemo(() => {
    return Array.from({ length: actualCount }, (_, i) => ({
      angle: (i / actualCount) * Math.PI * 2,
      radius: 2.8 + Math.random() * 0.8,
      speed: 0.2 + Math.random() * 0.2,
      size: 0.06 + Math.random() * 0.06,
      yOffset: (Math.random() - 0.5) * 2,
      color: i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#7B61FF' : '#FF00FF',
    }));
  }, [actualCount]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        lite ? <SimpleDot key={i} {...node} /> : <OrbitNode key={i} {...node} />
      ))}
    </group>
  );
}

function SimpleDot({ angle, radius, speed, size, yOffset, color }: {
  angle: number; radius: number; speed: number; size: number; yOffset: number; color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + angle;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = yOffset + Math.sin(t * 2) * 0.3;
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
    </mesh>
  );
}

function OrbitNode({ angle, radius, speed, size, yOffset, color }: {
  angle: number; radius: number; speed: number; size: number; yOffset: number; color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + angle;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = yOffset + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <Trail width={0.4} length={10} color={color} attenuation={(t) => t * t}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
      </mesh>
    </Trail>
  );
}

function GlowRings({ lite = false }: { lite?: boolean }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -Math.PI / 4 + Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.15;
    }
    if (!lite && ring3Ref.current) {
      ring3Ref.current.rotation.x = Math.PI / 2;
      ring3Ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  const seg = lite ? 32 : 64;

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.015, 8, seg]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={2} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3, 0.01, 8, seg]} />
        <meshStandardMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={2} transparent opacity={0.4} />
      </mesh>
      {!lite && (
        <mesh ref={ring3Ref}>
          <torusGeometry args={[3.5, 0.008, 8, 64]} />
          <meshStandardMaterial color="#FF00FF" emissive="#FF00FF" emissiveIntensity={2} transparent opacity={0.3} />
        </mesh>
      )}
    </>
  );
}

export default function AIBrain() {
  const isMobile = useIsMobile();
  const lite = isMobile;

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={lite ? [1, 1] : [1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00D4FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#7B61FF" />
        {!lite && <pointLight position={[0, 5, 0]} intensity={0.3} color="#FF00FF" />}
        
        
        <NeuralCore lite={lite} />
        <OrbitingNodes count={lite ? 5 : 12} lite={lite} />
        <GlowRings lite={lite} />
      </Canvas>
    </div>
  );
}
