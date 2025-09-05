"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CardData {
  id: string;
  day: string;
  title: string;
  image: string;
  description: string;
}

const cardData: CardData[] = [
  {
    id: "1",
    day: "Day 1",
    title: "マリーナベイサンズ",
    image: "/image/day1.jpg",
    description: "空港 → ホテルに荷物預け、マーライオン公園、ガーデンズ・バイ・ザ・ベイ、The Shoppes、インフィニティプール、イブニングバー、ディナー、カジノ & バー"
  },
  {
    id: "2", 
    day: "Day 2",
    title: "シティ周遊 & ナイトサファリ",
    image: "/image/day2.jpg",
    description: "MBSで朝を満喫、チャイナタウン散策、ホーカーでランチ、リトルインディア、アラブストリート、ブギス、ナイトサファリ"
  },
  {
    id: "3",
    day: "Day 3", 
    title: "セントーサ島",
    image: "/image/day3.jpg",
    description: "USS、スカイライン・リュージュ、SEAアクアリウム、ビーチ散策、ウィングス・オブ・タイム"
  }
];

export default function CardStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cardData.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
  };

  const goToCard = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-pink-100/30" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
            シンガポール旅行プラン
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            美しい景色、美味しい料理、そして忘れられない体験が待っています
          </p>
        </motion.div>

        {/* カードスタック */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                <div className="relative h-80 md:h-96">
                  <Image
                    src={cardData[currentIndex].image}
                    alt={cardData[currentIndex].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="text-2xl mb-2">{cardData[currentIndex].day}</div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-3">
                      {cardData[currentIndex].title}
                    </h3>
                    <p className="text-lg text-white/90 leading-relaxed">
                      {cardData[currentIndex].description}
                    </p>
                  </div>
                </div>
                
                <div className="p-8">
                  <Link
                    href={`/day/${cardData[currentIndex].id}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    詳細を見る
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ナビゲーションボタン */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevCard}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110"
              aria-label="前のカード"
            >
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextCard}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110"
              aria-label="次のカード"
            >
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* インジケーター */}
          <div className="flex justify-center mt-6 space-x-2">
            {cardData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`${cardData[index].day}のカードを表示`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
