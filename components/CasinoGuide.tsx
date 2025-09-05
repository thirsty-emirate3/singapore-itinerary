"use client";

import { useState } from "react";
import { ExternalLinkIcon } from "lucide-react";

interface CasinoGame {
  key: string;
  name: string;
  minBet: string;
  basics: string[];
  avoid: string[];
  edge: string;
  strategy: {
    core: string[];
    whenToBet: string[];
    avoid: string[];
    table: string[];
    risk: "low" | "mid" | "high";
  };
}

interface CasinoLink {
  label: string;
  url: string;
}

interface CasinoNotes {
  entry: string[];
  etiquette: string[];
}

interface Bankroll {
  defaultStake: number;
  min: number;
  max: number;
}

interface Casino {
  tabs: string[];
  games: CasinoGame[];
  links: CasinoLink[];
  notes: CasinoNotes;
  videoUrl?: string;
  bankroll: Bankroll;
}

interface CasinoGuideProps {
  casino?: Casino;
}

export default function CasinoGuide({ casino }: CasinoGuideProps) {
  // デフォルトのカジノデータ
  const defaultCasino: Casino = {
    tabs: ["入場・ルール", "サンズリワーズ", "ゲーム別", "エチケット", "リンク"],
    games: [
      {
        key: "baccarat",
        name: "バカラ",
        minBet: "S$20〜",
        basics: ["プレイヤーかバンカーにベット", "9に近い方が勝ち", "自然8・9は即決"],
        avoid: ["タイにベット（配当率が低い）"],
        edge: "目安: バンカー 1.06%",
        strategy: {
          core: ["基本はBanker固定（手数料込みでも最小エッジ）", "Tie/ペア系は回避（高配当=高エッジ）"],
          whenToBet: ["テーブルがNo-Commissionなら、Banker 0勝ち条件を確認してからBanker継続", "連敗でのプログレッシブはしない（資金が飛びやすい）"],
          avoid: ["トレンド表への過信", "Tie/ペアへの常用"],
          table: ["Commission有でもOK／No-Com時は例外ルール要確認"],
          risk: "low" as const
        }
      },
      {
        key: "blackjack",
        name: "ブラックジャック",
        minBet: "S$20〜",
        basics: ["21に近づける", "Aは1または11", "ディーラーは17以上でスタンド"],
        avoid: ["インシュランス（配当率が悪い）"],
        edge: "目安: 基本戦略で 0.5%",
        strategy: {
          core: ["基本戦略に忠実（配布表を参照）", "インシュランス禁止（-EV）"],
          whenToBet: ["11はダブル（ディーラーA除く）", "A,8/A,9はスタンド", "ペア5は分割しない／ペア8は分割"],
          avoid: ["テーブルルール不明での着席", "連続負けのベット上げ"],
          table: ["S17/ 6D/ ダブル後ヒット可の台を優先"],
          risk: "low" as const
        }
      },
      {
        key: "roulette",
        name: "ルーレット",
        minBet: "S$10〜",
        basics: ["赤・黒、偶数・奇数、1-18・19-36", "0はハウスエッジ", "ヨーロピアンが有利"],
        avoid: ["単一数字への大額ベット", "5つの数字ベット"],
        edge: "目安: ヨーロピアン 2.7%",
        strategy: {
          core: ["赤・黒、偶数・奇数に限定", "マーチンゲールは避ける"],
          whenToBet: ["小額から開始", "勝ったら利益を確保"],
          avoid: ["連続負けでのベット倍増", "感情的なベット"],
          table: ["ヨーロピアンルーレットを選択"],
          risk: "mid" as const
        }
      }
    ],
    links: [
      { label: "マリーナベイサンズ公式サイト", url: "https://www.marinabaysands.com/" },
      { label: "カジノルール", url: "https://www.marinabaysands.com/casino.html" },
      { label: "サンズリワーズ", url: "https://www.marinabaysands.com/sands-rewards.html" }
    ],
    notes: {
      entry: [
        "21歳以上（パスポート必須）",
        "スマートカジュアルな服装",
        "写真撮影禁止",
        "携帯電話はサイレントモード"
      ],
      etiquette: [
        "ディーラーの指示に従う",
        "チップは適切に配置",
        "他のプレイヤーを尊重",
        "負けても冷静に"
      ]
    },
    bankroll: {
      defaultStake: 50,
      min: 20,
      max: 500
    }
  };

  const casinoData = casino || defaultCasino;
  const [activeTab, setActiveTab] = useState(0);
  const [budget, setBudget] = useState(casinoData.bankroll.defaultStake * 10);
  const [playTime, setPlayTime] = useState(2);
  const [expandedStrategies, setExpandedStrategies] = useState<Record<string, boolean>>({});

  // バンクロール計算
  const calculateRecommendedBet = () => {
    const totalMinutes = playTime * 60;
    const handsPerHour = 60; // 1時間あたりのゲーム数（目安）
    const totalHands = (totalMinutes / 60) * handsPerHour;
    const recommendedBet = Math.round(budget / totalHands);
    return Math.max(casinoData.bankroll.min, Math.min(casinoData.bankroll.max, recommendedBet));
  };

  const getGameIcon = (key: string) => {
    switch (key) {
      case 'baccarat': return '🃏';
      case 'blackjack': return '🃏';
      case 'roulette': return '🎲';
      case 'sicbo': return '🎲';
      default: return '🎰';
    }
  };

  const getRiskColor = (risk: "low" | "mid" | "high") => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      case 'mid': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const toggleStrategy = (gameKey: string) => {
    setExpandedStrategies(prev => ({
      ...prev,
      [gameKey]: !prev[gameKey]
    }));
  };

  return (
    <section className="bg-white/85 backdrop-blur rounded-2xl shadow-lg p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 flex items-center gap-3">
        <span>🎰</span>
        カジノ ミニガイド
      </h2>

      {/* Tabs */}
      <div className="mb-6">
        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 pb-2">
            {casinoData.tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-shrink-0 snap-start px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-white/50 text-slate-600 hover:bg-white/70'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: Tab Buttons */}
        <div className="hidden md:flex gap-2">
          {casinoData.tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === index
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'bg-white/50 text-slate-600 hover:bg-white/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* 入場・ルール */}
        {activeTab === 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">入場条件・ルール</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {casinoData.notes.entry.map((note, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="text-sm text-slate-700">{note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* サンズリワーズ */}
        {activeTab === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">サンズリワーズ</h3>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <h4 className="font-semibold text-slate-800 mb-3">会員特典</h4>
              <p className="text-slate-700 mb-4 leading-relaxed">
                カジノでのプレイでポイントを貯めて、ホテル、レストラン、ショッピングで使用できます。
                無料会員登録で即座にポイントカードを発行。
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/70 rounded-lg p-4 border border-purple-200">
                  <h5 className="font-semibold text-slate-800 mb-2">登録場所</h5>
                  <p className="text-sm text-slate-600">カジノフロア内 カスタマーサービス</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4 border border-purple-200">
                  <h5 className="font-semibold text-slate-800 mb-2">必要書類</h5>
                  <p className="text-sm text-slate-600">パスポートのみ</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ゲーム別 */}
        {activeTab === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">ゲーム別攻略法</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {casinoData.games.map((game, index) => (
                <div key={index} className="bg-white/70 rounded-xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getGameIcon(game.key)}</span>
                      <div>
                        <h4 className="font-semibold text-lg text-slate-800">{game.name}</h4>
                        <p className="text-sm text-indigo-600 font-medium">{game.minBet}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRiskColor(game.strategy.risk)}`}>
                      {game.strategy.risk === 'low' ? '低リスク' : game.strategy.risk === 'mid' ? '中リスク' : '高リスク'}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-semibold text-slate-700 mb-2">基本ルール</h5>
                      <ul className="space-y-1">
                        {game.basics.map((basic, idx) => (
                          <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 leading-snug">
                            <span className="text-green-500 mt-1">•</span>
                            {basic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold text-slate-700 mb-2">避けるべき</h5>
                      <ul className="space-y-1">
                        {game.avoid.map((avoid, idx) => (
                          <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 leading-snug">
                            <span className="text-red-500 mt-1">✗</span>
                            {avoid}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-2 border-t border-white/30">
                      <p className="text-xs text-slate-500 font-medium">{game.edge}</p>
                    </div>

                    {/* プレイブック トグル */}
                    <div className="pt-3 border-t border-white/30">
                      <button
                        onClick={() => toggleStrategy(game.key)}
                        className="flex items-center justify-between w-full text-left"
                        aria-expanded={expandedStrategies[game.key] || false}
                        aria-controls={`strategy-${game.key}`}
                      >
                        <span className="text-sm font-semibold text-indigo-700">📖 プレイブック</span>
                        <span className={`text-indigo-600 transition-transform duration-200 ${expandedStrategies[game.key] ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      
                      {expandedStrategies[game.key] && (
                        <div id={`strategy-${game.key}`} className="mt-3 space-y-3">
                          {/* Mobile: Accordion */}
                          <div className="md:hidden space-y-3">
                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                              <h6 className="text-xs font-semibold text-blue-800 mb-2">🎯 原則</h6>
                              <ul className="space-y-1">
                                {game.strategy.core.map((item, idx) => (
                                  <li key={idx} className="text-xs text-blue-700 flex items-start gap-2 leading-snug">
                                    <span className="text-blue-500 mt-1">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                              <h6 className="text-xs font-semibold text-green-800 mb-2">💰 こう賭ける</h6>
                              <ul className="space-y-1">
                                {game.strategy.whenToBet.map((item, idx) => (
                                  <li key={idx} className="text-xs text-green-700 flex items-start gap-2 leading-snug">
                                    <span className="text-green-500 mt-1">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                              <h6 className="text-xs font-semibold text-red-800 mb-2">❌ 避ける</h6>
                              <ul className="space-y-1">
                                {game.strategy.avoid.map((item, idx) => (
                                  <li key={idx} className="text-xs text-red-700 flex items-start gap-2 leading-snug">
                                    <span className="text-red-500 mt-1">✗</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                              <h6 className="text-xs font-semibold text-purple-800 mb-2">🎲 台選び</h6>
                              <ul className="space-y-1">
                                {game.strategy.table.map((item, idx) => (
                                  <li key={idx} className="text-xs text-purple-700 flex items-start gap-2 leading-snug">
                                    <span className="text-red-500 mt-1">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Desktop: 2 Columns */}
                          <div className="hidden md:grid md:grid-cols-2 gap-3">
                            <div className="space-y-3">
                              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                <h6 className="text-xs font-semibold text-blue-800 mb-2">🎯 原則</h6>
                                <ul className="space-y-1">
                                  {game.strategy.core.map((item, idx) => (
                                    <li key={idx} className="text-xs text-blue-700 flex items-start gap-2 leading-snug">
                                      <span className="text-blue-500 mt-1">•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                <h6 className="text-xs font-semibold text-green-800 mb-2">💰 こう賭ける</h6>
                                <ul className="space-y-1">
                                  {game.strategy.whenToBet.map((item, idx) => (
                                    <li key={idx} className="text-xs text-green-700 flex items-start gap-2 leading-snug">
                                      <span className="text-green-500 mt-1">•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                <h6 className="text-xs font-semibold text-red-800 mb-2">❌ 避ける</h6>
                                <ul className="space-y-1">
                                  {game.strategy.avoid.map((item, idx) => (
                                    <li key={idx} className="text-xs text-red-700 flex items-start gap-2 leading-snug">
                                      <span className="text-red-500 mt-1">✗</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                <h6 className="text-xs font-semibold text-purple-800 mb-2">🎲 台選び</h6>
                                <ul className="text-xs text-purple-700 flex items-start gap-2 leading-snug">
                                  {game.strategy.table.map((item, idx) => (
                                    <li key={idx} className="text-xs text-purple-700 flex items-start gap-2 leading-snug">
                                      <span className="text-purple-500 mt-1">•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Blackjack Basic Strategy Table */}
                          {game.key === 'blackjack' && (
                            <div className="pt-3 border-t border-white/30">
                              <h6 className="text-xs font-semibold text-slate-700 mb-2 text-center">📊 基本戦略ミニ表</h6>
                              <div className="overflow-x-auto">
                                <div className="min-w-[400px] bg-white/50 rounded-lg p-3 border border-white/30">
                                  <div className="grid grid-cols-4 gap-2 text-xs">
                                    <div className="font-semibold text-slate-700 text-center">手札</div>
                                    <div className="font-semibold text-slate-700 text-center">2-6</div>
                                    <div className="font-semibold text-slate-700 text-center">7-9</div>
                                    <div className="font-semibold text-slate-700 text-center">10-A</div>
                                    
                                    <div className="text-slate-600">8以下</div>
                                    <div className="text-green-600 font-medium">H</div>
                                    <div className="text-green-600 font-medium">H</div>
                                    <div className="text-green-600 font-medium">H</div>
                                    
                                    <div className="text-slate-600">9</div>
                                    <div className="text-blue-600 font-medium">D</div>
                                    <div className="text-green-600 font-medium">H</div>
                                    <div className="text-green-600 font-medium">H</div>
                                    
                                    <div className="text-slate-600">10</div>
                                    <div className="text-blue-600 font-medium">D</div>
                                    <div className="text-blue-600 font-medium">D</div>
                                    <div className="text-green-600 font-medium">H</div>
                                    
                                    <div className="text-slate-600">11</div>
                                    <div className="text-blue-600 font-medium">D</div>
                                    <div className="text-blue-600 font-medium">D</div>
                                    <div className="text-blue-600 font-medium">D</div>
                                    
                                    <div className="text-slate-600">12</div>
                                    <div className="text-green-600 font-medium">S</div>
                                    <div className="text-green-600 font-medium">H</div>
                                    <div className="text-green-600 font-medium">H</div>
                                    
                                    <div className="text-slate-600">13-16</div>
                                    <div className="text-green-600 font-medium">S</div>
                                    <div className="text-green-600 font-medium">H</div>
                                    <div className="text-green-600 font-medium">H</div>
                                    
                                    <div className="text-slate-600">17以上</div>
                                    <div className="text-red-600 font-medium">S</div>
                                    <div className="text-red-600 font-medium">S</div>
                                    <div className="text-red-600 font-medium">S</div>
                                  </div>
                                  <div className="mt-2 text-xs text-slate-500 text-center">
                                    H=ヒット, S=スタンド, D=ダブル
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Responsible Gaming Note */}
                          <div className="pt-2 border-t border-white/30">
                            <p className="text-xs text-slate-500 text-center leading-snug">
                              ⚠️ あくまで攻略法の目安です。Responsible Gamingを心がけ、楽しみながらプレイしましょう。
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* エチケット */}
        {activeTab === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">カジノエチケット</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <span>✅</span>
                  Do&apos;s
                </h4>
                <ul className="space-y-2">
                  {casinoData.notes.etiquette.map((note, index) => (
                    <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <span>❌</span>
                  Don&apos;ts
                </h4>
                <ul className="space-y-2">
                  <li className="text-sm text-red-700 flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    飲酒しながらのプレイ
                  </li>
                  <li className="text-sm text-red-700 flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    他のプレイヤーへのアドバイス
                  </li>
                  <li className="text-sm text-red-700 flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    感情的なベット
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* リンク */}
        {activeTab === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">公式リンク</h3>
            <div className="space-y-3">
              {casinoData.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/70 rounded-xl border border-white/30 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
                  aria-label={`${link.label}を新しいタブで開く`}
                >
                  <span className="font-medium text-slate-800">{link.label}</span>
                  <ExternalLinkIcon className="w-5 h-5 text-slate-500 group-hover:text-indigo-600 transition-colors" />
                </a>
              ))}
            </div>

            {/* YouTube Video */}
            {casinoData.videoUrl && (
              <div className="mt-6">
                <h4 className="font-semibold text-slate-800 mb-3">カジノガイド動画</h4>
                <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={casinoData.videoUrl}
                    title="カジノガイド動画"
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bankroll Calculator */}
      <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span>💰</span>
          バンクロール計算機
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              予算 (S$)
            </label>
            <input
              type="range"
              min={casinoData.bankroll.min * 5}
              max={casinoData.bankroll.max * 10}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>S${casinoData.bankroll.min * 5}</span>
              <span>S${budget}</span>
              <span>S${casinoData.bankroll.max * 10}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              プレイ時間 (時間)
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={playTime}
              onChange={(e) => setPlayTime(Number(e.target.value))}
              className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1h</span>
              <span>{playTime}h</span>
              <span>8h</span>
            </div>
          </div>
        </div>
        
        <div className="text-center p-3 bg-white/70 rounded-lg border border-indigo-200">
          <p className="text-sm text-slate-600 mb-1">推奨1ベット額</p>
          <p className="text-2xl font-bold text-indigo-600">
            S${calculateRecommendedBet()}
          </p>
        </div>
        
        <p className="text-xs text-slate-500 text-center mt-3">
          あくまで目安。Responsible Gamingを心がけましょう。
        </p>
      </div>
    </section>
  );
}
