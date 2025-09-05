"use client";

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Camera, FileImage, Calendar, MessageSquare } from 'lucide-react';
import type { UploadedFile } from '@/types/memories';

interface UploadBoxProps {
  onUpload: (file: File, day?: string, caption?: string) => Promise<any>;
}

export default function UploadBox({ onUpload }: UploadBoxProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ファイル選択処理
  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        file,
        preview: URL.createObjectURL(file),
        day: undefined,
        caption: ''
      }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  // ドラッグ&ドロップ処理
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  // ファイル選択ボタンクリック
  const handleSelectFiles = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // ファイル削除
  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  }, []);

  // Dayタグ更新
  const updateFileDay = useCallback((index: number, day: string) => {
    setUploadedFiles(prev => prev.map((file, i) => 
      i === index ? { ...file, day: day as 'Day1' | 'Day2' | 'Day3' | 'Day4' } : file
    ));
  }, []);

  // キャプション更新
  const updateFileCaption = useCallback((index: number, caption: string) => {
    setUploadedFiles(prev => prev.map((file, i) => 
      i === index ? { ...file, caption } : file
    ));
  }, []);

  // アップロード実行
  const handleUpload = useCallback(async () => {
    if (uploadedFiles.length === 0) return;

    setIsUploading(true);
    try {
      for (const uploadedFile of uploadedFiles) {
        await onUpload(uploadedFile.file, uploadedFile.day, uploadedFile.caption);
      }
      
      // 成功後、ファイルリストをクリア
      uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
      setUploadedFiles([]);
    } catch (error) {
      console.error('アップロードに失敗しました:', error);
      alert('アップロードに失敗しました。もう一度お試しください。');
    } finally {
      setIsUploading(false);
    }
  }, [uploadedFiles, onUpload]);

  // アップロード可能かチェック
  const canUpload = uploadedFiles.length > 0 && !isUploading;

  return (
    <div className="space-y-6">
      {/* ドラッグ&ドロップエリア */}
      <motion.div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-pink-400 bg-pink-50 scale-105'
            : 'border-gray-300 bg-white/50 hover:border-pink-300 hover:bg-pink-50/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="text-6xl">📸</div>
          <h3 className="text-xl font-semibold text-slate-800">
            写真をドラッグ&ドロップ
          </h3>
          <p className="text-slate-600">
            または
          </p>
          <button
            onClick={handleSelectFiles}
            className="px-6 py-3 bg-pink-500 text-white font-medium rounded-xl hover:bg-pink-600 transition-colors flex items-center gap-2 mx-auto"
          >
            <Camera className="w-5 h-5" />
            ファイルを選択
          </button>
          <p className="text-sm text-slate-500">
            HEIC、JPEG、PNG、WebP対応
          </p>
        </div>
      </motion.div>

      {/* アップロード予定ファイル一覧 */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <FileImage className="w-5 h-5 text-pink-500" />
              アップロード予定 ({uploadedFiles.length}枚)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-xl p-4 border border-gray-200 shadow-lg"
                >
                  {/* プレビュー画像 */}
                  <div className="relative mb-3">
                    <img
                      src={file.preview}
                      alt="プレビュー"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      aria-label="ファイルを削除"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* ファイル情報 */}
                  <div className="space-y-3">
                    <div className="text-sm text-slate-600">
                      <p className="font-medium truncate">{file.file.name}</p>
                      <p className="text-xs">
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    {/* Day選択 */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Day
                      </label>
                      <select
                        value={file.day || ''}
                        onChange={(e) => updateFileDay(index, e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="">選択してください</option>
                        <option value="Day1">Day1 - マリーナベイ・サンズ</option>
                        <option value="Day2">Day2 - 文化体験</option>
                        <option value="Day3">Day3 - セントーサ島</option>
                        <option value="Day4">Day4 - ショッピング・帰国</option>
                      </select>
                    </div>

                    {/* キャプション入力 */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        キャプション
                      </label>
                      <input
                        type="text"
                        value={file.caption}
                        onChange={(e) => updateFileCaption(index, e.target.value)}
                        placeholder="思い出を一言で..."
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        maxLength={100}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* アップロードボタン */}
            <div className="text-center pt-4">
              <button
                onClick={handleUpload}
                disabled={!canUpload}
                className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 mx-auto ${
                  canUpload
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Upload className="w-5 h-5" />
                {isUploading ? 'アップロード中...' : `${uploadedFiles.length}枚をアップロード`}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
