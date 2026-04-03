import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Trail, Environment } from '@react-three/drei';
import * as THREE from 'three';

function NeuralCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <Sphere args={[1.8, 128, 128]}>
          <MeshDistortMaterial
            color="#00D4FF"
            attach="material"
            distort={0.25}
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

function OrbitingNodes({ count = 15 }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 2.8 + Math.random() * 0.8,
      speed: 0.2 + Math.random() * 0.2,
      size: 0.06 + Math.random() * 0.06,
      yOffset: (Math.random() - 0.5) * 2,
      color: i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#7B61FF' : '#FF00FF',
    }));
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <OrbitNode key={i} {...node} />
      ))}
    </group>
  );
}

function OrbitNode({ angle, radius, speed, size, yOffset, color }: {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  yOffset: number;
  color: string;
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
    <Trail
      width={0.4}
      length={10}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
        />
      </mesh>
    </Trail>
  );
}

function GlowRings() {
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
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = Math.PI / 2;
      ring3Ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.015, 16, 100]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={2} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3, 0.01, 16, 100]} />
        <meshStandardMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={2} transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.5, 0.008, 16, 100]} />
        <meshStandardMaterial color="#FF00FF" emissive="#FF00FF" emissiveIntensity={2} transparent opacity={0.3} />
      </mesh>
    </>
  );
}

export default function AIBrain() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 7], fov: 55 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00D4FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#7B61FF" />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#FF00FF" />
        <Environment preset="night" />
        
        <NeuralCore />
        <OrbitingNodes count={18} />
        <GlowRings />
      </Canvas>
    </div>
  );
}
