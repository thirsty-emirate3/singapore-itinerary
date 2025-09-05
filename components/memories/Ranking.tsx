"use client";

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Camera, MessageSquare, X, Edit3, Star } from 'lucide-react';
import type { MemoryPhoto, RankingData } from '@/types/memories';

interface RankingProps {
  photos: MemoryPhoto[];
  rankings: RankingData;
  onUpdate: (rankings: RankingData) => Promise<void>;
}

interface RankingCardProps {
  type: 'spot' | 'food' | 'moment';
  title: string;
  description: string;
  icon: string;
  selectedPhoto?: MemoryPhoto;
  comment?: string;
  onSelect: () => void;
  onUpdateComment: (comment: string) => void;
  photos: MemoryPhoto[];
}

const RankingCard = ({ 
  type, 
  title, 
  description, 
  icon, 
  selectedPhoto, 
  comment, 
  onSelect, 
  onUpdateComment,
  photos 
}: RankingCardProps) => {
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [editingComment, setEditingComment] = useState(comment || '');

  const handleSaveComment = useCallback(() => {
    onUpdateComment(editingComment);
    setIsEditingComment(false);
  }, [editingComment, onUpdateComment]);

  const handleCancelEdit = useCallback(() => {
    setEditingComment(comment || '');
    setIsEditingComment(false);
  }, [comment]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'spot': return 'bg-blue-500';
      case 'food': return 'bg-orange-500';
      case 'moment': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'spot': return 'スポット';
      case 'food': return 'グルメ';
      case 'moment': return '瞬間';
      default: return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* ヘッダー */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 ${getTypeColor(type)} rounded-full flex items-center justify-center text-white text-2xl`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <p className="text-slate-600">{description}</p>
        </div>
      </div>

      {/* 選択された写真 */}
      {selectedPhoto ? (
        <div className="mb-4">
          <div className="relative">
            <img
              src={selectedPhoto.thumbnailUrl || selectedPhoto.url}
              alt={selectedPhoto.caption || `${getTypeText(type)}の写真`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 bg-pink-500 text-white text-xs font-medium rounded-full">
                {selectedPhoto.day || '未分類'}
              </span>
            </div>
          </div>
          
          {/* 写真情報 */}
          <div className="mt-3 text-sm text-slate-600">
            <p className="font-medium">{selectedPhoto.caption || 'キャプションなし'}</p>
            <p className="text-xs">
              {selectedPhoto.uploadedAt?.toLocaleDateString('ja-JP')}
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">写真が選択されていません</p>
        </div>
      )}

      {/* コメント */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            選んだ理由
          </label>
          {!isEditingComment ? (
            <button
              onClick={() => setIsEditingComment(true)}
              className="text-pink-500 hover:text-pink-600 text-sm flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" />
              編集
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveComment}
                className="text-green-500 hover:text-green-600 text-sm"
              >
                保存
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-600 text-sm"
              >
                キャンセル
              </button>
            </div>
          )}
        </div>
        
        {isEditingComment ? (
          <textarea
            value={editingComment}
            onChange={(e) => setEditingComment(e.target.value)}
            placeholder={`なぜこの${getTypeText(type)}が一番好きですか？`}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            rows={3}
            maxLength={200}
          />
        ) : (
          <p className="text-gray-700 min-h-[3rem] p-3 bg-gray-50 rounded-lg">
            {comment || 'コメントがありません'}
          </p>
        )}
      </div>

      {/* アクションボタン */}
      <div className="flex gap-2">
        {selectedPhoto ? (
          <button
            onClick={onSelect}
            className="flex-1 px-4 py-2 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            写真を変更
          </button>
        ) : (
          <button
            onClick={onSelect}
            className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            写真を選択
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default function Ranking({ photos, rankings, onUpdate }: RankingProps) {
  const [isSelectingPhoto, setIsSelectingPhoto] = useState<{
    type: 'spot' | 'food' | 'moment';
    isOpen: boolean;
  }>({ type: 'spot', isOpen: false });

  // 写真選択モーダルを開く
  const openPhotoSelector = useCallback((type: 'spot' | 'food' | 'moment') => {
    setIsSelectingPhoto({ type, isOpen: true });
  }, []);

  // 写真選択モーダルを閉じる
  const closePhotoSelector = useCallback(() => {
    setIsSelectingPhoto(prev => ({ ...prev, isOpen: false }));
  }, []);

  // 写真を選択
  const selectPhoto = useCallback(async (photoId: string) => {
    const newRankings = { ...rankings };
    
    switch (isSelectingPhoto.type) {
      case 'spot':
        newRankings.spotId = photoId;
        break;
      case 'food':
        newRankings.foodId = photoId;
        break;
      case 'moment':
        newRankings.momentId = photoId;
        break;
    }
    
    await onUpdate(newRankings);
    closePhotoSelector();
  }, [rankings, isSelectingPhoto.type, onUpdate, closePhotoSelector]);

  // コメントを更新
  const updateComment = useCallback(async (type: 'spot' | 'food' | 'moment', comment: string) => {
    const newRankings = { ...rankings };
    
    switch (type) {
      case 'spot':
        newRankings.spotComment = comment;
        break;
      case 'food':
        newRankings.foodComment = comment;
        break;
      case 'moment':
        newRankings.momentComment = comment;
        break;
    }
    
    await onUpdate(newRankings);
  }, [rankings, onUpdate]);

  // 選択された写真を取得
  const getSelectedPhoto = useCallback((type: 'spot' | 'food' | 'moment') => {
    const photoId = rankings[`${type}Id` as keyof RankingData] as string;
    return photoId ? photos.find(p => p.id === photoId) : undefined;
  }, [rankings, photos]);

  // コメントを取得
  const getComment = useCallback((type: 'spot' | 'food' | 'moment') => {
    return rankings[`${type}Comment` as keyof RankingData] as string;
  }, [rankings]);

  const rankingCards = [
    {
      type: 'spot' as const,
      title: '🏆 Best Spot',
      description: '一番印象に残った場所',
      icon: '📍'
    },
    {
      type: 'food' as const,
      title: '🍽️ Best Food',
      description: '一番美味しかった料理',
      icon: '🍴'
    },
    {
      type: 'moment' as const,
      title: '✨ Best Moment',
      description: '一番特別だった瞬間',
      icon: '💫'
    }
  ];

  return (
    <>
      {/* ランキングカード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rankingCards.map((card) => (
          <RankingCard
            key={card.type}
            type={card.type}
            title={card.title}
            description={card.description}
            icon={card.icon}
            selectedPhoto={getSelectedPhoto(card.type)}
            comment={getComment(card.type)}
            onSelect={() => openPhotoSelector(card.type)}
            onUpdateComment={(comment) => updateComment(card.type, comment)}
            photos={photos}
          />
        ))}
      </div>

      {/* 写真選択モーダル */}
      <AnimatePresence>
        {isSelectingPhoto.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={closePhotoSelector}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ヘッダー */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-slate-800">
                  {rankingCards.find(c => c.type === isSelectingPhoto.type)?.title} の写真を選択
                </h3>
                <button
                  onClick={closePhotoSelector}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="モーダルを閉じる"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 写真グリッド */}
              <div className="p-4 max-h-[70vh] overflow-y-auto">
                {photos.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📸</div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">
                      写真がありません
                    </h4>
                    <p className="text-slate-600">
                      まず写真をアップロードしてください
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="relative group cursor-pointer"
                        onClick={() => selectPhoto(photo.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                          <img
                            src={photo.thumbnailUrl || photo.url}
                            alt={photo.caption || '思い出の写真'}
                            className="w-full h-32 object-cover"
                          />
                          
                          {/* オーバーレイ情報 */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* Dayタグ */}
                            {photo.day && (
                              <div className="absolute top-2 left-2">
                                <span className="px-2 py-1 bg-pink-500 text-white text-xs font-medium rounded-full">
                                  {photo.day}
                                </span>
                              </div>
                            )}
                            
                            {/* 選択インジケーター */}
                            <div className="absolute top-2 right-2">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center">
                                <Star className="w-4 h-4" />
                              </div>
                            </div>
                            
                            {/* キャプション */}
                            {photo.caption && (
                              <div className="absolute bottom-2 left-2 right-2">
                                <p className="text-white text-xs font-medium line-clamp-2">
                                  {photo.caption}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
