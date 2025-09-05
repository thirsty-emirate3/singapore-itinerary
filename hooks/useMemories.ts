import { useState, useEffect, useCallback } from 'react';
import type { MemoryPhoto, RankingData } from '@/types/memories';

// IndexedDBの設定
const DB_NAME = 'MemoriesDB';
const DB_VERSION = 1;
const PHOTOS_STORE = 'photos';
const RANKINGS_STORE = 'rankings';

// ユーザーIDを取得する関数
const getCurrentUserId = (): string => {
  if (typeof window === 'undefined') return 'default';
  
  const authData = localStorage.getItem('singapore-auth');
  if (authData) {
    try {
      const { user, isGuest } = JSON.parse(authData);
      if (isGuest) {
        return 'guest'; // ゲストユーザーは写真を保存できない
      }
      return user?.id || 'default';
    } catch (error) {
      console.error('認証データの解析に失敗しました:', error);
    }
  }
  return 'default';
};

// ゲストユーザーかどうかを確認する関数
const isGuestUser = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const authData = localStorage.getItem('singapore-auth');
  if (authData) {
    try {
      const { isGuest } = JSON.parse(authData);
      return isGuest === true;
    } catch (error) {
      console.error('認証データの解析に失敗しました:', error);
    }
  }
  return false;
};

// データベース接続
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // 写真ストアの作成
      if (!db.objectStoreNames.contains(PHOTOS_STORE)) {
        const photosStore = db.createObjectStore(PHOTOS_STORE, { keyPath: 'id' });
        photosStore.createIndex('uploadedAt', 'uploadedAt', { unique: false });
        photosStore.createIndex('day', 'day', { unique: false });
      }
      
      // ランキングストアの作成
      if (!db.objectStoreNames.contains(RANKINGS_STORE)) {
        db.createObjectStore(RANKINGS_STORE, { keyPath: 'id' });
      }
    };
  });
};

// 写真の操作
const photosDB = {
  async getAll(): Promise<MemoryPhoto[]> {
    const db = await openDB();
    const transaction = db.transaction([PHOTOS_STORE], 'readonly');
    const store = transaction.objectStore(PHOTOS_STORE);
    const userId = getCurrentUserId();
    
    // ユーザーIDでフィルタリング
    const request = store.getAll();
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const allPhotos = request.result;
        const userPhotos = allPhotos.filter(photo => photo.userId === userId);
        resolve(userPhotos);
      };
      request.onerror = () => reject(request.error);
    });
  },
  
  async add(photo: MemoryPhoto): Promise<void> {
    const db = await openDB();
    const transaction = db.transaction([PHOTOS_STORE], 'readwrite');
    const store = transaction.objectStore(PHOTOS_STORE);
    await store.add(photo);
  },
  
  async update(photo: MemoryPhoto): Promise<void> {
    const db = await openDB();
    const transaction = db.transaction([PHOTOS_STORE], 'readwrite');
    const store = transaction.objectStore(PHOTOS_STORE);
    await store.put(photo);
  },
  
  async delete(id: string): Promise<void> {
    const db = await openDB();
    const transaction = db.transaction([PHOTOS_STORE], 'readwrite');
    const store = transaction.objectStore(PHOTOS_STORE);
    await store.delete(id);
  },
  
  async getById(id: string): Promise<MemoryPhoto | undefined> {
    const db = await openDB();
    const transaction = db.transaction([PHOTOS_STORE], 'readonly');
    const store = transaction.objectStore(PHOTOS_STORE);
    const request = store.get(id);
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
};

// ランキングの操作
const rankingsDB = {
  async get(): Promise<RankingData> {
    const db = await openDB();
    const transaction = db.transaction([RANKINGS_STORE], 'readonly');
    const store = transaction.objectStore(RANKINGS_STORE);
    const request = store.get('rankings');
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || {});
      request.onerror = () => reject(request.error);
    });
  },
  
  async update(rankings: RankingData): Promise<void> {
    const db = await openDB();
    const transaction = db.transaction([RANKINGS_STORE], 'readwrite');
    const store = transaction.objectStore(RANKINGS_STORE);
    await store.put({ id: 'rankings', ...rankings });
  }
};

// 画像処理ユーティリティ
const imageUtils = {
  // 画像をJPEGに変換（HEIC対策）
  async convertToJPEG(file: File, quality: number = 0.85): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        // 最大長辺を1800pxに制限
        const maxSize = 1800;
        let { width, height } = img;
        
        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  },
  
  // サムネイル生成
  async generateThumbnail(blob: Blob, maxSize: number = 600): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        let { width, height } = img;
        
        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((thumbnailBlob) => resolve(thumbnailBlob!), 'image/jpeg', 0.8);
      };
      
      img.src = URL.createObjectURL(blob);
    });
  },
  
  // ファイルサイズの人間が読みやすい形式に変換
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};

