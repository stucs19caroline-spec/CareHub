import React from 'react';
import { Home, Activity, Pill, TrendingUp, Wind } from 'lucide-react';
import { soundFx } from '../utils/audio';

export type NavTab = 'home' | 'symptoms' | 'cabinet' | 'trends' | 'breathe';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { id: 'home' as const, label: 'Sanctuary', icon: Home },
    { id: 'symptoms' as const, label: 'Sensations', icon: Activity },
    { id: 'cabinet' as const, label: 'Care Cabinet', icon: Pill },
    { id: 'trends' as const, label: 'Journey', icon: TrendingUp },
    { id: 'breathe' as const, label: 'Breathe', icon: Wind },
  ];

  const handleTabClick = (tabId: NavTab) => {
    soundFx.playPetalChime(tabId === 'home' ? 528 : tabId === 'symptoms' ? 480 : 560);
    onSelectTab(tabId);
  };

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav 
        className="pointer-events-auto bg-white/90 backdrop-blur-xl border border-[rgba(244,114,182,0.2)] rounded-full p-1.5 shadow-2xl flex items-center gap-1 max-w-md w-full justify-around shadow-petal-soft"
        aria-label="Sanctuary Navigation"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all duration-300 min-w-[56px] ${
                isActive
                  ? 'bg-gradient-to-r from-[#f472b6] to-[#fb7185] text-white shadow-petal-soft scale-105'
                  : 'text-[#71717a] hover:text-[#a43073] hover:bg-[#fff1f2]/60'
              }`}
            >
              <Icon className={`w-4 h-4 stroke-[2.2] transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-[10px] mt-0.5 font-bold tracking-tight ${isActive ? 'text-white' : 'text-[#71717a]'}`}>
                {tab.label}
              </span>

              {/* Active subtle glowing pip underneath */}
              {isActive && (
                <span className="absolute -bottom-0.5 w-1.5 h-1.5 bg-white rounded-full shadow-xs"></span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
