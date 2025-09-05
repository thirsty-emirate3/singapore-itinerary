"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SummerBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* シンプルなサマーグラデーション背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-blue-100 to-orange-100" />
      
      {/* 微細なテクスチャ（控えめ） */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)`
        }}
        animate={{
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
