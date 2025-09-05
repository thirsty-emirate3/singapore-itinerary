// 認証設定（本番用）
export interface User {
  id: string;
  username: string;
  password: string;
  displayName: string;
}

// パスワード取得関数（環境変数優先、ローカル設定次点、デフォルト値最後）
const getPassword = (key: string, defaultValue: string): string => {
  // 1. 環境変数をチェック
  const envPassword = process.env[`NEXT_PUBLIC_${key}`];
  if (envPassword) return envPassword;
  
  // 2. ローカル設定をチェック
  try {
    const localConfig = require('./auth.local.ts');
    const localPassword = localConfig.USERS?.find((user: User) => user.id === key.toLowerCase())?.password;
    if (localPassword) return localPassword;
  } catch (error) {
    // ローカル設定ファイルが存在しない場合は無視
  }
  
  // 3. デフォルト値を使用
  return defaultValue;
};

export const USERS: User[] = [
  {
    id: 'user1',
    username: 'すもっぴ',
    password: getPassword('AUTH_PASSWORD_SUMOPPI', '221102'), // 本番用デフォルト値
    displayName: 'すもっぴ'
  },
  {
    id: 'demo',
    username: 'demo',
    password: getPassword('AUTH_PASSWORD_DEMO', 'demo'), // 本番用デフォルト値
    displayName: 'デモユーザー'
  },
];

export const AUTH_CONFIG = {
  SESSION_DURATION: 24,
  MAX_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15,
  ENABLE_GUEST_LOGIN: process.env.NEXT_PUBLIC_ENABLE_GUEST_LOGIN === 'true' || true,
};