export const useMemories = () => {
  const [photos, setPhotos] = useState<MemoryPhoto[]>([]);
  const [rankings, setRankings] = useState<RankingData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isIndexedDBSupported, setIsIndexedDBSupported] = useState(false);

  // IndexedDBのサポートチェック
  useEffect(() => {
    if (typeof window !== 'undefined' && 'indexedDB' in window) {
      setIsIndexedDBSupported(true);
    } else {
      setIsIndexedDBSupported(false);
      setIsLoading(false);
    }
  }, []);

  // 初期データの読み込み
  useEffect(() => {
    if (!isIndexedDBSupported) return;

    const loadData = async () => {
      try {
        const [photosData, rankingsData] = await Promise.all([
          photosDB.getAll(),
          rankingsDB.get()
        ]);
        
        setPhotos(photosData);
        setRankings(rankingsData);
      } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isIndexedDBSupported]);

  // 写真の追加
  const addPhoto = useCallback(async (file: File, day?: string, caption?: string) => {
    if (!isIndexedDBSupported) {
      throw new Error('IndexedDBがサポートされていません');
    }

    // ゲストユーザーは写真をアップロードできない
    if (isGuestUser()) {
      throw new Error('ゲストユーザーは写真をアップロードできません');
    }

    try {
      // 画像をJPEGに変換
      const jpegBlob = await imageUtils.convertToJPEG(file);
      
      // サムネイル生成
      const thumbnailBlob = await imageUtils.generateThumbnail(jpegBlob);
      
      // 画像の寸法を取得
      const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.src = URL.createObjectURL(jpegBlob);
      });

      const photo: MemoryPhoto = {
        id: crypto.randomUUID(),
        url: URL.createObjectURL(jpegBlob),
        blob: jpegBlob,
        width: dimensions.width,
        height: dimensions.height,
        day: day as any,
        caption,
        liked: false,
        uploadedAt: new Date(),
        fileSize: jpegBlob.size,
        thumbnailUrl: URL.createObjectURL(thumbnailBlob),
        userId: getCurrentUserId() // ユーザーIDを追加
      };

      // IndexedDBに保存
      await photosDB.add(photo);
      
      // 状態を更新
      setPhotos(prev => [photo, ...prev]);
      
      return photo;
    } catch (error) {
      console.error('写真の追加に失敗しました:', error);
      throw error;
    }
  }, [isIndexedDBSupported]);

  // 写真の更新
  const updatePhoto = useCallback(async (photo: MemoryPhoto) => {
    try {
      await photosDB.update(photo);
      setPhotos(prev => prev.map(p => p.id === photo.id ? photo : p));
    } catch (error) {
      console.error('写真の更新に失敗しました:', error);
      throw error;
    }
  }, []);

  // 写真の削除
  const deletePhoto = useCallback(async (id: string) => {
    try {
      await photosDB.delete(id);
      setPhotos(prev => prev.filter(p => p.id !== id));
      
      // ランキングからも削除
      const updatedRankings = { ...rankings };
      if (updatedRankings.spotId === id) updatedRankings.spotId = undefined;
      if (updatedRankings.foodId === id) updatedRankings.foodId = undefined;
      if (updatedRankings.momentId === id) updatedRankings.momentId = undefined;
      
      if (JSON.stringify(updatedRankings) !== JSON.stringify(rankings)) {
        await rankingsDB.update({ ...updatedRankings });
        setRankings(updatedRankings);
      }
    } catch (error) {
      console.error('写真の削除に失敗しました:', error);
      throw error;
    }
  }, [rankings]);

  // 写真のいいね切り替え
  const toggleLike = useCallback(async (id: string) => {
    const photo = photos.find(p => p.id === id);
    if (photo) {
      const updatedPhoto = { ...photo, liked: !photo.liked };
      await updatePhoto(updatedPhoto);
    }
  }, [photos, updatePhoto]);

  // ランキングの更新
  const updateRankings = useCallback(async (newRankings: RankingData) => {
    try {
      await rankingsDB.update(newRankings);
      setRankings(newRankings);
    } catch (error) {
      console.error('ランキングの更新に失敗しました:', error);
      throw error;
    }
  }, []);

  // 写真の検索
  const searchPhotos = useCallback((query: string) => {
    if (!query.trim()) return photos;
    
    const lowerQuery = query.toLowerCase();
    return photos.filter(photo => 
      photo.caption?.toLowerCase().includes(lowerQuery) ||
      photo.day?.toLowerCase().includes(lowerQuery)
    );
  }, [photos]);

  // 写真のフィルタリング
  const filterPhotosByDay = useCallback((day?: string) => {
    if (!day) return photos;
    return photos.filter(photo => photo.day === day);
  }, [photos]);

  // 統計情報の取得
  const getStats = useCallback(() => {
    const totalPhotos = photos.length;
    const totalLikes = photos.filter(p => p.liked).length;
    const photosByDay = photos.reduce((acc, photo) => {
      const day = photo.day || '未分類';
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const averageFileSize = photos.length > 0 
      ? photos.reduce((sum, p) => sum + p.fileSize, 0) / photos.length 
      : 0;

    return {
      totalPhotos,
      totalLikes,
      photosByDay,
      averageFileSize
    };
  }, [photos]);

  return {
    photos,
    rankings,
    isLoading,
    isIndexedDBSupported,
    addPhoto,
    updatePhoto,
    deletePhoto,
    toggleLike,
    updateRankings,
    searchPhotos,
    filterPhotosByDay,
    getStats
  };
};
