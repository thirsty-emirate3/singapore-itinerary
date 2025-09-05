export interface SummerSection {
  id: string;
  type: "hero" | "text";
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
  image?: string;
  alt?: string;
  caption?: string;
  direction?: "left" | "right";
  priority?: boolean;
  tips?: string[];
  ctaText?: string;
  ctaAction?: () => void;
}

export const summerSections: SummerSection[] = [
  {
    id: "hero-day3",
    type: "hero",
    title: "Day 3 — セントーサ島",
    subtitle: "夏の楽園で最高の思い出を",
    description: "テーマパークからビーチまで、セントーサ島の魅力を満喫",
    icon: "🏝️",
    image: "/image/day3-hero.jpg",
    alt: "セントーサ島の美しい海岸線と青い海",
    caption: "セントーサ島｜1日満喫",
    direction: "left",
    priority: true
  },
  {
    id: "text-theme",
    type: "text",
    title: "今日のテーマ",
    description: "セントーサ島は、シンガポールの南に浮かぶ楽園。テーマパーク、ビーチ、リゾート施設が集まる観光の聖地です。",
    icon: "🌞",
    tips: [
      "朝から夕方まで楽しめる充実の1日",
      "水着とタオルは必須アイテム",
      "日焼け止めは高SPFで塗り直しを"
    ]
  },
  {
    id: "hero-uss",
    type: "hero",
    title: "ユニバーサル・スタジオ・シンガポール",
    subtitle: "世界最高のエンターテイメント",
    description: "ハリウッド映画の世界を体験できるテーマパーク",
    icon: "🎢",
    image: "/image/day3-uss.jpg",
    alt: "USSのジェットコースターとアトラクション",
    caption: "USS｜3〜5時間",
    direction: "right"
  },
  {
    id: "text-uss-tips",
    type: "text",
    title: "USS 夏の攻略法",
    description: "人気アトラクションは朝イチで制覇！夏の暑さ対策も万全に。",
    icon: "🎯",
    tips: [
      "開園と同時に入場して人気アトラクションから",
      "水分補給はこまめに、日陰での休憩も",
      "Express Passで待ち時間を大幅短縮"
    ],
    ctaText: "チケット予約",
    ctaAction: () => window.open("https://www.rwsentosa.com/en/attractions/universal-studios-singapore", "_blank")
  },
  {
    id: "hero-luge",
    type: "hero",
    title: "セントーサ・リュージュ",
    subtitle: "風を切って滑り降りる爽快感",
    description: "山の上から海を見下ろしながら滑り降りる、セントーサ島の名物アトラクション",
    icon: "🛷️",
    image: "/image/day3-luge.jpg",
    alt: "セントーサ・リュージュのコースと海の景色",
    caption: "リュージュ｜1〜2時間",
    direction: "left"
  },
  {
    id: "text-luge-info",
    type: "text",
    title: "リュージュ 夏の注意点",
    description: "夏のリュージュは特に爽快！でも安全第一で楽しみましょう。",
    icon: "⚠️",
    tips: [
      "ヘルメットは必ず着用、安全ベルトも確認",
      "雨の日は滑りやすいので要注意",
      "写真撮影は安全な場所で"
    ],
    ctaText: "詳細情報",
    ctaAction: () => window.open("https://www.sentosa.com.sg/en/things-to-do/attractions/sentosa-luge", "_blank")
  },
  {
    id: "hero-aquarium",
    type: "hero",
    title: "S.E.A. アクアリウム",
    subtitle: "世界最大級の水族館",
    description: "10万匹以上の海洋生物が暮らす、アジア最大級の水族館",
    icon: "🐠",
    image: "/image/day3-sea-aquarium.jpg",
    alt: "S.E.A. アクアリウムの大水槽",
    caption: "アクアリウム｜2〜3時間",
    direction: "left"
  },
  {
    id: "text-aquarium-info",
    type: "text",
    title: "S.E.A.アクアリウムの見どころ",
    description: "世界最大級の水槽で、マンタやサメの優雅な泳ぎを観察できます。",
    icon: "🌊",
    tips: [
      "巨大水槽の前でゆっくりと時間を過ごす",
      "マンタの給餌タイムは必見",
      "サメのトンネルで迫力満点の体験"
    ],
    ctaText: "公式サイト",
    ctaAction: () => window.open("https://www.rwsentosa.com/en/attractions/sea-aquarium", "_blank")
  },
  {
    id: "hero-beach",
    type: "hero",
    title: "セントーサ・ビーチ",
    subtitle: "白い砂浜と青い海",
    description: "シンガポール随一の美しいビーチで、夏の海を満喫",
    icon: "🏖️",
    image: "/image/day3-beach.jpg",
    alt: "セントーサ・ビーチの白い砂浜と青い海",
    caption: "ビーチ｜2〜3時間",
    direction: "right"
  },
  {
    id: "text-beach-tips",
    type: "text",
    title: "ビーチ 夕方の過ごし方",
    description: "夕方のビーチは特別な時間。サンセットを見ながらリラックスタイム。",
    icon: "🌅",
    tips: [
      "夕方4時以降が最も快適な時間帯",
      "サンセットは6時頃、写真撮影のベストタイム",
      "ビーチサイドのカフェでドリンクを楽しむ"
    ]
  },
  {
    id: "hero-wings",
    type: "hero",
    title: "ウィングス・オブ・タイム",
    subtitle: "夜の光と音のショー",
    description: "セントーサ島の夜を彩る、世界最大級のマルチメディアショー",
    icon: "🎆",
    image: "/image/day3-wings.jpg",
    alt: "ウィングス・オブ・タイムの光と音のショー",
    caption: "ショー｜1時間",
    direction: "left"
  },
  {
    id: "text-final",
    type: "text",
    title: "セントーサ島の旅、お疲れ様でした！",
    description: "テーマパークからビーチまで、セントーサ島の魅力を存分に楽しんだ1日でした。素晴らしい思い出ができましたね。",
    icon: "🎉",
    tips: [
      "今日撮った写真をチェック",
      "セントーサ島の思い出を大切に",
      "素晴らしい旅でした！"
    ]
  }
];

export const navigationSections = [
  { id: "hero-day3", label: "Day3", icon: "🏝️" },
  { id: "hero-uss", label: "USS", icon: "🎢" },
  { id: "hero-luge", label: "リュージュ", icon: "🛷️" },
  { id: "hero-beach", label: "ビーチ", icon: "🏖️" },
  { id: "hero-wings", label: "ショー", icon: "🎆" },
  { id: "text-final", label: "完走", icon: "🎉" }
];
