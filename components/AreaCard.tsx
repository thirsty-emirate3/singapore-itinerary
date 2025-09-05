"use client";

import { MapPinIcon, UtensilsIcon } from "lucide-react";

interface Area {
  key: string;
  name: string;
  highlights: string[];
  food: string[];
  mapUrl: string;
  tips: string[];
  subPlaces?: Array<{
    name: string;
    icon: string;
    description: string;
    url: string;
  }>;
  budget: string;
  duration: string;
  category: string[];
}

interface AreaCardProps {
  area: Area;
}

export default function AreaCard({ area }: AreaCardProps) {
  const getThemeColors = (key: string) => {
    switch (key) {
      case 'chinatown':
        return {
          bg: 'from-chinatown-light/20 to-chinatown-base/10',
          header: 'bg-chinatown-base text-white',
          chip: 'bg-chinatown-accent text-chinatown-dark',
          accent: 'text-chinatown-base'
        };
      case 'little-india':
        return {
          bg: 'from-india-light/20 to-india-base/10',
          header: 'bg-india-base text-white',
          chip: 'bg-india-accent text-india-dark',
          accent: 'text-india-base'
        };
      case 'arab-street':
        return {
          bg: 'from-arab-light/20 to-arab-base/10',
          header: 'bg-arab-base text-white',
          chip: 'bg-arab-accent text-arab-dark',
          accent: 'text-arab-base'
        };
      case 'bugis':
        return {
          bg: 'from-bugis-light/20 to-bugis-base/10',
          header: 'bg-bugis-base text-white',
          chip: 'bg-bugis-accent text-bugis-dark',
          accent: 'text-bugis-base'
        };
      case 'botanic':
        return {
          bg: 'from-botanic-light/20 to-botanic-base/10',
          header: 'bg-botanic-base text-white',
          chip: 'bg-botanic-accent text-botanic-dark',
          accent: 'text-botanic-base'
        };
      case 'clarke-quay':
        return {
          bg: 'from-clarke-light/20 to-clarke-base/10',
          header: 'bg-clarke-base text-white',
          chip: 'bg-clarke-accent text-clarke-dark',
          accent: 'text-clarke-base'
        };
      default:
        return {
          bg: 'from-slate-200/20 to-slate-300/10',
          header: 'bg-slate-600 text-white',
          chip: 'bg-slate-400 text-slate-800',
          accent: 'text-slate-600'
        };
    }
  };

  const theme = getThemeColors(area.key);

  return (
    <div className="group bg-white/80 backdrop-blur rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      {/* 写真 */}
      <div className="aspect-[3/2] relative overflow-hidden">
        <img
          src={`/image/day2_detail/day2-${area.key === 'botanic' ? 'botanic-gardens' : area.key}.jpg`}
          alt={area.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // 写真が見つからない場合のフォールバック
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full bg-gradient-to-br ${theme.bg} flex items-center justify-center">
                  <div class="text-center text-slate-500">
                    <div class="text-4xl mb-2">📸</div>
                    <p class="text-sm font-medium">${area.name}</p>
                    <p class="text-xs">写真準備中</p>
                  </div>
                </div>
              `;
            }
          }}
        />
      </div>

      {/* コンテンツ */}
      <div className="p-4 md:p-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-poppins font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span>📍</span>
            {area.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${theme.chip}`}>
              {area.key === 'chinatown' ? '中華' : 
               area.key === 'little-india' ? 'インド' : 
               area.key === 'arab-street' ? 'アラブ' :
               area.key === 'bugis' ? '🛍️' :
               area.key === 'botanic' ? '🌿' :
               area.key === 'clarke-quay' ? '🍹' : 'エリア'}
            </span>
            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
              {area.budget}
            </span>
          </div>
        </div>

        {/* ハイライト */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">見どころ</h4>
          <ul className="space-y-1">
            {area.highlights.map((highlight, index) => (
              <li key={index} className="text-xs md:text-sm text-slate-600 flex items-start gap-2 leading-snug">
                <span className={`mt-1 ${theme.accent}`}>•</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* グルメ */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">グルメ</h4>
          <ul className="space-y-1">
            {area.food.map((food, index) => (
              <li key={index} className="text-xs md:text-sm text-slate-600 flex items-start gap-2 leading-snug">
                <span className="text-orange-500 mt-1">🍜</span>
                {food}
              </li>
            ))}
          </ul>
        </div>

        {/* コツ */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">コツ</h4>
          <ul className="space-y-1">
            {area.tips.map((tip, index) => (
              <li key={index} className="text-xs md:text-sm text-slate-600 flex items-start gap-2 leading-snug">
                <span className="text-green-500 mt-1">💡</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* サブ地点チップ */}
        {area.subPlaces && area.subPlaces.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">サブ地点</h4>
            <div className="flex flex-wrap gap-2">
              {area.subPlaces.map((place, index) => (
                <a
                  key={index}
                  href={place.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg transition-colors"
                  aria-label={`${place.name}の詳細を新しいタブで開く`}
                >
                  <span>{place.icon}</span>
                  <span>{place.description}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 所要時間 */}
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
          <span>⌛</span>
          <span>{area.duration}</span>
        </div>

        {/* カテゴリ */}
        <div className="mb-4 flex flex-wrap gap-1">
          {area.category.map((cat, index) => (
            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              {cat}
            </span>
          ))}
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2">
          <a
            href={area.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-xl hover:bg-indigo-700 transition-colors font-medium"
            aria-label={`${area.name}の地図を新しいタブで開く`}
          >
            <MapPinIcon className="w-4 h-4" />
            地図
          </a>
          <a
            href={area.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white text-sm rounded-xl hover:bg-orange-700 transition-colors font-medium"
            aria-label={`${area.name}の公式/紹介サイトを新しいタブで開く`}
          >
            <span>↗</span>
            公式
          </a>
        </div>
      </div>
    </div>
  );
}
