import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';
import { Play, Pause, RotateCcw, Heart, Sparkles, Wind } from 'lucide-react';

export const BreathworkScreen: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [countdown, setCountdown] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  // 4-4-6 Gentle botanical calming cadence
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (phase === 'inhale') {
              soundFx.playPetalChime(580);
              setPhase('hold');
              return 4;
            } else if (phase === 'hold') {
              soundFx.playPetalChime(440);
              setPhase('exhale');
              return 6;
            } else {
              soundFx.playPetalChime(528);
              setPhase('inhale');
              setCyclesCompleted((c) => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase]);

  const toggleExercise = () => {
    if (!isActive) {
      soundFx.playPetalChime(528);
    }
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setCountdown(4);
  };

  return (
    <div className="w-full space-y-5 pb-24 flex flex-col items-center">
      {/* Header Info */}
      <div className="w-full bg-white rounded-[2rem] p-5 shadow-cloud-pillow border border-[rgba(244,114,182,0.14)] text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold mb-2">
          <Wind className="w-3.5 h-3.5" />
          Vagus Nerve & Autonomic Ease
        </div>
        <h2 className="text-xl font-extrabold text-[#1a1b22] tracking-tight">
          Botanical Petal Breathing
        </h2>
        <p className="text-xs text-[#71717a] mt-1 max-w-sm mx-auto leading-relaxed">
          Gently synchronizes your autonomic nervous system, reducing physiological tension and clinical apprehension.
        </p>
      </div>

      {/* Animated Blooming Petal Flower Visualizer */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-4 select-none">
        {/* Ambient background bloom aura */}
        <div
          className="absolute inset-4 rounded-full filter blur-3xl opacity-50 transition-all duration-1000 pointer-events-none"
          style={{
            background:
              phase === 'inhale'
                ? 'radial-gradient(circle, rgba(45,212,191,0.5) 0%, rgba(204,251,241,0.3) 70%)'
                : phase === 'hold'
                ? 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, rgba(254,240,138,0.3) 70%)'
                : 'radial-gradient(circle, rgba(244,114,182,0.45) 0%, rgba(255,241,242,0.3) 70%)'
          }}
        />

        {/* Petal Cluster SVG with responsive scale */}
        <svg
          viewBox="-160 -160 320 320"
          className="w-full h-full transform transition-all duration-1000 ease-in-out overflow-visible"
          style={{
            transform:
              !isActive
                ? 'scale(0.85)'
                : phase === 'inhale'
                ? 'scale(1.15) rotate(15deg)'
                : phase === 'hold'
                ? 'scale(1.2) rotate(15deg)'
                : 'scale(0.8) rotate(0deg)'
          }}
        >
          <defs>
            <linearGradient id="breath-teal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
            <linearGradient id="breath-amber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="breath-pink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>

          {/* 8 Radial Blooming Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <path
              key={i}
              d="M 0,-25 C 28,-40 40,-85 0,-125 C -40,-85 -28,-40 0,-25 Z"
              transform={`rotate(${angle})`}
              fill={
                phase === 'inhale'
                  ? 'url(#breath-teal)'
                  : phase === 'hold'
                  ? 'url(#breath-amber)'
                  : 'url(#breath-pink)'
              }
              opacity={0.88}
              stroke="#ffffff"
              strokeWidth="2"
              className="transition-all duration-1000"
            />
          ))}

          {/* Center Cloud Sphere */}
          <circle
            cx="0"
            cy="0"
            r="48"
            fill="#ffffff"
            stroke="rgba(244, 114, 182, 0.25)"
            strokeWidth="3"
            className="filter drop-shadow-md"
          />
          <text
            x="0"
            y="-4"
            textAnchor="middle"
            fill={
              phase === 'inhale'
                ? '#0d9488'
                : phase === 'hold'
                ? '#b45309'
                : '#a43073'
            }
            fontSize="26"
            fontWeight="800"
            fontFamily="Plus Jakarta Sans"
            className="tabular-nums"
          >
            {isActive ? countdown : '🌸'}
          </text>
          <text
            x="0"
            y="18"
            textAnchor="middle"
            fill="#71717a"
            fontSize="10"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans"
            letterSpacing="0.08em"
            className="uppercase"
          >
            {!isActive
              ? 'READY'
              : phase === 'inhale'
              ? 'INPIRATION'
              : phase === 'hold'
              ? 'HOLD GENTLE'
              : 'RELEASE'}
          </text>
        </svg>

        {/* Phase Pill Instruction Badge */}
        <div className="absolute -bottom-3 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#fce7f3] shadow-md flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full animate-pulse ${
              phase === 'inhale'
                ? 'bg-[#2dd4bf]'
                : phase === 'hold'
                ? 'bg-[#f59e0b]'
                : 'bg-[#f472b6]'
            }`}
          ></span>
          <span className="text-xs font-bold text-[#1a1b22]">
            {!isActive
              ? 'Tap Start to begin calming cadence'
              : phase === 'inhale'
              ? 'Petals Bloom · Breathe in fresh vitality'
              : phase === 'hold'
              ? 'Gentle Pause · Soak in comfort'
              : 'Soft Release · Let all worry melt away'}
          </span>
        </div>
      </div>

      {/* Control Buttons (Conforms to Design Spec Buttons) */}
      <div className="flex items-center gap-3 w-full max-w-xs mt-2">
        <button
          onClick={toggleExercise}
          className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#f472b6] to-[#fb7185] text-white font-bold text-xs tracking-wide shadow-petal-soft hover:shadow-petal-active transition-all active:scale-[0.97] flex items-center justify-center gap-2 cursor-pointer"
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4 fill-white" />
              Pause Rhythm
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              Start Calming Session
            </>
          )}
        </button>

        <button
          onClick={resetExercise}
          className="w-11 h-11 rounded-full bg-white border border-[#fce7f3] text-[#71717a] hover:bg-[#fff1f2] hover:text-[#a43073] flex items-center justify-center transition-colors shadow-sm"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Stats pillow card */}
      <div className="w-full bg-white rounded-[2rem] p-4 shadow-cloud-pillow border border-[rgba(244,114,182,0.12)] flex items-center justify-around text-center">
        <div>
          <span className="text-[11px] text-[#71717a] block font-medium">Blooms Completed</span>
          <span className="text-lg font-extrabold text-[#0d9488]">{cyclesCompleted}</span>
        </div>
        <div className="w-[1px] h-8 bg-[#fce7f3]"></div>
        <div>
          <span className="text-[11px] text-[#71717a] block font-medium">Cadence Pattern</span>
          <span className="text-sm font-bold text-[#a43073]">4s · 4s · 6s</span>
        </div>
        <div className="w-[1px] h-8 bg-[#fce7f3]"></div>
        <div>
          <span className="text-[11px] text-[#71717a] block font-medium">Target Tone</span>
          <span className="text-sm font-bold text-[#f59e0b]">Parasympathetic</span>
        </div>
      </div>
    </div>
  );
};
