/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BodySystemPetal, MedicationItem } from './types';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { SymptomScreen } from './components/SymptomScreen';
import { CabinetScreen } from './components/CabinetScreen';
import { TrendsScreen } from './components/TrendsScreen';
import { BreathworkScreen } from './components/BreathworkScreen';
import { BottomNav, NavTab } from './components/BottomNav';
import { 
  Smartphone, 
  Maximize2, 
  Columns, 
  Sparkles, 
  Heart, 
  Leaf,
  Layers
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [viewMode, setViewMode] = useState<'mobile' | 'expanded' | 'multi'>('mobile');

  // Interactive 6 Body System Petals State
  const [petals, setPetals] = useState<BodySystemPetal[]>([
    {
      id: 'sleep',
      label: 'Deep Slumber',
      iconName: 'moon',
      score: 84,
      status: 'optimal',
      detail: 'REM & Restorative Sleep',
      unit: 'hrs',
      value: '7.8',
      color: '#2dd4bf',
      lightColor: '#ccfbf1',
    },
    {
      id: 'hydration',
      label: 'Cell Hydration',
      iconName: 'droplet',
      score: 75,
      status: 'optimal',
      detail: 'Electrolytes & Herbal Teas',
      unit: 'liters',
      value: '2.1',
      color: '#2dd4bf',
      lightColor: '#ccfbf1',
    },
    {
      id: 'vitality',
      label: 'Gentle Energy',
      iconName: 'zap',
      score: 72,
      status: 'moderate',
      detail: 'Metabolic & Physical Pacing',
      unit: 'vitality',
      value: 'Steady',
      color: '#f472b6',
      lightColor: '#fff1f2',
    },
    {
      id: 'mood',
      label: 'Mind Calm',
      iconName: 'smile',
      score: 90,
      status: 'optimal',
      detail: 'Emotional Ease & Serenity',
      unit: 'clarity',
      value: 'Tranquil',
      color: '#f59e0b',
      lightColor: '#fef08a',
    },
    {
      id: 'comfort',
      label: 'Physical Ease',
      iconName: 'comfort',
      score: 82,
      status: 'optimal',
      detail: 'Musculoskeletal Freedom',
      unit: 'ease',
      value: 'Comfortable',
      color: '#2dd4bf',
      lightColor: '#ccfbf1',
    },
    {
      id: 'respiration',
      label: 'Vagus Breath',
      iconName: 'wind',
      score: 94,
      status: 'optimal',
      detail: 'Autonomic Rhythm & Airflow',
      unit: 'cadence',
      value: 'Coherent',
      color: '#2dd4bf',
      lightColor: '#ccfbf1',
    },
  ]);

  // Initial medication items
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

  const handleUpdatePetal = (id: BodySystemPetal['id'], newScore: number, newValue: string) => {
    setPetals(prev =>
      prev.map(p => {
        if (p.id === id) {
          const status = newScore >= 75 ? 'optimal' : newScore >= 50 ? 'moderate' : 'needs-attention';
          const color = newScore >= 75 ? '#2dd4bf' : newScore >= 50 ? '#f472b6' : '#f59e0b';
          const lightColor = newScore >= 75 ? '#ccfbf1' : newScore >= 50 ? '#fff1f2' : '#fef08a';
          return {
            ...p,
            score: newScore,
            value: newValue,
            status,
            color,
            lightColor,
          };
        }
        return p;
      })
    );
  };

  const handleToggleMed = (id: string) => {
    setMeds(prev =>
      prev.map(m => (m.id === id ? { ...m, taken: !m.taken } : m))
    );
  };

  return (
    <div className="min-h-screen bg-[#fbf8ff] text-[#1a1b22] flex flex-col items-center selection:bg-[#fce7f3] selection:text-[#a43073] relative">
      {/* Ambient background botanical light washes */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#fff1f2] via-[#fce7f3]/40 to-transparent rounded-full filter blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#ccfbf1]/50 via-[#f4fbf9]/30 to-transparent rounded-full filter blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      {/* Top Desktop Presentation Bar (Allows previewing in Mobile frame, Expanded, or Multi-Screen view) */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-[#fce7f3] py-2 px-4 sticky top-0 z-30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f472b6] to-[#2dd4bf] flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
            🌸
          </span>
          <span className="font-extrabold text-[#1a1b22] tracking-tight">
            Petal & Cloud
          </span>
          <span className="text-[#87717a] hidden sm:inline">
            · Personal Healthcare Sanctuary
          </span>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center gap-1 bg-[#f4f2fd] p-1 rounded-full border border-[#e3e1ec]">
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1 rounded-full font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'mobile'
                ? 'bg-white text-[#a43073] shadow-xs'
                : 'text-[#71717a] hover:text-[#1a1b22]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile (480px)</span>
          </button>

          <button
            onClick={() => setViewMode('expanded')}
            className={`px-3 py-1 rounded-full font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'expanded'
                ? 'bg-white text-[#a43073] shadow-xs'
                : 'text-[#71717a] hover:text-[#1a1b22]'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Expanded</span>
          </button>

          <button
            onClick={() => setViewMode('multi')}
            className={`px-3 py-1 rounded-full font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'multi'
                ? 'bg-white text-[#a43073] shadow-xs'
                : 'text-[#71717a] hover:text-[#1a1b22]'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Screens Gallery</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-1 flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 z-10">
        {viewMode === 'multi' ? (
          /* Multi-screen comparison mode showing screens side by side */
          <div className="w-full max-w-7xl mx-auto space-y-6">
            <div className="text-center py-2">
              <span className="px-3 py-1 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold inline-flex items-center gap-1 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Comprehensive Screen Gallery
              </span>
              <h2 className="text-2xl font-extrabold text-[#1a1b22]">
                Petal & Cloud Design System Screens
              </h2>
              <p className="text-xs text-[#71717a] mt-1">
                All screens crafted to specifications: tactile pillow cards, whimsical progress bars, and the Petal Wheel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
              {/* Screen 1: Sanctuary Home */}
              <div className="bg-[#fbf8ff] rounded-[2.5rem] p-4 shadow-2xl border-4 border-white ring-1 ring-[#fce7f3] overflow-hidden flex flex-col max-h-[850px] overflow-y-auto no-scrollbar">
                <div className="text-center pb-2 border-b border-[#fce7f3] mb-3">
                  <span className="text-[11px] font-bold text-[#a43073] uppercase tracking-wider">Screen 1 · Sanctuary Home</span>
                </div>
                <Header patientName="Lily" dayCount={4} streakDays={7} />
                <div className="mt-3">
                  <HomeScreen
                    petals={petals}
                    meds={meds}
                    onUpdatePetal={handleUpdatePetal}
                    onToggleMed={handleToggleMed}
                    onNavigate={(t) => {
                      setCurrentTab(t);
                      setViewMode('mobile');
                    }}
                  />
                </div>
              </div>

              {/* Screen 2: Body Sensations Triage */}
              <div className="bg-[#fbf8ff] rounded-[2.5rem] p-4 shadow-2xl border-4 border-white ring-1 ring-[#fce7f3] overflow-hidden flex flex-col max-h-[850px] overflow-y-auto no-scrollbar">
                <div className="text-center pb-2 border-b border-[#fce7f3] mb-3">
                  <span className="text-[11px] font-bold text-[#a43073] uppercase tracking-wider">Screen 2 · Symptom Triage</span>
                </div>
                <SymptomScreen onOpenBreathwork={() => { setCurrentTab('breathe'); setViewMode('mobile'); }} />
              </div>

              {/* Screen 3: Care Cabinet & Regimen */}
              <div className="bg-[#fbf8ff] rounded-[2.5rem] p-4 shadow-2xl border-4 border-white ring-1 ring-[#fce7f3] overflow-hidden flex flex-col max-h-[850px] overflow-y-auto no-scrollbar">
                <div className="text-center pb-2 border-b border-[#fce7f3] mb-3">
                  <span className="text-[11px] font-bold text-[#a43073] uppercase tracking-wider">Screen 3 · Care Cabinet</span>
                </div>
                <CabinetScreen />
              </div>

              {/* Screen 4: Recovery Journey */}
              <div className="bg-[#fbf8ff] rounded-[2.5rem] p-4 shadow-2xl border-4 border-white ring-1 ring-[#fce7f3] overflow-hidden flex flex-col max-h-[850px] overflow-y-auto no-scrollbar">
                <div className="text-center pb-2 border-b border-[#fce7f3] mb-3">
                  <span className="text-[11px] font-bold text-[#a43073] uppercase tracking-wider">Screen 4 · Recovery Journey</span>
                </div>
                <TrendsScreen />
              </div>
            </div>
          </div>
        ) : (
          /* Handheld Mobile View (Native 480px ergonomic container) or Expanded View */
          <div
            className={`w-full transition-all duration-300 ${
              viewMode === 'mobile'
                ? 'max-w-[480px] bg-white sm:rounded-[3rem] shadow-2xl sm:border-[8px] sm:border-[#f4f2fd] sm:ring-1 sm:ring-[#fce7f3] p-3 sm:p-5 relative min-h-[90vh]'
                : 'max-w-4xl bg-white rounded-[2.5rem] shadow-2xl border border-[#fce7f3] p-6'
            }`}
          >
            {/* Mobile speaker grill notch simulation */}
            {viewMode === 'mobile' && (
              <div className="hidden sm:flex justify-center mb-1">
                <div className="w-16 h-1.5 bg-[#e3e1ec] rounded-full"></div>
              </div>
            )}

            {/* Persistent Header */}
            <Header patientName="Lily" dayCount={4} streakDays={7} />

            {/* Screen Content based on Active Tab */}
            <div className="mt-3">
              {currentTab === 'home' && (
                <HomeScreen
                  petals={petals}
                  meds={meds}
                  onUpdatePetal={handleUpdatePetal}
                  onToggleMed={handleToggleMed}
                  onNavigate={setCurrentTab}
                />
              )}

              {currentTab === 'symptoms' && (
                <SymptomScreen
                  onBackToSanctuary={() => setCurrentTab('home')}
                  onOpenBreathwork={() => setCurrentTab('breathe')}
                />
              )}

              {currentTab === 'cabinet' && <CabinetScreen />}

              {currentTab === 'trends' && <TrendsScreen />}

              {currentTab === 'breathe' && <BreathworkScreen />}
            </div>

            {/* Floating Glassmorphic Pill Bottom Navigation */}
            <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />
          </div>
        )}
      </main>
    </div>
  );
}
