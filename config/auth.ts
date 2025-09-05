// 本番環境用の認証設定
export interface User {
  id: string;
  username: string;
  password: string;
  displayName: string;
}

// 環境変数からパスワードを取得する関数
const getPassword = (key: string): string => {
  if (typeof window !== 'undefined') {
    // クライアントサイドでは環境変数を使用
    return process.env[`NEXT_PUBLIC_${key}`] || 'default';
  }
  // サーバーサイドでは環境変数を使用
  return process.env[key] || 'default';
};

export const USERS: User[] = [
  {
    id: 'user1',
    username: 'すもっぴ',
    password: getPassword('AUTH_PASSWORD_SUMOPPI') || '221102', // フォールバック
    displayName: 'すもっぴ'
  },
  {
    id: 'demo',
    username: 'demo',
    password: getPassword('AUTH_PASSWORD_DEMO') || 'demo', // フォールバック
    displayName: 'デモユーザー'
  },
];

export const AUTH_CONFIG = {
  // セッション有効期限（時間）
  SESSION_DURATION: 24,
  
  // 最大試行回数
  MAX_ATTEMPTS: 5,
  
  // ロックアウト時間（分）
  LOCKOUT_DURATION: 15,
  
  // ゲストログインの有効/無効
  ENABLE_GUEST_LOGIN: process.env.NEXT_PUBLIC_ENABLE_GUEST_LOGIN === 'true' || true, // フォールバック
};
