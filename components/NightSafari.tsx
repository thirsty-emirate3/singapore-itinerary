"use client";

import { useState, useEffect } from "react";
import { ExternalLinkIcon, ClockIcon, MapPinIcon, TicketIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface NightSafariRoute {
  time: string;
  activity: string;
  note?: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface NightSafari {
  bookingUrl: string;
  mapUrl: string;
  showUrl: string;
  route: NightSafariRoute[];
  tips: string[];
  faq: FAQ[];
}

interface NightSafariProps {
  nightSafari: NightSafari;
}

export default function NightSafari({ nightSafari }: NightSafariProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<Record<number, boolean>>({});
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const getActivityIcon = (activity: string) => {
    if (activity.includes('トラム')) return '🚋';
    if (activity.includes('ショー')) return '🎭';
    if (activity.includes('トレイル')) return '🐆';
    if (activity.includes('お土産')) return '🛍️';
    if (activity.includes('入場')) return '🎫';
    return '🌟';
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="space-y-8">
      {/* メインアクションボタン */}
      <div className="grid md:grid-cols-3 gap-4">
        <a
          href={nightSafari.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 p-6 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          aria-label="ナイトサファリの予約を新しいタブで開く"
        >
          <TicketIcon className="w-8 h-8" />
          <span className="text-lg font-semibold">予約</span>
          <span className="text-sm opacity-90">チケット購入</span>
        </a>

        <a
          href={nightSafari.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 p-6 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          aria-label="ナイトサファリの地図を新しいタブで開く"
        >
          <MapPinIcon className="w-8 h-8" />
          <span className="text-lg font-semibold">地図</span>
          <span className="text-sm opacity-90">アクセス方法</span>
        </a>

        <a
          href={nightSafari.showUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 p-6 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          aria-label="ナイトサファリのショー情報を新しいタブで開く"
        >
          <span className="text-2xl">🎭</span>
          <span className="text-lg font-semibold">ショー</span>
          <span className="text-sm opacity-90">上演スケジュール</span>
        </a>
      </div>

      {/* 推奨ルート - 発光スパイン付きタイムライン */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-lg">
        <h3 className="text-xl md:text-2xl font-poppins font-bold mb-6 flex items-center gap-3 tracking-tight">
          <span>🦁</span>
          推奨ルート
        </h3>
        
        <div className="relative">
          {/* 発光スパイン */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-blue-600 rounded-full opacity-60"></div>
          
          <div className="space-y-6">
            {nightSafari.route.map((route, index) => (
              <div key={index} className="flex items-start gap-6 relative">
                {/* タイムラインの点 */}
                <div className="flex-shrink-0 w-16 text-center relative">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg mx-auto relative z-10"></div>
                  <div className="text-lg font-bold text-blue-600 mt-2">{route.time}</div>
                </div>
                
                {/* コンテンツカード */}
                <div className="flex-1 bg-white/70 rounded-xl p-4 border border-white/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getActivityIcon(route.activity)}</span>
                    <h4 className="font-semibold text-slate-800">{route.activity}</h4>
                  </div>
                  {route.note && (
                    <p className="text-sm text-slate-600 leading-snug">{route.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-lg">
        <h3 className="text-xl md:text-2xl font-poppins font-bold mb-6 flex items-center gap-3 tracking-tight">
          <span>💡</span>
          お役立ちTips
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {nightSafari.tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors">
              <span className="text-yellow-600 text-lg">⚠️</span>
              <span className="text-sm text-yellow-800 leading-snug">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ - アコーディオン */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-lg">
        <h3 className="text-xl md:text-2xl font-poppins font-bold mb-6 flex items-center gap-3 tracking-tight">
          <span>❓</span>
          よくある質問
        </h3>
        
        <div className="space-y-3">
          {nightSafari.faq.map((faq, index) => (
            <div key={index} className="border border-white/30 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full bg-white/50 p-4 text-left hover:bg-white/70 transition-colors"
                aria-expanded={expandedFAQ[index] || false}
                aria-controls={`faq-${index}`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                    <span className="text-indigo-600">Q.</span>
                    {faq.q}
                  </h4>
                  {expandedFAQ[index] ? (
                    <ChevronUpIcon className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-indigo-600" />
                  )}
                </div>
              </button>
              
              {expandedFAQ[index] && (
                <div id={`faq-${index}`} className="bg-white/30 p-4 border-t border-white/30">
                  <p className="text-sm text-slate-700 leading-relaxed flex items-start gap-2">
                    <span className="text-green-600 font-bold">A.</span>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 注意事項バナー */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 border border-red-200">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-red-600 text-lg">⚠️</span>
          <h4 className="font-semibold text-red-800">重要なお知らせ</h4>
        </div>
        <div className="grid md:grid-cols-3 gap-2 text-sm text-red-700">
          <div className="flex items-center gap-2">
            <span>📸</span>
            <span>フラッシュ禁止</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🦟</span>
            <span>虫除け必須</span>
          </div>
          <div className="flex items-center gap-2">
            <span>👟</span>
            <span>足元注意</span>
          </div>
        </div>
      </div>
    </div>
  );
}
