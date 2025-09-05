"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface LineItemProps {
  icon: LucideIcon;
  children: React.ReactNode;
}

export default function LineItem({ icon: Icon, children }: LineItemProps) {
  return (
    <motion.div 
      className="grid grid-cols-[24px_1fr] gap-3 items-start"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
      <span className="text-gray-800">{children}</span>
    </motion.div>
  );
}
