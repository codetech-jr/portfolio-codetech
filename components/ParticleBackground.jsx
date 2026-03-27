"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ParticleNetwork = () => {
  const particleCount = 100;
  const maxDistance = 3.5;
  const pointColor = new THREE.Color("#00C6FF");

  // References for standard Three.js objects
  const pointsRef = useRef();
  const linesRef = useRef();

  // Initialize random positions and velocities
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = [];
    for (let i = 0; i < particleCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 30;     
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20; 
        pos[i * 3 + 2] = (Math.random() - 0.5) * 10; 

        vel.push(
            new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            )
        );
    }
    return [pos, vel];
  }, []);

  const linePositions = useMemo(() => new Float32Array(particleCount * particleCount * 3), []);
  const lineColors = useMemo(() => new Float32Array(particleCount * particleCount * 4), []);

  const { state } = useThree();
  const mousePos = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame((state) => {
    // 1. Mouse movement mapping
    const mx = (state.mouse.x * state.viewport.width) / 2;
    const my = (state.mouse.y * state.viewport.height) / 2;
    
    mousePos.current.x += (mx - mousePos.current.x) * 0.1;
    mousePos.current.y += (my - mousePos.current.y) * 0.1;

    // 2. Points update
    const ptsArray = pointsRef.current.geometry.attributes.position.array;
    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    for (let i = 0; i < particleCount; i++) {
      let x = ptsArray[i * 3];
      let y = ptsArray[i * 3 + 1];
      let z = ptsArray[i * 3 + 2];
      const v = velocities[i];

      // Bounce limits
      if (Math.abs(x) > 15) v.x *= -1;
      if (Math.abs(y) > 10) v.y *= -1;
      if (Math.abs(z) > 5) v.z *= -1;

      // Mouse repulsion/attraction
      const dxMouse = mousePos.current.x - x;
      const dyMouse = mousePos.current.y - y;
      const distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
      
      if (distMouse < 4) {
          x += dxMouse * 0.005;
          y += dyMouse * 0.005;
      }

      ptsArray[i * 3] = x + v.x;
      ptsArray[i * 3 + 1] = y + v.y;
      ptsArray[i * 3 + 2] = z + v.z;

      // 3. Lines connecting
      for (let j = i + 1; j < particleCount; j++) {
          const dx = ptsArray[i * 3] - ptsArray[j * 3];
          const dy = ptsArray[i * 3 + 1] - ptsArray[j * 3 + 1];
          const dz = ptsArray[i * 3 + 2] - ptsArray[j * 3 + 2];
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          
          if (dist < maxDistance) {
              const alpha = 1.0 - (dist / maxDistance);
              
              linePositions[vertexpos++] = ptsArray[i * 3];
              linePositions[vertexpos++] = ptsArray[i * 3 + 1];
              linePositions[vertexpos++] = ptsArray[i * 3 + 2];

              linePositions[vertexpos++] = ptsArray[j * 3];
              linePositions[vertexpos++] = ptsArray[j * 3 + 1];
              linePositions[vertexpos++] = ptsArray[j * 3 + 2];

              // Color for start point
              lineColors[colorpos++] = pointColor.r;
              lineColors[colorpos++] = pointColor.g;
              lineColors[colorpos++] = pointColor.b;
              lineColors[colorpos++] = alpha * 0.5;

              // Color for end point
              lineColors[colorpos++] = pointColor.r;
              lineColors[colorpos++] = pointColor.g;
              lineColors[colorpos++] = pointColor.b;
              lineColors[colorpos++] = alpha * 0.5;

              numConnected++;
          }
      }
    }
    
    // Flag geometries for update
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    linesRef.current.geometry.setDrawRange(0, numConnected * 2);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <>
      {/* Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.08} color={pointColor} transparent opacity={0.6} sizeAttenuation />
      </points>

      {/* Network Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 4}
            array={lineColors}
            itemSize={4}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </>
  );
};

export default function ParticleBackground() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" style={{ mixBlendMode: 'screen' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0C0C2C] z-10" />
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]}>
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
