'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Camera, Heart } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setIsPageVisible(true);
    }, 100);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }
  
  return (
    <div className={`transition-opacity duration-500 ${isPageVisible ? 'opacity-100' : 'opacity-0'}`}>
    <>
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden">
        {/* 背景写真 - アスペクト比を維持 */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1] lg:aspect-[4/1]">
          <Image
            src="/image/day1.jpg"
            alt="シンガポールの美しい景色"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* オーバーレイ（テキストを読みやすくするため） */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50" />
        </div>
        
        {/* コンテンツ */}
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 drop-shadow-2xl">
              シンガポール旅行しおり
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 drop-shadow-lg">
              美しい景色、美味しい料理、そして忘れられない体験が待っています
            </p>
          </div>
        </div>
      </section>
      
      {/* 旅行プランのセクション */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              シンガポール旅行プラン
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              3日間の充実したシンガポール旅行プランをご用意しました。<br />
              各日の詳細をクリックして、素晴らしい旅の準備を始めましょう。
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Day 1 */}
            <Link
              href="/day/1"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <div className="relative h-64">
                <Image
                  src="/image/day1.jpg"
                  alt="Day 1 - マリーナベイ・サンズ"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">Day 1</h3>
                  <p className="text-lg opacity-90">マリーナベイ・サンズ</p>
                  <p className="text-sm opacity-75 mt-1">2025年9月27日</p>
                  <div className="mt-3">
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                      詳細へ →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Day 2 */}
            <Link
              href="/day/2"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <div className="relative h-64">
                <Image
                  src="/image/day2.jpg"
                  alt="Day 2 - 文化体験 & ナイトサファリ"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">Day 2</h3>
                  <p className="text-lg opacity-90">文化体験 & ナイトサファリ</p>
                  <p className="text-sm opacity-75 mt-1">2025年9月28日</p>
                  <div className="mt-3">
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                      詳細へ →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Day 3 */}
            <Link
              href="/day/3"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <div className="relative h-64">
                <Image
                  src="/image/day3.jpg"
                  alt="Day 3 - セントーサ島"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">Day 3</h3>
                  <p className="text-lg opacity-90">セントーサ島</p>
                  <p className="text-sm opacity-75 mt-1">2025年9月29日</p>
                  <div className="mt-3">
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                      詳細へ →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* 思い出ページへのリンク */}
      <section className="py-20 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">📸</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              思い出を永遠に残そう
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              シンガポール旅行の特別な瞬間を写真で記録し、<br />
              美しいギャラリーで思い出を振り返りましょう。<br />
              すべての写真はあなたのデバイスに安全に保存されます。
            </p>
            <Link
              href="/memories"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Camera className="w-6 h-6" />
              📸 思い出ページへ
              <Heart className="w-6 h-6" />
            </Link>
            <p className="text-sm text-slate-500 mt-4">
              
            </p>
          </div>
        </div>
      </section>
    </>
    </div>
  );
}