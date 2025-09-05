// data/itinerary.ts
export type Link = { label: string; href: string };

export type Slot = {
  id?: string;               // ← 追加（なければ index を使う）
  time: string;
  title: string;
  note?: string;
  category?: "food" | "sight" | "transfer"| "activity" |"shopping" |"sight" |"hotel" | "relax" | "move" | "night";
  mapQuery?: string;         // ex: "Gardens by the Bay"
  links?: Link[];
};

export type Day = {
  id: string;
  title: string;
  date: string;
  cover: string;
  summary: string;
  slots: Slot[];
};

import { day1 } from "./day1";
import { day2 } from "./day2";
import { day3 } from "./day3";
import { day4 } from "./day4";

export const trip: { title: string; period: string; days: Day[] } = {
  title: "シンガポール旅行しおり",
  period: "2025-09-27 〜 2025-10-01",
  days: [day1, day2, day3, day4]
};