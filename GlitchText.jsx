import React, { useEffect, useRef } from "react";

export default function GlitchText({ text }) {
  const textRef = useRef();

  useEffect(() => {
    const el = textRef.current;
    const glitch = () => {
      el.classList.add("glitch");
      setTimeout(() => el.classList.remove("glitch"), 150);
    };
    const id = setInterval(glitch, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <h1
      ref={textRef}
      className="text-[clamp(2rem,8vw,6rem)] font-black uppercase leading-none relative glitch-text"
    >
      {text}
    </h1>
  );
}