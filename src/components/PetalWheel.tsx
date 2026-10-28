import React, { useState } from 'react';
import { BodySystemPetal } from '../types';
import { soundFx } from '../utils/audio';
import { 
  Moon, 
  Droplet, 
  Zap, 
  Smile, 
  ShieldCheck, 
  Wind, 
  ChevronRight, 
  Check, 
  Sparkles,
  X
} from 'lucide-react';

interface PetalWheelProps {
  petals: BodySystemPetal[];
  onUpdatePetal: (id: BodySystemPetal['id'], newScore: number, newValue: string) => void;
}

export const PetalWheel: React.FC<PetalWheelProps> = ({ petals, onUpdatePetal }) => {
  const [selectedPetalId, setSelectedPetalId] = useState<BodySystemPetal['id'] | null>(null);

  const selectedPetal = petals.find(p => p.id === selectedPetalId) || null;

  // Calculate overall bloom score
  const averageScore = Math.round(
    petals.reduce((sum, p) => sum + p.score, 0) / petals.length
  );

  const getIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case 'moon': return <Moon className={className} />;
      case 'droplet': return <Droplet className={className} />;
      case 'zap': return <Zap className={className} />;
      case 'smile': return <Smile className={className} />;
      case 'comfort': return <ShieldCheck className={className} />;
      case 'wind': return <Wind className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const handlePetalClick = (petal: BodySystemPetal) => {
    soundFx.playPetalChime(480 + petal.score * 2);
    setSelectedPetalId(petal.id);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Visual Organic Petal Flower Wheel Container */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-2 select-none">
        {/* Soft pastel ambient background aura */}
        <div 
          className="absolute inset-4 rounded-full filter blur-2xl opacity-40 transition-all duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(244,114,182,0.45) 0%, rgba(45,212,191,0.3) 60%, rgba(254,240,138,0.2) 100%)'
          }}
        />

        {/* Petals SVG Cluster */}
        <svg 
          viewBox="-160 -160 320 320" 
          className="w-full h-full transform transition-transform duration-500 overflow-visible"
        >
          <defs>
            {/* Gradients for Petals */}
            <linearGradient id="petal-teal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="petal-pink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="petal-amber-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.95" />
            </linearGradient>

            {/* Filter for gentle bloom shadow */}
            <filter id="petal-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#f472b6" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Render 6 Petals */}
          {petals.map((petal, index) => {
            const angle = index * 60; // 0, 60, 120, 180, 240, 300 degrees
            const isSelected = selectedPetalId === petal.id;
            
            // Determine gradient fill based on score & system
            const isHigh = petal.score >= 75;
            const isMedium = petal.score >= 50 && petal.score < 75;
            const fillGrad = isHigh 
              ? 'url(#petal-teal-gradient)' 
              : isMedium 
                ? 'url(#petal-pink-gradient)' 
                : 'url(#petal-amber-gradient)';

            return (
              <g 
                key={petal.id}
                transform={`rotate(${angle})`}
                onClick={() => handlePetalClick(petal)}
                className="cursor-pointer group focus:outline-none"
                role="button"
                tabIndex={0}
                aria-label={`${petal.label}: ${petal.score}%`}
              >
                {/* Petal Geometry: Organic teardrop curved path */}
                <path
                  d="M 0,-32 C 34,-50 48,-95 0,-140 C -48,-95 -34,-50 0,-32 Z"
                  fill={fillGrad}
                  stroke={isSelected ? "#ffffff" : "rgba(255,255,255,0.7)"}
                  strokeWidth={isSelected ? "3" : "1.5"}
                  className="transition-all duration-300 ease-out"
                  filter="url(#petal-glow)"
                  style={{
                    transform: isSelected 
                      ? 'scale(1.1) translateY(-8px)' 
                      : 'scale(1)',
                    transformOrigin: '0 0',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                />

                {/* Score pip on petal tip */}
                <circle
                  cx="0"
                  cy="-124"
                  r={isSelected ? "6" : "4.5"}
                  fill="#ffffff"
                  className="transition-all duration-300"
                />

                {/* Inner petal score label on rotation */}
                <text
                  x="0"
                  y="-90"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="Plus Jakarta Sans"
                  transform={`rotate(${-angle}, 0, -90)`}
                  className="pointer-events-none drop-shadow-sm"
                >
                  {petal.score}%
                </text>
              </g>
            );
          })}

          {/* Central Cloud Disc Core */}
          <g className="cursor-pointer" onClick={() => setSelectedPetalId(null)}>
            <circle
              cx="0"
              cy="0"
              r="44"
              fill="#ffffff"
              stroke="rgba(244, 114, 182, 0.25)"
              strokeWidth="2"
              className="shadow-cloud-pillow filter drop-shadow-md"
            />
            {/* Inner accent ring */}
            <circle
              cx="0"
              cy="0"
              r="38"
              fill="#fff1f2"
              className="opacity-70"
            />
            {/* Center score & label */}
            <text
              x="0"
              y="-2"
              textAnchor="middle"
              fill="#a43073"
              fontSize="22"
              fontWeight="800"
              fontFamily="Plus Jakarta Sans"
              className="select-none tracking-tight"
            >
              {averageScore}%
            </text>
            <text
              x="0"
              y="16"
              textAnchor="middle"
              fill="#71717a"
              fontSize="9"
              fontWeight="600"
              letterSpacing="0.05em"
              fontFamily="Plus Jakarta Sans"
              className="select-none uppercase"
            >
              Harmonized
            </text>
          </g>
        </svg>

        {/* Small floating hint badges around wheel */}
        <div className="absolute -bottom-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#fce7f3] shadow-sm flex items-center gap-1.5 text-xs text-[#544249]">
          <span className="w-2 h-2 rounded-full bg-[#2dd4bf]"></span>
          <span>Tap any petal to update health metrics</span>
        </div>
      </div>

      {/* Petal Quick Category Chips Grid */}
      <div className="grid grid-cols-3 gap-2 w-full mt-3 px-1">
        {petals.map((petal) => {
          const isSelected = selectedPetalId === petal.id;
          return (
            <button
              key={petal.id}
              onClick={() => handlePetalClick(petal)}
              className={`flex items-center gap-2 p-2 rounded-2xl transition-all duration-200 text-left border ${
                isSelected
                  ? 'bg-[#fff1f2] border-[#f472b6] shadow-petal-soft scale-[1.02]'
                  : 'bg-white border-[#fce7f3]/80 hover:bg-[#fafafa]'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: petal.lightColor, color: petal.color }}
              >
                {getIcon(petal.iconName, "w-4 h-4")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-[#1a1b22] truncate">
                  {petal.label}
                </div>
                <div className="text-[10px] text-[#71717a] font-medium flex items-center justify-between">
                  <span>{petal.value}</span>
                  <span className="font-bold text-[#a43073]">{petal.score}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Micro-Survey Modal / Drawer when a petal is selected */}
      {selectedPetal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-black/25 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-[2.5rem] sm:rounded-[2rem] p-6 shadow-2xl border border-[#fce7f3] relative overflow-hidden">
            {/* Top decorative rosy glow wash */}
            <div 
              className="absolute -top-16 -right-16 w-44 h-44 rounded-full opacity-30 filter blur-xl pointer-events-none"
              style={{ backgroundColor: selectedPetal.color }}
            />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#fce7f3]/60">
              <div className="flex items-center gap-3">
                <div 
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: selectedPetal.lightColor, color: selectedPetal.color }}
                >
                  {getIcon(selectedPetal.iconName, "w-6 h-6")}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#1a1b22] flex items-center gap-2">
                    {selectedPetal.label} Check-In
                  </h3>
                  <p className="text-xs text-[#71717a]">
                    Domain: <span className="font-semibold text-[#544249]">{selectedPetal.detail}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPetalId(null)}
                className="w-8 h-8 rounded-full bg-[#f4f2fd] hover:bg-[#e3e1ec] text-[#544249] flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body Metric Adjuster */}
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between bg-[#fff1f2] p-3.5 rounded-2xl border border-[#fce7f3]">
                <div>
                  <span className="text-xs font-semibold text-[#87717a] block">Current Status</span>
                  <span className="text-base font-bold text-[#a43073]">
                    {selectedPetal.value} {selectedPetal.unit}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-[#87717a] block">System Bloom</span>
                  <span className="text-lg font-extrabold text-[#0d9488] bg-[#ccfbf1] px-2.5 py-0.5 rounded-full inline-block">
                    {selectedPetal.score}%
                  </span>
                </div>
              </div>

              {/* Slider for smooth organic score tuning */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#544249] mb-1.5">
                  <span>Care Level</span>
                  <span>{selectedPetal.score < 40 ? 'Depleted' : selectedPetal.score < 75 ? 'Nurturing' : 'Flourishing'}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={selectedPetal.score}
                  onChange={(e) => {
                    const newScore = parseInt(e.target.value, 10);
                    let displayVal = `${Math.round(newScore / 10)}`;
                    if (selectedPetal.id === 'sleep') displayVal = `${(newScore / 12).toFixed(1)}`;
                    if (selectedPetal.id === 'hydration') displayVal = `${(newScore / 40).toFixed(1)}`;
                    onUpdatePetal(selectedPetal.id, newScore, displayVal);
                  }}
                  className="w-full h-2.5 bg-[#fce7f3] rounded-lg appearance-none cursor-pointer accent-[#f472b6]"
                />
                <div className="flex justify-between text-[10px] text-[#87717a] mt-1 font-medium">
                  <span>Needs TLC</span>
                  <span>Balanced</span>
                  <span>Vibrant</span>
                </div>
              </div>

              {/* Quick preset options for tactile mobile tapping */}
              <div>
                <label className="text-xs font-bold text-[#544249] block mb-2">
                  Quick Log Presets
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Gentle TLC', score: 45, val: 'Low' },
                    { label: 'Steady & Calm', score: 75, val: 'Normal' },
                    { label: 'Deep Radiance', score: 95, val: 'Full' }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        soundFx.playPetalChime(580);
                        onUpdatePetal(selectedPetal.id, preset.score, preset.val);
                      }}
                      className="py-2 px-1 text-center bg-[#fafafa] hover:bg-[#fff1f2] border border-[#fce7f3] rounded-xl text-xs font-semibold text-[#1a1b22] transition-colors"
                    >
                      <span className="block text-[11px] text-[#a43073]">{preset.label}</span>
                      <span className="text-[10px] text-[#71717a] font-normal">{preset.score}%</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer action button: Rosy Pill Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  soundFx.playCompletionSingingBowl();
                  setSelectedPetalId(null);
                }}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#f472b6] to-[#fb7185] text-white font-bold text-sm tracking-wide shadow-petal-soft hover:shadow-petal-active transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                Confirm & Bloom Petal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
