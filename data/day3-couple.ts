export interface DateMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  timeline: CoupleTimeline[];
  recommendations: string[];
}

export interface CoupleTimeline {
  time: string;
  title: string;
  note: string;
  category: 'activity' | 'show' | 'uss' | 'aquarium' | 'beach' | 'dinner';
  duration: string;
  tips: string[];
}

export interface GoldenHourGuide {
  bestTime: string;
  spots: PhotoSpot[];
  photoPrompts: PhotoPrompt[];
  cameraTips: string[];
}

export interface PhotoSpot {
  name: string;
  description: string;
  bestTime: string;
  features: string[];
  mapQuery: string;
}

export interface PhotoPrompt {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tips: string[];
}

export interface Restaurant {
  name: string;
  category: 'romantic' | 'casual' | 'light';
  priceRange: '$' | '$$' | '$$$';
  description: string;
  atmosphere: string[];
  reservation: string;
  mapQuery: string;
  links: { label: string; href: string }[];
}

export interface CoupleActivity {
  name: string;
  category: 'beach' | 'indoor' | 'night';
  description: string;
  duration: string;
  requirements: string[];
  tips: string[];
  mapQuery: string;
  links: { label: string; href: string }[];
}

export interface CoupleMission {
  id: string;
  title: string;
  description: string;
  location: string;
  difficulty: 'easy' | 'medium' | 'hard';
  photoRequired: boolean;
  tips: string[];
}

export interface QOLDetails {
  heatAvoidance: string[];
  hydration: string[];
  facilities: {
    lockers: string;
    showers: string;
    access: string[];
  };
}

export interface BackupPlan {
  rain: string[];
  crowded: string[];
  emergency: string[];
}

