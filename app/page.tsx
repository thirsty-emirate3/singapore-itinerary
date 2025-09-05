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
      <section className="min-h-screen relative overflow-hidden">
        {/* 背景写真 */}
        <div className="absolute inset-0">
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
        <div className="relative z-10 flex items-center justify-center min-h-screen text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
              シンガポール旅行しおり
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 drop-shadow-lg">
              美しい景色、美味しい料理、そして忘れられない体験が待っています
            </p>
          </div>
        </div>
      </section>
      
      {/* 旅行プランのセクション */}
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-pink-100/30" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              シンガポール旅行プラン
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              美しい景色、美味しい料理、そして忘れられない体験が待っています
            </p>
          </div>

          {/* 旅行プランのカード */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                id: 1,
                day: "Day 1",
                title: "マリーナベイサンズ",
                description: "マーライオン公園、ガーデンズ・バイ・ザ・ベイ、The Shoppes、インフィニティプール、イブニングバー、ディナー、カジノ & バー",
                image: "/image/day1.jpg"
              },
              {
                id: 2,
                day: "Day 2",
                title: "シティ周遊 & ナイトサファリ",
                description: "MBSで朝を満喫、チャイナタウン散策、ホーカーでランチ、リトルインディア、アラブストリート、ブギス、ナイトサファリ",
                image: "/image/day2.jpg"
              },
              {
                id: 3,
                day: "Day 3",
                title: "セントーサ島",
                description: "USS、スカイライン・リュージュ、SEAアクアリウム、ビーチ散策、ウィングス・オブ・タイム",
                image: "/image/day3.jpg"
              }
            ].map((day) => (
              <div
                key={day.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative h-48">
                  <Image
                    src={day.image}
                    alt={day.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="text-xl font-bold">{day.day}</div>
                    <h3 className="text-lg font-semibold">{day.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {day.description}
                  </p>
                  <Link
                    href={`/day/${day.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    詳細を見る
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
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
              💕 カップル向けの特別な機能も充実
            </p>
          </div>
        </div>
      </section>
    </>
    </div>
  );
}