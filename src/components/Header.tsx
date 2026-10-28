import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Bell } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  patientName?: string;
  dayCount?: number;
  streakDays?: number;
}

export const Header: React.FC<HeaderProps> = ({
  patientName = "Lily",
  dayCount = 4,
  streakDays = 7,
}) => {
  const [soundOn, setSoundOn] = useState(soundFx.soundEnabled);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const toggleSound = () => {
    soundFx.soundEnabled = !soundFx.soundEnabled;
    setSoundOn(soundFx.soundEnabled);
    if (soundFx.soundEnabled) {
      soundFx.playPetalChime(528);
    }
  };

  return (
    <header className="w-full pt-4 pb-2 px-1 flex items-center justify-between">
      {/* Patient Avatar & Greeting */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#f472b6] via-[#2dd4bf] to-[#f59e0b] shadow-petal-soft">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              {/* Botanical avatar motif */}
              <div className="w-full h-full bg-[#fff1f2] flex items-center justify-center text-[#a43073] font-bold text-lg">
                🌸
              </div>
            </div>
          </div>
          {/* Active status pip */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#2dd4bf] border-2 border-white rounded-full"></span>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-extrabold text-[#1a1b22] tracking-tight">
              Good day, {patientName}
            </h1>
            <Heart className="w-3.5 h-3.5 text-[#f472b6] fill-[#f472b6]" />
          </div>
          <p className="text-xs text-[#71717a] font-medium flex items-center gap-1">
            <span>Recovery Day {dayCount}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#0d9488] font-semibold">Gentle Progress</span>
          </p>
        </div>
      </div>

      {/* Right controls: Streak Star & Sound toggle */}
      <div className="flex items-center gap-2">
        {/* Streak Star Pill */}
        <div className="flex items-center gap-1 bg-[#fef08a] border border-[#fde047] text-[#855300] px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
          <span>{streakDays}d Bloom</span>
        </div>

        {/* Chime Sound Toggle */}
        <button
          onClick={toggleSound}
          title={soundOn ? "Mute botanical chimes" : "Enable botanical chimes"}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors border ${
            soundOn 
              ? 'bg-[#ccfbf1] text-[#0d9488] border-[#99f6e4]' 
              : 'bg-white text-[#a1a1aa] border-[#fce7f3]'
          }`}
          aria-label="Toggle soothing sound effects"
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Reassurance notification bell */}
        <button
          onClick={() => {
            soundFx.playPetalChime(440);
            setShowNotificationModal(!showNotificationModal);
          }}
          className="relative w-9 h-9 rounded-full bg-white border border-[#fce7f3] text-[#544249] flex items-center justify-center hover:bg-[#fff1f2] transition-colors"
          aria-label="Care alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f472b6]"></span>
        </button>
      </div>

      {/* Notification drop drawer */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/20 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-[2rem] p-5 shadow-2xl border border-[#fce7f3] animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#fce7f3]/60 mb-3">
              <span className="text-sm font-bold text-[#1a1b22] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2dd4bf]"></span>
                Sanctuary Reminders
              </span>
              <button 
                onClick={() => setShowNotificationModal(false)}
                className="text-xs text-[#a43073] font-semibold hover:underline"
              >
                Done
              </button>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-[#fff1f2] rounded-2xl border border-[#fce7f3]">
                <p className="font-bold text-[#a43073]">Afternoon Hydration Due</p>
                <p className="text-[#71717a] mt-0.5">Sip 250ml electrolyte water or calming rose-petal tea.</p>
              </div>
              <div className="p-3 bg-[#ccfbf1]/60 rounded-2xl border border-[#99f6e4]/60">
                <p className="font-bold text-[#0d9488]">Recovery Landmark Unlocked</p>
                <p className="text-[#71717a] mt-0.5">Your resting ease score has improved +14% since Monday.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
