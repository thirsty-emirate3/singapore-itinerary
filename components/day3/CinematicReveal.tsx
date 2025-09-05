"use client";

import { useEffect, useRef } from "react";

interface CinematicRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function CinematicReveal({ children, className = "" }: CinematicRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // reduced-motion設定の確認
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            // 60%以上見えたらin-viewクラスを追加
            entry.target.classList.add('in-view');
            
            // ハプティックフィードバック（サポート時のみ）
            if ('vibrate' in navigator) {
              try {
                navigator.vibrate(10);
              } catch (e) {
                // エラーは無視
              }
            }
          } else {
            // 見えなくなったらin-viewクラスを削除
            entry.target.classList.remove('in-view');
          }
        });
      },
      {
        threshold: 0.6, // 60%の閾値
        rootMargin: '0px'
      }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, []);

  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  );
}
