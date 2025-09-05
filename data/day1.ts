import type { Day } from "./itinerary";

export interface Photo {
  src: string;
  alt: string;
  caption: string;
  tag: string;
}

export interface Bar {
  name: string;
  vibe: string;
  price: '$' | '$$' | '$$$';
  signature: string;
  viewScore: number;
  mapUrl: string;
  reserveUrl?: string;
}

export interface CasinoGame {
  key: string;
  name: string;
  minBet: string;
  basics: string[];
  avoid: string[];
  edge: string;
}

export interface CasinoLink {
  label: string;
  url: string;
}

export interface CasinoNotes {
  entry: string[];
  etiquette: string[];
}

export interface Bankroll {
  defaultStake: number;
  min: number;
  max: number;
}

export interface Casino {
  tabs: string[];
  games: CasinoGame[];
  links: CasinoLink[];
  notes: CasinoNotes;
  videoUrl?: string;
  bankroll: Bankroll;
}

export const day1Photos: Photo[] = [
  {
    src: '/image/day1_detail/day1-lobby.jpg',
    alt: 'マリーナベイ・サンズのロビー',
    caption: '豪華なホテルロビー',
    tag: 'lobby'
  },
  {
    src: '/image/day1_detail/day1-infinity-pool.jpg',
    alt: 'インフィニティプール',
    caption: '世界最高の高さにある屋外プール',
    tag: 'pool'
  },
  {
    src: '/image/day1_detail/day1-skybar.jpg',
    alt: 'スカイバーからの眺め',
    caption: '57階からの絶景',
    tag: 'skybar'
  },
  {
    src: '/image/day1_detail/day1-lunch.jpg',
    alt: 'ホーカーフード',
    caption: '地元の味を楽しむ',
    tag: 'food'
  },
  {
    src: '/image/day1_detail/day1-shoppes.jpg',
    alt: 'The Shoppes at Marina Bay Sands',
    caption: '高級ショッピングモール',
    tag: 'shopping'
  },
  {
    src: '/image/day1_detail/day1-gbb-dome.jpg',
    alt: 'ガーデンズ・バイ・ザ・ベイ ドーム',
    caption: '植物園のドーム',
    tag: 'gbb'
  },
  {
    src: '/image/day1_detail/day1-gbb-skyway.jpg',
    alt: 'ガーデンズ・バイ・ザ・ベイ スカイウェイ',
    caption: '空中散歩道',
    tag: 'gbb'
  },
  {
    src: '/image/day1_detail/day1-casino.jpg',
    alt: 'マリーナベイ・サンズ カジノ',
    caption: '夜のカジノ',
    tag: 'casino'
  },
  {
    src: '/image/day1_detail/day1-merlion.jpg',
    alt: '夜のマーライオン',
    caption: 'シンガポールのシンボル',
    tag: 'merlion'
  },
  {
    src: '/image/day1_detail/day1-hero.jpg',
    alt: 'マリーナベイ・サンズの夜景',
    caption: 'シンガポールの象徴的な夜景',
    tag: 'hero'
  }
];

