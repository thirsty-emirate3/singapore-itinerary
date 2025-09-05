"use client";

import Image from "next/image";

export default function HeroPinned() {
  return (
    <section className="relative h-[70vh] md:h-screen">
      <Image 
        src="/image/top-page.jpg" 
        fill 
        className="object-cover" 
        alt="Singapore skyline" 
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 flex items-start justify-start p-8 md:p-12">
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg font-playfair leading-tight">
          シンガポール旅行
        </h1>
      </div>
    </section>
  );
}
