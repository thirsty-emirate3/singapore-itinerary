"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRightIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SummerBackground from "@/components/day3/SummerBackground";
import SectionNavigator from "@/components/day3/SectionNavigator";
import CoupleGuide from "@/components/CoupleGuide";

import { navigationSections } from "@/data/day3-summer";
import { day3Photos } from "@/data/day3";

export default function Day3Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // タブの定義
  const tabs = [
    { id: 'overview', label: '概要', icon: '🏝️' },
    { id: 'uss', label: 'USS', icon: '🎢' },
    { id: 'luge', label: 'リュージュ', icon: '🛷' },
    { id: 'aquarium', label: 'アクアリウム', icon: '🐠' },
    { id: 'beach', label: 'ビーチ', icon: '🏖️' },
    { id: 'evening', label: '夕方・夜', icon: '🌅' },
    { id: 'gallery', label: 'ギャラリー', icon: '📸' },
    { id: 'couple', label: 'カップルガイド', icon: '💕' }
  ];

  // スクロール位置に応じてトップボタンの表示/非表示を制御
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 500);
      
      // スクロールスパイ機能
      const scrollPosition = window.scrollY + 200;
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index]?.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }
    setActiveTab(index);
  };

  const nextTab = () => {
    const nextIndex = (activeTab + 1) % tabs.length;
    scrollToSection(nextIndex);
  };

  const prevTab = () => {
    const prevIndex = (activeTab - 1 + tabs.length) % tabs.length;
    scrollToSection(prevIndex);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-blue-200 to-orange-200 text-slate-800 overflow-x-hidden">
      {/* 夏の背景演出 */}
      <SummerBackground />
      
      {/* セクションナビゲーター */}
      <SectionNavigator sections={navigationSections} />

      {/* メインコンテナ - 最大幅で中央寄せ */}
      <div className="max-w-[1200px] mx-auto px-4">
        {/* ヒーローセクション */}
        <section className="relative min-h-[40vh] md:min-h-[45vh] overflow-hidden rounded-2xl mb-6">
          <div className="relative w-full h-full">
            <Image
              src="/image/day3_detail/day3-hero.jpg"
              alt="セントーサ島の朝（Day3 ヒーロー）"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          </div>
          
          {/* パンくず＋戻るボタン */}
          <div className="absolute top-4 left-4 z-20 pointer-events-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur-md border border-white/20 text-slate-800 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              トップに戻る
            </Link>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
            <div>
              <h1 className="text-2xl md:text-4xl font-poppins font-bold mb-4 tracking-tight drop-shadow-2xl">
                セントーサ島の冒険
              </h1>
              <p className="text-base md:text-lg font-inter drop-shadow-lg">
                2025年9月29日月曜日
              </p>
            </div>
          </div>
        </section>

        {/* 進捗インジケータ */}
        <div className="mb-4">
          <div className="flex items-center justify-between bg-white/60 backdrop-blur rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">
                {tabs[activeTab]?.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">
                {activeTab + 1} / {tabs.length}
              </span>
              <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-full transition-all duration-300"
                  style={{ width: `${((activeTab + 1) / tabs.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* スクロールスパイ付きチップバー */}
        <div className="mb-6">
          <div className="relative">
            <div className="flex overflow-x-auto scrollbar-hide bg-white/80 backdrop-blur rounded-2xl p-2 shadow-lg gap-1">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(index)}
                  className={`flex-shrink-0 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                    activeTab === index
                      ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg scale-105'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* タブコンテンツ */}
        <div className="min-h-[60vh]">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              ref={(el) => { sectionRefs.current[index] = el; }}
              className={`${activeTab === index ? 'block' : 'hidden'}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* 概要タブ */}
                  {activeTab === 0 && (
                    <div className="space-y-6">
                  {/* メイン情報カード */}
                  <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span>🏝️</span>
                      セントーサ島の一日
                    </h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      セントーサ島はシンガポールの南に位置するリゾートアイランド。USS、スカイライン・リュージュ、S.E.A.アクアリウムなど、一日中楽しめるアトラクションが満載です。
                    </p>
                    
                    {/* 天気情報 */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">☀️</span>
                          <div>
                            <p className="font-semibold text-slate-800">参考天気情報</p>
                            <p className="text-sm text-slate-600">シンガポールの一般的な天気</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-600">気温</p>
                          <p className="text-lg font-bold text-orange-600">25-32°C</p>
                        </div>
                      </div>
                    </div>

                    {/* 詳細タイムライン */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                          <span>🌅</span>
                          午前の予定
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">9:00</div>
                            <div>
                              <p className="font-medium text-slate-800">USS開園</p>
                              <p className="text-sm text-slate-600">早めの入園で人気アトラクションを先に体験</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">10:00</div>
                            <div>
                              <p className="font-medium text-slate-800">アトラクション体験</p>
                              <p className="text-sm text-slate-600">トランスフォーマー、バトルスター・ガラクティカ</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">12:00</div>
                            <div>
                              <p className="font-medium text-slate-800">ランチ</p>
                              <p className="text-sm text-slate-600">パーク内レストランで休憩</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                          <span>🌇</span>
                          午後の予定
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">14:00</div>
                            <div>
                              <p className="font-medium text-slate-800">スカイライン・リュージュ</p>
                              <p className="text-sm text-slate-600">海を見ながらスリル満点の滑走</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg">
                            <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">15:30</div>
                            <div>
                              <p className="font-medium text-slate-800">S.E.A.アクアリウム</p>
                              <p className="text-sm text-slate-600">世界最大級の水槽で海洋生物観察</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
                            <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">17:00</div>
                            <div>
                              <p className="font-medium text-slate-800">ビーチ散策</p>
                              <p className="text-sm text-slate-600">シロソ・ビーチでサンセットタイム</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 地図とアクセス情報 */}
                  <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <span>🗺️</span>
                      アクセス情報
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">セントーサ島への行き方</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <span className="text-2xl">🚠</span>
                            <div>
                              <p className="font-medium">ケーブルカー</p>
                              <p className="text-sm text-slate-600">マウント・フェーバーから約15分</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <span className="text-2xl">🚇</span>
                            <div>
                              <p className="font-medium">MRT + モノレール</p>
                              <p className="text-sm text-slate-600">ハーバーフロント駅から約5分</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <span className="text-2xl">🚗</span>
                            <div>
                              <p className="font-medium">車・タクシー</p>
                              <p className="text-sm text-slate-600">シンガポール本島から約20分</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">島内移動</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <span className="text-2xl">🚌</span>
                            <div>
                              <p className="font-medium">無料シャトルバス</p>
                              <p className="text-sm text-slate-600">主要スポット間を巡回</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <span className="text-2xl">🚶</span>
                            <div>
                              <p className="font-medium">徒歩</p>
                              <p className="text-sm text-slate-600">各アトラクション間は徒歩圏内</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <span className="text-2xl">🚠</span>
                            <div>
                              <p className="font-medium">スカイライン</p>
                              <p className="text-sm text-slate-600">高台からの絶景移動</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 持ち物チェックリスト */}
                  <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <span>🎒</span>
                      持ち物チェックリスト
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">必須アイテム</h4>
                        <div className="space-y-2">
                          {['日焼け止め', '帽子・サングラス', '水筒', 'カメラ・スマホ', '現金・クレジットカード'].map((item, index) => (
                            <label key={index} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                              <span className="text-slate-700">{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">あると便利</h4>
                        <div className="space-y-2">
                          {['タオル', '着替え', 'ポータブル充電器', '雨具', '常備薬'].map((item, index) => (
                            <label key={index} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                              <span className="text-slate-700">{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                      {/* ナビゲーションボタン */}
                      <div className="flex justify-between">
                        <button
                          onClick={prevTab}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          前へ
                        </button>
                        <button
                          onClick={nextTab}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          次へ
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* USSタブ */}
                  {activeTab === 1 && (
                    <div className="space-y-6">
                      {/* メイン情報 */}
                      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                          <span>🎢</span>
                          ユニバーサル・スタジオ・シンガポール
                        </h2>
                        <p className="text-slate-700 leading-relaxed mb-6">
                          アジア初のユニバーサル・スタジオ。ハリウッドの名作映画をテーマにしたアトラクションが楽しめます。
                        </p>
                        
                        {/* 営業時間・料金情報 */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                              <span>🕐</span>
                              営業時間
                            </h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-slate-600">平日</span>
                                <span className="font-medium">10:00 - 19:00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">土日祝</span>
                                <span className="font-medium">10:00 - 20:00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">夏休み期間</span>
                                <span className="font-medium">10:00 - 21:00</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                              <span>💰</span>
                              入場料金
                            </h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-slate-600">大人（12歳以上）</span>
                                <span className="font-medium">S$82</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">子供（4-11歳）</span>
                                <span className="font-medium">S$62</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">シニア（60歳以上）</span>
                                <span className="font-medium">S$62</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 待ち時間情報 */}
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6">
                          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            <span>⏰</span>
                            参考待ち時間（目安）
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <p className="text-sm text-slate-600">トランスフォーマー</p>
                              <p className="text-lg font-bold text-red-600">30-60分</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-slate-600">バトルスター</p>
                              <p className="text-lg font-bold text-orange-600">20-45分</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-slate-600">ジュラシック</p>
                              <p className="text-lg font-bold text-yellow-600">15-30分</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-slate-600">ミニオン</p>
                              <p className="text-lg font-bold text-green-600">10-25分</p>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 text-center">※実際の待ち時間は日時により異なります</p>
                        </div>
                      </div>

                      {/* アトラクション詳細 */}
                      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                          <span>🎯</span>
                          人気アトラクション詳細
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="border border-slate-200 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span className="text-red-500">🤖</span>
                                トランスフォーマー・ザ・ライド
                              </h4>
                              <p className="text-sm text-slate-600 mb-3">3Dシミュレーターライド</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <span>⏱️</span>
                                  <span>4分</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <span>👥</span>
                                  <span>4人/車両</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <span>📏</span>
                                  <span>102cm以上</span>
                                </span>
                              </div>
                            </div>
                            
                            <div className="border border-slate-200 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span className="text-blue-500">🚀</span>
                                バトルスター・ガラクティカ
                              </h4>
                              <p className="text-sm text-slate-600 mb-3">世界最高のローラーコースター</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <span>⏱️</span>
                                  <span>2分</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <span>👥</span>
                                  <span>2人/車両</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <span>📏</span>
                                  <span>125cm以上</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="border border-slate-200 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span className="text-green-500">🦕</span>
                                ジュラシック・パーク
                              </h4>
                              <p className="text-sm text-slate-600 mb-3">ウォーターフロントライド</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <span>⏱️</span>
                                  <span>5分</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <span>👥</span>
                                  <span>8人/ボート</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <span>📏</span>
                                  <span>107cm以上</span>
                                </span>
                              </div>
                            </div>
                            
                            <div className="border border-slate-200 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span className="text-yellow-500">🍌</span>
                                ミニオン・メイヘム
                              </h4>
                              <p className="text-sm text-slate-600 mb-3">3Dシミュレーターライド</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <span>⏱️</span>
                                  <span>5分</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <span>👥</span>
                                  <span>6人/車両</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <span>📏</span>
                                  <span>92cm以上</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Express Pass情報 */}
                      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                          <span>⚡</span>
                          Express Pass情報
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                            <h4 className="font-semibold text-slate-800 mb-3">Express Pass</h4>
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between">
                                <span className="text-slate-600">大人</span>
                                <span className="font-medium">S$50</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">子供</span>
                                <span className="font-medium">S$40</span>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600">各アトラクション1回まで優先乗車</p>
                          </div>
                          
                          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4">
                            <h4 className="font-semibold text-slate-800 mb-3">Express Pass Unlimited</h4>
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between">
                                <span className="text-slate-600">大人</span>
                                <span className="font-medium">S$80</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">子供</span>
                                <span className="font-medium">S$70</span>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600">各アトラクション無制限優先乗車</p>
                          </div>
                        </div>
                      </div>

                      <div className="relative w-full h-[30vh] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src="/image/day3_detail/day3-uss.jpg"
                          alt="ユニバーサル・スタジオ・シンガポール"
                          fill
                          className="object-cover"
                          sizes="(max-width: 1200px) 100vw, 1200px"
                        />
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={prevTab}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          前へ
                        </button>
                        <button
                          onClick={nextTab}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          次へ
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* リュージュタブ */}
                  {activeTab === 2 && (
                    <div className="space-y-6">
                      {/* メイン情報 */}
                      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                          <span>🛷</span>
                          スカイライン・リュージュ
                        </h2>
                        <p className="text-slate-700 leading-relaxed mb-6">
                          セントーサ島の高台から海を見ながら滑り降りる、スリル満点のアトラクション。カップルで楽しめる人気スポットです。
                        </p>
                        
                        {/* 料金・営業時間 */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                              <span>💰</span>
                              料金
                            </h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-slate-600">1回券</span>
                                <span className="font-medium">S$18</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">3回券</span>
                                <span className="font-medium">S$35</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">5回券</span>
                                <span className="font-medium">S$45</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
                            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                              <span>🕐</span>
                              営業時間
                            </h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-slate-600">平日</span>
                                <span className="font-medium">10:00 - 18:00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">土日祝</span>
                                <span className="font-medium">10:00 - 19:00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">最終受付</span>
                                <span className="font-medium">閉園30分前</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* コース情報 */}
                      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                          <span>🗺️</span>
                          コース情報
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="border border-slate-200 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span className="text-green-500">🟢</span>
                                ドラゴン・トレイル
                              </h4>
                              <p className="text-sm text-slate-600 mb-3">初心者向けコース</p>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">距離</span>
                                  <span>688m</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">所要時間</span>
                                  <span>約3-5分</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">難易度</span>
                                  <span className="text-green-600">★☆☆</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border border-slate-200 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span className="text-blue-500">🔵</span>
                                ジュラシック・トレイル
                              </h4>
                              <p className="text-sm text-slate-600 mb-3">中級者向けコース</p>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">距離</span>
                                  <span>1,050m</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">所要時間</span>
                                  <span>約5-8分</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">難易度</span>
                                  <span className="text-blue-600">★★☆</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="border border-slate-200 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span className="text-red-500">🔴</span>
                                エクスプローラー・トレイル
                              </h4>
                              <p className="text-sm text-slate-600 mb-3">上級者向けコース</p>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">距離</span>
                                  <span>1,350m</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">所要時間</span>
                                  <span>約8-12分</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">難易度</span>
                                  <span className="text-red-600">★★★</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border border-slate-200 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span className="text-purple-500">🟣</span>
                                スカイライン・トレイル
                              </h4>
                              <p className="text-sm text-slate-600 mb-3">最高峰コース</p>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">距離</span>
                                  <span>1,500m</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">所要時間</span>
                                  <span>約10-15分</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">難易度</span>
                                  <span className="text-purple-600">★★★★</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 体験レビュー */}
                      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                          <span>⭐</span>
                          体験レビュー
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="bg-slate-50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-yellow-400">
                                  {'★'.repeat(5)}
                                </div>
                                <span className="text-sm text-slate-600">田中さん</span>
                              </div>
                              <p className="text-sm text-slate-700">
                                「海を見ながら滑るのは最高でした！カップルで楽しめて、写真もたくさん撮れました。3回券がお得です。」
                              </p>
                            </div>
                            
                            <div className="bg-slate-50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-yellow-400">
                                  {'★'.repeat(4)}
                                </div>
                                <span className="text-sm text-slate-600">佐藤さん</span>
                              </div>
                              <p className="text-sm text-slate-700">
                                「スリル満点！エクスプローラー・トレイルが特に楽しかったです。雨の日は運休するので注意が必要。」
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="bg-slate-50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-yellow-400">
                                  {'★'.repeat(5)}
                                </div>
                                <span className="text-sm text-slate-600">山田さん</span>
                              </div>
                              <p className="text-sm text-slate-700">
                                「家族で楽しめました。子供も安全に乗れて、景色が素晴らしい。ヘルメットの着用は必須です。」
                              </p>
                            </div>
                            
                            <div className="bg-slate-50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-yellow-400">
                                  {'★'.repeat(4)}
                                </div>
                                <span className="text-sm text-slate-600">鈴木さん</span>
                              </div>
                              <p className="text-sm text-slate-700">
                                「夕方の時間帯がおすすめ。サンセットを見ながら滑るのは格別でした。GoProでの撮影も可能です。」
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative w-full h-[30vh] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src="/image/day3_detail/day3-skyline-luge.jpg"
                          alt="スカイライン・リュージュ"
                          fill
                          className="object-cover"
                          sizes="(max-width: 1200px) 100vw, 1200px"
                        />
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={prevTab}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          前へ
                        </button>
                        <button
                          onClick={nextTab}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          次へ
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* アクアリウムタブ */}
                  {activeTab === 3 && (
                    <div className="space-y-6">
                      {/* メイン情報 */}
                      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                          <span>🐠</span>
                          S.E.A. アクアリウム
                        </h2>
                        <p className="text-slate-700 leading-relaxed mb-6">
                          世界最大級の水槽で、10万匹以上の海洋生物が暮らすアジア最大級の水族館。マンタやサメの優雅な泳ぎを観察できます。
                        </p>
                        
                        {/* 基本情報 */}
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 text-center">
                            <div className="text-2xl mb-2">🐠</div>
                            <p className="text-sm text-slate-600">海洋生物</p>
                            <p className="text-lg font-bold text-slate-800">10万匹以上</p>
                          </div>
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 text-center">
                            <div className="text-2xl mb-2">🌊</div>
                            <p className="text-sm text-slate-600">水槽容量</p>
                            <p className="text-lg font-bold text-slate-800">4,500万リットル</p>
                          </div>
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                            <div className="text-2xl mb-2">🏆</div>
                            <p className="text-sm text-slate-600">世界記録</p>
                            <p className="text-lg font-bold text-slate-800">最大級水槽</p>
                          </div>
                        </div>
                      </div>

                      {/* 生物図鑑 */}
                      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                          <span>📚</span>
                          海洋生物図鑑
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="border border-slate-200 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span className="text-blue-500">🦈</span>
                                ジンベエザメ
                              </h4>
                              <p className="text-sm text-slate-600 mb-2">世界最大の魚類</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">体長</span>
                                  <span>最大18m</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">特徴</span>
                                  <span>斑点模様</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border border-slate-200 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span className="text-purple-500">🦑</span>
                                マンタ
                              </h4>
                              <p className="text-sm text-slate-600 mb-2">エイの仲間</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">体長</span>
                                  <span>最大7m</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">特徴</span>
                                  <span>優雅な泳ぎ</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="border border-slate-200 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span className="text-orange-500">🐙</span>
                                タコ
                              </h4>
                              <p className="text-sm text-slate-600 mb-2">頭足類の代表</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">体長</span>
                                  <span>最大3m</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">特徴</span>
                                  <span>8本の足</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border border-slate-200 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span className="text-green-500">🐠</span>
                                カラフルな熱帯魚
                              </h4>
                              <p className="text-sm text-slate-600 mb-2">サンゴ礁の住人</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">種類</span>
                                  <span>200種以上</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">特徴</span>
                                  <span>鮮やかな色彩</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ショー・イベント情報 */}
                      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                          <span>🎭</span>
                          ショー・イベント情報
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span>🍽️</span>
                                マンタ給餌タイム
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">時間</span>
                                  <span className="font-medium">14:00-14:30</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">場所</span>
                                  <span>オープン・オーシャン水槽</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">内容</span>
                                  <span>マンタの食事シーン</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span>🦈</span>
                                サメ給餌タイム
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">時間</span>
                                  <span className="font-medium">16:00-16:30</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">場所</span>
                                  <span>サメ・エリア</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">内容</span>
                                  <span>サメの迫力ある食事</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span>🎓</span>
                                教育プログラム
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">時間</span>
                                  <span className="font-medium">11:00-11:30</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">場所</span>
                                  <span>教育エリア</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">内容</span>
                                  <span>海洋生物の学習</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <span>🌅</span>
                                夕方特別ツアー
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">時間</span>
                                  <span className="font-medium">18:00-19:00</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">場所</span>
                                  <span>全エリア</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">内容</span>
                                  <span>夕方の水槽観察</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 体験コーナー */}
                      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                          <span>🎯</span>
                          体験コーナー
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <div className="text-3xl mb-2">🤝</div>
                            <h4 className="font-semibold text-slate-800 mb-2">タッチプール</h4>
                            <p className="text-sm text-slate-600">ヒトデやナマコに触れられます</p>
                          </div>
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <div className="text-3xl mb-2">📸</div>
                            <h4 className="font-semibold text-slate-800 mb-2">記念撮影</h4>
                            <p className="text-sm text-slate-600">水槽前での記念写真撮影</p>
                          </div>
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <div className="text-3xl mb-2">🎁</div>
                            <h4 className="font-semibold text-slate-800 mb-2">グッズショップ</h4>
                            <p className="text-sm text-slate-600">海洋生物のグッズ販売</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative h-[25vh] rounded-2xl overflow-hidden shadow-2xl">
                          <Image
                            src="/image/day3_detail/day3-sea-aquarium.jpg"
                            alt="S.E.A. アクアリウム"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => window.open("https://www.rwsentosa.com/en/attractions/sea-aquarium", "_blank")}
                            className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-lg"
                          >
                            公式サイト ↗
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={prevTab}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          前へ
                        </button>
                        <button
                          onClick={nextTab}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          次へ
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                </div>
              )}

              {/* ビーチタブ */}
              {activeTab === 4 && (
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span>🏖️</span>
                      シロソ・ビーチ
                    </h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      セントーサ島の美しいビーチ。夕方のサンセットは特に美しく、カップルで過ごすのに最適な時間です。
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">ビーチでの過ごし方</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            <span>ビーチチェアでリラックス</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            <span>夕方の散歩</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            <span>サンセット写真撮影</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">おすすめ時間</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 mt-1">•</span>
                            <span>17:00-18:00 夕方の散歩</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 mt-1">•</span>
                            <span>18:00-19:00 サンセットタイム</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 mt-1">•</span>
                            <span>19:00-20:00 夕暮れのビーチ</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-full h-[30vh] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/image/day3_detail/day3-beach.jpg"
                      alt="シロソ・ビーチ"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={prevTab}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      前へ
                    </button>
                    <button
                      onClick={nextTab}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      次へ
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* 夕方・夜タブ */}
              {activeTab === 5 && (
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span>🌅</span>
                      夕方・夜の過ごし方
                    </h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      セントーサ島の夕方から夜にかけては、特別な時間。ディナーとWings of Timeで一日を締めくくりましょう。
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">ディナータイム</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-1">•</span>
                            <span>リゾート内レストラン</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-1">•</span>
                            <span>シーフード料理</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-1">•</span>
                            <span>ロマンチックな雰囲気</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Wings of Time</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-indigo-500 mt-1">•</span>
                            <span>光と音のショー</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-indigo-500 mt-1">•</span>
                            <span>20:40-21:00 第1回</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-indigo-500 mt-1">•</span>
                            <span>21:40-22:00 第2回</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative w-full h-[25vh] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src="/image/day3_detail/day3-dinner.jpg"
                        alt="リゾート内のディナー"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                      />
                    </div>
                    
                    <div className="relative w-full h-[30vh] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src="/image/day3_detail/day3-wings-of-time.webp"
                        alt="Wings of Time"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={prevTab}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      前へ
                    </button>
                    <button
                      onClick={nextTab}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      次へ
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ギャラリータブ */}
              {activeTab === 6 && (
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span>📸</span>
                      セントーサ島の思い出
                    </h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      セントーサ島での素敵な思い出を写真で振り返りましょう。
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {day3Photos.map((photo, index) => (
                      <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-xs font-medium">{photo.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={prevTab}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      前へ
                    </button>
                    <button
                      onClick={nextTab}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      次へ
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* カップルガイドタブ */}
              {activeTab === 7 && (
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span>💕</span>
                      カップル向け詳細ガイド
                    </h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      セントーサ島でのカップル向けの特別な体験とアドバイスをご紹介します。
                    </p>
                  </div>

                  <CoupleGuide />

                  <div className="flex justify-between">
                    <button
                      onClick={prevTab}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      前へ
                    </button>
                    <button
                      onClick={() => setActiveTab(0)}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      最初に戻る
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
          ))}
        </div>

        {/* Navigation */}
        <section className="text-center mt-8 space-y-6">
          {/* Previous Day */}
          <div>
            <Link
              href="/day/2"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-600 text-white rounded-full hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
            >
              <ArrowRightIcon className="w-5 h-5 rotate-180" />
              <span>前の日へ</span>
            </Link>
            <p className="text-slate-600 mt-3 font-inter">
              Day 2 — 文化体験 & ナイトサファリ
            </p>
          </div>

          {/* Home Button */}
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
        </section>
      </div>

      {/* FAB (フローティングアクションボタン) */}
      <motion.button
        onClick={() => {
          // クイックジャンプ機能
          const nextIndex = (activeTab + 1) % tabs.length;
          scrollToSection(nextIndex);
        }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl">📍</span>
      </motion.button>

      {/* FAB ラベル */}
      <div className="fixed bottom-6 right-24 z-50 flex items-center gap-2 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-lg">
        <span className="text-sm font-medium text-slate-700">Day3</span>
        <span className="text-lg">✨</span>
      </div>

      {/* トップに戻るボタン */}
      {showTopButton && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full shadow-2xl flex items-center justify-center text-xl font-bold hover:from-orange-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-110"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ↑
        </motion.button>
      )}
    </div>
  );
}
