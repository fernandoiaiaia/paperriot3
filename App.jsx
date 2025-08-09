import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import GlitchText from "@components/GlitchText";
import Logo3D from "@components/Logo3D";
import MusicPlayer from "@components/MusicPlayer";

export default function App() {
  const [showPlayer, setShowPlayer] = useState(false);
  const heroRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    gsap.from(heroRef.current, { opacity: 0, duration: 1.5, ease: "power3.out" });
    gsap.from(buttonRef.current, { y: 40, opacity: 0, duration: 1, ease: "power3.out", delay: 0.9 });
  }, []);

  return (
    <>
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/video/background-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} className="absolute inset-0">
          <ambientLight intensity={0.3} />
          <spotLight position={[5, 5, 5]} angle={0.3} penumbra={0.5} intensity={1} color={"#ff0000"} />
          <Logo3D texturePath="/Logo-png.webp" />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
        <div className="absolute inset-0 flex flex-col items-start justify-center px-12 md:px-24 z-10">
          <GlitchText text="PAPER RIOT" />
          <button
            ref={buttonRef}
            onClick={() => setShowPlayer(true)}
            className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-lg font-bold uppercase tracking-widest transition-all"
          >
            Ouvir Agora
          </button>
        </div>
      </section>
      {showPlayer && (
        <MusicPlayer audioUrl="/audio/demo.mp3" onClose={() => setShowPlayer(false)} />
      )}
    </>
  );
}