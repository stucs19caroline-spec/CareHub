import React, { useState } from 'react';
import { MedicationItem } from '../types';
import { soundFx } from '../utils/audio';
import { 
  Pill, 
  Plus, 
  Check, 
  Clock, 
  Calendar, 
  Leaf, 
  AlertCircle, 
  Sparkles,
  Info,
  X
} from 'lucide-react';

export const CabinetScreen: React.FC = () => {
  const [meds, setMeds] = useState<MedicationItem[]>([
    {
      id: 'm1',
      name: 'Amoxicillin Trihydrate',
      dosage: '500 mg · 1 capsule',
      timing: 'Morning',
      instructions: 'Take with whole food and 300ml water.',
      taken: true,
      category: 'prescription'
    },
    {
      id: 'm2',
      name: 'Bioactive Vitamin D3 + K2',
      dosage: '2,000 IU · 1 softgel',
      timing: 'Morning',
      instructions: 'Supports immune vitality. Best with morning meal.',
      taken: true,
      category: 'supplement'
    },
    {
      id: 'm3',
      name: 'Elderberry & Zinc Lozenges',
      dosage: '1 lozenge slowly dissolved',
      timing: 'Afternoon',
      instructions: 'Soothes throat tissue and immune response.',
      taken: false,
      category: 'botanical'
    },
    {
      id: 'm4',
      name: 'Magnesium Glycinate Complex',
      dosage: '300 mg · 2 capsules',
      timing: 'Bedtime',
      instructions: 'Eases neuromuscular tension before restorative sleep.',
      taken: false,
      category: 'supplement'
    },
    {
      id: 'm5',
      name: 'Gentle Saline Nasal Mist',
      dosage: '2 sprays per nostril',
      timing: 'Evening',
      instructions: 'Hydrates upper airway before rest.',
      taken: false,
      category: 'prescription'
    }
  ]);

  const [activeTiming, setActiveTiming] = useState<'All' | 'Morning' | 'Afternoon' | 'Evening' | 'Bedtime'>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  
  // New med form state
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');
  const [newMedTiming, setNewMedTiming] = useState<'Morning' | 'Afternoon' | 'Evening' | 'Bedtime'>('Morning');
  const [newMedInstructions, setNewMedInstructions] = useState('');
  const [newMedCategory, setNewMedCategory] = useState<'prescription' | 'supplement' | 'botanical'>('supplement');

  const toggleMed = (id: string) => {
    soundFx.playPetalChime(560);
    setMeds(prev =>
      prev.map(m => (m.id === id ? { ...m, taken: !m.taken } : m))
    );
  };

  const handleAddNewMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) return;

    const newMed: MedicationItem = {
      id: `med-${Date.now()}`,
      name: newMedName.trim(),
      dosage: newMedDosage.trim() || '1 dose',
      timing: newMedTiming,
      instructions: newMedInstructions.trim() || 'Take with water as directed.',
      taken: false,
      category: newMedCategory,
    };

    setMeds(prev => [...prev, newMed]);
    soundFx.playCompletionSingingBowl();
    setNewMedName('');
    setNewMedDosage('');
    setNewMedInstructions('');
    setShowAddModal(false);
  };

  const completedCount = meds.filter(m => m.taken).length;
  const filteredMeds = activeTiming === 'All' 
    ? meds 
    : meds.filter(m => m.timing === activeTiming);

  return (
    <div className="w-full space-y-5 pb-24">
      {/* Header Banner */}
      <div className="bg-white rounded-[2rem] p-5 shadow-cloud-pillow border border-[rgba(244,114,182,0.14)] relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2dd4bf] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0d9488]">
              Care Cabinet & Dispensary
            </span>
          </div>
          <span className="text-xs font-bold bg-[#ccfbf1] text-[#0d9488] px-3 py-0.5 rounded-full">
            {completedCount} / {meds.length} Taken
          </span>
        </div>

        <h2 className="text-xl font-extrabold text-[#1a1b22] tracking-tight">
          Gentle Medication & Supplement Rhythms
        </h2>
        <p className="text-xs text-[#71717a] mt-1 leading-relaxed">
          Nurturing your recovery with timely doses. Squircle checkboxes update your daily health score.
        </p>

        {/* Timing Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-4 pb-1">
          {['All', 'Morning', 'Afternoon', 'Evening', 'Bedtime'].map((timing) => (
            <button
              key={timing}
              onClick={() => {
                soundFx.playPetalChime(460);
                setActiveTiming(timing as typeof activeTiming);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTiming === timing
                  ? 'bg-gradient-to-r from-[#f472b6] to-[#fb7185] text-white shadow-petal-soft'
                  : 'bg-[#fafafa] text-[#71717a] hover:bg-[#fff1f2] border border-[#fce7f3]'
              }`}
            >
              {timing}
            </button>
          ))}
        </div>
      </div>

      {/* Medication Cards List */}
      <div className="space-y-3">
        {filteredMeds.map((med) => {
          return (
            <div
              key={med.id}
              onClick={() => toggleMed(med.id)}
              className={`rounded-[2rem] p-4.5 bg-white border transition-all duration-200 cursor-pointer shadow-cloud-pillow flex items-start gap-3.5 relative overflow-hidden group ${
                med.taken 
                  ? 'border-[#2dd4bf]/40 bg-[#f9fefd]' 
                  : 'border-[rgba(244,114,182,0.12)] hover:border-[#f472b6]/40'
              }`}
            >
              {/* Category indicator pill ribbon */}
              <div 
                className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold ${
                  med.category === 'botanical'
                    ? 'bg-[#ccfbf1] text-[#0d9488]'
                    : med.category === 'prescription'
                    ? 'bg-[#ffe4e6] text-[#e11d48]'
                    : 'bg-[#fef08a] text-[#855300]'
                }`}
              >
                {med.category === 'botanical' && 'Botanical · Herbal'}
                {med.category === 'prescription' && 'Prescription · Rx'}
                {med.category === 'supplement' && 'Immune · Vitamin'}
              </div>

              {/* Squircle Checkbox (Conforms explicitly to design spec: border-radius 0.5rem, fills with #2DD4BF) */}
              <div
                className={`w-7 h-7 rounded-[0.5rem] mt-0.5 flex items-center justify-center transition-all duration-200 shrink-0 border ${
                  med.taken
                    ? 'bg-[#2dd4bf] border-[#2dd4bf] text-white shadow-teal-soft scale-105'
                    : 'bg-white border-[#fce7f3] text-transparent hover:border-[#2dd4bf]'
                }`}
              >
                <Check className={`w-4 h-4 stroke-[3] transition-transform ${med.taken ? 'scale-100' : 'scale-50'}`} />
              </div>

              {/* Med Information */}
              <div className="flex-1 pr-12">
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-bold transition-colors ${med.taken ? 'text-[#71717a] line-through' : 'text-[#1a1b22]'}`}>
                    {med.name}
                  </h4>
                </div>

                <div className="flex items-center gap-2 mt-1 text-xs text-[#544249]">
                  <span className="font-semibold">{med.dosage}</span>
                  <span aria-hidden="true" className="text-[#dac0c9]">·</span>
                  <span className="flex items-center gap-1 text-[#a43073] font-medium">
                    <Clock className="w-3 h-3" />
                    {med.timing}
                  </span>
                </div>

                {med.instructions && (
                  <p className="text-[11px] text-[#71717a] mt-1.5 leading-snug">
                    {med.instructions}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Treatment Floating Action Button */}
      <button
        onClick={() => {
          soundFx.playPetalChime(500);
          setShowAddModal(true);
        }}
        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#f472b6] to-[#fb7185] text-white font-bold text-xs tracking-wide shadow-petal-soft hover:shadow-petal-active transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        Add New Prescription or Herbal Tea
      </button>

      {/* Modal for adding custom medication/treatment */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-black/25 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-[2.5rem] sm:rounded-[2rem] p-6 shadow-2xl border border-[#fce7f3] relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#fce7f3]/60 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#fff1f2] text-[#f472b6] flex items-center justify-center">
                  <Pill className="w-4 h-4" />
                </span>
                <h3 className="text-base font-extrabold text-[#1a1b22]">
                  Add Care Routine Item
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-[#fafafa] hover:bg-[#fff1f2] text-[#544249] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNewMed} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#544249] block mb-1">
                  Remedy or Medicine Name
                </label>
                <input
                  type="text"
                  required
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  placeholder="e.g., Chamomile extract, Vitamin C..."
                  className="w-full bg-[#fafafa] border border-[#fce7f3] rounded-full px-4 py-2.5 text-xs text-[#1a1b22] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#2dd4bf] focus:ring-4 focus:ring-[rgba(45,212,191,0.18)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#544249] block mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    value={newMedDosage}
                    onChange={(e) => setNewMedDosage(e.target.value)}
                    placeholder="e.g., 500mg, 1 cup"
                    className="w-full bg-[#fafafa] border border-[#fce7f3] rounded-full px-4 py-2.5 text-xs text-[#1a1b22] focus:outline-none focus:border-[#2dd4bf]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#544249] block mb-1">
                    Schedule
                  </label>
                  <select
                    value={newMedTiming}
                    onChange={(e) => setNewMedTiming(e.target.value as typeof newMedTiming)}
                    className="w-full bg-[#fafafa] border border-[#fce7f3] rounded-full px-3 py-2.5 text-xs text-[#1a1b22] focus:outline-none focus:border-[#2dd4bf]"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Bedtime">Bedtime</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#544249] block mb-1">
                  Type / Origin
                </label>
                <div className="flex gap-2">
                  {(['prescription', 'supplement', 'botanical'] as const).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setNewMedCategory(cat)}
                      className={`flex-1 py-2 rounded-full text-[11px] font-bold border transition-colors ${
                        newMedCategory === cat
                          ? 'bg-[#ccfbf1] border-[#2dd4bf] text-[#0d9488]'
                          : 'bg-[#fafafa] border-[#fce7f3] text-[#71717a]'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#544249] block mb-1">
                  Special Notes / Instructions
                </label>
                <input
                  type="text"
                  value={newMedInstructions}
                  onChange={(e) => setNewMedInstructions(e.target.value)}
                  placeholder="e.g., Sip with warm almond milk..."
                  className="w-full bg-[#fafafa] border border-[#fce7f3] rounded-full px-4 py-2.5 text-xs text-[#1a1b22] focus:outline-none focus:border-[#2dd4bf]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#f472b6] to-[#fb7185] text-white font-bold text-xs tracking-wide shadow-petal-soft hover:shadow-petal-active transition-all cursor-pointer"
                >
                  Place into Care Cabinet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
