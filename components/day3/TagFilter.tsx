"use client";

import { useState } from "react";

interface TagFilterProps {
  onFilterChange: (activeTag: string | null) => void;
}

const filterTags = [
  { key: 'family', label: '家族', icon: '👨‍👩‍👧‍👦' },
  { key: 'thrill', label: 'スリル', icon: '🎢' },
  { key: 'photo', label: '映え', icon: '📸' }
];

export default function TagFilter({ onFilterChange }: TagFilterProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const handleTagClick = (tagKey: string) => {
    if (activeTag === tagKey) {
      // 同じタグを再度クリックで解除
      setActiveTag(null);
      onFilterChange(null);
    } else {
      // 新しいタグをアクティブ
      setActiveTag(tagKey);
      onFilterChange(tagKey);
    }
  };

  return (
    <div className="sticky top-20 z-30 flex justify-center px-4 md:px-8 mb-8">
      <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20 shadow-lg">
        <div className="flex gap-2">
          {filterTags.map((tag) => (
            <button
              key={tag.key}
              onClick={() => handleTagClick(tag.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTag === tag.key
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white/20 text-slate-300 hover:bg-white/30 hover:scale-102'
              }`}
              aria-label={`${tag.label}のスポットをフィルター`}
              aria-pressed={activeTag === tag.key}
            >
              <span className="text-base">{tag.icon}</span>
              <span className="hidden sm:inline">{tag.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
