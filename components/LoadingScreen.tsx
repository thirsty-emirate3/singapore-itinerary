'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // プログレスバーのアニメーション
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15; // ランダムな進捗で自然な感じに
      });
    }, 100);

    // ロード完了のタイミング（2-3秒後）
    const loadingTimeout = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onLoadingComplete();
        }, 100);
      }, 500); // フェードアウト後にコールバック実行
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimeout);
    };
  }, [onLoadingComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-black z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
      isFadingOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* ロード画像 */}
      <div className="relative mb-8 animate-bounce">
        <Image
          src="/load.png"
          alt="Loading..."
          width={200}
          height={200}
          className="drop-shadow-2xl"
          priority
        />
        {/* 光るエフェクト */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
      </div>

      {/* プログレスバー */}
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300 ease-out shadow-lg"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* ロードテキスト */}
      <div className="text-center mt-6">
        <h1 className="text-white text-2xl font-bold mb-2 animate-pulse">
          シンガポール旅行プランナー
        </h1>
        <p className="text-gray-400 text-sm">
          読み込み中...
        </p>
      </div>

      {/* プログレス数値 */}
      <div className="mt-6">
        <span className="text-white text-lg font-mono">
          {Math.round(Math.min(progress, 100))}%
        </span>
      </div>

      {/* 装飾的なドット */}
      <div className="flex space-x-2 mt-8">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
