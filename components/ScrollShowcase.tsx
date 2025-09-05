"use client";

import Image from "next/image";

interface DayCard {
  id: number;
  img: string;
  title: string;
  description: string;
  icon: string;
}

const dayCards: DayCard[] = [
  {
    id: 1,
    img: "/image/day1.jpg",
    title: "Day 1 — マリーナベイサンズ",
    description: "マーライオン公園、ガーデンズ・バイ・ザ・ベイ、The Shoppes、インフィニティプール、イブニングバー、ディナー、カジノ & バー",
    icon: "🏝️"
  },
  {
    id: 2,
    img: "/image/day2.jpg",
    title: "Day 2 — シティ周遊 & ナイトサファリ",
    description: "チャイナタウン散策、ホーカーでランチ、リトルインディア、アラブストリート、ブギス、ナイトサファリ",
    icon: "🚀"
  },
  {
    id: 3,
    img: "/image/day3.jpg",
    title: "Day 3 — セントーサ島",
    description: "USS、スカイライン・リュージュ、SEAアクアリウム、ビーチ散策、ウィングス・オブ・タイム",
    icon: "🐘"
  }
];

export default function ScrollShowcase() {
  return (
    <section className="min-h-screen bg-green-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          旅行プラン
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dayCards.map((card) => (
            <div key={card.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="text-2xl mb-2">{card.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
