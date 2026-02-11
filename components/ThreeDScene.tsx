
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Cylinder, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

// A simple humanoid figure component
const Human = ({ color, ...props }: any) => {
  return (
    <group {...props}>
      {/* Head */}
      <Sphere args={[0.25, 32, 32]} position={[0, 1.6, 0]}>
        <meshStandardMaterial color="#ffdec7" />
      </Sphere>
      {/* Body */}
      <Cylinder args={[0.15, 0.2, 0.7, 32]} position={[0, 1.0, 0]}>
        <meshStandardMaterial color={color} />
      </Cylinder>
      {/* Legs (simplified as one block or two) */}
      <Cylinder args={[0.08, 0.08, 0.7, 32]} position={[-0.1, 0.35, 0]} rotation={[0, 0, 0.05]}>
        <meshStandardMaterial color="#333" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.7, 32]} position={[0.1, 0.35, 0]} rotation={[0, 0, -0.05]}>
        <meshStandardMaterial color="#333" />
      </Cylinder>
      {/* Arms (outstretched to hold hands) */}
      <Cylinder args={[0.05, 0.05, 0.5, 32]} position={[0.25, 1.2, 0.15]} rotation={[0, 0, -1]}>
        <meshStandardMaterial color={color} />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.5, 32]} position={[-0.25, 1.2, 0.15]} rotation={[0, 0, 1]}>
        <meshStandardMaterial color={color} />
      </Cylinder>
    </group>
  );
};

// Female figure with dress
const Female = ({ color, ...props }: any) => {
  return (
    <group {...props}>
      {/* Head */}
      <Sphere args={[0.23, 32, 32]} position={[0, 1.55, 0]}>
        <meshStandardMaterial color="#ffdec7" />
      </Sphere>
      {/* Body/Dress Top */}
      <Cylinder args={[0.15, 0.2, 0.5, 32]} position={[0, 1.1, 0]}>
        <meshStandardMaterial color={color} />
      </Cylinder>
      {/* Dress Skirt */}
      <Cylinder args={[0.2, 0.6, 0.8, 32]} position={[0, 0.45, 0]}>
        <meshStandardMaterial color={color} />
      </Cylinder>
      {/* Arms */}
      <Cylinder args={[0.045, 0.045, 0.45, 32]} position={[0.22, 1.2, 0.15]} rotation={[0, 0, -1]}>
        <meshStandardMaterial color="#ffdec7" />
      </Cylinder>
      <Cylinder args={[0.045, 0.045, 0.45, 32]} position={[-0.22, 1.2, 0.15]} rotation={[0, 0, 1]}>
        <meshStandardMaterial color="#ffdec7" />
      </Cylinder>
    </group>
  );
};

const DancingCouple = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation animation (waltz)
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5 + state.clock.elapsedTime * 0.2;

      // Bobbing animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 - 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Boy */}
      <Human color="#4f46e5" position={[-0.4, 0, 0]} rotation={[0, 0.5, 0]} />

      {/* Girl */}
      <Female color="#ec4899" position={[0.4, 0, 0]} rotation={[0, -0.5, 0]} />
    </group>
  );
};

export const ThreeDScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 1, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
        <Environment preset="sunset" />

        <DancingCouple />

        <ContactShadows resolution={1024} scale={10} blur={1} opacity={0.5} far={1} color="#333" />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
};
