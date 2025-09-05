"use client";

import { useState } from "react";
import { coupleData, type DateMode, type CoupleMission } from "../data/day3-couple";
import { ExternalLinkIcon, Camera, Heart, MapPin, Clock, Star, Sun, CloudRain, Users, AlertTriangle } from "lucide-react";

export default function CoupleGuide() {
  const [selectedMode, setSelectedMode] = useState<DateMode>(coupleData.dateModes[0] as DateMode);
  const [activeTab, setActiveTab] = useState(0);
  const [completedMissions, setCompletedMissions] = useState<Record<string, boolean>>({});
  const [uploadedPhotos, setUploadedPhotos] = useState<Record<string, string>>({});

  const handleMissionComplete = (missionId: string) => {
    setCompletedMissions(prev => ({
      ...prev,
      [missionId]: !prev[missionId]
    }));
  };

  const handlePhotoUpload = (missionId: string, photoUrl: string) => {
    setUploadedPhotos(prev => ({
      ...prev,
      [missionId]: photoUrl
    }));
  };

  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyText = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return '簡単';
      case 'medium': return '普通';
      case 'hard': return '難しい';
      default: return '不明';
    }
  };

  const getPriceRangeText = (priceRange: '$' | '$$' | '$$$') => {
    switch (priceRange) {
      case '$': return '安価';
      case '$$': return '中価格';
      case '$$$': return '高価格';
      default: return '不明';
    }
  };

  const completedCount = Object.values(completedMissions).filter(Boolean).length;
  const totalMissions = coupleData.missions.length;

  return (
    <section className="bg-white/85 backdrop-blur rounded-2xl shadow-lg p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 flex items-center gap-3">
        <span>💕</span>
        カップル向け Day3 詳細ガイド
      </h2>

      {/* デートモード選択 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          デートモードを選んでね
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coupleData.dateModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode as DateMode)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedMode.id === mode.id
                  ? 'border-pink-300 bg-pink-50 shadow-lg'
                  : 'border-white/30 bg-white/50 hover:bg-white/70'
              }`}
            >
              <div className="text-3xl mb-2">{mode.icon}</div>
              <h4 className="font-semibold text-lg text-slate-800 mb-2">{mode.name}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{mode.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 選択されたモードのタイムライン */}
      <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-pink-500" />
          {selectedMode.name}のタイムライン
        </h3>
        <div className="space-y-4">
          {selectedMode.timeline.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-white/70 rounded-lg border border-pink-200">
              <div className="flex-shrink-0 w-20 text-sm font-medium text-pink-600">
                {item.time}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-600 mb-2">{item.note}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>⏱️ {item.duration}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    item.category === 'uss' ? 'bg-blue-100 text-blue-700' :
                    item.category === 'aquarium' ? 'bg-cyan-100 text-cyan-700' :
                    item.category === 'beach' ? 'bg-yellow-100 text-yellow-700' :
                    item.category === 'dinner' ? 'bg-red-100 text-red-700' :
                    item.category === 'show' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.category === 'uss' ? 'USS' :
                     item.category === 'aquarium' ? 'アクアリウム' :
                     item.category === 'beach' ? 'ビーチ' :
                     item.category === 'dinner' ? 'ディナー' :
                     item.category === 'show' ? 'ショー' : 'アクティビティ'}
                  </span>
                </div>
                <div className="mt-3">
                  <h5 className="text-xs font-semibold text-slate-700 mb-2">💡 ポイント</h5>
                  <ul className="space-y-1">
                    {item.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="text-pink-500 mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-white/70 rounded-lg border border-pink-200">
          <h4 className="font-semibold text-slate-800 mb-3">✨ おすすめポイント</h4>
          <ul className="space-y-2">
            {selectedMode.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="mb-6">
        <div className="flex overflow-x-auto gap-2 pb-2">
          {['ゴールデンアワー', 'レストラン', 'アクティビティ', 'ミッション', 'QOL', 'バックアップ'].map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === index
                  ? 'bg-pink-50 text-pink-700 border border-pink-200'
                  : 'bg-white/50 text-slate-600 hover:bg-white/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* タブコンテンツ */}
      <div className="space-y-6">
        {/* ゴールデンアワーガイド */}
        {activeTab === 0 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-600" />
                ゴールデンアワーガイド
              </h3>
              <div className="mb-6">
                <h4 className="font-semibold text-slate-800 mb-2">🌅 ベスト時間帯</h4>
                <p className="text-lg text-slate-700 font-medium">{coupleData.goldenHourGuide.bestTime}</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {coupleData.goldenHourGuide.spots.map((spot, index) => (
                  <div key={index} className="bg-white/70 rounded-lg p-4 border border-yellow-200">
                    <h5 className="font-semibold text-slate-800 mb-2">{spot.name}</h5>
                    <p className="text-sm text-slate-600 mb-2">{spot.description}</p>
                    <p className="text-xs text-yellow-600 font-medium mb-2">⏰ {spot.bestTime}</p>
                    <ul className="space-y-1">
                      {spot.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-slate-800 mb-3">📸 撮影プロンプト</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {coupleData.goldenHourGuide.photoPrompts.map((prompt) => (
                    <div key={prompt.id} className="bg-white/70 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-slate-800">{prompt.title}</h5>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(prompt.difficulty as 'easy' | 'medium' | 'hard')}`}>
                          {getDifficultyText(prompt.difficulty as 'easy' | 'medium' | 'hard')}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{prompt.description}</p>
                      <ul className="space-y-1">
                        {prompt.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="text-yellow-500 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-3">📷 カメラ設定のコツ</h4>
                <ul className="space-y-2">
                  {coupleData.goldenHourGuide.cameraTips.map((tip, index) => (
                    <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* レストラン情報 */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              カップル向けレストラン
            </h3>
            
            {/* カテゴリ別フィルター */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['romantic', 'casual', 'light'].map((category) => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    category === 'romantic' ? 'bg-pink-100 text-pink-700' :
                    category === 'casual' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}
                >
                  {category === 'romantic' ? 'ロマンチック' :
                   category === 'casual' ? 'カジュアル' : '軽食'}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {coupleData.restaurants.map((restaurant, index) => (
                <div key={index} className="bg-white/70 rounded-xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg text-slate-800 mb-1">{restaurant.name}</h4>
                      <p className="text-sm text-slate-600 mb-2">{restaurant.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                        restaurant.priceRange === '$' ? 'bg-green-100 text-green-700 border-green-200' :
                        restaurant.priceRange === '$$' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                        'bg-red-100 text-red-700 border-red-200'
                      }`}>
                        {getPriceRangeText(restaurant.priceRange as '$' | '$$' | '$$$')}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                        restaurant.category === 'romantic' ? 'bg-pink-100 text-pink-700 border-pink-200' :
                        restaurant.category === 'casual' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        'bg-green-100 text-green-700 border-green-200'
                      }`}>
                        {restaurant.category === 'romantic' ? 'ロマンチック' :
                         restaurant.category === 'casual' ? 'カジュアル' : '軽食'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h5 className="text-sm font-semibold text-slate-700 mb-2">✨ 雰囲気</h5>
                    <div className="flex flex-wrap gap-1">
                      {restaurant.atmosphere.map((item, itemIndex) => (
                        <span key={itemIndex} className="px-2 py-1 text-xs bg-pink-50 text-pink-600 rounded-full border border-pink-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-slate-600 mb-2">
                      <span className="font-medium">📅 予約:</span> {restaurant.reservation}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <a
                      href={`https://maps.google.com/?q=${restaurant.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      地図で見る
                    </a>
                    {restaurant.links.length > 0 && (
                      <a
                        href={restaurant.links[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-pink-500 text-white text-sm font-medium rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
                      >
                        {restaurant.links[0].label}
                        <ExternalLinkIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* アクティビティ */}
        {activeTab === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-500" />
              カップル・アクティビティ
            </h3>
            
            {/* カテゴリ別フィルター */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['beach', 'indoor', 'night'].map((category) => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    category === 'beach' ? 'bg-yellow-100 text-yellow-700' :
                    category === 'indoor' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}
                >
                  {category === 'beach' ? 'ビーチ' :
                   category === 'indoor' ? '屋内' : '夜'}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {coupleData.activities.map((activity, index) => (
                <div key={index} className="bg-white/70 rounded-xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg text-slate-800 mb-1">{activity.name}</h4>
                      <p className="text-sm text-slate-600 mb-2">{activity.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                      activity.category === 'beach' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                      activity.category === 'indoor' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      'bg-purple-100 text-purple-700 border-purple-200'
                    }`}>
                      {activity.category === 'beach' ? 'ビーチ' :
                       activity.category === 'indoor' ? '屋内' : '夜'}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-slate-600 mb-2">
                      <span className="font-medium">⏱️ 所要時間:</span> {activity.duration}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h5 className="text-sm font-semibold text-slate-700 mb-2">📋 必要持ち物</h5>
                    <div className="flex flex-wrap gap-1">
                      {activity.requirements.map((req, reqIndex) => (
                        <span key={reqIndex} className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full border border-blue-200">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-slate-700 mb-2">💡 ポイント</h5>
                    <ul className="space-y-1">
                      {activity.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <a
                      href={`https://maps.google.com/?q=${activity.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      地図で見る
                    </a>
                    {activity.links.length > 0 && (
                      <a
                        href={activity.links[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                      >
                        {activity.links[0].label}
                        <ExternalLinkIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ミッション */}
        {activeTab === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                ふたりミッション
              </h3>
              <div className="text-sm text-slate-600">
                進捗: {completedCount}/{totalMissions}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {coupleData.missions.map((mission) => (
                <div key={mission.id} className={`rounded-xl p-4 border-2 transition-all duration-300 ${
                  completedMissions[mission.id]
                    ? 'border-green-300 bg-green-50'
                    : 'border-white/30 bg-white/50'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-slate-800">{mission.title}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(mission.difficulty as 'easy' | 'medium' | 'hard')}`}>
                      {getDifficultyText(mission.difficulty as 'easy' | 'medium' | 'hard')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-3">{mission.description}</p>
                  
                  <div className="mb-3">
                    <p className="text-xs text-slate-500 mb-2">
                      📍 {mission.location}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-slate-700 mb-2">💡 コツ</h5>
                    <ul className="space-y-1">
                      {mission.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-pink-500 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {mission.photoRequired && (
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-slate-700 mb-2">📸 写真アップロード</h5>
                      {uploadedPhotos[mission.id] ? (
                        <div className="text-center">
                          <img 
                            src={uploadedPhotos[mission.id]} 
                            alt="Uploaded photo" 
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <button
                            onClick={() => handlePhotoUpload(mission.id, '')}
                            className="text-xs text-red-600 hover:text-red-800"
                          >
                            写真を削除
                          </button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-500 mb-2">写真をアップロード</p>
                          <button
                            onClick={() => handlePhotoUpload(mission.id, '/image/day3.jpg')}
                            className="px-3 py-1 bg-pink-500 text-white text-xs rounded-lg hover:bg-pink-600 transition-colors"
                          >
                            アップロード
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => handleMissionComplete(mission.id)}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      completedMissions[mission.id]
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-pink-500 text-white hover:bg-pink-600'
                    }`}
                  >
                    {completedMissions[mission.id] ? '✅ 完了済み' : '🎯 完了にする'}
                  </button>
                </div>
              ))}
            </div>

            {completedCount === totalMissions && (
              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <h4 className="text-xl font-bold text-green-800 mb-2">🎉 おめでとう！</h4>
                <p className="text-green-700 mb-4">Day3コンプリート！</p>
                <button className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors">
                  共有用スクリーンショット生成
                </button>
              </div>
            )}
          </div>
        )}

        {/* QOL詳細 */}
        {activeTab === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-green-500" />
              ふたりのQOLディテール
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  混雑＆暑さ回避
                </h4>
                <ul className="space-y-2">
                  {coupleData.qolDetails.heatAvoidance.map((item, index) => (
                    <li key={index} className="text-sm text-yellow-700 flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  水分ルール
                </h4>
                <ul className="space-y-2">
                  {coupleData.qolDetails.hydration.map((item, index) => (
                    <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                施設・アクセス情報
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-semibold text-green-800 mb-2">🔒 ロッカー</h5>
                  <p className="text-sm text-green-700">{coupleData.qolDetails.facilities.lockers}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-green-800 mb-2">🚿 シャワー</h5>
                  <p className="text-sm text-green-700">{coupleData.qolDetails.facilities.showers}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-green-800 mb-2">🚇 アクセス</h5>
                  <ul className="space-y-1">
                    {coupleData.qolDetails.facilities.access.map((item, index) => (
                      <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* バックアッププラン */}
        {activeTab === 5 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              雨天・混雑バックアップ
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <CloudRain className="w-5 h-5" />
                  雨天時
                </h4>
                <ul className="space-y-2">
                  {coupleData.backupPlans.rain.map((item, index) => (
                    <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  大混雑時
                </h4>
                <ul className="space-y-2">
                  {coupleData.backupPlans.crowded.map((item, index) => (
                    <li key={index} className="text-sm text-yellow-700 flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  緊急時
                </h4>
                <ul className="space-y-2">
                  {coupleData.backupPlans.emergency.map((item, index) => (
                    <li key={index} className="text-sm text-red-700 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

