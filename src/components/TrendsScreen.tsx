import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import { 
  TrendingUp, 
  Award, 
  FileText, 
  Check, 
  Calendar, 
  Sparkles, 
  Share2, 
  ChevronRight,
  ShieldCheck,
  Heart
} from 'lucide-react';

export const TrendsScreen: React.FC = () => {
  const [copiedReport, setCopiedReport] = useState(false);

  // 7-day recovery history data
  const recoveryDays = [
    { day: 'Mon', date: 'Oct 21', score: 64, state: 'Nurture' },
    { day: 'Tue', date: 'Oct 22', score: 71, state: 'Nurture' },
    { day: 'Wed', date: 'Oct 23', score: 75, state: 'Steady' },
    { day: 'Thu', date: 'Oct 24', score: 79, state: 'Steady' },
    { day: 'Fri', date: 'Oct 25', score: 83, state: 'Flourish' },
    { day: 'Sat', date: 'Oct 26', score: 86, state: 'Flourish' },
    { day: 'Sun (Today)', date: 'Oct 27', score: 88, state: 'Flourish' },
  ];

  const milestones = [
    {
      title: '7-Day Blooming Streak',
      desc: 'Logged body signals every morning without anxiety.',
      unlocked: true,
      icon: '🌸',
      date: 'Earned Today'
    },
    {
      title: 'Hydration Lotus Guardian',
      desc: 'Met restorative fluid targets 5 days consecutively.',
      unlocked: true,
      icon: '💧',
      date: 'Earned Yesterday'
    },
    {
      title: 'Gentle Slumber Sanctuary',
      desc: 'Maintained 7.5+ hours of restorative sleep rhythm.',
      unlocked: true,
      icon: '🌙',
      date: 'Earned 3 days ago'
    },
    {
      title: 'Full Recovery Landmark',
      desc: 'Sustain 90%+ sanctuary vitality across 3 consecutive days.',
      unlocked: false,
      icon: '🌟',
      date: 'Next Milestone (88% current)'
    }
  ];

  const handleCopyReport = () => {
    soundFx.playCompletionSingingBowl();
    const reportText = `[Petal & Cloud · Clinical Recovery Summary]
Patient: Lily
Recovery Period: Day 1 - Day 7 (Oct 21 - Oct 27, 2026)
Sanctuary Bloom Score: 88% (Baseline: 64% on Oct 21)
Medication Adherence: 94% on schedule
Primary Symptoms Remaining: Tension headache (Mild, 3/10), Mild brain fog.
Body Systems: Restorative Sleep (8.2 hrs), Hydration (2.4 L/day), Vagus Respiration (Balanced).
Note for Physician: Patient reports consistent reduction in acute fatigue and improved physical comfort.`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(reportText);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 3000);
    }
  };

  return (
    <div className="w-full space-y-5 pb-24">
      {/* Header Banner */}
      <div className="bg-white rounded-[2rem] p-5 shadow-cloud-pillow border border-[rgba(244,114,182,0.14)] relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f472b6] animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#a43073]">
            Recovery Journey & Insights
          </span>
        </div>
        <h2 className="text-xl font-extrabold text-[#1a1b22] tracking-tight">
          Your Weekly Healing Rhythm
        </h2>
        <p className="text-xs text-[#71717a] mt-1 leading-relaxed">
          Celebrating everyday progress. Your overall health score increased <strong className="text-[#0d9488]">+24%</strong> over the past 7 days.
        </p>
      </div>

      {/* 7-Day Chart / Visualizer */}
      <div className="bg-white rounded-[2rem] p-5 shadow-cloud-pillow border border-[rgba(244,114,182,0.12)]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-[#544249] flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#2dd4bf]" />
            Sanctuary Vitality Trajectory
          </span>
          <span className="text-xs font-bold text-[#0d9488] bg-[#ccfbf1] px-2.5 py-0.5 rounded-full">
            Trending Upward
          </span>
        </div>

        {/* Custom Bar Graph with Petal Caps */}
        <div className="flex items-end justify-between h-44 pt-4 px-2">
          {recoveryDays.map((item, index) => {
            const isToday = index === recoveryDays.length - 1;
            const barHeight = (item.score / 100) * 120; // in px
            return (
              <div key={item.day} className="flex flex-col items-center gap-2 flex-1">
                {/* Score label on top */}
                <span className={`text-[11px] font-bold ${isToday ? 'text-[#a43073]' : 'text-[#71717a]'}`}>
                  {item.score}%
                </span>

                {/* Vertical Bar */}
                <div className="w-7 sm:w-8 bg-[#fce7f3] rounded-full p-[2px] flex flex-col justify-end h-32 relative">
                  <div
                    className={`w-full rounded-full transition-all duration-700 ease-out relative ${
                      isToday
                        ? 'bg-gradient-to-t from-[#f472b6] to-[#2dd4bf] shadow-petal-soft'
                        : 'bg-gradient-to-t from-[#f472b6]/70 to-[#2dd4bf]/70'
                    }`}
                    style={{ height: `${barHeight}px` }}
                  >
                    {/* Floating petal tip */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-xs flex items-center justify-center text-[7px]">
                      🌸
                    </div>
                  </div>
                </div>

                {/* Day label */}
                <div className="text-center">
                  <span className={`text-[11px] block font-bold ${isToday ? 'text-[#a43073]' : 'text-[#544249]'}`}>
                    {item.day.split(' ')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recovery Milestones / Botanical Trophies */}
      <div className="bg-white rounded-[2rem] p-5 shadow-cloud-pillow border border-[rgba(244,114,182,0.12)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[#544249] flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#f59e0b]" />
            Earned Healing Milestones
          </span>
          <span className="text-[11px] text-[#71717a]">3 of 4 Bloomed</span>
        </div>

        <div className="space-y-2.5">
          {milestones.map((milestone, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 ${
                milestone.unlocked
                  ? 'bg-[#fff1f2]/60 border-[#fce7f3]'
                  : 'bg-[#fafafa] border-dashed border-[#e3e1ec] opacity-75'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0 ${
                  milestone.unlocked
                    ? 'bg-white shadow-sm border border-[#fce7f3]'
                    : 'bg-[#eeedf7] text-[#a1a1aa]'
                }`}
              >
                {milestone.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1a1b22] truncate">
                    {milestone.title}
                  </h4>
                  <span className="text-[10px] text-[#87717a] font-medium shrink-0">
                    {milestone.date}
                  </span>
                </div>
                <p className="text-[11px] text-[#71717a] mt-0.5 leading-snug">
                  {milestone.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor & Care Team Clinical Summary Card */}
      <div className="bg-[#fdfaff] rounded-[2rem] p-5 shadow-cloud-pillow border border-[#dac0c9]/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#ccfbf1] text-[#0d9488] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-[#1a1b22]">
              Caregiver & Physician Sharing Card
            </h3>
          </div>
          <span className="text-[10px] font-bold bg-[#fce7f3] text-[#a43073] px-2 py-0.5 rounded-full">
            HIPAA Privacy Safe
          </span>
        </div>

        <p className="text-xs text-[#544249] leading-relaxed mb-3">
          Take this structured, non-intimidating overview to your follow-up appointment or paste it into your clinic messaging portal.
        </p>

        <div className="bg-white p-3.5 rounded-2xl border border-[#fce7f3] text-xs space-y-1.5 text-[#544249] mb-3">
          <div className="flex justify-between">
            <span className="text-[#87717a]">7-Day Score Arc:</span>
            <span className="font-bold text-[#0d9488]">64% ➔ 88% (+24%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#87717a]">Prescription Compliance:</span>
            <span className="font-bold text-[#1a1b22]">94% of doses on time</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#87717a]">Predominant Sensation:</span>
            <span className="font-semibold text-[#a43073]">Mild Tension (Resolving)</span>
          </div>
        </div>

        <button
          onClick={handleCopyReport}
          className="w-full py-3 px-4 rounded-full bg-[#ccfbf1] text-[#0d9488] font-bold text-xs hover:bg-[#99f6e4] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {copiedReport ? (
            <>
              <Check className="w-4 h-4 text-[#0d9488]" />
              Report Copied to Clipboard!
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-[#0d9488]" />
              Copy Doctor's Briefing Note
            </>
          )}
        </button>
      </div>
    </div>
  );
};
