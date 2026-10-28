import React, { useState } from 'react';
import { SymptomItem, TriageRecommendation } from '../types';
import { soundFx } from '../utils/audio';
import { 
  Activity, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  MessageSquareHeart, 
  Send,
  Coffee,
  HeartPulse,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface SymptomScreenProps {
  onBackToSanctuary?: () => void;
  onOpenBreathwork?: () => void;
}

export const SymptomScreen: React.FC<SymptomScreenProps> = ({
  onBackToSanctuary,
  onOpenBreathwork,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'head' | 'chest' | 'energy' | 'digestive' | 'muscles'>('all');
  const [severitySlider, setSeveritySlider] = useState<number>(3);
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  // Available interactive symptoms
  const [symptoms, setSymptoms] = useState<SymptomItem[]>([
    { id: 'headache', name: 'Tension Headache', category: 'head', severity: 4, selected: false },
    { id: 'fog', name: 'Brain Fog & Heavy Eyes', category: 'head', severity: 3, selected: true },
    { id: 'throat', name: 'Scratchy Throat', category: 'chest', severity: 2, selected: false },
    { id: 'shallow', name: 'Shallow Respiration', category: 'chest', severity: 3, selected: false },
    { id: 'fatigue', name: 'Sluggish Fatigue', category: 'energy', severity: 5, selected: true },
    { id: 'chills', name: 'Mild Chills / Flushes', category: 'energy', severity: 3, selected: false },
    { id: 'stomach', name: 'Gentle Stomach Flutter', category: 'digestive', severity: 2, selected: false },
    { id: 'appetite', name: 'Low Appetite', category: 'digestive', severity: 3, selected: false },
    { id: 'shoulders', name: 'Tight Neck & Shoulders', category: 'muscles', severity: 4, selected: true },
    { id: 'aches', name: 'Diffuse Joint Aches', category: 'muscles', severity: 3, selected: false },
  ]);

  const toggleSymptom = (id: string) => {
    soundFx.playPetalChime(520);
    setSymptoms(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectedCount = symptoms.filter(s => s.selected).length;
  const filteredSymptoms = activeCategory === 'all' 
    ? symptoms 
    : symptoms.filter(s => s.category === activeCategory);

  // Determine triage state dynamically
  const calculateTriage = (): TriageRecommendation => {
    if (selectedCount === 0 && severitySlider <= 2) {
      return {
        severityLevel: 'low',
        headline: 'Serene & Harmonized Sanctuary',
        subtext: 'Your vital signs and bodily ease reflect gentle, continuous recovery.',
        recommendations: [
          'Continue restorative hydration with warm herbal teas',
          'Enjoy light walking or meditative stretching',
          'Preserve screen-free evening wind-down'
        ],
        botanicalRemedy: 'Chamomile & Lavender blossom infusion with a drop of raw clover honey.',
        shouldAlertDoctor: false
      };
    } else if (severitySlider >= 8 || selectedCount >= 5) {
      return {
        severityLevel: 'high',
        headline: 'Care Sanctuary: Heightened Attention',
        subtext: 'Your body is signaling a need for immediate quiet rest and clinician contact if symptoms persist.',
        recommendations: [
          'Lie down in a darkened, temperature-regulated room',
          'Sip electrolytes gradually rather than gulping',
          'Take prescribed anti-inflammatory as directed in your Cabinet',
          'Notify your care companion or tap below to message primary clinic'
        ],
        botanicalRemedy: 'Cool peppermint compress across forehead with willow bark tincture.',
        shouldAlertDoctor: true
      };
    } else {
      return {
        severityLevel: 'moderate',
        headline: 'Mild Healing Fatigue: Gentle Support Needed',
        subtext: 'Your immune system is actively working. Common during Day 3-5 of recovery.',
        recommendations: [
          'Pace your activities—postpone demanding mental tasks',
          'Try 4-7-8 botanical breathwork to ease muscle tension',
          'Rest eyes with a warm lavender eye pillow for 20 minutes'
        ],
        botanicalRemedy: 'Fresh ginger, lemon verbena, and elderberry warm steeped tonic.',
        shouldAlertDoctor: false
      };
    }
  };

  const triage = calculateTriage();

  const handleLogAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playCompletionSingingBowl();
    setHasSubmitted(true);
  };

  return (
    <div className="w-full space-y-5 pb-24">
      {/* Top Banner & Header */}
      <div className="bg-white rounded-[2rem] p-5 shadow-cloud-pillow border border-[rgba(244,114,182,0.14)] relative overflow-hidden">
        {/* Soft botanical accent aura */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#fff1f2] rounded-full filter blur-2xl pointer-events-none -mr-8 -mt-8" />
        
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f472b6] animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#a43073]">
            Tactile Clinical Check-In
          </span>
        </div>
        <h2 className="text-xl font-extrabold text-[#1a1b22] tracking-tight">
          How is your body feeling right now?
        </h2>
        <p className="text-xs text-[#71717a] mt-1 leading-relaxed">
          Select any sensations present today. We translate clinical indicators into gentle, comforting self-care steps.
        </p>

        {/* Category Filter Tabs (Pill Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-4 pb-1">
          {[
            { id: 'all', label: 'All Systems' },
            { id: 'head', label: 'Head & Mind' },
            { id: 'chest', label: 'Throat & Breath' },
            { id: 'energy', label: 'Vitality' },
            { id: 'muscles', label: 'Muscles & Ease' },
            { id: 'digestive', label: 'Digestion' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playPetalChime(420);
                setActiveCategory(cat.id as typeof activeCategory);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#f472b6] to-[#fb7185] text-white shadow-petal-soft'
                  : 'bg-[#fafafa] text-[#71717a] hover:bg-[#fff1f2] border border-[#fce7f3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Symptom Selectors (Chips conforming to Design Spec) */}
      <div className="bg-white rounded-[2rem] p-5 shadow-cloud-pillow border border-[rgba(244,114,182,0.12)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[#544249] flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#2dd4bf]" />
            Active Sensations ({selectedCount} selected)
          </span>
          <span className="text-[11px] text-[#71717a]">Tap to toggle</span>
        </div>

        {/* Chips Grid */}
        <div className="flex flex-wrap gap-2">
          {filteredSymptoms.map((symptom) => {
            const isSelected = symptom.selected;
            return (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#fce7f3] border-[1.5px] border-[#f472b6] text-[#a43073] shadow-xs scale-[1.02]'
                    : 'bg-white border border-[#fce7f3] text-[#71717a] hover:border-[#f472b6]/40'
                }`}
              >
                {/* Botanical checkmark or petal motif */}
                {isSelected ? (
                  <span className="w-4 h-4 rounded-full bg-[#f472b6] text-white flex items-center justify-center text-[10px] shadow-xs">
                    🌸
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dac0c9]"></span>
                )}
                <span>{symptom.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Severity & Discomfort Intensity Slider */}
      <div className="bg-white rounded-[2rem] p-5 shadow-cloud-pillow border border-[rgba(244,114,182,0.12)]">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-[#544249]">
            Overall Intensity / Discomfort Scale
          </label>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              severitySlider <= 3
                ? 'bg-[#ccfbf1] text-[#0d9488]'
                : severitySlider <= 7
                ? 'bg-[#fef08a] text-[#d97706]'
                : 'bg-[#ffe4e6] text-[#e11d48]'
            }`}
          >
            Level {severitySlider} / 10 · {
              severitySlider <= 3 ? 'Gentle Whisper' :
              severitySlider <= 6 ? 'Noticeable Flutter' :
              severitySlider <= 8 ? 'Significant Discomfort' : 'Acute Demand'
            }
          </span>
        </div>

        {/* Track Slider */}
        <div className="pt-2">
          <input
            type="range"
            min="1"
            max="10"
            value={severitySlider}
            onChange={(e) => {
              setSeveritySlider(parseInt(e.target.value, 10));
              soundFx.playPetalChime(350 + parseInt(e.target.value, 10) * 25);
            }}
            className="w-full h-3 bg-[#fce7f3] rounded-full appearance-none cursor-pointer accent-[#f472b6]"
          />
          <div className="flex justify-between text-[11px] text-[#87717a] mt-2 font-medium">
            <span>1 · Whisper</span>
            <span>4 · Distracting</span>
            <span>7 · Persistent</span>
            <span>10 · Intense</span>
          </div>
        </div>
      </div>

      {/* Patient Notes / Prompt with Pill Envelope & Teal Focus */}
      <div className="bg-white rounded-[2rem] p-5 shadow-cloud-pillow border border-[rgba(244,114,182,0.12)]">
        <label className="text-xs font-bold text-[#544249] block mb-2 flex items-center gap-1.5">
          <MessageSquareHeart className="w-3.5 h-3.5 text-[#f472b6]" />
          Personal Notes for your Sanctuary Record
        </label>
        <div className="relative">
          <textarea
            rows={2}
            value={patientNotes}
            onChange={(e) => setPatientNotes(e.target.value)}
            placeholder="e.g., Felt a bit more rested after taking mint tea, but neck tightened after reading..."
            className="w-full bg-[#fafafa] border border-[#fce7f3] rounded-[1.5rem] p-3.5 text-xs text-[#1a1b22] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#2dd4bf] focus:ring-4 focus:ring-[rgba(45,212,191,0.18)] transition-all resize-none"
          />
        </div>

        {/* Action Button: Primary Gradient with rosy glow */}
        <button
          onClick={handleLogAssessment}
          className="mt-3 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#f472b6] to-[#fb7185] text-white font-bold text-xs tracking-wide shadow-petal-soft hover:shadow-petal-active active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          Update Sanctuary Log & Synthesize Advice
        </button>
      </div>

      {/* Semantic Health State Triage Assessment Card */}
      <div 
        className={`rounded-[2rem] p-5 shadow-cloud-pillow border transition-all duration-300 relative overflow-hidden ${
          triage.severityLevel === 'low'
            ? 'bg-[#f4fbf9] border-[#2dd4bf]/40'
            : triage.severityLevel === 'moderate'
            ? 'bg-[#fffdf2] border-[#fde047]'
            : 'bg-[#fff5f5] border-[#fca5a5]'
        }`}
      >
        {/* Upper Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {triage.severityLevel === 'low' ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ccfbf1] text-[#0d9488] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Positive & Stable
              </span>
            ) : triage.severityLevel === 'moderate' ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#fef08a] text-[#d97706] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Needs Gentle Attention
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ffe4e6] text-[#e11d48] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Care Attention Recommended
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#71717a] font-medium">
            Clinical Triage Synthesis
          </span>
        </div>

        <h3 className="text-base font-extrabold text-[#1a1b22] mb-1">
          {triage.headline}
        </h3>
        <p className="text-xs text-[#544249] leading-relaxed mb-4">
          {triage.subtext}
        </p>

        {/* Botanical Remedy Recommendation Box */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3.5 border border-[#fce7f3] mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#a43073] mb-1">
            <Coffee className="w-3.5 h-3.5" />
            Comfort Botanical Remedy
          </div>
          <p className="text-xs text-[#544249] font-medium">
            {triage.botanicalRemedy}
          </p>
        </div>

        {/* Care Action Checklist */}
        <div className="space-y-2 mb-4">
          <span className="text-xs font-bold text-[#1a1b22] block">
            Nurturing Steps for Today:
          </span>
          {triage.recommendations.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-[#544249]">
              <span className="w-4 h-4 rounded-full bg-[#2dd4bf]/20 text-[#0d9488] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* Doctor Contact / Breathwork Quick Navigation */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          {onOpenBreathwork && (
            <button
              onClick={onOpenBreathwork}
              className="flex-1 py-2.5 px-4 rounded-full bg-[#ccfbf1] text-[#0d9488] font-bold text-xs hover:bg-[#99f6e4] transition-colors flex items-center justify-center gap-1.5"
            >
              <HeartPulse className="w-4 h-4" />
              Begin 3-Min Petal Breath
            </button>
          )}

          {triage.shouldAlertDoctor && (
            <a
              href="tel:911"
              className="flex-1 py-2.5 px-4 rounded-full bg-[#ffe4e6] text-[#e11d48] font-bold text-xs hover:bg-[#fecdd3] transition-colors flex items-center justify-center gap-1.5"
            >
              <AlertCircle className="w-4 h-4" />
              Notify Physician Portal
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
