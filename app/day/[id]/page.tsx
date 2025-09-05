import { notFound } from "next/navigation";
import { days } from "@/data/days";
import DayDetail from "@/components/DayDetail";

// 静的生成のためのパラメータ
export async function generateStaticParams() {
  return Object.keys(days).map((id) => ({
    id: id,
  }));
}

export default function DayPage({ params }: { params: { id: string } }) {
  const dayData = days[params.id];
  
  if (!dayData) {
    notFound();
  }

  return <DayDetail dayData={dayData} />;
}