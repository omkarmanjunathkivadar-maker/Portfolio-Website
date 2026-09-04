import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Octahedron, Torus, Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 400;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function CoreGeometry({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const icoRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mouse = mouseRef.current ?? { x: 0, y: 0 };

    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.15 + mouse.y * 0.3;
      icoRef.current.rotation.y = t * 0.1 + mouse.x * 0.3;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.2;
      torusRef.current.rotation.y = t * 0.15;
      torusRef.current.position.x = Math.sin(t * 0.5) * 2.5;
      torusRef.current.position.y = Math.cos(t * 0.5) * 2.5;
    }
    if (octaRef.current) {
      octaRef.current.rotation.x = -t * 0.12;
      octaRef.current.rotation.z = t * 0.08;
      octaRef.current.position.x = Math.cos(t * 0.3) * 2.5;
      octaRef.current.position.y = Math.sin(t * 0.3) * 2.5;
    }
  });

  return (
    <>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <Icosahedron ref={icoRef} args={[1.6, 1]}>
          <meshStandardMaterial
            color="#8b5cf6"
            wireframe
            emissive="#4c1d95"
            emissiveIntensity={0.3}
          />
        </Icosahedron>
      </Float>

      <Float speed={0.8} rotationIntensity={0.5} floatIntensity={0.8}>
        <Torus ref={torusRef} args={[0.4, 0.12, 16, 32]}>
          <meshStandardMaterial
            color="#a78bfa"
            wireframe
            emissive="#7c3aed"
            emissiveIntensity={0.2}
          />
        </Torus>
      </Float>

      <Float speed={1.0} rotationIntensity={0.4} floatIntensity={0.6}>
        <Octahedron ref={octaRef} args={[0.5, 0]}>
          <meshStandardMaterial
            color="#3b82f6"
            wireframe
            emissive="#1e40af"
            emissiveIntensity={0.2}
          />
        </Octahedron>
      </Float>
    </>
  );
}

function Scene({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#8b5cf6" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#3b82f6" />
      <pointLight position={[0, 0, -5]} intensity={0.3} color="#06b6d4" />

      <Suspense fallback={null}>
        <CoreGeometry mouseRef={mouseRef} />
        <ParticleField />
      </Suspense>
    </>
  );
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

export default function HeroScene({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  if (!isWebGLAvailable()) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene mouseRef={mouseRef} />
    </Canvas>
  );
}
