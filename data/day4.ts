import type { Day } from "./itinerary";

export const day4: Day = {
  id: "4",
  title: "Day 4 — 帰国日",
  date: "2025-09-30",
  cover: "/image/day4.jpg",
  summary: "午前：出発準備 → 13:55 SIN 発 / 21:55 HND 着",
  slots: [
    { time: "09:00", title: "荷造り・チェックアウト", note: "パスポート・貴重品最終確認" },
    { time: "11:00", title: "空港へ移動", category: "move", mapQuery: "Changi Airport" },
    { time: "13:55", title: "シンガポール発 (SIN)", category: "move" },
    { time: "21:55", title: "羽田着 (HND)", category: "move" }
  ]
};


