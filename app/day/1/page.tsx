"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, ExternalLinkIcon, MapPinIcon, ClockIcon, UtensilsIcon } from "lucide-react";
import { days } from "@/data/days";

export default function Day1Page() {
  const [expandedSlots, setExpandedSlots] = useState<number[]>([]);
  const dayData = days["1"];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const toggleSlot = (index: number) => {
    setExpandedSlots(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getPrevDayId = () => {
    // Day1の前はなし
    return null;
  };

  const getNextDayId = () => {
    // Day1の次はDay2
    return '2';
  };

  const prevDayId = getPrevDayId();
  const nextDayId = getNextDayId();

  if (!dayData) {
    return <div>データが見つかりません</div>;
  }

  return (
    <div className="min-h-screen text-slate-800 overflow-x-hidden bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-[45vh] md:min-h-[50vh] lg:min-h-[60vh] overflow-hidden rounded-2xl mb-8">
        <div className="absolute inset-0">
          <Image
            src={dayData.hero}
            alt={dayData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        </div>
        
        <div className="absolute top-4 left-4 z-20">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur-md border border-white/20 text-slate-800 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            <span className="font-medium">ホームに戻る</span>
          </Link>
        </div>

        <div className="absolute bottom-8 left-8 right-8 z-20 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {dayData.title}
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-2">
              {formatDate(dayData.date)}
            </p>
            <p className="text-base md:text-lg opacity-75">
              マリーナベイ・サンズでの贅沢な一日
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Quick Info */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
              <div className="text-2xl mb-2">⏰</div>
              <div className="text-sm font-medium text-slate-600">所要時間</div>
              <div className="text-lg font-bold text-slate-800">{dayData.quick.duration}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
              <div className="text-2xl mb-2">👟</div>
              <div className="text-sm font-medium text-slate-600">歩数</div>
              <div className="text-lg font-bold text-slate-800">{dayData.quick.steps}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm font-medium text-slate-600">予算</div>
              <div className="text-lg font-bold text-slate-800">{dayData.quick.budget}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
              <div className="text-2xl mb-2">👔</div>
              <div className="text-sm font-medium text-slate-600">服装</div>
              <div className="text-lg font-bold text-slate-800">{dayData.quick.dress}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-sm font-medium text-slate-600">ベストタイム</div>
              <div className="text-lg font-bold text-slate-800">{dayData.quick.best}</div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">スケジュール</h2>
          <div className="space-y-4">
            {dayData.timeline.map((slot, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => toggleSlot(index)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                    {slot.emoji}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-bold text-slate-800">{slot.time}</span>
                      <span className="text-xl font-semibold text-slate-800">{slot.title}</span>
                    </div>
                    {slot.note && (
                      <p className="text-slate-600 text-sm">{slot.note}</p>
                    )}
                    {slot.mapUrl && (
                      <div className="mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(slot.mapUrl, '_blank');
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full hover:bg-blue-200 transition-colors"
                        >
                          <MapPinIcon className="w-4 h-4" />
                          <span>地図で開く</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-slate-600 text-sm font-bold">{index + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <section className="flex justify-between items-center pt-8 border-t border-slate-200">
          <div className="flex-1">
            {prevDayId ? (
              <Link
                href={`/day/${prevDayId}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
              >
                <ArrowRightIcon className="w-4 h-4 rotate-180" />
                <span className="font-medium">前の日</span>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
          
          <div className="flex-1 flex justify-end">
            {nextDayId && (
              <Link
                href={`/day/${nextDayId}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                <span className="font-medium">次の日</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
