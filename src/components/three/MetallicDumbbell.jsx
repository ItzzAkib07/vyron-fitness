import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export function MetallicDumbbell({ mousePos = { x: 0, y: 0 } }) {
  const groupRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.4;
      innerRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
    if (groupRef.current) {
      // Gentle mouse tracking parallax
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePos.x * 0.5,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mousePos.y * 0.4,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={innerRef} scale={[1.1, 1.1, 1.1]}>
          {/* Central Handle with knurled metallic grip */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.18, 2.4, 32]} />
            <meshStandardMaterial
              color="#2A2A2A"
              metalness={0.95}
              roughness={0.25}
              clearcoat={0.6}
            />
          </mesh>

          {/* Knurling Accent Rings on Handle */}
          <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.2, 0.03, 16, 32]} />
            <meshStandardMaterial color="#E2FF00" emissive="#E2FF00" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.2, 0.03, 16, 32]} />
            <meshStandardMaterial color="#E2FF00" emissive="#E2FF00" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Left Weight Plates Stack */}
          <group position={[-1.3, 0, 0]}>
            {/* Outer Heavy Plate */}
            <mesh position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.9, 0.9, 0.35, 12]} />
              <meshStandardMaterial color="#141414" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Inner Plate */}
            <mesh position={[-0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.78, 0.78, 0.25, 12]} />
              <meshStandardMaterial color="#222222" metalness={0.85} roughness={0.3} />
            </mesh>
            {/* Neon Ring Inset */}
            <mesh position={[-0.53, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <ringGeometry args={[0.4, 0.65, 32]} />
              <meshBasicMaterial color="#E2FF00" side={THREE.DoubleSide} />
            </mesh>
            {/* Collar Nut */}
            <mesh position={[-0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.28, 0.28, 0.15, 6]} />
              <meshStandardMaterial color="#E2FF00" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>

          {/* Right Weight Plates Stack */}
          <group position={[1.3, 0, 0]}>
            {/* Outer Heavy Plate */}
            <mesh position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.9, 0.9, 0.35, 12]} />
              <meshStandardMaterial color="#141414" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Inner Plate */}
            <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.78, 0.78, 0.25, 12]} />
              <meshStandardMaterial color="#222222" metalness={0.85} roughness={0.3} />
            </mesh>
            {/* Neon Ring Inset */}
            <mesh position={[0.53, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <ringGeometry args={[0.4, 0.65, 32]} />
              <meshBasicMaterial color="#E2FF00" side={THREE.DoubleSide} />
            </mesh>
            {/* Collar Nut */}
            <mesh position={[0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.28, 0.28, 0.15, 6]} />
              <meshStandardMaterial color="#E2FF00" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>

          {/* Glowing Orbital Gyro Rings */}
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[1.7, 0.015, 16, 64]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[-Math.PI / 3, -Math.PI / 4, 0]}>
            <torusGeometry args={[1.9, 0.012, 16, 64]} />
            <meshBasicMaterial color="#E2FF00" transparent opacity={0.5} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
