import { redirect } from "next/navigation";

export default function Home() {
  // 将首页直接重定向到 Mizore 落地页，保持与 /mizore 一致的样式与行为
  redirect("/mizore");
}