"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  label: string;
  icon: string;
}

interface SectionNavigatorProps {
  sections: Section[];
}

export default function SectionNavigator({ sections }: SectionNavigatorProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* メインナビゲーションボタン */}
      <motion.button
        onClick={toggleExpanded}
        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isExpanded ? "✕" : "📍"}
      </motion.button>

      {/* セクションリスト */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute bottom-20 right-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 min-w-[200px]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="text-center mb-3">
              <h4 className="text-sm font-semibold text-slate-700">
                セクション
              </h4>
            </div>
            
            <div className="space-y-2">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => {
                    scrollToSection(section.id);
                    setIsExpanded(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                    currentSection === index
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                      : "bg-slate-100/80 text-slate-700 hover:bg-slate-200/80"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="text-sm font-medium">{section.label}</span>
                  
                  {currentSection === index && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 現在のセクションインジケーター */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            className="absolute bottom-20 right-0 bg-white/90 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-white/20"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{sections[currentSection]?.icon}</span>
              <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                {sections[currentSection]?.label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}





