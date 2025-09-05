"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, Heart, Trophy, Download } from "lucide-react";
import { motion } from "framer-motion";
import UploadBox from "@/components/memories/UploadBox";
import Masonry from "@/components/memories/Masonry";
import Ranking from "@/components/memories/Ranking";
import { useMemories } from "@/hooks/useMemories";
// import type { MemoryPhoto, RankingData } from "@/types/memories";

export default function MemoriesPage() {
  const { photos, rankings, addPhoto, updatePhoto, deletePhoto, toggleLike, updateRankings, isLoading, isIndexedDBSupported } = useMemories();
  const [showTopButton, setShowTopButton] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  // ゲストユーザーかどうかをチェック
  useEffect(() => {
    const authData = localStorage.getItem('singapore-auth');
    if (authData) {
      try {
        const { isGuest } = JSON.parse(authData);
        setIsGuest(isGuest === true);
      } catch (error) {
        console.error('認証データの解析に失敗しました:', error);
      }
    }
  }, []);

  // スクロール位置に応じてトップボタンの表示/非表示を制御
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ランダムな写真を選択（ヒーロー用）
  const randomPhoto = photos.length > 0 
    ? photos[Math.floor(Math.random() * photos.length)] 
    : null;

  const handleExport = () => {
    // TODO: 後で実装（Zip/PDF）
    alert("エクスポート機能は準備中です");
  };

  // IndexedDBがサポートされていない場合
  if (!isIndexedDBSupported) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 via-pink-100 to-purple-100 text-slate-800 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            IndexedDBがサポートされていません
          </h1>
          <p className="text-slate-600 mb-6">
            この機能は、IndexedDBをサポートするブラウザでのみ動作します。
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-pink-500 text-white font-medium rounded-xl hover:bg-pink-600 transition-colors"
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    );
  }

  // ローディング中
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 via-pink-100 to-purple-100 text-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">📸</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            思い出ページを読み込み中...
          </h1>
          <p className="text-slate-600">しばらくお待ちください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-pink-100 to-purple-100 text-slate-800">
      {/* ヒーローセクション */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        {/* 背景画像またはグラデーション */}
        {randomPhoto ? (
          <div className="absolute inset-0">
            <img
              src={randomPhoto.url}
              alt="思い出の写真"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-400 to-purple-600" />
        )}
        
        {/* ガラスモーフのタイトルボックス */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-md bg-white/20 rounded-3xl p-8 border border-white/30 shadow-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              📸 思い出ページ
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-2">
              シンガポール旅行の特別な瞬間
            </p>
            <p className="text-lg text-white/80">
              {photos.length}枚の思い出
            </p>
          </motion.div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* アップロードセクション */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
              <Camera className="w-8 h-8 text-pink-500" />
              写真をアップロード
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              旅の思い出の写真をアップロードして、特別な瞬間を記録しましょう。
              すべての写真はあなたのデバイスに安全に保存されます。
            </p>
          </motion.div>
          
          {!isGuest && <UploadBox onUpload={addPhoto} />}
          {isGuest && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
              <div className="text-yellow-600 text-lg mb-2">👤 ゲストユーザー</div>
              <p className="text-yellow-700 text-sm">
                写真のアップロードやメモの保存はできません。<br />
                フル機能をご利用の場合は、ログインしてください。
              </p>
            </div>
          )}
        </section>

        {/* ギャラリーセクション */}
        {photos.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
                <Heart className="w-8 h-8 text-pink-500" />
                思い出ギャラリー
              </h2>
              <p className="text-lg text-slate-600">
                アップロードした写真を美しいギャラリーで楽しみましょう
              </p>
            </motion.div>
            
            <Masonry 
              photos={photos} 
              onToggleLike={(photo) => toggleLike(photo.id)}
              onUpdatePhoto={updatePhoto}
              onDeletePhoto={(photo) => deletePhoto(photo.id)}
            />
          </section>
        )}

        {/* ランキングセクション */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              ベストランキング
            </h2>
            <p className="text-lg text-slate-600">
              旅のハイライトを選んで、特別なランキングを作成しましょう
            </p>
          </motion.div>
          
          <Ranking 
            photos={photos} 
            rankings={rankings} 
            onUpdate={updateRankings} 
          />
        </section>

        {/* エクスポートセクション */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
              <Download className="w-8 h-8 text-blue-500" />
              エクスポート
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              思い出の写真をまとめてダウンロードできます
            </p>
            
            <button
              onClick={handleExport}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              📦 思い出をZIPでダウンロード
            </button>
          </motion.div>
        </section>
      </div>

      {/* トップに戻るボタン */}
      {showTopButton && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full shadow-2xl flex items-center justify-center text-xl font-bold hover:from-pink-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-110"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ↑
        </motion.button>
      )}

      {/* トップに戻るリンク */}
      <div className="fixed top-6 left-6 z-40">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur-md border border-white/20 text-slate-800 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          トップに戻る
        </Link>
      </div>
    </div>
  );
}
