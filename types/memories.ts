export interface MemoryPhoto {
  id: string;
  url: string;
  blob: Blob;
  width: number;
  height: number;
  day?: 'Day1' | 'Day2' | 'Day3' | 'Day4';
  caption?: string;
  liked: boolean;
  uploadedAt: Date;
  fileSize: number;
  thumbnailUrl?: string;
  userId?: string; // ユーザーIDを追加
}

export interface RankingData {
  spotId?: string;
  foodId?: string;
  momentId?: string;
  spotComment?: string;
  foodComment?: string;
  momentComment?: string;
}

export interface UploadedFile {
  file: File;
  preview: string;
  day?: 'Day1' | 'Day2' | 'Day3' | 'Day4';
  caption?: string;
}

export interface PhotoModalData {
  photo: MemoryPhoto;
  isOpen: boolean;
}

export interface RankingSelection {
  type: 'spot' | 'food' | 'moment';
  photoId: string;
  comment: string;
}

export interface PhotoStats {
  totalPhotos: number;
  totalLikes: number;
  photosByDay: Record<string, number>;
  averageFileSize: number;
}
