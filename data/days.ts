export type LinkItem = { label: string; href: string; ext?: boolean }
export type Slot = { time?: string; title: string; note?: string; emoji?: string }
export type Dinner = { name: string; area: 'asia'|'western'|'foodcourt'; price: '$'|'$$'|'$$$'; tip?: string; href?: string }

export type DayData = {
  id: string
  date: string
  title: string
  hero: string // public path
  quick: { duration: string; steps: string; budget: string; dress: string; best: string }
  timeline: Slot[]
  tickets: LinkItem[]
  casino: { games: { name: string; min?: string; tips: string[] }[]; caution: string }
  photo: { tips: string[] }
  dinners: Dinner[]
  mapLinks: LinkItem[]
  checklist: string[]
}

export const days: Record<string, DayData> = {
  '1': {
    id: '1',
    date: '2025-09-27',
    title: 'Day1 — マリーナベイ・サンズ',
    hero: '/image/day1.jpg',
    quick: {
      duration: '約12時間',
      steps: '約12,000歩',
      budget: '$$〜$$$',
      dress: '日中カジュアル／夜はスマートカジュアル',
      best: '夕景〜夜景'
    },
    timeline: [
      { time: '09:00', emoji: '🧳', title: '荷物をホテルに預ける' },
      { time: '10:00', emoji: '🦁', title: 'マーライオン公園', note: '写真撮影に最適' },
      { time: '11:00', emoji: '🌴', title: 'ガーデンズ・バイ・ザ・ベイ', note: 'ドーム/スカイウェイ' },
      { time: '13:00', emoji: '🍽️', title: 'ランチ（Maxwell などホーカー）' },
      { time: '15:00', emoji: '🛍️', title: 'The Shoppes でショッピング' },
      { time: '16:30', emoji: '🏨', title: 'チェックイン' },
      { time: '17:30', emoji: '🏊', title: 'インフィニティプール' },
      { time: '19:00', emoji: '🍸', title: 'イブニングバー（SkyPark など）' },
      { time: '20:00', emoji: '🍴', title: 'ディナー（多国籍レストラン）' },
      { time: '21:30', emoji: '🎰', title: 'カジノ & バー' },
    ],
    tickets: [
      { label: 'MBS 公式', href: 'https://www.marinabaysands.com/', ext: true },
      { label: 'SkyPark チケット', href: 'https://www.marinabaysands.com/attractions/skypark.html', ext: true },
      { label: 'The Shoppes フロア', href: 'https://www.marinabaysands.com/shopping.html', ext: true },
    ],
    casino: {
      games: [
        { name: 'バカラ', min: 'S$20〜', tips: ['初心者はバンカー固定で勝率安定', '連敗時は深追いしない'] },
        { name: 'ブラックジャック', min: 'S$20〜', tips: ['11はダブル', '16 vs 10 はヒット', '基本表をざっくり把握'] },
        { name: 'ルーレット', min: 'S$5〜', tips: ['赤黒/奇偶/ダズンで控えめに', '同色連続に釣られない'] },
        { name: 'シックボー', min: 'S$5〜', tips: ['Hi/Lo中心の控えめ戦略', 'ゾロ目は夢枠'] },
      ],
      caution: '賭けは自己責任。上限額を決めて離席ルールを。'
    },
    photo: {
      tips: ['マーライオンは吐水の弧＋MBSを一直線に入れる', '柵は指紋が映るので手前で構図', '夕景開始直後が空きやすい']
    },
    dinners: [
      { name: 'Spago', area: 'western', price: '$$$', tip: '夕景が綺麗', href: 'https://www.marinabaysands.com/restaurants/spago.html' },
      { name: 'LAVO', area: 'western', price: '$$$', tip: 'ルーフトップ', href: 'https://lavosingapore.com/' },
      { name: 'Rasapura Masters', area: 'foodcourt', price: '$', tip: '気軽', href: 'https://www.marinabaysands.com/restaurants/rasapura-masters.html' },
      { name: '鼎泰豊', area: 'asia', price: '$$', tip: '小籠包', href: 'https://www.marinabaysands.com/restaurants/din-tai-fung.html' },
    ],
    mapLinks: [
      { label: 'Google Maps：マーライオン', href: 'https://maps.google.com/?q=Merlion+Park+Singapore' , ext: true},
      { label: 'Google Maps：MBS', href: 'https://maps.google.com/?q=Marina+Bay+Sands+Singapore', ext: true}
    ],
    checklist: ['日焼け止め','羽織り','小銭','スマホモバイルバッテリー','水','身分証/パスポート(カジノ)']
  },
  '2': {
    id: '2',
    date: '2025-09-28',
    title: 'Day2 — シティ周遊 & ナイトサファリ',
    hero: '/image/day2.jpg',
    quick: {
      duration: '約14時間',
      steps: '約15,000歩',
      budget: '$$',
      dress: 'カジュアル（歩きやすい靴必須）',
      best: '夕方〜夜（サファリ）'
    },
    timeline: [
      { time: '08:00', emoji: '☕', title: 'ホテルで朝食', note: '軽めの朝食でスタート' },
      { time: '09:00', emoji: '🚇', title: 'MRTでチャイナタウンへ', note: '地下鉄で移動' },
      { time: '09:30', emoji: '🏮', title: 'チャイナタウン散策', note: '仏牙寺、マーケット' },
      { time: '11:00', emoji: '🏛️', title: 'シンガポール国立博物館', note: '歴史と文化を学ぶ' },
      { time: '13:00', emoji: '🍜', title: 'ランチ（チャイナタウン）', note: '中華料理' },
      { time: '14:30', emoji: '🛍️', title: 'オーチャード・ロード', note: 'ショッピング' },
      { time: '16:00', emoji: '🌳', title: 'ボタニック・ガーデン', note: '世界遺産の庭園' },
      { time: '18:00', emoji: '🍽️', title: 'ディナー（クラーク・キー）', note: 'シーフード' },
      { time: '19:30', emoji: '🚌', title: 'ナイトサファリへ移動', note: '専用バスで移動' },
      { time: '20:00', emoji: '🦁', title: 'ナイトサファリ', note: '夜の動物たち' },
      { time: '22:00', emoji: '🚇', title: 'ホテルに戻る', note: 'MRTで帰宅' },
    ],
    tickets: [
      { label: '国立博物館', href: 'https://www.nationalmuseum.sg/', ext: true },
      { label: 'ボタニック・ガーデン', href: 'https://www.nparks.gov.sg/gardens-parks-and-nature/parks-and-nature-reserves/singapore-botanic-gardens', ext: true },
      { label: 'ナイトサファリ', href: 'https://www.mandai.com/en/night-safari.html', ext: true },
    ],
    casino: {
      games: [
        { name: 'スロット', min: 'S$0.01〜', tips: ['低額から始める', 'ボーナスゲームを狙う', '時間制限を設ける'] },
        { name: 'ポーカー', min: 'S$10〜', tips: ['基本ルールを覚える', '手札の強さを理解', 'ブラフは控えめに'] },
      ],
      caution: 'ナイトサファリ後は疲れているので、カジノは控えめに。'
    },
    photo: {
      tips: ['チャイナタウンは朝が空いている', 'ボタニック・ガーデンは夕方が美しい', 'ナイトサファリはフラッシュ禁止']
    },
    dinners: [
      { name: 'Jumbo Seafood', area: 'asia', price: '$$', tip: 'チリクラブが有名', href: 'https://www.jumboseafood.com.sg/' },
      { name: 'Long Beach', area: 'asia', price: '$$', tip: 'ブラックペッパークラブ', href: 'https://longbeachseafood.com.sg/' },
      { name: 'Newton Food Centre', area: 'foodcourt', price: '$', tip: 'ローカルフード', href: 'https://www.visitsingapore.com/see-do-singapore/places-to-see/central-area/newton-food-centre' },
    ],
    mapLinks: [
      { label: 'Google Maps：チャイナタウン', href: 'https://maps.google.com/?q=Chinatown+Singapore', ext: true},
      { label: 'Google Maps：ボタニック・ガーデン', href: 'https://maps.google.com/?q=Singapore+Botanic+Gardens', ext: true},
      { label: 'Google Maps：ナイトサファリ', href: 'https://maps.google.com/?q=Night+Safari+Singapore', ext: true}
    ],
    checklist: ['歩きやすい靴','日焼け止め','水','カメラ','虫除け','軽食','現金','ICカード']
  },
  '3': {
    id: '3',
    date: '2025-09-29',
    title: 'Day3 — セントーサ島',
    hero: '/image/day3.jpg',
    quick: {
      duration: '約10時間',
      steps: '約8,000歩',
      budget: '$$$',
      dress: 'カジュアル（水着持参）',
      best: '日中（ビーチ・アトラクション）'
    },
    timeline: [
      { time: '09:00', emoji: '🚇', title: 'MRTでハーバーフロントへ', note: 'セントーサ行き' },
      { time: '09:30', emoji: '🚠', title: 'ケーブルカーでセントーサ島へ', note: '絶景を楽しむ' },
      { time: '10:00', emoji: '🏖️', title: 'シロソ・ビーチ', note: '朝のビーチ散歩' },
      { time: '11:00', emoji: '🎢', title: 'ユニバーサル・スタジオ', note: 'アトラクション' },
      { time: '13:00', emoji: '🍔', title: 'ランチ（USJ内）', note: 'テーマパークフード' },
      { time: '15:00', emoji: '🐘', title: 'マーライオン・セントーサ', note: '巨大マーライオン' },
      { time: '16:00', emoji: '🌊', title: 'アドベンチャー・コーブ', note: '水上スポーツ' },
      { time: '17:30', emoji: '🌅', title: '夕日を見る', note: 'ビーチで夕日' },
      { time: '18:30', emoji: '🍽️', title: 'ディナー（セントーサ内）', note: 'シーフード' },
      { time: '19:30', emoji: '🎆', title: 'Wings of Time', note: '夜のショー' },
      { time: '20:30', emoji: '🚠', title: 'ケーブルカーで帰る', note: '夜景を楽しむ' },
    ],
    tickets: [
      { label: 'セントーサ島入場', href: 'https://www.sentosa.com/en/', ext: true },
      { label: 'ケーブルカー', href: 'https://www.sentosa.com/en/things-to-do/attractions/singapore-cable-car-sky', ext: true },
      { label: 'ユニバーサル・スタジオ', href: 'https://www.rwsentosa.com/en/attractions/universal-studios-singapore', ext: true },
      { label: 'Wings of Time', href: 'https://www.sentosa.com/en/things-to-do/attractions/wings-of-time', ext: true },
    ],
    casino: {
      games: [
        { name: 'スロット', min: 'S$0.01〜', tips: ['リゾート感を楽しむ', '予算内で遊ぶ', '時間を決める'] },
        { name: 'ルーレット', min: 'S$5〜', tips: ['シンプルな賭け方', '赤黒で楽しむ', '深追いしない'] },
      ],
      caution: 'リゾート地なので、カジノよりもアトラクションを楽しむことをお勧め。'
    },
    photo: {
      tips: ['ケーブルカーからの景色は必ず撮影', 'ビーチは朝が空いている', '夕日は西側のビーチがベスト']
    },
    dinners: [
      { name: 'Trapizza', area: 'western', price: '$$', tip: 'ピザとパスタ', href: 'https://www.sentosa.com/en/things-to-do/attractions/trapizza' },
      { name: 'Coastes', area: 'western', price: '$$', tip: 'ビーチサイド', href: 'https://www.sentosa.com/en/things-to-do/attractions/coastes' },
      { name: 'Malaysian Food Street', area: 'foodcourt', price: '$', tip: 'マレーシア料理', href: 'https://www.sentosa.com/en/things-to-do/attractions/malaysian-food-street' },
    ],
    mapLinks: [
      { label: 'Google Maps：セントーサ島', href: 'https://maps.google.com/?q=Sentosa+Island+Singapore', ext: true},
      { label: 'Google Maps：ハーバーフロント', href: 'https://maps.google.com/?q=HarbourFront+Singapore', ext: true}
    ],
    checklist: ['水着','タオル','日焼け止め','サンダル','現金','ICカード','カメラ','帽子']
  }
}
