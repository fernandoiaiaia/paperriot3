import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function MusicPlayer({ audioUrl, onClose }) {
  const waveformRef = useRef();
  const wavesurferRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ff0000",
      progressColor: "#ffffff",
      barWidth: 2,
      height: 120,
      responsive: true
    });
    wavesurferRef.current.load(audioUrl);
    return () => wavesurferRef.current.destroy();
  }, [audioUrl]);

  const togglePlay = () => {
    wavesurferRef.current.playPause();
    setIsPlaying(wavesurferRef.current.isPlaying());
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-6">
      <button onClick={onClose} className="absolute top-6 right-6 text-white text-2xl hover:text-red-500">✕</button>
      <div ref={waveformRef} className="w-full max-w-4xl mb-8"></div>
      <button onClick={togglePlay} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white uppercase font-bold tracking-wider">
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}