import { redirect } from "next/navigation";

export default function DayPage({ params }: { params: { id: string } }) {
  // 各日専用のページにリダイレクト
  redirect(`/day/${params.id}`);
}