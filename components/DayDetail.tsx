"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon, MapPinIcon, CameraIcon, ArrowRightIcon } from "lucide-react";
import { DayData, days } from "@/data/days";
import CasinoGuide from "./CasinoGuide";

interface DayDetailProps {
  dayData: DayData;
}

export default function DayDetail({ dayData }: DayDetailProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    pool: false,
    photo: false,
  });
  
  const [activeDinnerTab, setActiveDinnerTab] = useState<'asia' | 'western' | 'foodcourt'>('asia');
  const [memo, setMemo] = useState<string>('');

  // バー・ラウンジデータ
  const bars: Array<{
    name: string;
    vibe: string;
    price: '$' | '$$' | '$$$';
    signature: string;
    viewScore: number;
    mapUrl: string;
    reserveUrl?: string;
  }> = [
    {
      name: 'Spago',
      vibe: 'エレガント',
      price: '$$$',
      signature: 'Spago Spritz',
      viewScore: 5,
      mapUrl: 'https://maps.google.com/?q=Marina+Bay+Sands+Singapore',
      reserveUrl: 'https://www.marinabaysands.com/restaurants/spago.html'
    },
    {
      name: 'LAVO',
      vibe: 'ルーフトップ',
      price: '$$$',
      signature: 'LAVO Martini',
      viewScore: 5,
      mapUrl: 'https://maps.google.com/?q=Marina+Bay+Sands+Singapore',
      reserveUrl: 'https://lavosingapore.com/'
    },
    {
      name: 'CÉ LA VI',
      vibe: 'トレンディ',
      price: '$$',
      signature: 'Singapore Sling',
      viewScore: 4,
      mapUrl: 'https://maps.app.goo.gl/...'
    },
    {
      name: 'Ku Dé Ta',
      vibe: 'アジアン',
      price: '$$',
      signature: 'Lychee Martini',
      viewScore: 4,
      mapUrl: 'https://maps.app.goo.gl/...'
    }
  ];

  // カジノデータ
  const casino = {
    tabs: ["入場・ルール", "サンズリワーズ", "ゲーム別", "エチケット", "リンク"],
    games: [
      {
        key: "baccarat",
        name: "バカラ",
        minBet: "S$20〜",
        basics: ["プレイヤーかバンカーにベット", "9に近い方が勝ち", "自然8・9は即決"],
        avoid: ["タイにベット（配当率が低い）"],
        edge: "目安: バンカー 1.06%",
        strategy: {
          core: ["基本はBanker固定（手数料込みでも最小エッジ）", "Tie/ペア系は回避（高配当=高エッジ）"],
          whenToBet: ["テーブルがNo-Commissionなら、Banker 0勝ち条件を確認してからBanker継続", "連敗でのプログレッシブはしない（資金が飛びやすい）"],
          avoid: ["トレンド表への過信", "Tie/ペアへの常用"],
          table: ["Commission有でもOK／No-Com時は例外ルール要確認"],
          risk: "low" as const
        }
      },
      {
        key: "blackjack",
        name: "ブラックジャック",
        minBet: "S$20〜",
        basics: ["21に近づける", "Aは1または11", "ディーラーは17以上でスタンド"],
        avoid: ["インシュランス（配当率が悪い）"],
        edge: "目安: 基本戦略で 0.5%",
        strategy: {
          core: ["基本戦略に忠実（配布表を参照）", "インシュランス禁止（-EV）"],
          whenToBet: ["11はダブル（ディーラーA除く）", "A,8/A,9はスタンド", "ペア5は分割しない／ペア8は分割"],
          avoid: ["テーブルルール不明での着席", "連続負けのベット上げ"],
          table: ["S17/ 6D/ ダブル後ヒット可の台を優先"],
          risk: "low" as const
        }
      },
      {
        key: "roulette",
        name: "ルーレット",
        minBet: "S$5〜",
        basics: ["赤/黒、奇/偶、1-18/19-36", "0は緑（ハウスエッジ）", "ヨーロピアンが有利"],
        avoid: ["5ナンバーベット（配当率が悪い）"],
        edge: "目安: ヨーロピアン 2.7%",
        strategy: {
          core: ["European(単ゼロ)を選択", "Outsideベット中心（赤黒/偶奇/大小）"],
          whenToBet: ["長居するなら偶奇/赤黒のフラットベット", "短時間の一発はコラム/ダズン"],
          avoid: ["American(00)", "5ナンバーベット"],
          table: ["La Partage/En Prisonがあれば最良"],
          risk: "mid" as const
        }
      },
      {
        key: "sicbo",
        name: "大小",
        minBet: "S$5〜",
        basics: ["3個のサイコロの合計", "4-10が小、11-17が大", "ゾロ目は特別配当"],
        avoid: ["単一数字（配当率が悪い）"],
        edge: "目安: 大小 2.78%",
        strategy: {
          core: ["Small/Big中心（比較的低エッジ）"],
          whenToBet: ["余裕があれば9/12の組合せ（カジノによりエッジ低め）を少額"],
          avoid: ["トリプル/シングル番号一点張りの常用"],
          table: ["配当表でハウスエッジ差を事前確認"],
          risk: "mid" as const
        }
      }
    ],
    links: [
      { label: "公式サイト", url: "https://www.marinabaysands.com/casino.html" },
      { label: "ハウスルールPDF", url: "https://www.marinabaysands.com/casino/rules.html" },
      { label: "フロアマップ", url: "https://www.marinabaysands.com/casino/floor-plan.html" },
      { label: "Responsible Gaming", url: "https://www.marinabaysands.com/casino/responsible-gaming.html" },
      { label: "サンズリワーズ", url: "https://www.sandsrewards.com/" }
    ],
    notes: {
      entry: ["パスポート必須", "服装はスマートカジュアル", "観光客の入場税は要最新確認"],
      etiquette: ["ベット締切後はチップに触れない", "写真可否は台ごとに異なる", "ディーラーの合図に合わせる"]
    },
    videoUrl: "https://www.youtube.com/embed/example",
    bankroll: { defaultStake: 20, min: 10, max: 200 }
  };

  // タイムライン用の画像マッピング（日別）
  const getTimelineImages = (dayId: string) => {
    const day1Images = {
      '09:00': '/image/day1_detail/day1-lobby.jpg',
      '10:00': '/image/day1_detail/day1-merlion.jpg',
      '11:00': '/image/day1_detail/day1-gbb-dome.jpg',
      '13:00': '/image/day1_detail/day1-lunch.jpg',
      '15:00': '/image/day1_detail/day1-shoppes.jpg',
      '16:30': '/image/day1_detail/day1-lobby.jpg',
      '17:30': '/image/day1_detail/day1-infinity-pool.jpg',
      '19:00': '/image/day1_detail/day1-skybar.jpg',
      '21:30': '/image/day1_detail/day1-casino.jpg',
    };

    const day3Images = {
      '09:00': '/image/day3_detail/day3-uss.jpg',
      '14:00': '/image/day3_detail/day3-uss.jpg',
      '15:00': '/image/day3_detail/day3-skyline-luge.jpg',
      '16:00': '/image/day3_detail/day3-sea-aquarium.jpg',
      '17:30': '/image/day3_detail/day3-beach.jpg',
      '19:40': '/image/day3_detail/day3-wings-of-time.webp',
      '21:00': '/image/day3_detail/day3-dinner.jpg',
    };

    switch (dayId) {
      case '1':
        return day1Images;
      case '3':
        return day3Images;
      default:
        return {};
    }
  };

  const timelineImages = getTimelineImages(dayData.id);

  // セクションへのスクロール関数
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // localStorageからデータを読み込み
  useEffect(() => {
    const savedMemo = localStorage.getItem(`day${dayData.id}-memo`);
    
    if (savedMemo) {
      setMemo(savedMemo);
    }
  }, [dayData.id]);

  // メモの更新をlocalStorageに保存
  const updateMemo = (newMemo: string) => {
    setMemo(newMemo);
    localStorage.setItem(`day${dayData.id}-memo`, newMemo);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getPriceColor = (price: string) => {
    switch (price) {
      case '$': return 'text-green-600';
      case '$$': return 'text-yellow-600';
      case '$$$': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAreaColor = (area: string) => {
    switch (area) {
      case 'asia': return 'bg-orange-500/20 text-orange-700 border-orange-500/30';
      case 'western': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'foodcourt': return 'bg-green-500/20 text-green-700 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  // 次の日のIDを取得
  const getNextDayId = () => {
    const currentIndex = Object.keys(days).indexOf(dayData.id);
    const nextIndex = (currentIndex + 1) % Object.keys(days).length;
    return Object.keys(days)[nextIndex];
  };

  // 前の日のIDを取得
  const getPrevDayId = () => {
    const currentIndex = Object.keys(days).indexOf(dayData.id);
    const prevIndex = currentIndex === 0 ? Object.keys(days).length - 1 : currentIndex - 1;
    return Object.keys(days)[prevIndex];
  };

  const nextDayId = getNextDayId();
  const prevDayId = getPrevDayId();
  const nextDayData = days[nextDayId];
  const prevDayData = days[prevDayId];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      {/* Hero Section */}
      <section className="relative h-[48vh] md:h-[56vh]">
        <Image
          src={dayData.hero}
          alt={`${dayData.title}のヒーロー画像`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        
        {/* Back to Top Button */}
        <div className="absolute top-6 left-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur-md border border-white/20 text-slate-800 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
          >
            ← トップに戻る
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-2 text-white">
              {dayData.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-inter">
              {formatDate(dayData.date)}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 shadow-lg">
            <div className="text-2xl mb-2">⏰</div>
            <div className="text-sm text-slate-600">所要時間</div>
            <div className="font-semibold text-slate-800">{dayData.quick.duration}</div>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 shadow-lg">
            <div className="text-2xl mb-2">👟</div>
            <div className="text-sm text-slate-600">歩数</div>
            <div className="font-semibold text-slate-800">{dayData.quick.steps}</div>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 shadow-lg">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-sm text-slate-600">予算</div>
            <div className="font-semibold text-slate-800">{dayData.quick.budget}</div>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 shadow-lg">
            <div className="text-2xl mb-2">👔</div>
            <div className="text-sm text-slate-600">服装</div>
            <div className="font-semibold text-xs text-slate-800">{dayData.quick.dress}</div>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 shadow-lg">
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-sm text-slate-600">ベスト</div>
            <div className="font-semibold text-slate-800">{dayData.quick.best}</div>
          </div>
        </div>

        {/* サマリー */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">📋 日程サマリー</h2>
          <p className="text-slate-700 leading-relaxed">{dayData.quick.duration}の旅程</p>
        </div>


        {/* Timeline and Tickets Section - 2 Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Timeline */}
          <section className="bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 flex items-center gap-3">
              <span>📅</span>
              タイムライン
            </h2>
            
            <div className="relative">
              {/* Vertical Timeline Line - Sticky */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-300" style={{ position: 'sticky', top: '50%', transform: 'translateY(-50%)' }}></div>
              
              <div className="space-y-3 md:space-y-6">
                {dayData.timeline.map((slot, index) => (
                  <div 
                    key={index} 
                    className="group relative flex items-start gap-3 md:gap-4 p-2 md:p-3 rounded-xl hover:bg-white/30 transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      // 関連セクションへのスクロール
                      if (slot.title.includes('プール')) scrollToSection('pool-section');
                      else if (slot.title.includes('カジノ')) scrollToSection('casino-section');
                      else if (slot.title.includes('写真')) scrollToSection('photo-section');
                      else if (slot.title.includes('ディナー')) scrollToSection('dinners-section');
                    }}
                  >
                    {/* Timeline Dot with Thumb */}
                    <div className="relative z-10">
                      {timelineImages[slot.time as keyof typeof timelineImages] ? (
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-sm hover:scale-[1.02] transition-transform duration-300">
                          <Image
                            src={timelineImages[slot.time as keyof typeof timelineImages]}
                            alt={slot.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            sizes="(max-width: 768px) 40px, 48px"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-sm">
                          {slot.emoji}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 pt-1 md:pt-2 min-h-[56px] md:min-h-0 flex flex-col justify-center">
                      <div className="flex items-center gap-2 md:gap-3 mb-1">
                        {slot.time && (
                          <span className="text-xs md:text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-mono font-medium">
                            {slot.time}
                          </span>
                        )}
                        <h3 className="font-semibold text-base md:text-lg text-slate-800">{slot.title}</h3>
                      </div>
                      {slot.note && (
                        <p className="text-xs md:text-sm text-gray-500 italic flex items-center gap-1">
                          <span>📝</span>
                          {slot.note}
                        </p>
                      )}
                      {slot.mapUrl && (
                        <div className="mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(slot.mapUrl, '_blank');
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors"
                          >
                            <span>🗺️</span>
                            <span>地図で開く</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right Column - Tickets & Links */}
          <section className="bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-serif font-bold flex items-center gap-3">
                <span>🎫</span>
                チケット・公式リンク
              </h2>
              <button
                onClick={() => {
                  const urls = dayData.tickets.map(ticket => ticket.href).join('\n');
                  navigator.clipboard.writeText(urls).then(() => {
                    alert('すべてのリンクをクリップボードにコピーしました！');
                  });
                }}
                className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                aria-label="すべてのリンクをクリップボードにコピー"
              >
                リンクをすべて保存
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dayData.tickets.map((ticket, index) => (
                <a
                  key={index}
                  href={ticket.href}
                  target={ticket.ext ? "_blank" : "_self"}
                  rel={ticket.ext ? "noopener noreferrer" : ""}
                  className="group relative p-4 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label={`${ticket.label}を${ticket.ext ? '新しいタブで' : ''}開く`}
                >
                  {/* Category Chip */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                      {ticket.ext ? '公式' : '予約'}
                    </span>
                  </div>
                  
                  {/* External Link Icon */}
                  {ticket.ext && (
                    <div className="absolute top-3 right-3">
                      <span className="text-lg">↗</span>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="pt-6">
                    <span className="font-medium text-slate-800 text-sm leading-relaxed">{ticket.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-6 mb-12">
          {/* Pool & SkyPark Section */}
          <section id="pool-section" className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden">
            <button
              onClick={() => toggleSection('pool')}
              className="flex items-center justify-between w-full text-left p-6 md:p-8"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold flex items-center gap-3">
                <span>🏊</span>
                インフィニティプール & SkyPark
              </h2>
              {expandedSections.pool ? (
                <ChevronUpIcon className="w-6 h-6 text-slate-600" />
              ) : (
                <ChevronDownIcon className="w-6 h-6 text-slate-600" />
              )}
            </button>
            
            {expandedSections.pool && (
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <div className="space-y-6">
                  {/* Best Time Tips */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">ベストタイム</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl mb-2">🌅</div>
                        <h4 className="font-semibold text-slate-800 mb-2">朝焼け</h4>
                        <p className="text-sm text-slate-600">6:00-8:00<br/>空いている</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-2">🌆</div>
                        <h4 className="font-semibold text-slate-800 mb-2">夕暮れ</h4>
                        <p className="text-sm text-slate-600">17:30-19:00<br/>混雑ピーク</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-2">🌃</div>
                        <h4 className="font-semibold text-slate-800 mb-2">夜景</h4>
                        <p className="text-sm text-slate-600">20:00-23:00<br/>涼しく快適</p>
                      </div>
                    </div>
                  </div>

                  {/* Crowd Meter */}
                  <div className="bg-white/70 rounded-xl p-6 border border-white/30">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">混雑メーター</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">6:00-9:00</span>
                        <div className="flex gap-1">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                        </div>
                        <span className="text-sm text-green-600 font-medium">空いている</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">15:00-19:00</span>
                        <div className="flex gap-1">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        </div>
                        <span className="text-sm text-red-600 font-medium">混雑</span>
                      </div>
                    </div>
                  </div>

                  {/* Photo Spots */}
                  <div className="bg-white/70 rounded-xl p-6 border border-white/30">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">撮影スポット</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                        <div className="text-2xl mb-2">📸</div>
                        <h4 className="font-semibold text-slate-800 mb-2">プールエッジ</h4>
                        <p className="text-sm text-slate-600">シンガポールの街並みを背景に</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                        <div className="text-2xl mb-2">📸</div>
                        <h4 className="font-semibold text-slate-800 mb-2">SkyPark</h4>
                        <p className="text-sm text-slate-600">57階からの絶景パノラマ</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <a
                      href="https://www.marinabaysands.com/attractions/skypark.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 p-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                      aria-label="SkyPark公式サイトを新しいタブで開く"
                    >
                      <span>SkyPark公式</span>
                      <span>↗</span>
                    </a>
                    <a
                      href="https://www.marinabaysands.com/hotel/infinity-pool.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                      aria-label="宿泊者プール案内を新しいタブで開く"
                    >
                      <span>プール案内</span>
                      <span>↗</span>
                    </a>
                    <a
                      href="https://www.marinabaysands.com/hotel/amenities.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 p-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium"
                      aria-label="ロッカールールを新しいタブで開く"
                    >
                      <span>ロッカールール</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </section>



          {/* Photo Section */}
          <section id="photo-section" className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden">
            <button
              onClick={() => toggleSection('photo')}
              className="flex items-center justify-between w-full text-left p-6 md:p-8"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold flex items-center gap-3">
                <span>📸</span>
                写真撮影のコツ
              </h2>
              {expandedSections.photo ? (
                <ChevronUpIcon className="w-6 h-6 text-slate-600" />
              ) : (
                <ChevronDownIcon className="w-6 h-6 text-slate-600" />
              )}
            </button>
            
            {expandedSections.photo && (
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <div className="space-y-4">
                  {dayData.photo.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white/50 rounded-xl border border-white/30">
                      <CameraIcon className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-700 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

                    {/* Bars & Lounges Section */}
          <section className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 flex items-center gap-3">
                <span>🍸</span>
                バー & ラウンジ
              </h2>
              
              {/* Mobile: Horizontal Scroll */}
              <div className="md:hidden">
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4">
                  {bars.map((bar, index) => (
                    <div key={index} className="flex-shrink-0 snap-start w-80">
                      <div className="bg-white/70 rounded-2xl p-4 border border-white/30 shadow-lg">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-lg text-slate-800">{bar.name}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            bar.price === '$' ? 'bg-green-100 text-green-700' :
                            bar.price === '$$' ? 'bg-yellow-100 text-yellow-700' :
                            bar.price === '$$$' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {bar.price}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{bar.vibe}</p>
                        <p className="text-sm text-slate-700 mb-3">推し: {bar.signature}</p>
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < bar.viewScore ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                          <span className="text-sm text-slate-600 ml-2">眺望</span>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={bar.mapUrl}
                            target="_blank"
                              rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 p-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                            aria-label={`${bar.name}の地図を新しいタブで開く`}
                          >
                            <MapPinIcon className="w-4 h-4" />
                            Maps
                          </a>
                          {bar.reserveUrl && (
                            <a
                              href={bar.reserveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 p-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                              aria-label={`${bar.name}の予約を新しいタブで開く`}
                            >
                              <span>予約</span>
                              <span>↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop: Grid Layout */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
                {bars.map((bar, index) => (
                  <div key={index} className="bg-white/70 rounded-2xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg text-slate-800">{bar.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        bar.price === '$' ? 'bg-green-100 text-green-700' :
                        bar.price === '$$' ? 'bg-yellow-100 text-yellow-700' :
                        bar.price === '$$$' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {bar.price}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{bar.vibe}</p>
                    <p className="text-sm text-slate-700 mb-3">推し: {bar.signature}</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < bar.viewScore ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                      <span className="text-sm text-slate-600 ml-2">眺望</span>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={bar.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 p-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                        aria-label={`${bar.name}の地図を新しいタブで開く`}
                      >
                        <MapPinIcon className="w-4 h-4" />
                        Maps
                      </a>
                      {bar.reserveUrl && (
                        <a
                          href={bar.reserveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 p-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                          aria-label={`${bar.name}の予約を新しいタブで開く`}
                        >
                          <span>予約</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Casino Guide Section */}
        <CasinoGuide casino={casino} />

        {/* Dinners Section with Tabs */}
        <section id="dinners-section" className="bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-12 border border-white/20 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 flex items-center gap-3">
            <span>🍽️</span>
            ディナー選択肢
          </h2>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-white/50 rounded-xl p-1">
            {[
              { key: 'asia', label: 'アジア料理' },
              { key: 'western', label: '欧米料理' },
              { key: 'foodcourt', label: 'フードコート' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveDinnerTab(tab.key as 'asia' | 'western' | 'foodcourt')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeDinnerTab === tab.key
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {dayData.dinners
              .filter(dinner => dinner.area === activeDinnerTab)
              .map((dinner, index) => (
                <div key={index} className="bg-white/50 rounded-xl p-4 border border-white/30">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg text-slate-800">{dinner.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAreaColor(dinner.area)}`}>
                      {dinner.area === 'asia' ? 'アジア' : dinner.area === 'western' ? '西洋' : 'フードコート'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-lg font-bold ${getPriceColor(dinner.price)}`}>
                      {dinner.price}
                    </span>
                    {dinner.tip && (
                      <span className="text-sm text-slate-600">💡 {dinner.tip}</span>
                    )}
                  </div>
                  {dinner.href && (
                    <a
                      href={dinner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      詳細を見る
                      <ExternalLinkIcon className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
          </div>
        </section>

        {/* Map Links Section */}
        <section id="map-section" className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 flex items-center gap-3">
            <span>🗺️</span>
            地図・ナビ
          </h2>
          
          <div className="space-y-4">
            {dayData.mapLinks.map((mapLink, index) => (
              <a
                key={index}
                href={mapLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-300 group shadow-sm"
                aria-label={`${mapLink.label}を新しいタブで開く`}
              >
                <div className="flex items-center gap-3">
                  <MapPinIcon className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-slate-800">{mapLink.label}</span>
                </div>
                <ExternalLinkIcon className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* Memo Section */}
        <section className="bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-12 border border-white/20 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 flex items-center gap-3">
            <span>📝</span>
            メモ
          </h2>
          
          <textarea
            value={memo}
            onChange={(e) => updateMemo(e.target.value)}
            placeholder="当日のメモや気づいたことを記録してください..."
            className="w-full h-32 p-4 bg-white/50 rounded-xl border border-white/30 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-slate-700 placeholder-slate-500"
          />
        </section>


        {/* Navigation Section */}
        <section className="text-center space-y-6">
          {/* Previous Day Navigation */}
          {prevDayData && (
            <div>
              <Link
                href={`/day/${prevDayId}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-600 text-white rounded-full hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                <ArrowRightIcon className="w-5 h-5 rotate-180" />
                <span>前の日へ</span>
              </Link>
              <p className="text-slate-600 mt-3 font-inter">
                {prevDayData.title}
              </p>
            </div>
          )}

          {/* Next Day Navigation */}
          {nextDayData && (
            <div>
              <Link
                href={`/day/${nextDayId}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                <span>次の日へ</span>
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <p className="text-slate-600 mt-3 font-inter">
                {nextDayData.title}
              </p>
            </div>
          )}

          {/* Home Button for Day 3 */}
          {dayData.id === "3" && (
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                <span>🏠</span>
                <span>ホームに戻る</span>
              </Link>
              <p className="text-slate-600 mt-3 font-inter">
                トップページに戻る
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Mobile Mini FABs */}
      <div className="md:hidden fixed bottom-4 right-4 flex flex-col gap-3 z-50">
        {/* Map FAB */}
        <button
          onClick={() => scrollToSection('map-section')}
          className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
          aria-label="地図セクションに移動"
        >
          <MapPinIcon className="w-6 h-6" />
        </button>
        
        {/* Map FAB */}
        <button
          onClick={() => scrollToSection('map-section')}
          className="w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center"
          aria-label="地図セクションに移動"
        >
          <MapPinIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
