"use client";

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, MessageSquare, X, Edit3 } from 'lucide-react';
import type { MemoryPhoto, PhotoModalData } from '@/types/memories';

interface MasonryProps {
  photos: MemoryPhoto[];
  onToggleLike?: (photo: MemoryPhoto) => void;
  onUpdatePhoto?: (photo: MemoryPhoto) => void;
  onDeletePhoto?: (photo: MemoryPhoto) => void;
}

export default function Masonry({ photos, onToggleLike, onUpdatePhoto, onDeletePhoto }: MasonryProps) {
  const [modalData, setModalData] = useState<PhotoModalData>({
    photo: {} as MemoryPhoto,
    isOpen: false
  });
  const [editingCaption, setEditingCaption] = useState('');
  const [isEditingCaption, setIsEditingCaption] = useState(false);

  // モーダルを開く
  const openModal = useCallback((photo: MemoryPhoto) => {
    setModalData({ photo, isOpen: true });
    setEditingCaption(photo.caption || '');
  }, []);

  // モーダルを閉じる
  const closeModal = useCallback(() => {
    setModalData(prev => ({ ...prev, isOpen: false }));
    setIsEditingCaption(false);
  }, []);

  // いいねの切り替え
  const toggleLike = useCallback((photo: MemoryPhoto) => {
    if (onToggleLike) {
      onToggleLike(photo);
    }
  }, [onToggleLike]);

  // キャプション編集開始
  const startEditingCaption = useCallback(() => {
    setIsEditingCaption(true);
  }, []);

  // キャプション保存
  const saveCaption = useCallback(() => {
    if (onUpdatePhoto) {
      const updatedPhoto = { ...modalData.photo, caption: editingCaption };
      onUpdatePhoto(updatedPhoto);
    }
    setIsEditingCaption(false);
  }, [editingCaption, modalData.photo, onUpdatePhoto]);

  // キャプション編集キャンセル
  const cancelCaptionEdit = useCallback(() => {
    setEditingCaption(modalData.photo.caption || '');
    setIsEditingCaption(false);
  }, [modalData.photo.caption]);

  // 写真の削除
  const deletePhoto = useCallback((photo: MemoryPhoto) => {
    if (confirm('この写真を削除しますか？')) {
      if (onDeletePhoto) {
        onDeletePhoto(photo);
      }
      closeModal();
    }
  }, [closeModal, onDeletePhoto]);

  // 写真が空の場合
  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📸</div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          まだ写真がありません
        </h3>
        <p className="text-slate-600">
          写真をアップロードして、思い出のギャラリーを作成しましょう
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Masonry ギャラリー */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="break-inside-avoid mb-4 group cursor-pointer"
            onClick={() => openModal(photo)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              {/* 写真 */}
              <img
                src={photo.thumbnailUrl || photo.url}
                alt={photo.caption || '思い出の写真'}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              
              {/* オーバーレイ情報 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Dayタグ */}
                {photo.day && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-pink-500 text-white text-xs font-medium rounded-full">
                      {photo.day}
                    </span>
                  </div>
                )}
                
                {/* いいねボタン */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(photo);
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      photo.liked
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                    }`}
                    aria-label={photo.liked ? 'いいねを解除' : 'いいねする'}
                  >
                    <Heart className={`w-4 h-4 ${photo.liked ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                {/* キャプション */}
                {photo.caption && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm font-medium line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 写真モーダル */}
      <AnimatePresence>
        {modalData.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={closeModal}
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
                <div className="flex items-center gap-3">
                  {modalData.photo.day && (
                    <span className="px-3 py-1 bg-pink-500 text-white text-sm font-medium rounded-full">
                      {modalData.photo.day}
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    {modalData.photo.uploadedAt?.toLocaleDateString('ja-JP')}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deletePhoto(modalData.photo)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="写真を削除"
                  >
                    🗑️
                  </button>
                  <button
                    onClick={closeModal}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="モーダルを閉じる"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 写真 */}
              <div className="relative">
                <img
                  src={modalData.photo.url}
                  alt={modalData.photo.caption || '思い出の写真'}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                
                {/* いいねボタン */}
                <button
                  onClick={() => toggleLike(modalData.photo)}
                  className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    modalData.photo.liked
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                  }`}
                  aria-label={modalData.photo.liked ? 'いいねを解除' : 'いいねする'}
                >
                  <Heart className={`w-6 h-6 ${modalData.photo.liked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* フッター情報 */}
              <div className="p-4 space-y-4">
                {/* キャプション編集 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      キャプション
                    </label>
                    {!isEditingCaption ? (
                      <button
                        onClick={startEditingCaption}
                        className="text-pink-500 hover:text-pink-600 text-sm flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        編集
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={saveCaption}
                          className="text-green-500 hover:text-green-600 text-sm"
                        >
                          保存
                        </button>
                        <button
                          onClick={cancelCaptionEdit}
                          className="text-gray-500 hover:text-gray-600 text-sm"
                        >
                          キャンセル
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {isEditingCaption ? (
                    <textarea
                      value={editingCaption}
                      onChange={(e) => setEditingCaption(e.target.value)}
                      placeholder="思い出を一言で..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                      rows={3}
                      maxLength={200}
                    />
                  ) : (
                    <p className="text-gray-700 min-h-[3rem]">
                      {modalData.photo.caption || 'キャプションがありません'}
                    </p>
                  )}
                </div>

                {/* 写真情報 */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">サイズ:</span> {modalData.photo.width} × {modalData.photo.height}
                  </div>
                  <div>
                    <span className="font-medium">ファイルサイズ:</span> {(modalData.photo.fileSize / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
