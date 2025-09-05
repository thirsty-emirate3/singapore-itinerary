import { notFound } from "next/navigation";
import { days } from "@/data/days";
import DayDetail from "@/components/DayDetail";

export default function Day1Page() {
  const dayData = days["1"];
  
  if (!dayData) {
    notFound();
  }

  return <DayDetail dayData={dayData} />;
}
