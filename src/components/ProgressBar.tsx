import React from 'react';
import { Sparkles, Star } from 'lucide-react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  sublabel?: string;
  showMilestones?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label = "Daily Recovery Rhythm",
  sublabel = "4 of 5 care rituals bloomed",
  showMilestones = true,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const milestones = [25, 50, 75, 100];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-[#544249] tracking-tight flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#f472b6] animate-pulse"></span>
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-[#0d9488] tabular-nums bg-[#ccfbf1] px-2 py-0.5 rounded-full">
            {clampedProgress}%
          </span>
          {sublabel && (
            <span className="text-[11px] text-[#71717a] hidden sm:inline">
              · {sublabel}
            </span>
          )}
        </div>
      </div>

      {/* Track & Fill */}
      <div className="relative w-full h-3.5 bg-[#fce7f3] rounded-full p-[2px] shadow-inner overflow-visible">
        {/* Fill bar */}
        <div
          className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-[#f472b6] via-[#fb7185] to-[#2dd4bf] relative shadow-petal-soft"
          style={{ width: `${clampedProgress}%` }}
        >
          {/* Glowing cap */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md animate-pulse"></div>
        </div>

        {/* Floating milestone markers */}
        {showMilestones && (
          <div className="absolute inset-0 pointer-events-none flex items-center">
            {milestones.map((m) => {
              const isUnlocked = clampedProgress >= m;
              return (
                <div
                  key={m}
                  className="absolute -top-1.5 -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${m}%` }}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isUnlocked
                        ? 'bg-[#fef08a] text-[#b45309] shadow-sm scale-110'
                        : 'bg-white/80 border border-[#fce7f3] text-[#a1a1aa] scale-90'
                    }`}
                  >
                    {m === 100 ? (
                      <Star className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b]" />
                    ) : (
                      <Sparkles className="w-2.5 h-2.5" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-2 px-1 text-[11px] text-[#87717a] font-medium">
        <span>Rest</span>
        <span>Hydrate</span>
        <span>Nourish</span>
        <span>Full Bloom</span>
      </div>
    </div>
  );
};
