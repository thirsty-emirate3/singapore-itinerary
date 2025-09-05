# Singapore Itinerary

シンガポール旅行の詳細なプランナーアプリです。

## 機能

- 4日間の詳細な旅行プラン
- 各日のスポット情報とタイムライン
- 写真ギャラリーとメモ機能
- マルチユーザー認証システム
- ゲストログイン機能
- レスポンシブデザイン
- PWA対応

## 技術スタック

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- IndexedDB

## セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd singapore-itinerary
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の内容を設定してください：

```env
# 認証設定
NEXT_PUBLIC_ENABLE_GUEST_LOGIN=true
AUTH_PASSWORD_SUMOPPI=your_password_here
AUTH_PASSWORD_DEMO=your_demo_password_here
```

### 4. 認証設定ファイルの作成

`config/auth.ts`ファイルを作成し、`config/auth.example.ts`を参考に設定してください。

## 開発

```bash
npm run dev
```

## ビルド

```bash
npm run build
npm start
```

## デプロイ

### Vercel

```bash
npx vercel --prod
```

### その他のプラットフォーム

```bash
npm run build
# outフォルダをホスティングサービスにアップロード
```

## セキュリティ

- パスワードは環境変数で管理
- 各ユーザーのデータは完全に分離
- ゲストユーザーは写真のアップロード不可

## ライセンス

MIT License