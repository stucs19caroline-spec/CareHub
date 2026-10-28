import React from 'react';
import { BodySystemPetal, MedicationItem } from '../types';
import { PetalWheel } from './PetalWheel';
import { ProgressBar } from './ProgressBar';
import { soundFx } from '../utils/audio';
import { 
  Sparkles, 
  Check, 
  Clock, 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Wind,
  Coffee
} from 'lucide-react';

interface HomeScreenProps {
  petals: BodySystemPetal[];
  meds: MedicationItem[];
  onUpdatePetal: (id: BodySystemPetal['id'], newScore: number, newValue: string) => void;
  onToggleMed: (id: string) => void;
  onNavigate: (tab: 'home' | 'symptoms' | 'cabinet' | 'trends' | 'breathe') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  petals,
  meds,
  onUpdatePetal,
  onToggleMed,
  onNavigate,
}) => {
  // Compute progress based on meds taken and petal checks
  const medsDone = meds.filter(m => m.taken).length;
  const medsTotal = meds.length;
  const progressPercent = Math.round((medsDone / (medsTotal || 1)) * 100);

  return (
    <div className="w-full space-y-5 pb-24">
      {/* Daily Affirmation Pillow Card */}
      <div className="bg-gradient-to-br from-[#fff1f2] via-white to-[#f4fbf9] rounded-[2rem] p-5 shadow-cloud-pillow border border-[rgba(244,114,182,0.18)] relative overflow-hidden">
        {/* Soft chromatic background blur */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#f472b6]/15 rounded-full filter blur-xl pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#f472b6] animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#a43073]">
            Daily Healing Sanctuary
          </span>
        </div>

        <h2 className="text-lg font-extrabold text-[#1a1b22] leading-snug">
          "Your body is a blooming ecosystem. Rest is an active medicine."
        </h2>
        <p className="text-xs text-[#71717a] mt-1.5 leading-relaxed">
          Day 4 of your recovery arc. All 6 physiological petals are responding harmoniously to gentle pacing.
        </p>

        {/* Quick action buttons row */}
        <div className="flex items-center gap-2 mt-3.5">
          <button
            onClick={() => onNavigate('symptoms')}
            className="flex-1 py-2 px-3 rounded-full bg-white border border-[#fce7f3] text-xs font-bold text-[#a43073] hover:bg-[#fff1f2] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Log Sensation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('breathe')}
            className="flex-1 py-2 px-3 rounded-full bg-[#ccfbf1] text-xs font-bold text-[#0d9488] hover:bg-[#99f6e4] transition-colors flex items-center justify-center gap-1.5"
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Petal Breath</span>
          </button>
        </div>
      </div>

      {/* Domain-Specific Centerpiece: Daily Mood & Symptom Petal Wheel */}
      <div className="bg-white rounded-[2rem] p-5 shadow-cloud-pillow border border-[rgba(244,114,182,0.14)]">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h3 className="text-sm font-extrabold text-[#1a1b22]">
              Body Harmony Petal Bloom
            </h3>
            <p className="text-[11px] text-[#71717a]">
              Interactive cluster representing your 6 vital body systems
            </p>
          </div>
          <span className="text-xs font-bold text-[#0d9488] bg-[#ccfbf1] px-2.5 py-0.5 rounded-full">
            Optimal
          </span>
        </div>

        {/* The 6-Petal SVG Interactive Wheel */}
        <PetalWheel petals={petals} onUpdatePetal={onUpdatePetal} />
      </div>

      {/* Whimsical Progress Bar & Petal Gauges */}
      <div className="bg-white rounded-[2rem] p-5 shadow-cloud-pillow border border-[rgba(244,114,182,0.12)]">
        <ProgressBar
          progress={progressPercent}
          label="Today's Care Rituals"
          sublabel={`${medsDone} of ${medsTotal} rituals bloomed`}
        />
      </div>

      {/* Today's Care Regimen & Meds Checklist */}
      <div className="bg-white rounded-[2rem] p-5 shadow-cloud-pillow border border-[rgba(244,114,182,0.12)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-extrabold text-[#1a1b22]">
              Today's Gentle Regimen
            </h3>
            <span className="text-[11px] font-semibold text-[#87717a]">
              ({medsDone}/{medsTotal} completed)
            </span>
          </div>
          <button
            onClick={() => onNavigate('cabinet')}
            className="text-xs font-bold text-[#a43073] hover:underline flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          {meds.slice(0, 3).map((med) => (
            <div
              key={med.id}
              onClick={() => {
                soundFx.playPetalChime(560);
                onToggleMed(med.id);
              }}
              className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                med.taken
                  ? 'bg-[#f4fbf9] border-[#2dd4bf]/30'
                  : 'bg-[#fafafa] border-[#fce7f3] hover:border-[#f472b6]/40'
              }`}
            >
              {/* Squircle Checkbox conforming to design spec */}
              <div
                className={`w-6 h-6 rounded-[0.5rem] flex items-center justify-center transition-all shrink-0 border ${
                  med.taken
                    ? 'bg-[#2dd4bf] border-[#2dd4bf] text-white shadow-teal-soft'
                    : 'bg-white border-[#fce7f3] text-transparent'
                }`}
              >
                <Check className={`w-3.5 h-3.5 stroke-[3] ${med.taken ? 'scale-100' : 'scale-0'}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs font-bold truncate ${med.taken ? 'line-through text-[#87717a]' : 'text-[#1a1b22]'}`}>
                    {med.name}
                  </h4>
                  <span className="text-[10px] font-semibold text-[#a43073] shrink-0">
                    {med.timing}
                  </span>
                </div>
                <p className="text-[11px] text-[#71717a] truncate mt-0.5">
                  {med.dosage} · {med.instructions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button (FAB) for Instant Triage */}
      <div className="pt-1">
        <button
          onClick={() => onNavigate('symptoms')}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#f472b6] to-[#fb7185] text-white font-bold text-sm tracking-wide shadow-petal-soft hover:shadow-petal-active transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          Begin Daily Body Symptom Check-In
        </button>
      </div>
    </div>
  );
};
