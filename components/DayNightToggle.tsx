"use client";

import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "lucide-react";

interface DayNightToggleProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export default function DayNightToggle({ tabs, activeTab, onTabChange }: DayNightToggleProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <div className="mb-8">
      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => onTabChange(index)}
              className={`flex-shrink-0 snap-start px-6 py-3 rounded-2xl text-base font-medium transition-all duration-300 ${
                activeTab === index
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white/70 text-slate-600 hover:bg-white/90'
              }`}
            >
              <span className={`inline-block transition-transform ${isReducedMotion ? '' : 'duration-500'}`}>
                {index === 0 ? '☀️' : '🌙'} {tab}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Tab Buttons with Morphing Icons */}
      <div className="hidden md:flex gap-3">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabChange(index)}
            className={`px-8 py-4 rounded-2xl text-lg font-medium transition-all duration-500 ${
              activeTab === index
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white/70 text-slate-600 hover:bg-white/90'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <span className={`inline-block transition-all ${isReducedMotion ? '' : 'duration-500'}`}>
                {index === 0 ? (
                  <SunIcon className={`w-5 h-5 ${activeTab === index ? 'animate-morph' : ''}`} />
                ) : (
                  <MoonIcon className={`w-5 h-5 ${activeTab === index ? 'animate-morph' : ''}`} />
                )}
              </span>
              <span className="font-poppins tracking-tight">{tab}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
