// 認証設定の例
// このファイルをコピーして config/auth.local.ts として保存してください

export interface User {
  id: string;
  username: string;
  password: string;
  displayName: string;
}

export const USERS: User[] = [
  {
    id: 'user1',
    username: 'すもっぴ',
    password: '221102', // ここに実際のパスワードを設定
    displayName: 'すもっぴ'
  },
  {
    id: 'demo',
    username: 'demo',
    password: 'demo', // ここに実際のパスワードを設定
    displayName: 'デモユーザー'
  },
];

export const AUTH_CONFIG = {
  SESSION_DURATION: 24,
  MAX_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15,
  ENABLE_GUEST_LOGIN: true,
};