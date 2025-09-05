"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { trip } from "@/data/itinerary";

type Spread = { kind: "cover" | "toc" | "day" | "outro"; dayIndex?: number };

const ROTATE_Y = {
  initial: { rotateY: 0 },
  flipLeft: { rotateY: -12, transition: { duration: 0.35 } },
  flipRight: { rotateY: 12, transition: { duration: 0.35 } },
};

export default function Book() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Build spreads: Cover, TOC, each Day, Outro
  const spreads: Spread[] = useMemo(() => {
    const arr: Spread[] = [{ kind: "cover" }, { kind: "toc" }];
    trip.days.forEach((_, idx) => arr.push({ kind: "day", dayIndex: idx }));
    arr.push({ kind: "outro" });
    return arr;
  }, []);

  const totalSpreads = spreads.length;
  const [spreadIndex, setSpreadIndex] = useState(0);
  const canPrev = spreadIndex > 0;
  const canNext = spreadIndex < totalSpreads - 1;

  // Swipe
  const x = useMotionValue(0);
  const startXRef = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (!mounted) return;
    startXRef.current = e.clientX;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!mounted || startXRef.current == null) return;
    x.set(e.clientX - startXRef.current);
  };
  const onPointerUp = () => {
    if (!mounted) return;
    const delta = x.get();
    const threshold = 80;
    if (delta < -threshold && canNext) setSpreadIndex((i) => Math.min(totalSpreads - 1, i + 1));
    if (delta > threshold && canPrev) setSpreadIndex((i) => Math.max(0, i - 1));
    x.set(0);
    startXRef.current = null;
  };

  const current = spreads[spreadIndex];
  if (!current) return <div className="p-6">Not Found</div>;

  return (
    <div className="min-h-screen bg-cream-paper flex items-start justify-center py-10 md:py-16">
      {/* Ribbon */}
      <div className="fixed right-4 top-4 z-30 ribbon">しおり</div>
      {/* Day Tabs */}
      <div className="fixed right-2 top-24 z-20 flex flex-col gap-2">
        {spreads.map((s, i) => (
          <button
            key={i}
            onClick={() => setSpreadIndex(i)}
            className={`tab ${i === spreadIndex ? "active" : ""}`}
            aria-label={`Go to ${s.kind}`}
          >
            {s.kind === "day" ? `Day ${Number(s.dayIndex) + 1}` : s.kind.toUpperCase()}
          </button>
        ))}
      </div>

      <div
        className="book-container"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="book-frame with-gutter">
          <motion.div
            key={spreadIndex}
            className="book-spread"
            variants={ROTATE_Y}
            initial="initial"
            animate="initial"
            style={{ transformStyle: "preserve-3d" }}
          >
            {current.kind === "cover" && (
              <Cover />
            )}
            {current.kind === "toc" && (
              <TOC onSelectDay={(n) => setSpreadIndex(2 + n)} />
            )}
            {current.kind === "day" && (
              <DaySpread index={current.dayIndex!} />
            )}
            {current.kind === "outro" && (
              <Outro />
            )}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button className="btn" onClick={() => canPrev && setSpreadIndex((i) => Math.max(0, i - 1))} disabled={!canPrev}>← 前へ</button>
          <div className="text-sm text-gray-600">{spreadIndex + 1} / {totalSpreads}</div>
          <button className="btn" onClick={() => canNext && setSpreadIndex((i) => Math.min(totalSpreads - 1, i + 1))} disabled={!canNext}>次へ →</button>
        </div>
      </div>
    </div>
  );
}

function Cover() {
  const first = trip.days[0];
  return (
    <>
      <div className="page left serif flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-gray-500">旅行しおり</div>
          <h1 className="text-3xl md:text-5xl font-bold mt-2">{trip.title}</h1>
          <p className="mt-2 text-gray-600">{trip.period}</p>
        </div>
        <div className="page-number">1</div>
      </div>
      <div className="page right">
        <div className="relative h-56 md:h-80 w-full rounded-lg overflow-hidden shadow-paper border">
          <Image src={first.cover} alt={first.title} fill className="object-cover" />
        </div>
        <p className="mt-4 text-gray-700 serif">この本は旅の相棒です。ページをめくって、シンガポールの旅へ。</p>
        <div className="page-number">2</div>
      </div>
    </>
  );
}

function TOC({ onSelectDay }: { onSelectDay: (dayIndex: number) => void }) {
  return (
    <>
      <div className="page left serif">
        <h2 className="text-2xl font-bold">目次</h2>
        <ol className="mt-4 grid gap-2">
          {trip.days.map((d, i) => (
            <li key={d.id}>
              <button className="link" onClick={() => onSelectDay(i)}>
                Day {i + 1} — {d.title}
              </button>
            </li>
          ))}
        </ol>
        <div className="page-number">3</div>
      </div>
      <div className="page right serif">
        <p className="text-gray-700">表紙の次は目次です。各Dayへジャンプできます。</p>
        <div className="page-number">4</div>
      </div>
    </>
  );
}

function DaySpread({ index }: { index: number }) {
  const day = trip.days[index];
  if (!day) return (
    <>
      <div className="page left">Not Found</div>
      <div className="page right">Not Found</div>
    </>
  );
  return (
    <>
      <div className="page left">
        <div className="relative h-48 md:h-72 w-full rounded-lg overflow-hidden shadow-paper border">
          <Image src={day.cover} alt={day.title} fill className="object-cover" />
        </div>
        <div className="mt-4 serif">
          <div className="text-xs text-gray-500">{day.date}</div>
          <h2 className="text-xl md:text-2xl font-bold">{day.title}</h2>
          <p className="text-gray-700 mt-2">{day.summary}</p>
        </div>
        <div className="page-number">{index * 2 + 5}</div>
      </div>
      <div className="page right">
        <div className="grid gap-3">
          {day.slots.map((s, i) => (
            <div key={s.id ?? i} className="p-3 md:p-4 rounded-lg border shadow-paper bg-white">
              <div className="text-xs text-gray-600 font-mono">{s.time}</div>
              <div className="font-semibold mt-1 serif">{s.title}</div>
              {s.note && <p className="text-sm text-gray-700 mt-1 serif">{s.note}</p>}
              {!!s.links?.length && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {s.links.map((l, j) => (
                    <a key={j} href={l.href} target="_blank" rel="noreferrer" className="px-3 py-1 rounded border hover:bg-gray-50 text-sm">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="page-number">{index * 2 + 6}</div>
      </div>
    </>
  );
}

function Outro() {
  return (
    <>
      <div className="page left serif">
        <h2 className="text-2xl font-bold">おわりに</h2>
        <p className="mt-2 text-gray-700">素敵な旅の思い出を。</p>
        <div className="page-number">{(trip.days.length) * 2 + 5}</div>
      </div>
      <div className="page right serif flex items-center justify-center">
        <div className="text-center text-gray-500">Fin.</div>
        <div className="page-number">{(trip.days.length) * 2 + 6}</div>
      </div>
    </>
  );
}
