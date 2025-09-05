// 認証設定（本番用）
export interface User {
  id: string;
  username: string;
  password: string;
  displayName: string;
}

// ローカル設定を読み込む（存在しない場合はデフォルト値を使用）
let localConfig: any = null;

try {
  // ローカル設定ファイルを動的にインポート
  localConfig = require('./auth.local.ts');
} catch (error) {
  // ローカル設定ファイルが存在しない場合はデフォルト値を使用
  console.log('ローカル認証設定が見つかりません。デフォルト値を使用します。');
}

export const USERS: User[] = localConfig?.USERS || [
  {
    id: 'user1',
    username: 'すもっぴ',
    password: '221102', // デフォルト値
    displayName: 'すもっぴ'
  },
  {
    id: 'demo',
    username: 'demo',
    password: 'demo', // デフォルト値
    displayName: 'デモユーザー'
  },
];

export const AUTH_CONFIG = localConfig?.AUTH_CONFIG || {
  SESSION_DURATION: 24,
  MAX_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15,
  ENABLE_GUEST_LOGIN: true,
};
