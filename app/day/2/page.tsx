"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import { day2Data } from "@/data/day2";
import DayNightToggle from "@/components/DayNightToggle";
import AreaCard from "@/components/AreaCard";
import NightSafari from "@/components/NightSafari";

export default function Day2Page() {
  const [activeTab, setActiveTab] = useState(0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getNextDayId = () => {
    // Day2の次はDay3
    return '3';
  };

  const nextDayId = getNextDayId();

  return (
    <div className="min-h-screen text-slate-800 overflow-x-hidden bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section - 単一画像で固定比率 */}
      <section className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0">
          <img
            src="/image/day2_detail/day2-hero.jpg"
            alt="Day 2の美しい景色"
            className="w-full h-full object-cover pointer-events-none"
          />
          {/* グラデーションオーバーレイ（上→下の黒〜透明） */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        </div>
        
        {/* パンくず＋戻るボタン */}
        <div className="absolute top-4 left-4 z-20 pointer-events-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur-md border border-white/20 text-slate-800 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
          >
            ← トップに戻る
          </Link>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-poppins font-bold mb-4 tracking-tight drop-shadow-2xl">
            {day2Data.title}
          </h1>
            <p className="text-lg md:text-xl font-inter drop-shadow-lg">
            {formatDate(day2Data.date)}
          </p>
          </div>
        </div>
      </section>

      {/* Main Content - 最大幅コンテナで中央寄せ */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Day/Night Toggle */}
        <DayNightToggle
          tabs={day2Data.tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Day Tab Content */}
        {activeTab === 0 && (
          <div className="space-y-12">
            {/* エリア紹介 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8 flex items-center gap-3">
                <span>📍</span>
                エリア別モデルコース
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {day2Data.areas.map((area, index) => (
                  <AreaCard key={index} area={area} />
                ))}
              </div>
            </section>

            {/* ホーカー指南 */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8 flex items-center gap-3">
                <span>🍜</span>
                ホーカー指南
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {day2Data.hawkers.map((hawker, index) => (
                  <div key={index} className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-4 md:p-6 border border-white/20">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-800">{hawker.name}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        {hawker.price}
                      </span>
                </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">おすすめ</h4>
                      <ul className="space-y-1">
                        {hawker.picks.map((pick, idx) => (
                          <li key={idx} className="text-sm text-slate-700 flex items-start gap-2 leading-snug">
                            <span className="text-orange-500 mt-1">•</span>
                            {pick}
                          </li>
                        ))}
                      </ul>
              </div>
              
                    <a
                      href={hawker.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                      aria-label={`${hawker.name}の地図を新しいタブで開く`}
                    >
                      <span>地図を見る</span>
                      <ExternalLinkIcon className="w-4 h-4" />
                    </a>
                </div>
                ))}
              </div>
                                    </section>
                        
            {/* 次の日へ */}
            <section className="text-center">
              <Link
                href={`/day/${nextDayId}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-2xl hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                次の日へ
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
                        </section>
                      </div>
                    )}

                            {/* Night Tab Content */}
                    {activeTab === 1 && (
                      <div className="space-y-12">
            {/* ナイトサファリ攻略 */}
                        <section>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8 flex items-center gap-3">
                <span>🦁</span>
                ナイトサファリ攻略
                          </h2>
              
              <NightSafari nightSafari={day2Data.nightSafari} />
                        </section>
                        
            {/* 夜の動物たち */}
                        <section>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 flex items-center gap-3">
                            <span>🦁</span>
                            夜の動物たち
                          </h2>
                          
                          {/* Mobile: 横スクロールスライダー */}
                          <div className="md:hidden">
                            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4">
                              {/* フクロウ */}
                              <div className="flex-shrink-0 snap-start w-[85vw]">
                    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden">
                      <div className="aspect-[3/2] relative overflow-hidden">
                        <img
                          src="/image/day2_detail/night-safari/night-safari-owl.jpg"
                          alt="ナイトサファリのフクロウ"
                          className="w-full h-full object-cover"
                        />
                                  </div>
                                  <div className="p-4">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-2">フクロウ</h3>
                        <p className="text-sm text-slate-700 mb-3">夜行性の鳥類。静かに獲物を狙う</p>
                                    <div className="text-xs text-amber-600">🦉 夜の森の番人</div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* トラ */}
                              <div className="flex-shrink-0 snap-start w-[85vw]">
                    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden">
                      <div className="aspect-[3/2] relative overflow-hidden">
                        <img
                          src="/image/day2_detail/night-safari/night-safari-tiger.jpg"
                          alt="ナイトサファリのトラ"
                          className="w-full h-full object-cover"
                        />
                                  </div>
                                  <div className="p-4">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-2">トラ</h3>
                        <p className="text-sm text-slate-700 mb-3">夜間に活動する大型ネコ科動物</p>
                                    <div className="text-xs text-orange-600">🐅 夜の王者</div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* シカ */}
                              <div className="flex-shrink-0 snap-start w-[85vw]">
                    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden">
                      <div className="aspect-[3/2] relative overflow-hidden">
                        <img
                          src="/image/day2_detail/night-safari/night-safari-deer.jpg"
                          alt="ナイトサファリのシカ"
                          className="w-full h-full object-cover"
                        />
              </div>
                                  <div className="p-4">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-2">シカ</h3>
                        <p className="text-sm text-slate-700 mb-3">夜間に草を食べる草食動物</p>
                                    <div className="text-xs text-brown-600">🦌 夜の草食者</div>
              </div>
            </div>
          </div>
        </div>
                            
                            {/* インジケーター */}
                            <div className="flex justify-center gap-2 mt-4">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                            </div>
                          </div>
                          
                          {/* Desktop: 3列グリッド */}
                          <div className="hidden md:grid md:grid-cols-3 gap-6">
                            {/* フクロウ */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden">
                  <div className="aspect-[3/2] relative overflow-hidden">
                    <img
                      src="/image/day2_detail/night-safari/night-safari-owl.jpg"
                      alt="ナイトサファリのフクロウ"
                      className="w-full h-full object-cover"
                    />
                              </div>
                              <div className="p-6">
                                <h3 className="text-xl font-semibold text-slate-800 mb-3">フクロウ</h3>
                    <p className="text-sm text-slate-700 mb-4">夜行性の鳥類。静かに獲物を狙う</p>
                                <div className="text-sm text-amber-600">🦉 夜の森の番人</div>
                              </div>
                            </div>
                            
                            {/* トラ */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden">
                  <div className="aspect-[3/2] relative overflow-hidden">
                    <img
                      src="/image/day2_detail/night-safari/night-safari-tiger.jpg"
                      alt="ナイトサファリのトラ"
                      className="w-full h-full object-cover"
                    />
                              </div>
                              <div className="p-6">
                                <h3 className="text-xl font-semibold text-slate-800 mb-3">トラ</h3>
                    <p className="text-sm text-slate-700 mb-4">夜間に活動する大型ネコ科動物</p>
                                <div className="text-sm text-orange-600">🐅 夜の王者</div>
                              </div>
                            </div>
                            
                            {/* シカ */}
                <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden">
                  <div className="aspect-[3/2] relative overflow-hidden">
                    <img
                      src="/image/day2_detail/night-safari/night-safari-deer.jpg"
                      alt="ナイトサファリのシカ"
                      className="w-full h-full object-cover"
                    />
                              </div>
                              <div className="p-6">
                                <h3 className="text-xl font-semibold text-slate-800 mb-3">シカ</h3>
                    <p className="text-sm text-slate-700 mb-4">夜間に活動する草食動物</p>
                                <div className="text-sm text-brown-600">🦌 夜の草食者</div>
                              </div>
                            </div>
                          </div>
                        </section>

        {/* 便利リンク */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 flex items-center gap-3">
            <span>🔗</span>
            便利リンク
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {day2Data.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white/70 rounded-xl border border-white/30 hover:bg-white/90 transition-all duration-300 group shadow-sm"
                aria-label={`${link.label}を新しいタブで開く`}
              >
                <span className="font-medium text-slate-800">{link.label}</span>
                <ExternalLinkIcon className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* 次の日へ */}
        <section className="text-center mt-16">
          <Link
            href={`/day/${nextDayId}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-2xl hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            次の日へ
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </section>
          </div>
        )}
      </div>
    </div>
  );
}