export const coupleData = {
  dateModes: [
    {
      id: 'chill',
      name: 'Chill（まったり派）',
      description: 'ゆっくりと時間をかけて、ふたりの時間を楽しむ',
      icon: '🌅',
      timeline: [
        {
          time: '09:00-12:00',
          title: 'USS ショー＆3D中心',
          note: 'トランスフォーマー3D、シュレック4D、セサミストリートのショーをゆっくり楽しむ',
          category: 'uss',
          duration: '3時間',
          tips: ['待ち時間の少ないショーから回る', '3Dアトラクションは涼しくて快適', 'セサミストリートで記念撮影']
        },
        {
          time: '12:00-13:30',
          title: 'ランチ（園内）',
          note: 'ミニオンズカフェでゆっくり休憩',
          category: 'uss',
          duration: '1.5時間',
          tips: ['空いている時間帯を狙う', '冷たいドリンクで水分補給', '写真撮影も忘れずに']
        },
        {
          time: '14:00-16:00',
          title: 'S.E.A.アクアリウム',
          note: '世界最大級の水槽でゆったりと海の世界を楽しむ',
          category: 'aquarium',
          duration: '2時間',
          tips: ['巨大水槽前で記念撮影', 'マンタの餌付けタイムをチェック', '涼しくて快適']
        },
        {
          time: '16:30-18:30',
          title: 'タンソン or シロソビーチ',
          note: '波音を聞きながらチルタイム',
          category: 'beach',
          duration: '2時間',
          tips: ['パラソル席でゆったり', '夕陽を見ながらドリンク', 'ふたりの時間を大切に']
        },
        {
          time: '19:00-20:00',
          title: 'Wings of Time or ビーチバー',
          note: 'ショーを見るか、ビーチバーで乾杯',
          category: 'show',
          duration: '1時間',
          tips: ['予約推奨', 'ビーチバーなら予約不要', 'ロマンチックな雰囲気']
        }
      ],
      recommendations: [
        '時間に追われず、ふたりのペースで楽しむ',
        'ショーや3Dアトラクションで涼しく過ごす',
        'ビーチではゆったりとした時間を過ごす',
        '夕方から夜にかけての時間を大切にする'
      ]
    },
    {
      id: 'playful',
      name: 'Playful（アクティブ派）',
      description: 'アクティビティを楽しみながら、充実した1日を過ごす',
      icon: '🎢',
      timeline: [
        {
          time: '09:00-12:00',
          title: 'USS 待ち時間短いアトラクション',
          note: 'バトルスター・ガラクティカ、ジュラシック・パーク・リバー・アドベンチャーなど',
          category: 'uss',
          duration: '3時間',
          tips: ['開園直後から人気アトラクションへ', 'FastPassの活用を検討', '効率的に回る']
        },
        {
          time: '12:00-13:00',
          title: 'ランチ（軽め）',
          note: 'フードコートで素早く済ませる',
          category: 'uss',
          duration: '1時間',
          tips: ['時間を節約してアクティビティに集中', '水分補給を忘れずに']
        },
        {
          time: '13:30-15:00',
          title: 'スカイライン・リュージュ',
          note: 'チェアリフトで登り、カートで坂を下る爽快アクティビティ',
          category: 'activity',
          duration: '1.5時間',
          tips: ['複数回乗るならパスがお得', 'ヘルメット着用必須', '写真撮影も忘れずに']
        },
        {
          time: '15:30-17:30',
          title: 'ビーチアクティビティ',
          note: 'SUP/カヤック、ペア自転車など',
          category: 'beach',
          duration: '2時間',
          tips: ['日差しが強い時間帯なので日焼け対策', '水分補給をこまめに', 'アクティビティの予約を事前に']
        },
        {
          time: '18:00-19:00',
          title: 'サンセット',
          note: 'ビーチで夕陽を見ながら休憩',
          category: 'beach',
          duration: '1時間',
          tips: ['ゴールデンアワーの写真撮影', 'ふたりの時間を大切に']
        },
        {
          time: '19:30-21:00',
          title: '夜のバー',
          note: 'ビーチ沿いのバーで乾杯',
          category: 'dinner',
          duration: '1.5時間',
          tips: ['予約推奨', 'ロマンチックな雰囲気', '夜景を楽しむ']
        }
      ],
      recommendations: [
        '効率的にアトラクションを回る',
        'アクティビティを積極的に楽しむ',
        '体力を考慮したスケジュール調整',
        '夕方から夜にかけての時間を大切にする'
      ]
    },
    {
      id: 'romance',
      name: 'Romance（とことん夜景）',
      description: '夜景とロマンチックな時間を重視したプラン',
      icon: '💕',
      timeline: [
        {
          time: '09:00-11:00',
          title: 'USS 軽めに',
          note: '人気アトラクションを2-3個程度',
          category: 'uss',
          duration: '2時間',
          tips: ['開園直後から効率的に', '待ち時間の少ないものを選ぶ', '体力温存']
        },
        {
          time: '11:30-14:00',
          title: 'アクアリウム長め',
          note: 'ゆっくりと水槽を回り、ふたりの時間を楽しむ',
          category: 'aquarium',
          duration: '2.5時間',
          tips: ['巨大水槽前で記念撮影', 'マンタの餌付けタイムをチェック', '涼しくて快適']
        },
        {
          time: '14:30-16:00',
          title: 'ビーチで休憩',
          note: '日陰でゆったりと過ごす',
          category: 'beach',
          duration: '1.5時間',
          tips: ['パラソル席で休憩', '水分補給を忘れずに', '体力回復']
        },
        {
          time: '16:30-18:30',
          title: '夕暮れ前からビーチで写真撮影',
          note: 'ゴールデンアワーを狙った写真撮影',
          category: 'beach',
          duration: '2時間',
          tips: ['ゴールデンアワーの時間を確認', '様々なアングルで撮影', 'ふたりの記念写真']
        },
        {
          time: '19:00-21:00',
          title: 'Ocean Restaurant等でディナー',
          note: '水槽前のロマンチックなディナー',
          category: 'dinner',
          duration: '2時間',
          tips: ['事前予約必須', 'ドレスコード確認', '特別な記念日に']
        },
        {
          time: '21:00-21:30',
          title: 'ショーで締め',
          note: 'Wings of Timeで締めくくり',
          category: 'show',
          duration: '30分',
          tips: ['予約推奨', 'ロマンチックな雰囲気', 'ふたりの思い出に']
        }
      ],
      recommendations: [
        '夜景とロマンチックな時間を重視',
        'アクアリウムでゆったりとした時間を過ごす',
        'ゴールデンアワーの写真撮影を大切に',
        '特別なディナーで記念の日に'
      ]
    }
  ],

  goldenHourGuide: {
    bestTime: '18:30-19:15頃（季節で前後するので当日の日没時間を確認）',
    spots: [
      {
        name: 'Palawan Beach',
        description: '吊り橋＋サンセット（オレンジ → パープルの空が映える）',
        bestTime: '18:30-19:00',
        features: ['アジア大陸最南端ポイント', '吊り橋からの眺望', '夕陽と海のコントラスト'],
        mapQuery: 'Palawan Beach Sentosa'
      },
      {
        name: 'Siloso Beach',
        description: '水平線に沈む夕日＋砂のリフレクション',
        bestTime: '18:45-19:15',
        features: ['水平線が見える', '砂浜の反射光', '人が少なく静か'],
        mapQuery: 'Siloso Beach Sentosa'
      },
      {
        name: 'Tanjong Beach',
        description: '人が少なく静か、ふたりのシルエット写真向き',
        bestTime: '18:30-19:00',
        features: ['静かな環境', 'シルエット写真に最適', 'ロマンチックな雰囲気'],
        mapQuery: 'Tanjong Beach Sentosa'
      }
    ],
    photoPrompts: [
      {
        id: 'silhouette',
        title: '逆光の"手つなぎシルエット"',
        description: '夕陽をバックにふたりの手つなぎシルエット',
        difficulty: 'easy',
        tips: ['夕陽を背にして立つ', '手をつないで歩く', 'シルエットを意識']
      },
      {
        id: 'bridge-focus',
        title: '吊り橋で「相手だけにピント」',
        description: '吊り橋で相手にピントを合わせた写真',
        difficulty: 'medium',
        tips: ['背景をぼかす', '相手の表情を捉える', '吊り橋の構造を活かす']
      },
      {
        id: 'ring-shot',
        title: '砂浜でリング/ピアス"置き画"',
        description: '砂浜にアクセサリーを置いて撮影',
        difficulty: 'easy',
        tips: ['砂浜にきれいに置く', '夕陽の光を活かす', '背景に海を入れる']
      },
      {
        id: 'footprints',
        title: '波打ち際の"足跡ペア"',
        description: '波打ち際のふたりの足跡',
        difficulty: 'easy',
        tips: ['波打ち際で足跡をつける', 'ふたり並んで歩く', '夕陽の光を活かす']
      },
      {
        id: 'drink-sunset',
        title: '乾杯ドリンク＋夕陽のボケ',
        description: '乾杯ドリンクと夕陽のボケた背景',
        difficulty: 'medium',
        tips: ['ドリンクを手に持つ', '夕陽を背景に', 'ボケ効果を活かす']
      }
    ],
    cameraTips: [
      'ホワイトバランス"曇り/日陰"で少し暖色',
      '露出は‐0.3〜‐0.7で空の色を濃く',
      '三脚があると安定した撮影が可能',
      '連写モードでベストショットを狙う'
    ]
  },

  restaurants: [
    {
      name: 'Ocean Restaurant',
      category: 'romantic',
      priceRange: '$$$',
      description: '水槽前ダイニング（要予約/ドレス感◎）',
      atmosphere: ['水槽前の特別席', 'ロマンチックな照明', '上品な雰囲気'],
      reservation: '事前予約必須（2-3ヶ月前推奨）',
      mapQuery: 'Ocean Restaurant Sentosa',
      links: [
        { label: '公式予約', href: 'https://www.rwsentosa.com/en/restaurants/ocean-restaurant' }
      ]
    },
    {
      name: 'FOC Sentosa',
      category: 'romantic',
      priceRange: '$$',
      description: 'キャンドル＆波音（ロマンチックな雰囲気）',
      atmosphere: ['キャンドルライト', '波の音', 'アウトドア席'],
      reservation: '予約推奨',
      mapQuery: 'FOC Sentosa',
      links: [
        { label: '公式', href: 'https://www.focsentosa.com/' }
      ]
    },
    {
      name: 'Tanjong Beach Club',
      category: 'romantic',
      priceRange: '$$',
      description: 'ビーチ沿いのロマンチックなレストラン',
      atmosphere: ['ビーチ沿いの席', '夕陽の眺望', 'リラックスした雰囲気'],
      reservation: '予約推奨',
      mapQuery: 'Tanjong Beach Club Sentosa',
      links: [
        { label: '公式', href: 'https://www.tanjongbeachclub.com/' }
      ]
    },
    {
      name: 'Coastes',
      category: 'casual',
      priceRange: '$',
      description: '海辺で気軽に楽しめるカジュアルレストラン',
      atmosphere: ['海辺の席', 'カジュアルな雰囲気', '家族向け'],
      reservation: '予約不要',
      mapQuery: 'Coastes Sentosa',
      links: [
        { label: '公式', href: 'https://www.coastes.com/' }
      ]
    },
    {
      name: 'Ola Beach Club',
      category: 'casual',
      priceRange: '$$',
      description: 'ビーチアクティビティと一緒に楽しめる',
      atmosphere: ['ビーチ沿い', 'アクティブな雰囲気', '若者向け'],
      reservation: '予約推奨',
      mapQuery: 'Ola Beach Club Sentosa',
      links: [
        { label: '公式', href: 'https://www.olabeachclub.com/' }
      ]
    },
    {
      name: 'Trapizza',
      category: 'casual',
      priceRange: '$',
      description: 'イタリアンが楽しめるカジュアルレストラン',
      atmosphere: ['海辺の席', 'イタリアンの雰囲気', '家族向け'],
      reservation: '予約不要',
      mapQuery: 'Trapizza Sentosa',
      links: [
        { label: '公式', href: 'https://www.trapizza.com.sg/' }
      ]
    },
    {
      name: 'Malaysian Food Street',
      category: 'light',
      priceRange: '$',
      description: '軽食と水分補給（USS・RWS内）',
      atmosphere: ['フードコート', '軽食中心', '手軽'],
      reservation: '予約不要',
      mapQuery: 'Malaysian Food Street Sentosa',
      links: []
    }
  ],

  activities: [
    {
      name: 'SUP（スタンドアップパドルボード）',
      category: 'beach',
      description: '海の上を歩くような感覚で楽しめる',
      duration: '1-2時間',
      requirements: ['水着', 'タオル', '着替え', '日焼け止め'],
      tips: ['初心者向けレッスンあり', '日差しが強い時間帯は避ける', '水分補給を忘れずに'],
      mapQuery: 'SUP Sentosa',
      links: [
        { label: 'Ola Beach Club', href: 'https://www.olabeachclub.com/' }
      ]
    },
    {
      name: 'カヤック',
      category: 'beach',
      description: 'ふたりで協力して海を楽しむ',
      duration: '1-2時間',
      requirements: ['水着', 'タオル', '着替え', '日焼け止め'],
      tips: ['ペアカヤックがおすすめ', 'ガイド付きツアーあり', '安全第一'],
      mapQuery: 'Kayak Sentosa',
      links: [
        { label: 'Ola Beach Club', href: 'https://www.olabeachclub.com/' }
      ]
    },
    {
      name: 'ペア自転車',
      category: 'beach',
      description: 'ビーチ沿いをふたりでサイクリング',
      duration: '1-2時間',
      requirements: ['軽装', '帽子', '日焼け止め', '水分'],
      tips: ['ビーチ沿いのコースがおすすめ', '夕方の涼しい時間帯が最適', '写真撮影も忘れずに'],
      mapQuery: 'Bicycle Rental Sentosa',
      links: []
    },
    {
      name: 'ビーチバレー',
      category: 'beach',
      description: '砂浜でビーチバレーを楽しむ',
      duration: '1-2時間',
      requirements: ['軽装', '帽子', '日焼け止め', '水分'],
      tips: ['コートは予約可能', '日差しが強い時間帯は避ける', 'ふたりでも楽しめる'],
      mapQuery: 'Beach Volleyball Sentosa',
      links: []
    },
    {
      name: 'S.E.A.アクアリウム"ゆっくり回る"',
      category: 'indoor',
      description: '世界最大級の水槽でゆったりと海の世界を楽しむ',
      duration: '2-3時間',
      requirements: ['カメラ', 'ゆったりとした服装', '水分'],
      tips: ['巨大水槽前で記念撮影', 'マンタの餌付けタイムをチェック', '涼しくて快適'],
      mapQuery: 'SEA Aquarium Sentosa',
      links: [
        { label: '公式', href: 'https://www.rwsentosa.com/en/attractions/sea-aquarium' }
      ]
    },
    {
      name: 'HeadRock VR',
      category: 'indoor',
      description: 'VRでスリリングな体験を楽しむ',
      duration: '30分-1時間',
      requirements: ['軽装', 'カメラ', '水分'],
      tips: ['VRゴーグル着用', '身長制限あり', '涼しくて快適'],
      mapQuery: 'HeadRock VR Sentosa',
      links: [
        { label: '公式', href: 'https://www.rwsentosa.com/en/attractions/headrock-vr' }
      ]
    },
    {
      name: 'iFly',
      category: 'indoor',
      description: '室内でスカイダイビング体験',
      duration: '1-2時間',
      requirements: ['軽装', 'カメラ', '水分'],
      tips: ['事前予約推奨', '身長制限あり', '涼しくて快適'],
      mapQuery: 'iFly Sentosa',
      links: [
        { label: '公式', href: 'https://www.iflysingapore.com/' }
      ]
    },
    {
      name: 'Wings of Time',
      category: 'night',
      description: '海を舞台にしたプロジェクションマッピング＆噴水・花火のショー',
      duration: '20分',
      requirements: ['カメラ', 'ゆったりとした服装'],
      tips: ['予約推奨', '19時台＆20時台の2回が多い', '当日公式で確認'],
      mapQuery: 'Wings of Time Sentosa',
      links: [
        { label: '公式', href: 'https://www.sentosa.com.sg/en/things-to-do/attractions/wings-of-time/' }
      ]
    }
  ],

  missions: [
    {
      id: 'heart-hands',
      title: '夕陽をバックにハート型に手を作る',
      description: '夕陽をバックにふたりでハート型に手を作って撮影',
      location: 'Palawan Beach',
      difficulty: 'easy',
      photoRequired: true,
      tips: ['夕陽を背にして立つ', '手でハート型を作る', 'シルエットを意識']
    },
    {
      id: 'favorite-shot',
      title: 'お互いの"今日いち好きショット"を選び合う',
      description: '今日撮った写真の中から、お互いの一番のお気に入りを選び合う',
      location: 'どこでも',
      difficulty: 'easy',
      photoRequired: true,
      tips: ['たくさん写真を撮る', 'お互いの視点を大切にする', '思い出に残る一枚を選ぶ']
    },
    {
      id: 'jump-photo',
      title: '波打ち際で「同時ジャンプ」写真',
      description: '波打ち際でふたり同時にジャンプして撮影',
      location: 'Siloso Beach',
      difficulty: 'medium',
      photoRequired: true,
      tips: ['連写モードで撮影', 'タイミングを合わせる', '何度も挑戦する']
    },
    {
      id: 'ring-shot',
      title: '砂浜でリング/ピアス"置き画"',
      description: '砂浜にアクセサリーを置いて夕陽と一緒に撮影',
      location: 'Tanjong Beach',
      difficulty: 'easy',
      photoRequired: true,
      tips: ['砂浜にきれいに置く', '夕陽の光を活かす', '背景に海を入れる']
    },
    {
      id: 'toast-sunset',
      title: '乾杯ドリンク＋夕陽のボケ',
      description: '乾杯ドリンクと夕陽のボケた背景で撮影',
      location: 'ビーチ沿いのバー',
      difficulty: 'medium',
      photoRequired: true,
      tips: ['ドリンクを手に持つ', '夕陽を背景に', 'ボケ効果を活かす']
    },
    {
      id: 'silhouette-walk',
      title: '夕陽をバックに手つなぎ散歩',
      description: '夕陽をバックに手をつないで歩くシルエット',
      location: 'ビーチ沿い',
      difficulty: 'easy',
      photoRequired: true,
      tips: ['夕陽を背にして歩く', '手をつないで歩く', 'シルエットを意識']
    },
    {
      id: 'beach-art',
      title: '砂浜にふたりの名前やハートを描く',
      description: '砂浜にふたりの名前やハートを描いて撮影',
      location: 'どこでも',
      difficulty: 'easy',
      photoRequired: true,
      tips: ['きれいに描く', '夕陽の光を活かす', '波に流される前に撮影']
    },
    {
      id: 'reflection-shot',
      title: '波打ち際の反射を活かした写真',
      description: '波打ち際の反射を活かして撮影',
      location: 'Siloso Beach',
      difficulty: 'medium',
      photoRequired: true,
      tips: ['波打ち際で撮影', '反射を意識', '夕陽の光を活かす']
    },
    {
      id: 'bridge-kiss',
      title: '吊り橋でキスシーン',
      description: 'Palawan Beachの吊り橋でキスシーンを撮影',
      location: 'Palawan Beach',
      difficulty: 'hard',
      photoRequired: true,
      tips: ['人が少ない時間帯を狙う', '自然な表情で', '安全第一']
    }
  ],

  qolDetails: {
    heatAvoidance: [
      '30分以上の直射日光NG→日陰リスト（パラソル席/木陰/屋内へ退避）',
      '帽子、日焼け止め、サングラスは必須',
      '涼しい時間帯（朝9-11時、夕方16時以降）を活用',
      '屋内施設（アクアリウム、VR、ショッピングモール）で休憩'
    ],
    hydration: [
      '1時間に1回は500ml目安で水分補給',
      'スポーツドリンクで塩分も補給',
      'カフェインやアルコールは控えめに',
      '水分補給スタンドの位置を事前確認'
    ],
    facilities: {
      lockers: 'USS内、アクアリウム、ビーチ沿いにロッカーあり（有料）',
      showers: 'ビーチシャワーの位置：Palawan Beach、Siloso Beach、Tanjong Beach（無料）',
      access: [
        'Sentosa Express（Waterfront/Imbiah/Beach駅）',
        'Beach Shuttleの運行間隔：15-20分',
        'ケーブルカー（営業時間は当日公式確認）'
      ]
    }
  },

  backupPlans: {
    rain: [
      'アクアリウム→VR/室内体験→屋根のあるバーでゆっくり',
      'RWSのショッピングモールでショッピング',
      'USSの屋内アトラクション中心',
      'ホテル内のスパやジムでリラックス'
    ],
    crowded: [
      'USSはショー＆室内系先回し、夕方に屋外系を回収',
      'アクアリウムは朝一または夕方の空いている時間帯',
      'ビーチアクティビティは予約制のものを選択',
      'レストランは事前予約で確実に'
    ],
    emergency: [
      '涼める屋内MAP（RWSのモール/フードコート/駅構内）',
      '救護室の位置確認（USS内、RWS内）',
      '緊急連絡先の確認（現地の救急車、ホテルフロント）',
      '保険証券の携帯'
    ]
  }
};

