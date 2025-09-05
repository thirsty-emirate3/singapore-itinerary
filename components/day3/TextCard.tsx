"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TextCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  tips?: string[];
  ctaText?: string;
  ctaAction?: () => void;
}

export default function TextCard({
  id,
  title,
  description,
  icon,
  tips,
  ctaText,
  ctaAction
}: TextCardProps) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fadeInVariants = {
    hidden: {
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className="relative min-h-[50vh] flex items-center justify-center px-4 md:px-8 py-20 md:py-32"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/30 shadow-xl"
          variants={fadeInVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* アイコンとタイトル */}
          <div className="text-center mb-8">
            <motion.div
              className="text-5xl md:text-7xl mb-6"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" as const }}
            >
              {icon}
            </motion.div>
            
            <motion.h3
              className="text-2xl md:text-4xl font-bold mb-4 text-slate-800"
              variants={fadeInVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.5 }}
            >
              {title}
            </motion.h3>
            
            <motion.p
              className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto"
              variants={fadeInVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.7 }}
            >
              {description}
            </motion.p>
          </div>

          {/* ヒント */}
          {tips && tips.length > 0 && (
            <motion.div
              className="mb-8"
              variants={fadeInVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.9 }}
            >
              <h4 className="text-lg font-semibold text-slate-700 mb-4 text-center">
                💡 夏のヒント
              </h4>
              <div className="grid gap-3 max-w-2xl mx-auto">
                {tips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100"
                  >
                    <span className="text-blue-500 text-lg">🌊</span>
                    <p className="text-slate-700 text-sm md:text-base">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTAボタン */}
          {ctaText && ctaAction && (
            <motion.div
              className="text-center"
              variants={fadeInVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 1.1 }}
            >
              <button
                onClick={ctaAction}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-lg font-semibold rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {ctaText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
