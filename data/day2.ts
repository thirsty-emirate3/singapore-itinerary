import type { Day } from "./itinerary";

export interface Photo {
  src: string;
  alt: string;
  caption: string;
  tag: string;
}

export interface Area {
  key: string;
  name: string;
  highlights: string[];
  food: string[];
  mapUrl: string;
  tips: string[];
  subPlaces?: Array<{
    name: string;
    icon: string;
    description: string;
    url: string;
  }>;
  budget: string;
  duration: string;
  category: string[];
}

export interface Hawker {
  name: string;
  picks: string[];
  price: string;
  mapUrl: string;
}

export interface NightSafariRoute {
  time: string;
  activity: string;
  note?: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface NightSafari {
  bookingUrl: string;
  mapUrl: string;
  showUrl: string;
  route: NightSafariRoute[];
  tips: string[];
  faq: FAQ[];
}

export interface Link {
  label: string;
  url: string;
  ext?: boolean;
}

export interface Day2Data {
  title: string;
  date: string;
  tabs: string[];
  areas: Area[];
  hawkers: Hawker[];
  clarkeQuay: Area;
  nightSafari: NightSafari;
  links: Link[];
}

// Day 2の写真データ
export const day2Photos: Photo[] = [
  {
    src: '/image/day2_detail/day2-hero.jpg',
    alt: 'Day 2の美しい景色',
    caption: '文化体験の一日',
    tag: 'hero'
  },
  {
    src: '/image/day2_detail/day2-chinatown.jpg',
    alt: 'チャイナタウンの街並み',
    caption: '伝統的な中華文化',
    tag: 'chinatown'
  },
  {
    src: '/image/day2_detail/day2-hawker.jpg',
    alt: 'ホーカーフード',
    caption: '地元の味を楽しむ',
    tag: 'food'
  },
  {
    src: '/image/day2_detail/day2-botanic-gardens.jpg',
    alt: 'ボタニック・ガーデン',
    caption: '世界遺産の庭園',
    tag: 'nature'
  },
  {
    src: '/image/day2_detail/day2-bugis.jpg',
    alt: 'ブギス地区',
    caption: 'ショッピングエリア',
    tag: 'shopping'
  },
  {
    src: '/image/day2_detail/day2-arab-street.jpg',
    alt: 'アラブストリート',
    caption: 'アラブ文化の香り',
    tag: 'culture'
  },
  {
    src: '/image/day2_detail/day2-dinner.jpg',
    alt: 'ディナー',
    caption: '夕食の時間',
    tag: 'food'
  },
  {
    src: '/image/day2_detail/night-safari/night-safari-entrance.jpg',
    alt: 'ナイトサファリ入り口',
    caption: '夜の冒険の始まり',
    tag: 'night-safari'
  },
  {
    src: '/image/day2_detail/night-safari/night-safari-tram.jpg',
    alt: 'ナイトサファリトラム',
    caption: '夜の動物たち',
    tag: 'night-safari'
  },
  {
    src: '/image/day2_detail/night-safari/night-safari-owl.jpg',
    alt: 'フクロウ',
    caption: '夜の森の番人',
    tag: 'animals'
  },
  {
    src: '/image/day2_detail/night-safari/night-safari-tiger.jpg',
    alt: 'トラ',
    caption: '夜の王者',
    tag: 'animals'
  },
  {
    src: '/image/day2_detail/night-safari/night-safari-deer.jpg',
    alt: 'シカ',
    caption: '夜の草食者',
    tag: 'animals'
  }
];

// Day型に合わせたエクスポート
export const day2: Day = {
  id: "2",
  title: "Day 2 — 文化体験 & ナイトサファリ",
  date: "2025-09-28",
  cover: "/image/day2.jpg",
  summary: "チャイナタウン、リトルインディア、アラブストリートを巡り、夜はナイトサファリを楽しむ。",
  slots: [
    {
      id: "d2-0900",
      time: "09:00",
      title: "チャイナタウン",
      note: "仏牙寺、チャイナタウンハリケーン、古い店舗と伝統建築を巡る。朝9時前は空いている。",
      category: "sight",
      mapQuery: "Chinatown Singapore",
      links: [
        { label: "地図", href: "https://maps.google.com/?q=Chinatown+Singapore" }
      ]
    },
    {
      id: "d2-1100",
      time: "11:00",
      title: "リトルインディア",
      note: "スリ・ヴィラマカリアマン寺院、マスタン・センター、カラフルな建物群を巡る。",
      category: "sight",
      mapQuery: "Little India Singapore",
      links: [
        { label: "地図", href: "https://maps.google.com/?q=Little+India+Singapore" }
      ]
    },
    {
      id: "d2-1300",
      time: "13:00",
      title: "アラブストリート",
      note: "スルタンモスク、ハジ・レーン、アラブ文化センター、織物と工芸品を楽しむ。",
      category: "sight",
      mapQuery: "Arab Street Singapore",
      links: [
        { label: "地図", href: "https://maps.google.com/?q=Arab+Street+Singapore" }
      ]
    },
    {
      id: "d2-1500",
      time: "15:00",
      title: "ブギス",
      note: "ストリートマーケット、お土産、モール、文化体験を楽しむ。",
      category: "shopping",
      mapQuery: "Bugis Singapore",
      links: [
        { label: "地図", href: "https://maps.google.com/?q=Bugis+Singapore" }
      ]
    },
    {
      id: "d2-1700",
      time: "17:00",
      title: "ボタニックガーデン",
      note: "ユネスコ世界遺産、蘭園、散策、自然体験を楽しむ。",
      category: "sight",
      mapQuery: "Botanic Gardens Singapore",
      links: [
        { label: "地図", href: "https://maps.google.com/?q=Botanic+Gardens+Singapore" }
      ]
    },
    {
      id: "d2-1900",
      time: "19:00",
      title: "ナイトサファリ",
      note: "世界初の夜間動物園。トラムツアー、ショー、ウォーキングトレイルを楽しむ。",
      category: "night",
      mapQuery: "Night Safari Singapore",
      links: [
        { label: "公式", href: "https://www.mandai.com/en/night-safari.html" },
        { label: "地図", href: "https://maps.google.com/?q=Night+Safari+Singapore" }
      ]
    }
  ]
};

export const day2Data: Day2Data = {
  title: "Day 2 — 文化体験 & ナイトサファリ",
  date: "2025-09-28",
  tabs: ["Day", "Night"],
  areas: [
    {
      key: "chinatown",
      name: "チャイナタウン",
      highlights: [
        "仏牙寺（Buddha Tooth Relic Temple）",
        "チャイナタウンハリケーン",
        "古い店舗と伝統建築",
        "夜のライトアップ"
      ],
      food: [
        "海南鶏飯（海南雞飯）",
        "肉骨茶（Bak Kut Teh）",
        "小籠包",
        "杏仁豆腐"
      ],
      mapUrl: "https://maps.google.com/?q=Chinatown+Singapore",
      tips: [
        "朝9時前は空いている",
        "仏牙寺は服装に注意",
        "土日は混雑する"
      ],
      subPlaces: [
        {
          name: "Buddha Tooth Relic Temple",
          icon: "🏛️",
          description: "仏牙寺",
          url: "https://maps.google.com/?q=Buddha+Tooth+Relic+Temple+Singapore"
        },
        {
          name: "Maxwell Food Centre",
          icon: "🍜",
          description: "フードコート",
          url: "https://maps.google.com/?q=Maxwell+Food+Centre+Singapore"
        }
      ],
      budget: "$",
      duration: "90-120m",
      category: ["文化", "買い物"]
    },
    {
      key: "little-india",
      name: "リトルインディア",
      highlights: [
        "スリ・ヴィラマカリアマン寺院",
        "マスタン・センター",
        "カラフルな建物群",
        "香辛料の香り"
      ],
      food: [
        "ビリヤニ",
        "ナンとカレー",
        "ラッシー",
        "サモサ"
      ],
      mapUrl: "https://maps.google.com/?q=Little+India+Singapore",
      tips: [
        "寺院は靴を脱ぐ",
        "香辛料は小分けで購入",
        "夕方から賑わう"
      ],
      subPlaces: [
        {
          name: "Sri Veeramakaliamman Temple",
          icon: "🕉️",
          description: "ヒンドゥー寺院",
          url: "https://maps.google.com/?q=Sri+Veeramakaliamman+Temple+Singapore"
        }
      ],
      budget: "$",
      duration: "60-90m",
      category: ["文化", "買い物"]
    },
    {
      key: "arab-street",
      name: "アラブストリート",
      highlights: [
        "スルタンモスク",
        "ハジ・レーン",
        "アラブ文化センター",
        "織物と工芸品"
      ],
      food: [
        "ケバブ",
        "フムス",
        "ピタパン",
        "アラビックコーヒー"
      ],
      mapUrl: "https://maps.google.com/?q=Arab+Street+Singapore",
      tips: [
        "モスクは礼拝時間外",
        "金曜は休みの店が多い",
        "交渉の余地あり"
      ],
      subPlaces: [
        {
          name: "Haji Lane",
          icon: "🧱",
          description: "Street Art",
          url: "https://maps.google.com/?q=Haji+Lane+Singapore"
        },
        {
          name: "Sultan Mosque",
          icon: "🕌",
          description: "モスク",
          url: "https://maps.google.com/?q=Sultan+Mosque+Singapore"
        }
      ],
      budget: "$",
      duration: "60-90m",
      category: ["文化", "買い物"]
    },
    {
      key: "bugis",
      name: "ブギス",
      highlights: [
        "ストリートマーケット",
        "お土産",
        "モール",
        "文化体験"
      ],
      food: [
        "ローカルスナック",
        "フルーツジュース",
        "屋台料理",
        "デザート"
      ],
      mapUrl: "https://maps.google.com/?q=Bugis+Street+Singapore",
      tips: [
        "午前中は空いている",
        "交渉の余地あり",
        "現金支払い推奨"
      ],
      subPlaces: [
        {
          name: "Bugis Street Market",
          icon: "🛍️",
          description: "ストリートマーケット",
          url: "https://maps.google.com/?q=Bugis+Street+Market+Singapore"
        },
        {
          name: "Bugis Junction",
          icon: "🏬",
          description: "ショッピングモール",
          url: "https://maps.google.com/?q=Bugis+Junction+Singapore"
        }
      ],
      budget: "$",
      duration: "60-90m",
      category: ["買い物", "文化"]
    },
    {
      key: "botanic",
      name: "ボタニックガーデン",
      highlights: [
        "ユネスコ世界遺産",
        "蘭園（National Orchid Garden）",
        "散策",
        "自然体験"
      ],
      food: [
        "ガーデンカフェ",
        "ピクニック",
        "軽食",
        "ドリンク"
      ],
      mapUrl: "https://maps.google.com/?q=Singapore+Botanic+Gardens",
      tips: [
        "朝早くがおすすめ",
        "歩きやすい靴を",
        "日焼け止め必須",
        "水を持参"
      ],
      subPlaces: [
        {
          name: "National Orchid Garden",
          icon: "🌸",
          description: "蘭園",
          url: "https://maps.google.com/?q=Maxwell+Food+Centre+Singapore"
        },
        {
          name: "Botanic Gardens MRT",
          icon: "🚇",
          description: "最寄り駅",
          url: "https://maps.google.com/?q=Maxwell+Food+Centre+Singapore"
        }
      ],
      budget: "$$",
      duration: "90-120m",
      category: ["自然", "文化"]
    }
  ],
  clarkeQuay: {
    key: "clarke-quay",
    name: "クラークキー",
    highlights: [
      "夜景＆バー密集",
      "ナイトサファリ前後の短時間でも雰囲気◎",
      "川沿いのレストラン",
      "ナイトライフ"
    ],
    food: [
      "多国籍料理",
      "シーフード",
      "カクテル",
      "デザート"
    ],
    mapUrl: "https://maps.google.com/?q=Night+Safari+Singapore",
    tips: [
      "夕方から賑わう",
      "予約推奨",
      "夜景が綺麗",
      "ナイトサファリ前後に◎"
    ],
    subPlaces: [
      {
        name: "Clarke Quay MRT",
        icon: "🚇",
        description: "最寄り駅",
        url: "https://maps.app.goo.gl/..."
      },
      {
        name: "Singapore River",
        icon: "🚤",
        description: "シンガポール川",
        url: "https://maps.app.goo.gl/..."
      }
    ],
    budget: "$$$",
    duration: "60-90m",
    category: ["ナイト", "グルメ"]
  },
  hawkers: [
    {
      name: "Maxwell Food Centre",
      picks: [
        "海南鶏飯（Tian Tian）",
        "炒粿条（Char Kway Teow）",
        "魚介麺（Fish Ball Noodles）"
      ],
      price: "$",
      mapUrl: "https://maps.app.goo.gl/..."
    },
    {
      name: "Lau Pa Sat",
      picks: [
        "サテー（Satay）",
        "炒粿条",
        "魚介麺",
        "ローカルドリンク"
      ],
      price: "$",
      mapUrl: "https://maps.app.goo.gl/..."
    },
    {
      name: "Chinatown Complex Food Centre",
      picks: [
        "小籠包",
        "餃子",
        "麺類",
        "デザート"
      ],
      price: "$",
      mapUrl: "https://maps.app.goo.gl/..."
    }
  ],
  nightSafari: {
    bookingUrl: "https://www.mandai.com/en/night-safari.html",
    mapUrl: "https://maps.google.com/?q=Night+Safari+Singapore",
    showUrl: "https://www.mandai.com/en/night-safari/shows.html",
    route: [
      { time: "19:00", activity: "入場・受付", note: "チケット確認" },
      { time: "19:30", activity: "トラムツアー", note: "約45分" },
      { time: "20:30", activity: "Creatures of the Night Show", note: "約20分" },
      { time: "21:00", activity: "ウォーキングトレイル", note: "約1時間" },
      { time: "22:00", activity: "ショップ・カフェ", note: "お土産購入" }
    ],
    tips: [
      "予約は事前に（特に週末）",
      "カメラはフラッシュ禁止",
      "歩きやすい靴を",
      "虫除けスプレー持参",
      "雨の日は傘持参"
    ],
    faq: [
      {
        q: "何時から入場できますか？",
        a: "19:00から入場可能です。閉園は24:00です。"
      },
      {
        q: "予約は必要ですか？",
        a: "週末や祝日は事前予約を推奨します。"
      },
      {
        q: "写真撮影は可能ですか？",
        a: "フラッシュなしで撮影可能です。"
      },
      {
        q: "雨の日は営業していますか？",
        a: "小雨の場合は営業、豪雨の場合は中止の可能性があります。"
      }
    ]
  },
  links: [
    { label: "Google Maps", url: "https://maps.google.com/", ext: true },
    { label: "Grab", url: "https://www.grab.com/sg/", ext: true },
    { label: "SMRT", url: "https://www.smrt.com.sg/", ext: true },
    { label: "シンガポール観光局", url: "https://www.visitsingapore.com/", ext: true }
  ]
};
