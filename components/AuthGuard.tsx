'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { USERS, AUTH_CONFIG, type User } from '@/config/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  // 認証状態をチェック
  useEffect(() => {
    const authData = localStorage.getItem('singapore-auth');
    if (authData) {
      try {
        const { isAuthenticated: authStatus, user, isGuest: guestStatus } = JSON.parse(authData);
        if (authStatus) {
          if (guestStatus) {
            setIsGuest(true);
            setCurrentUser({ id: 'guest', username: 'ゲスト', password: '', displayName: 'ゲストユーザー' });
          } else if (user) {
            setCurrentUser(user);
          }
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('認証データの解析に失敗しました:', error);
        localStorage.removeItem('singapore-auth');
      }
    }
    setIsLoading(false);
  }, []);

  // ユーザー認証
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ユーザー名とパスワードで認証
    const user = USERS.find(u => u.username === username && u.password === password);
    
    if (user) {
      const authData = {
        isAuthenticated: true,
        user: user
      };
      localStorage.setItem('singapore-auth', JSON.stringify(authData));
      setIsAuthenticated(true);
      setCurrentUser(user);
      setError('');
      setUsername('');
      setPassword('');
    } else {
      setError('ユーザー名またはパスワードが正しくありません');
      setPassword('');
    }
  };

  // ゲストログイン
  const handleGuestLogin = () => {
    const authData = {
      isAuthenticated: true,
      isGuest: true,
      user: { id: 'guest', username: 'ゲスト', password: '', displayName: 'ゲストユーザー' }
    };
    localStorage.setItem('singapore-auth', JSON.stringify(authData));
    setIsAuthenticated(true);
    setIsGuest(true);
    setCurrentUser({ id: 'guest', username: 'ゲスト', password: '', displayName: 'ゲストユーザー' });
  };

  // ログアウト
  const handleLogout = () => {
    localStorage.removeItem('singapore-auth');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsGuest(false);
  };

  // ローディング中
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🔐</div>
          <p className="text-white text-lg">認証を確認中...</p>
        </div>
      </div>
    );
  }

  // 未認証の場合
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* ロゴ・タイトル */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative w-24 h-24 mx-auto mb-6"
            >
              <Image
                src="/load.png"
                alt="Singapore Trip"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              シンガポール旅行プランナー
            </h1>
            <p className="text-blue-200">
              プライベートアクセス
            </p>
          </div>

          {/* ログインフォーム */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl"
          >
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                  ユーザー名
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ユーザー名を入力"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  パスワード
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="パスワードを入力"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-500/20 border border-red-500/30 rounded-lg p-3"
                >
                  <p className="text-red-200 text-sm">{error}</p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:from-blue-600 hover:to-purple-700"
              >
                🔓 アクセスする
              </motion.button>
            </form>

            {/* ゲストログインボタン */}
            {AUTH_CONFIG.ENABLE_GUEST_LOGIN && (
              <div className="mt-6">
                <motion.button
                  onClick={handleGuestLogin}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white/20 text-white font-medium py-3 rounded-xl text-lg shadow-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
                >
                  👤 ゲストとして閲覧
                </motion.button>
                <p className="text-white/60 text-xs mt-2 text-center">
                  ゲストは写真のアップロードやメモの保存はできません
                </p>
              </div>
            )}

            {/* ヒント */}
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                ユーザー名とパスワードをお忘れの場合は、管理者にお問い合わせください
              </p>
            </div>
          </motion.div>

          {/* フッター */}
          <div className="text-center mt-8">
            <p className="text-white/40 text-sm">
              © 2024 Singapore Trip Planner
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // 認証済みの場合
  return (
    <div className="relative">
      {/* ユーザー情報とログアウトボタン */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <div className={`px-3 py-2 backdrop-blur-md text-white text-sm font-medium rounded-full shadow-lg ${
          isGuest ? 'bg-gray-500/80' : 'bg-blue-500/80'
        }`}>
          {isGuest ? '👤' : '👤'} {currentUser?.displayName}
        </div>
        <motion.button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500/80 backdrop-blur-md text-white text-sm font-medium rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🚪 ログアウト
        </motion.button>
      </div>
      
      {children}
    </div>
  );
}
