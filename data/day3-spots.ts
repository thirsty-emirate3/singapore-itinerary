export interface TimeRecommendation {
  key: string;
  label: string;
}

export interface SentosaSpot {
  id: string;
  label: string;
  slug: string;
  color: string;
  x: number; // 0-100 (%)
  y: number; // 0-100 (%)
  description: string;
  link: string;
  tags: string[];
  timeRecommendations: TimeRecommendation[];
}

export const sentosaSpots: SentosaSpot[] = [
  {
    id: 'uss',
    label: 'ユニバーサル・スタジオ・シンガポール',
    slug: 'uss',
    color: '#FF6B35',
    x: 25,
    y: 30,
    description: '世界初のUSS。ハリウッド・ニューヨーク・サイエンス・フィクションの3エリア',
    link: 'https://www.rwsentosa.com/en/attractions/universal-studios-singapore',
    tags: ['thrill', 'family', 'photo'],
    timeRecommendations: [
      { key: 'morning', label: '午前◎' },
      { key: 'afternoon', label: '午後◎' }
    ]
  },
  {
    id: 'siloso',
    label: 'シロソ・ビーチ',
    slug: 'siloso',
    color: '#4ECDC4',
    x: 45,
    y: 65,
    description: 'セントーサ最大のビーチ。ウォータースポーツとナイトライフ',
    link: 'https://www.sentosa.com.sg/en/things-to-do/attractions/siloso-beach',
    tags: ['family', 'photo'],
    timeRecommendations: [
      { key: 'sunset', label: '夕景◎' },
      { key: 'night', label: '夜◎' }
    ]
  },
  {
    id: 'palawan',
    label: 'パラワン・ビーチ',
    slug: 'palawan',
    color: '#45B7D1',
    x: 75,
    y: 70,
    description: '家族向けビーチ。パラワン・ピラミッドと吊り橋',
    link: 'https://www.sentosa.com.sg/en/things-to-do/attractions/palawan-beach',
    tags: ['family', 'photo'],
    timeRecommendations: [
      { key: 'morning', label: '午前◎' },
      { key: 'sunset', label: '夕景◎' }
    ]
  },
  {
    id: 'aquarium',
    label: 'S.E.A. アクアリウム',
    slug: 'aquarium',
    color: '#96CEB4',
    x: 60,
    y: 45,
    description: '世界最大級の水族館。10万匹以上の海洋生物',
    link: 'https://www.rwsentosa.com/en/attractions/sea-aquarium',
    tags: ['family', 'photo'],
    timeRecommendations: [
      { key: 'morning', label: '午前◎' },
      { key: 'afternoon', label: '午後◎' }
    ]
  },
  {
    id: 'luge',
    label: 'セントーサ・ルージュ',
    slug: 'luge',
    color: '#FFEAA7',
    x: 35,
    y: 55,
    description: '重力を利用した滑走車。山の斜面を滑り降りる',
    link: 'https://www.sentosa.com.sg/en/things-to-do/attractions/sentosa-luge',
    tags: ['thrill', 'family'],
    timeRecommendations: [
      { key: 'morning', label: '午前◎' },
      { key: 'afternoon', label: '午後◎' }
    ]
  },
  {
    id: 'wot',
    label: 'Wings of Time',
    slug: 'wot',
    color: '#DDA0DD',
    x: 55,
    y: 80,
    description: '夜の光と音のショー。海の上で繰り広げられる物語',
    link: 'https://www.sentosa.com.sg/en/things-to-do/attractions/wings-of-time',
    tags: ['family', 'photo'],
    timeRecommendations: [
      { key: 'night', label: '夜ショー◎' }
    ]
  }
];

export default sentosaSpots;
