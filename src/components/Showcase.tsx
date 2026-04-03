import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function RotatingRobot() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[0.8, 0.6, 0.6]} />
          <meshStandardMaterial color="#0a0a0c" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[-0.2, 1.25, 0.31]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={3} />
        </mesh>
        <mesh position={[0.2, 1.25, 0.31]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={3} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1, 1.2, 0.6]} />
          <meshStandardMaterial color="#0a0a0c" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[0, 0.4, 0.31]}>
          <MeshDistortMaterial
            color="#7B61FF"
            distort={0.4}
            speed={3}
            emissive="#7B61FF"
            emissiveIntensity={1}
          />
          <sphereGeometry args={[0.18, 32, 32]} />
        </mesh>
        <mesh position={[-0.7, 0.4, 0]}>
          <capsuleGeometry args={[0.1, 0.8, 16, 32]} />
          <meshStandardMaterial color="#1a1a20" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.7, 0.4, 0]}>
          <capsuleGeometry args={[0.1, 0.8, 16, 32]} />
          <meshStandardMaterial color="#1a1a20" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.25, -0.7, 0]}>
          <capsuleGeometry args={[0.12, 0.6, 16, 32]} />
          <meshStandardMaterial color="#1a1a20" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.25, -0.7, 0]}>
          <capsuleGeometry args={[0.12, 0.6, 16, 32]} />
          <meshStandardMaterial color="#1a1a20" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

function NeuralSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#00D4FF"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive="#7B61FF"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={2} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 100]} />
        <meshStandardMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={2} transparent opacity={0.4} />
      </mesh>
    </Float>
  );
}

function CircuitBoard() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={meshRef}>
        <mesh>
          <boxGeometry args={[3, 0.1, 2.5]} />
          <meshStandardMaterial color="#0a1a0a" metalness={0.3} roughness={0.6} />
        </mesh>
        {[[-0.8, 0.1, -0.6], [0.8, 0.1, 0.6], [-0.4, 0.1, 0.7], [0.5, 0.1, -0.7], [0, 0.1, 0]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <boxGeometry args={[0.5, 0.15, 0.4]} />
            <meshStandardMaterial 
              color="#0a0a0c" 
              metalness={0.95} 
              roughness={0.05}
              emissive={i % 2 === 0 ? "#00D4FF" : "#7B61FF"}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={i} position={[(Math.random() - 0.5) * 2.5, 0.06, (Math.random() - 0.5) * 2]}>
            <boxGeometry args={[Math.random() * 0.6 + 0.1, 0.01, 0.015]} />
            <meshStandardMaterial 
              color="#00D4FF" 
              emissive="#00D4FF" 
              emissiveIntensity={1}
              metalness={1}
              roughness={0}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

const showcaseItems = [
  {
    id: 1,
    title: 'Educational Robot',
    description: 'Our flagship AI-powered robot designed for K-12 education with adaptive learning capabilities.',
    component: RotatingRobot,
  },
  {
    id: 2,
    title: 'Neural Processing',
    description: 'Advanced neural network visualization for understanding AI concepts in real-time.',
    component: NeuralSphere,
  },
  {
    id: 3,
    title: 'Smart Circuit Lab',
    description: 'Interactive circuit board platform for electronics and engineering courses.',
    component: CircuitBoard,
  },
];

export default function Showcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const ActiveComponent = showcaseItems[activeIndex].component;

  return (
    <section id="showcase" className="relative py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-deep-space" />
      
      {/* Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-electric-blue/5 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-label text-magenta-glow mb-6 block">
            Interactive Experience
          </span>
          <h2 className="text-section text-5xl md:text-6xl lg:text-7xl mb-8">
            <span className="text-white block">Experience</span>
            <span className="text-elegant text-4xl md:text-5xl gradient-text-premium block mt-2">Innovation</span>
          </h2>
        </motion.div>

        {/* 3D Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="glass-card-premium rounded-[2rem] overflow-hidden">
            <div className="grid lg:grid-cols-5 min-h-[600px]">
              {/* 3D Canvas */}
              <div className="lg:col-span-3 relative bg-gradient-to-br from-deep-space to-obsidian">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-electric-blue/20 rounded-full blur-[100px]" />
                
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.2} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#00D4FF" />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7B61FF" />
                  <pointLight position={[0, 5, 0]} intensity={0.3} color="#FF00FF" />
                  <Environment preset="night" />
                  <ActiveComponent />
                </Canvas>
              </div>
              
              {/* Info Panel */}
              <div className="lg:col-span-2 p-10 flex flex-col justify-center bg-gradient-to-br from-obsidian to-deep-space">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-label text-electric-blue mb-6 block">
                      {String(activeIndex + 1).padStart(2, '0')} / {String(showcaseItems.length).padStart(2, '0')}
                    </span>
                    <h3 className="text-section text-3xl md:text-4xl text-white mb-6">
                      {showcaseItems[activeIndex].title}
                    </h3>
                    <p className="font-body text-lg text-titanium leading-relaxed mb-10">
                      {showcaseItems[activeIndex].description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-4 mb-10">
                      {['Real-time Interaction', 'AI-Powered Learning', 'Adaptive Curriculum'].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                          <span className="font-body text-titanium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation */}
                <div className="flex items-center gap-4">
                  {showcaseItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`relative h-1 rounded-full transition-all duration-500 ${
                        i === activeIndex 
                          ? 'w-12 bg-gradient-to-r from-electric-blue to-neon-purple' 
                          : 'w-6 bg-white/10 hover:bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
