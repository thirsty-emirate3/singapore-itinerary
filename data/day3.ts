import type { Day } from "./itinerary";

// Photo型の定義
interface Photo {
  src: string;
  alt: string;
  caption: string;
  tag: string;
}

export const day3: Day = {
  id: "3",
  title: "Day 3 — セントーサ島",
  date: "2025-09-29",
  cover: "/image/day3.jpg",
  summary: "ユニバーサル・スタジオで1日満喫し、リュージュやビーチ散策、夜はウィングス・オブ・タイムを楽しむ。",
  slots: [
    {
      id: "d3-0900",
      time: "09:00",
      title: "ユニバーサル・スタジオ・シンガポール",
      note: "滞在5〜6時間。絶叫系が苦手でも楽しめるアトラクション：トランスフォーマー3D、シュレック4D、セサミストリート、ストリートショー。入口の地球儀は写真スポット。お土産はキャラクターグッズや限定雑貨。",
      category: "sight",
      mapQuery: "Universal Studios Singapore",
      links: [
        { label: "公式", href: "https://www.rwsentosa.com/en/attractions/universal-studios-singapore" },
        { label: "地図", href: "https://maps.google.com/?q=USS+Singapore" }
      ]
    },
    {
      id: "d3-1400",
      time: "14:00",
      title: "ランチ（園内または周辺）",
      note: "USS内のレストランやフードコートで軽めの昼食。人気はミニオンズやセサミの限定メニュー。",
      category: "food",
      mapQuery: "USS Dining",
      links: []
    },
    {
      id: "d3-1500",
      time: "15:00",
      title: "スカイライン・リュージュ",
      note: "チェアリフトで登り、カートで坂を下る爽快アクティビティ。所要30〜60分。夜のライトアップも映える。",
      category: "activity",
      mapQuery: "Skyline Luge Sentosa",
      links: [
        { label: "公式", href: "https://www.skylineluge.com/sentosa/" },
        { label: "地図", href: "https://maps.google.com/?q=Skyline+Luge+Sentosa" }
      ]
    },
    {
      id: "d3-1600",
      time: "16:00",
      title: "S.E.A. アクアリウム（オプション）",
      note: "世界最大級の水族館。巨大水槽やマンタ、サメが見どころ。所要2時間。",
      category: "sight",
      mapQuery: "SEA Aquarium Sentosa",
      links: [
        { label: "公式", href: "https://www.rwsentosa.com/en/attractions/sea-aquarium" },
        { label: "地図", href: "https://maps.google.com/?q=SEA+Aquarium+Sentosa" }
      ]
    },
    {
      id: "d3-1730",
      time: "17:30",
      title: "パラワンビーチ散策",
      note: "アジア大陸最南端ポイントの吊り橋で写真撮影。ビーチ沿いで休憩や夕食も可能。",
      category: "sight",
      mapQuery: "Palawan Beach",
      links: [
        { label: "観光情報", href: "https://www.sentosa.com.sg/en/things-to-do/attractions/palawan-beach/" }
      ]
    },
    {
      id: "d3-1940",
      time: "19:40",
      title: "ウィングス・オブ・タイム（ナイトショー）",
      note: "海を舞台にしたプロジェクションマッピング＆噴水・花火のショー。所要20分。予約推奨。",
      category: "night",
      mapQuery: "Wings of Time Sentosa",
      links: [
        { label: "公式", href: "https://www.sentosa.com.sg/en/things-to-do/attractions/wings-of-time/" },
        { label: "地図", href: "https://maps.google.com/?q=Wings+of+Time+Sentosa" }
      ]
    },
    {
      id: "d3-2100",
      time: "21:00",
      title: "ホテルへ戻る",
      note: "GrabやMRTでMホテルへ。夜はゆっくり休む。",
      category: "transfer",
      mapQuery: "M Hotel Singapore",
      links: [{ label: "M Hotel", href: "https://www.millenniumhotels.com/en/singapore/m-hotel-singapore/" }]
    }
  ]
};

// Day 3の写真データ
export const day3Photos: Photo[] = [
  {
    src: '/image/day3_detail/day3-hero.jpg',
    alt: 'セントーサ島の朝（Day3 ヒーロー）',
    caption: '冒険の島',
    tag: 'hero'
  },
  {
    src: '/image/day3_detail/day3-uss.jpg',
    alt: 'ユニバーサル・スタジオ・シンガポール入口',
    caption: '映画の世界へ',
    tag: 'attraction'
  },
  {
    src: '/image/day3_detail/day3-skyline-luge.jpg',
    alt: 'スカイライン・リュージュで滑走',
    caption: 'スリル満点の体験',
    tag: 'adventure'
  },
  {
    src: '/image/day3_detail/day3-sea-aquarium.jpg',
    alt: 'S.E.A. アクアリウムの大水槽',
    caption: '海の生き物たち',
    tag: 'nature'
  },
  {
    src: '/image/day3_detail/day3-beach.jpg',
    alt: 'シロソ・ビーチのサンセット',
    caption: '南国のビーチ',
    tag: 'nature'
  },
  {
    src: '/image/day3_detail/day3-wings-of-time.webp',
    alt: 'Wings of Time 夜のショー',
    caption: '夜のショー',
    tag: 'show'
  },
  {
    src: '/image/day3_detail/day3-dinner.jpg',
    alt: 'リゾート内のディナータイム',
    caption: '夕食の時間',
    tag: 'food'
  }
];
