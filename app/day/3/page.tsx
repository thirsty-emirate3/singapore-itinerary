"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import TextCard from "@/components/day3/TextCard";
import SummerBackground from "@/components/day3/SummerBackground";
import SectionNavigator from "@/components/day3/SectionNavigator";
import CoupleGuide from "@/components/CoupleGuide";


import { summerSections, navigationSections } from "@/data/day3-summer";
import { day3Photos } from "@/data/day3";

export default function Day3Page() {
  const [showTopButton, setShowTopButton] = useState(false);

  // スクロール位置に応じてトップボタンの表示/非表示を制御
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowTopButton(window.scrollY > 500);
    });
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-blue-200 to-orange-200 text-slate-800 overflow-x-hidden">
      {/* 夏の背景演出 */}
      <SummerBackground />
      
      {/* セクションナビゲーター */}
      <SectionNavigator sections={navigationSections} />

      {/* メインコンテナ - 最大幅で中央寄せ */}
      <div className="max-w-[1200px] mx-auto px-4">
        {/* ヒーローセクション - はみ出し防止、固定比率 */}
        <section className="relative min-h-[45vh] md:min-h-[50vh] lg:min-h-[60vh] overflow-hidden rounded-2xl mb-8">
          {/* 背景画像 */}
          <div className="relative w-full h-full">
            <Image
              src="/image/day3_detail/day3-hero.jpg"
              alt="セントーサ島の朝（Day3 ヒーロー）"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
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
              <ArrowLeft className="w-4 h-4" />
              トップに戻る
            </Link>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
            <div>
              <h1 className="text-3xl md:text-5xl font-poppins font-bold mb-4 tracking-tight drop-shadow-2xl">
                セントーサ島の冒険
              </h1>
              <p className="text-lg md:text-xl font-inter drop-shadow-lg">
                2025年9月29日月曜日
              </p>
            </div>
          </div>
        </section>

        {/* メインコンテンツ */}
        <div className="py-8 md:py-12">
        {summerSections.map((section) => (
          <div key={section.id}>
            <TextCard
              id={section.id}
              title={section.title}
              description={section.description}
              icon={section.icon}
              tips={section.tips}
              ctaText={section.ctaText}
              ctaAction={section.ctaAction}
            />
            
            {/* セクション間の画像挿入 */}
            {section.id === "text-theme" && (
              <div className="my-12">
                <div className="relative w-full h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/image/day3_detail/day3-hero.jpg"
                    alt="セントーサ島の朝（Day3 ヒーロー）"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">セントーサ島の朝</p>
                  </div>
                </div>
              </div>
            )}

            {section.id === "text-uss-tips" && (
              <div className="my-12">
                <div className="flex justify-center">
                  <div className="relative w-full max-w-4xl h-[30vh] md:h-[40vh] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/image/day3_detail/day3-uss.jpg"
                      alt="ユニバーサル・スタジオ・シンガポール入口"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 80vw, 960px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">ユニバーサル・スタジオ・シンガポール</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {section.id === "hero-luge" && (
              <div className="my-12">
                <div className="relative w-full h-[30vh] md:h-[40vh] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/image/day3_detail/day3-skyline-luge.jpg"
                    alt="スカイライン・リュージュで滑走"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">スカイライン・リュージュ</p>
                  </div>
                </div>
              </div>
            )}

            {section.id === "text-aquarium-info" && (
              <div className="my-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* 左側：画像（半幅） */}
                  <div className="relative w-full h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/image/day3_detail/day3-sea-aquarium.jpg"
                      alt="S.E.A. アクアリウムの大水槽"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">S.E.A. アクアリウム</p>
                    </div>
                  </div>
                  
                  {/* 右側：文章 */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800">S.E.A.アクアリウムの見どころ</h3>
                    <p className="text-slate-700 leading-relaxed">
                      世界最大級の水槽で、マンタやサメの優雅な泳ぎを観察できます。
                      10万匹以上の海洋生物が暮らす、アジア最大級の水族館です。
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-slate-700">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>巨大水槽の前でゆっくりと時間を過ごす</span>
                      </li>
                      <li className="flex items-start gap-2 text-slate-700">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>マンタの給餌タイムは必見</span>
                      </li>
                      <li className="flex items-start gap-2 text-slate-700">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>サメのトンネルで迫力満点の体験</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => window.open("https://www.rwsentosa.com/en/attractions/sea-aquarium", "_blank")}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                    >
                      公式サイト
                      <span>↗</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {section.id === "text-beach-tips" && (
              <div className="my-12">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative w-full h-[40vh] md:h-[50vh]">
                    <Image
                      src="/image/day3_detail/day3-beach.jpg"
                      alt="シロソ・ビーチのサンセット"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">ビーチ夕方の過ごし方</h3>
                        <p className="text-lg md:text-xl opacity-90">夕方のビーチは特別な時間。サンセットを見ながらリラックスタイム。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {section.id === "text-final" && (
              <>
                <div className="my-12">
                  <div className="relative w-full h-[30vh] md:h-[40vh] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/image/day3_detail/day3-dinner.jpg"
                      alt="リゾート内のディナータイム"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">リゾート内のディナータイム</p>
                    </div>
                  </div>
                </div>
                
                <div className="my-16">
                  <div className="relative w-full h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/image/day3_detail/day3-wings-of-time.webp"
                      alt="Wings of Time 夜のショー"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">Wings of Time</h3>
                        <p className="text-xl md:text-2xl opacity-90">夜の光と音のショー</p>
                        <p className="text-lg md:text-xl mt-4 opacity-80">セントーサ島の旅の締めくくり</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}

        {/* 写真ギャラリー */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8 flex items-center gap-3">
            <span>📸</span>
            セントーサ島の思い出
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {day3Photos.map((photo, index) => (
              <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* カップル向け詳細ガイド */}
        <div className="mt-16">
          <CoupleGuide />
        </div>
        </div>
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
