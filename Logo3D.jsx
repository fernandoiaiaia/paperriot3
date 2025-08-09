import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Logo3D({ texturePath = "/Logo-png.webp" }) {
  const meshRef = useRef();
  const texture = new THREE.TextureLoader().load(texturePath);

  useEffect(() => {
    texture.anisotropy = 16;
    const interval = setInterval(() => {
      if (meshRef.current) meshRef.current.rotation.y += 0.005;
    }, 16);
    return () => clearInterval(interval);
  }, [texture]);

  return (
    <mesh ref={meshRef} scale={[3, 3, 3]}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial map={texture} metalness={0.8} roughness={0.2} transparent />
    </mesh>
  );
}