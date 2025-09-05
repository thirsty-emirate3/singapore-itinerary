"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, ExternalLinkIcon, MapPinIcon, ChevronDownIcon, ChevronUpIcon, CameraIcon, StarIcon } from "lucide-react";
import { days } from "@/data/days";
import CasinoGuide from "@/components/CasinoGuide";

export default function Day1Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeDinnerTab, setActiveDinnerTab] = useState<'asia' | 'western' | 'foodcourt'>('asia');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const dayData = days["1"];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getPrevDayId = () => {
    return null;
  };

  const getNextDayId = () => {
    return '2';
  };

  const prevDayId = getPrevDayId();
  const nextDayId = getNextDayId();

  // タブ定義
  const tabs = [
    { id: 'timeline', label: 'スケジュール', icon: '📅' },
    { id: 'pool', label: 'プール', icon: '🏊' },
    { id: 'casino', label: 'カジノ', icon: '🎰' },
    { id: 'dinner', label: 'ディナー', icon: '🍽️' },
    { id: 'shopping', label: 'ショッピング', icon: '🛍️' },
    { id: 'bars', label: 'バー', icon: '🍸' },
    { id: 'gallery', label: 'ギャラリー', icon: '📸' }
  ];

  // バー・ラウンジデータ
  const bars = [
    {
      name: 'Spago',
      vibe: 'エレガント',
      price: '$$$',
      signature: 'Spago Spritz',
      viewScore: 5,
      mapUrl: 'https://maps.google.com/?q=Marina+Bay+Sands+Singapore',
      reserveUrl: 'https://www.marinabaysands.com/restaurants/spago.html'
    },
    {
      name: 'LAVO',
      vibe: 'ルーフトップ',
      price: '$$$',
      signature: 'LAVO Martini',
      viewScore: 5,
      mapUrl: 'https://maps.google.com/?q=Marina+Bay+Sands+Singapore',
      reserveUrl: 'https://lavosingapore.com/'
    },
    {
      name: 'CÉ LA VI',
      vibe: 'トレンディ',
      price: '$$',
      signature: 'Singapore Sling',
      viewScore: 4,
      mapUrl: 'https://maps.google.com/?q=Marina+Bay+Sands+Singapore'
    },
    {
      name: 'Ku Dé Ta',
      vibe: 'アジアン',
      price: '$$',
      signature: 'Lychee Martini',
      viewScore: 4,
      mapUrl: 'https://maps.google.com/?q=Marina+Bay+Sands+Singapore'
    }
  ];

  // ディナーデータ
  const dinnerOptions = {
    asia: [
      {
        name: 'Waku Ghin',
        cuisine: '日本料理',
        price: '$$$$',
        specialty: 'おまかせコース',
        rating: 5,
        mapUrl: 'https://maps.google.com/?q=Waku+Ghin+Singapore',
        reserveUrl: 'https://www.marinabaysands.com/restaurants/waku-ghin.html'
      },
      {
        name: 'Imperial Treasure',
        cuisine: '中華料理',
        price: '$$$',
        specialty: '北京ダック',
        rating: 4,
        mapUrl: 'https://maps.google.com/?q=Imperial+Treasure+Singapore',
        reserveUrl: 'https://www.marinabaysands.com/restaurants/imperial-treasure.html'
      },
      {
        name: 'Rise',
        cuisine: 'アジアンビュッフェ',
        price: '$$',
        specialty: 'シンガポール料理',
        rating: 4,
        mapUrl: 'https://maps.google.com/?q=Rise+Marina+Bay+Sands',
        reserveUrl: 'https://www.marinabaysands.com/restaurants/rise.html'
      }
    ],
    western: [
      {
        name: 'CUT by Wolfgang Puck',
        cuisine: 'ステーキハウス',
        price: '$$$$',
        specialty: '和牛ステーキ',
        rating: 5,
        mapUrl: 'https://maps.google.com/?q=CUT+Wolfgang+Puck+Singapore',
        reserveUrl: 'https://www.marinabaysands.com/restaurants/cut.html'
      },
      {
        name: 'Bread Street Kitchen',
        cuisine: 'イギリス料理',
        price: '$$$',
        specialty: 'フィッシュ&チップス',
        rating: 4,
        mapUrl: 'https://maps.google.com/?q=Bread+Street+Kitchen+Singapore',
        reserveUrl: 'https://www.marinabaysands.com/restaurants/bread-street-kitchen.html'
      },
      {
        name: 'Adrift',
        cuisine: 'フュージョン',
        price: '$$$',
        specialty: 'シーフード',
        rating: 4,
        mapUrl: 'https://maps.google.com/?q=Adrift+Marina+Bay+Sands',
        reserveUrl: 'https://www.marinabaysands.com/restaurants/adrift.html'
      }
    ],
    foodcourt: [
      {
        name: 'Rasapura Masters',
        cuisine: 'フードコート',
        price: '$',
        specialty: '多国籍料理',
        rating: 3,
        mapUrl: 'https://maps.google.com/?q=Rasapura+Masters+Singapore'
      },
      {
        name: 'The Shoppes Food Court',
        cuisine: 'フードコート',
        price: '$',
        specialty: 'アジアン料理',
        rating: 3,
        mapUrl: 'https://maps.google.com/?q=The+Shoppes+Food+Court+Singapore'
      }
    ]
  };

  // ショッピングデータ
  const shoppingStores = [
    {
      category: 'ラグジュアリー',
      stores: [
        {
          name: 'Louis Vuitton',
          description: 'フランスの高級ブランド',
          floor: 'B1-01',
          mapUrl: 'https://maps.google.com/?q=Louis+Vuitton+Marina+Bay+Sands'
        },
        {
          name: 'Chanel',
          description: 'フランスの高級ファッション',
          floor: 'B1-02',
          mapUrl: 'https://maps.google.com/?q=Chanel+Marina+Bay+Sands'
        },
        {
          name: 'Hermès',
          description: 'フランスの高級ブランド',
          floor: 'B1-03',
          mapUrl: 'https://maps.google.com/?q=Hermes+Marina+Bay+Sands'
        }
      ]
    },
    {
      category: 'ファッション',
      stores: [
        {
          name: 'Zara',
          description: 'スペインのファストファッション',
          floor: 'B2-01',
          mapUrl: 'https://maps.google.com/?q=Zara+Marina+Bay+Sands'
        },
        {
          name: 'H&M',
          description: 'スウェーデンのファストファッション',
          floor: 'B2-02',
          mapUrl: 'https://maps.google.com/?q=H%26M+Marina+Bay+Sands'
        },
        {
          name: 'Uniqlo',
          description: '日本のカジュアルブランド',
          floor: 'B2-03',
          mapUrl: 'https://maps.google.com/?q=Uniqlo+Marina+Bay+Sands'
        }
      ]
    },
    {
      category: 'エレクトロニクス',
      stores: [
        {
          name: 'Apple Store',
          description: 'アップル製品の直営店',
          floor: 'B1-10',
          mapUrl: 'https://maps.google.com/?q=Apple+Store+Marina+Bay+Sands'
        },
        {
          name: 'Samsung Experience Store',
          description: 'サムスン製品の体験店',
          floor: 'B1-11',
          mapUrl: 'https://maps.google.com/?q=Samsung+Marina+Bay+Sands'
        }
      ]
    },
    {
      category: '美容・化粧品',
      stores: [
        {
          name: 'Sephora',
          description: '化粧品の専門店',
          floor: 'B2-10',
          mapUrl: 'https://maps.google.com/?q=Sephora+Marina+Bay+Sands'
        },
        {
          name: 'Lush',
          description: 'ナチュラルコスメ',
          floor: 'B2-11',
          mapUrl: 'https://maps.google.com/?q=Lush+Marina+Bay+Sands'
        }
      ]
    }
  ];

  // 写真ギャラリーデータ
  const galleryImages = [
    {
      src: '/image/day1_detail/day1-hero.jpg',
      alt: 'マリーナベイサンズ外観',
      title: 'マリーナベイサンズ',
      description: 'シンガポールの象徴的なランドマーク'
    },
    {
      src: '/image/day1_detail/day1-infinity-pool.jpg',
      alt: 'インフィニティプール',
      title: 'インフィニティプール',
      description: '世界最高のプール体験'
    },
    {
      src: '/image/day1_detail/day1-shoppes.jpg',
      alt: 'The Shoppes at Marina Bay Sands',
      title: 'The Shoppes',
      description: 'ラグジュアリーショッピングモール'
    },
    {
      src: '/image/day1_detail/day1-casino.jpg',
      alt: 'マリーナベイサンズカジノ',
      title: 'カジノ',
      description: '世界クラスのカジノ体験'
    },
    {
      src: '/image/day1_detail/day1-skybar.jpg',
      alt: 'スカイバー',
      title: 'スカイバー',
      description: '夜景を楽しむバー'
    },
    {
      src: '/image/day1_detail/day1-lobby.jpg',
      alt: 'ホテルロビー',
      title: 'ホテルロビー',
      description: 'エレガントなロビー'
    }
  ];

  if (!dayData) {
    return <div>データが見つかりません</div>;
  }

  return (
    <div className="min-h-screen text-slate-800 overflow-x-hidden bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-[45vh] md:min-h-[50vh] lg:min-h-[60vh] overflow-hidden rounded-2xl mb-8">
        <div className="absolute inset-0">
          <Image
            src={dayData.hero}
            alt={dayData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        </div>
        
        <div className="absolute top-4 left-4 z-20">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur-md border border-white/20 text-slate-800 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            <span className="font-medium">ホームに戻る</span>
          </Link>
        </div>

        <div className="absolute bottom-8 left-8 right-8 z-20 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {dayData.title}
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-2">
              {formatDate(dayData.date)}
            </p>
            <p className="text-base md:text-lg opacity-75">
              マリーナベイ・サンズでの贅沢な一日
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* タブナビゲーション */}
        <div className="mb-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white/90 border border-slate-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* タブコンテンツ */}
        <div className="min-h-[60vh]">
          {/* スケジュールタブ */}
          {activeTab === 0 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">📅</span>
                スケジュール
              </h2>
              <div className="space-y-4">
                {dayData.timeline.map((slot, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg">
                      {slot.emoji}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-bold text-slate-800">{slot.time}</span>
                        <span className="text-lg font-semibold text-slate-800">{slot.title}</span>
                      </div>
                      {slot.note && (
                        <p className="text-slate-600 text-sm">{slot.note}</p>
                      )}
                      {slot.mapUrl && (
                        <button
                          onClick={() => window.open(slot.mapUrl, '_blank')}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors mt-1"
                        >
                          <MapPinIcon className="w-3 h-3" />
                          <span>地図</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* プールタブ */}
          {activeTab === 1 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">🏊</span>
                インフィニティプール
              </h2>
              
              {/* 写真 */}
              <div className="mb-6">
                <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/image/day1_detail/day1-infinity-pool.jpg"
                    alt="インフィニティプール"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-bold">インフィニティプール</h4>
                    <p className="text-sm opacity-90">世界最高のプール体験</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-800 mb-3">基本情報</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• 営業時間: 6:00-23:00</li>
                    <li>• アクセス: 57階 SkyPark</li>
                    <li>• 入場料: 宿泊客無料</li>
                    <li>• 定員制（混雑時は待機）</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-3">ベストタイム</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• 朝: 6:00-8:00（空いている）</li>
                    <li>• 夕方: 17:00-19:00（夕景）</li>
                    <li>• 夜: 20:00-22:00（夜景）</li>
                    <li>• 避ける時間: 12:00-16:00</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <h4 className="font-bold text-blue-800 mb-2">💡 プロのコツ</h4>
                <p className="text-sm text-blue-700">
                  早朝6時台が最も空いており、写真撮影にも最適。夕方の17-19時は夕景と夜景の両方を楽しめるゴールデンタイムです。
                </p>
              </div>
            </div>
          )}

          {/* カジノタブ */}
          {activeTab === 2 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">🎰</span>
                カジノガイド
              </h2>
              <CasinoGuide />
            </div>
          )}

          {/* ディナータブ */}
          {activeTab === 3 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">🍽️</span>
                ディナー
              </h2>
              
              {/* タブ切り替え */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveDinnerTab('asia')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeDinnerTab === 'asia'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-white/50 text-slate-600 hover:bg-white/70'
                  }`}
                >
                  アジア料理
                </button>
                <button
                  onClick={() => setActiveDinnerTab('western')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeDinnerTab === 'western'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-white/50 text-slate-600 hover:bg-white/70'
                  }`}
                >
                  西洋料理
                </button>
                <button
                  onClick={() => setActiveDinnerTab('foodcourt')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeDinnerTab === 'foodcourt'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-white/50 text-slate-600 hover:bg-white/70'
                  }`}
                >
                  フードコート
                </button>
              </div>

              {/* レストラン一覧 */}
              <div className="grid md:grid-cols-2 gap-4">
                {dinnerOptions[activeDinnerTab].map((restaurant, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-slate-800">{restaurant.name}</h4>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < restaurant.rating ? 'text-yellow-400' : 'text-slate-300'}>⭐</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{restaurant.cuisine} • {restaurant.price}</p>
                    <p className="text-sm text-slate-700 mb-3">おすすめ: {restaurant.specialty}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(restaurant.mapUrl, '_blank')}
                        className="flex-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors"
                      >
                        地図
                      </button>
                      {restaurant.reserveUrl && (
                        <button
                          onClick={() => window.open(restaurant.reserveUrl, '_blank')}
                          className="flex-1 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full hover:bg-green-200 transition-colors"
                        >
                          予約
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ショッピングタブ */}
          {activeTab === 4 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">🛍️</span>
                ショッピング
              </h2>
              
              {/* 写真 */}
              <div className="mb-6">
                <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/image/day1_detail/day1-shoppes.jpg"
                    alt="The Shoppes at Marina Bay Sands"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-bold">The Shoppes</h4>
                    <p className="text-sm opacity-90">ラグジュアリーショッピングモール</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {shoppingStores.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h4 className="font-bold text-slate-800 mb-3 text-lg">{category.category}</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {category.stores.map((store, storeIndex) => (
                        <div key={storeIndex} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-semibold text-slate-800">{store.name}</h5>
                            <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded-full">
                              {store.floor}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{store.description}</p>
                          <button
                            onClick={() => window.open(store.mapUrl, '_blank')}
                            className="w-full px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors"
                          >
                            地図で確認
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 rounded-xl">
                <h4 className="font-bold text-purple-800 mb-2">💡 ショッピングのコツ</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• 営業時間: 10:00-23:00（店舗により異なる）</li>
                  <li>• 免税手続き: パスポート持参でVAT還付可能</li>
                  <li>• サンズリワーズ会員でポイント還元</li>
                  <li>• 混雑時間: 14:00-18:00、20:00-22:00</li>
                </ul>
              </div>
            </div>
          )}

          {/* バータブ */}
          {activeTab === 5 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">🍸</span>
                バー・ラウンジ
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {bars.map((bar, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-slate-800">{bar.name}</h4>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < bar.viewScore ? 'text-yellow-400' : 'text-slate-300'}>⭐</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{bar.vibe} • {bar.price}</p>
                    <p className="text-sm text-slate-700 mb-3">シグネチャー: {bar.signature}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(bar.mapUrl, '_blank')}
                        className="flex-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors"
                      >
                        地図
                      </button>
                      {bar.reserveUrl && (
                        <button
                          onClick={() => window.open(bar.reserveUrl, '_blank')}
                          className="flex-1 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full hover:bg-green-200 transition-colors"
                        >
                          予約
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ギャラリータブ */}
          {activeTab === 6 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">📸</span>
                写真ギャラリー
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="text-sm font-bold truncate">{image.title}</h4>
                      <p className="text-xs opacity-90 truncate">{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 画像モーダル */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={selectedImage}
                alt="拡大画像"
                width={800}
                height={600}
                className="rounded-xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <section className="flex justify-between items-center pt-8 border-t border-slate-200">
          <div className="flex-1">
            {prevDayId ? (
              <Link
                href={`/day/${prevDayId}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
              >
                <ArrowRightIcon className="w-4 h-4 rotate-180" />
                <span className="font-medium">前の日</span>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
          
          <div className="flex-1 flex justify-end">
            {nextDayId && (
              <Link
                href={`/day/${nextDayId}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                <span className="font-medium">次の日</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
