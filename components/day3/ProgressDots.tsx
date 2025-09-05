"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProgressDotsProps {
  totalSections: number;
  sectionIds: string[];
}

export default function ProgressDots({ totalSections, sectionIds }: ProgressDotsProps) {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sectionIds[index]);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white/20">
        {[...Array(totalSections)].map((_, index) => (
          <motion.button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              currentSection === index
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 scale-125"
                : "bg-slate-300 hover:bg-slate-400"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
      
      {/* 現在のセクションラベル */}
              <motion.div
          className="mt-2 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-xs text-slate-600 font-medium bg-white/80 backdrop-blur-md px-2 py-1 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
            {currentSection + 1} / {totalSections}
          </span>
        </motion.div>
    </div>
  );
}