export const day1: Day = {
  id: "1",
  title: "Day 1 — マリーナベイ・サンズ",
  date: "2025-09-27",
  cover: "/image/day1.jpg",
  summary: "マーライオンとガーデンズ観光、昼食、ショッピング、プール、バー、豪華ディナー、カジノと盛りだくさん！",
  slots: [
    {
      id: "d1-0510",
      time: "05:10",
      title: "シンガポール・チャンギ空港到着",
      note: "羽田から早朝着。タクシーまたはGrabでホテルへ移動（約20分）。",
      category: "transfer",
      mapQuery: "Changi Airport",
      links: [{ label: "空港情報", href: "https://www.changiairport.com/" }]
    },
    {
      id: "d1-0700",
      time: "07:00",
      title: "ホテル到着・荷物預け",
      note: "チェックインは15:00から。荷物をクロークに預けて観光へ。",
      category: "hotel",
      mapQuery: "Marina Bay Sands",
      links: [{ label: "MBS 公式", href: "https://www.marinabaysands.com/" }]
    },
    {
      id: "d1-0830",
      time: "08:30",
      title: "マーライオン公園",
      note: "シンガポールの定番スポット。サンズを背景に写真撮影。",
      category: "sight",
      mapQuery: "Merlion Park",
      links: [{ label: "Merlion Info", href: "https://www.visitsingapore.com/see-do-singapore/recreation-leisure/viewpoints/merlion-park/" }]
    },
    {
      id: "d1-1000",
      time: "10:00",
      title: "ガーデンズ・バイ・ザ・ベイ",
      note: "クラウドフォレストとフラワードームを見学。涼しくて快適。",
      category: "sight",
      mapQuery: "Gardens by the Bay",
      links: [{ label: "チケット", href: "https://www.gardensbythebay.com.sg/" }]
    },
    {
      id: "d1-1200",
      time: "12:00",
      title: "ランチ（ローカルフード）",
      note: "候補1: Satay by the Bay（屋台風、ローカルフード）。候補2: Lau Pa Sat（名物サテーストリート）。",
      category: "food",
      mapQuery: "Satay by the Bay",
      links: [
        { label: "Satay by the Bay", href: "https://www.gardensbythebay.com.sg/en/dining/satay-by-the-bay.html" },
        { label: "Lau Pa Sat", href: "https://www.laupasat.sg/" }
      ]
    },
    {
      id: "d1-1400",
      time: "14:00",
      title: "マリーナベイサンズ内ショッピング",
      note: "The Shoppesで高級ブランドやレストラン巡り。",
      category: "shopping",
      mapQuery: "The Shoppes at Marina Bay Sands",
      links: [{ label: "The Shoppes", href: "https://www.marinabaysands.com/shopping.html" }]
    },
    {
      id: "d1-1500",
      time: "15:00",
      title: "ホテルチェックイン",
      note: "部屋に入り一息ついた後、プールへ。",
      category: "hotel",
      mapQuery: "Marina Bay Sands",
      links: [{ label: "MBS 公式", href: "https://www.marinabaysands.com/" }]
    },
    {
      id: "d1-1600",
      time: "16:00",
      title: "インフィニティプール",
      note: "宿泊者専用。サンセットタイムは混雑必至。",
      category: "relax",
      mapQuery: "Marina Bay Sands Infinity Pool",
      links: [{ label: "プール情報", href: "https://www.marinabaysands.com/hotel/infinity-pool.html" }]
    },
    {
      id: "d1-1800",
      time: "18:00",
      title: "イブニングバー",
      note: "Ce La Vi Skybarで夕陽と夜景を楽しむ。",
      category: "night",
      mapQuery: "Ce La Vi Skybar",
      links: [{ label: "Ce La Vi", href: "https://www.celavi.com/" }]
    },
    {
      id: "d1-1900",
      time: "19:00",
      title: "ディナー（サンズ内レストラン）",
      note: "候補1: Rise Buffet（世界の料理）／候補2: Spago（洋食・夜景）／候補3: Din Tai Fung（小籠包）。",
      category: "food",
      mapQuery: "Marina Bay Sands Restaurants",
      links: [
        { label: "Rise Buffet", href: "https://www.marinabaysands.com/restaurants/rise.html" },
        { label: "Spago", href: "https://www.marinabaysands.com/restaurants/spago.html" },
        { label: "Din Tai Fung", href: "https://www.marinabaysands.com/restaurants/din-tai-fung.html" }
      ]
    },
    {
      id: "d1-2100",
      time: "21:00",
      title: "カジノ（ゲーム別攻略）",
      note: "入場条件: 21歳以上、パスポート必須。\\n- スロット: 気軽に遊べる、最低ベット少なめ。\\n- ルーレット: 赤/黒ベットで盛り上がる。\\n- バカラ: シンガポール定番、プレイヤー/バンカーに賭けるだけ。\\n- ブラックジャック: 基本戦略表に従うと勝率UP。",
      category: "night",
      mapQuery: "Marina Bay Sands Casino",
      links: [{ label: "Casino Info", href: "https://www.marinabaysands.com/casino.html" }]
    },
    {
      id: "d1-2300",
      time: "23:00",
      title: "ナイトバーで締め",
      note: "ホテル内や周辺のバーで最後の一杯。",
      category: "night",
      mapQuery: "Marina Bay Sands Bar",
      links: []
    }
  ]
};
