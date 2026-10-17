import type { Metadata } from "next";
import CsrTimestamp from "@/features/learns/components/csr-timestamp";
import RenderingDemo from "@/features/learns/components/rendering-demo";
import { highlightCode } from "@/features/learns/data/highlight";

export const metadata: Metadata = {
  title: "CSR - Client-Side Rendering | Interactive Learning Lab",
  description:
    "Halaman CSR Next.js: HTML awal berisi kerangka dan status memuat, browser mengambil timestamp dari API /api/time.",
};

const snippet = `useEffect(() => {
  let controller = new AbortController();

  const fetchTime = () => {
    controller = new AbortController();
    fetch("/api/time", { cache: "no-store", signal: controller.signal })
      .then((res) => res.json())
      .then((body) => setTimestamp(body.generatedAt));
  };

  fetchTime();
  const interval = setInterval(fetchTime, 1000);
  return () => {
    controller.abort();
    clearInterval(interval);
  };
}, []);`;

export default async function CsrPage() {
  const highlightedHtml = await highlightCode(snippet, "typescript");

  return (
    <RenderingDemo
      label="Client-Side Rendering"
      title="CSR"
      description="HTML awal berisi kerangka dan status memuat. Browser menjalankan JavaScript lalu mengambil waktu dari API."
      usageDescription="Dashboard interaktif atau data yang bergantung pada interaksi pengguna."
      snippet={snippet}
      highlightedHtml={highlightedHtml}
    >
      <CsrTimestamp />
    </RenderingDemo>
  );
}
