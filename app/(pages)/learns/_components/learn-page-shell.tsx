import type { ReactNode } from "react";
import BackgroundMesh from "@/components/background-mesh";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "./scroll-to-top";

type LearnPageShellProps = {
  children: ReactNode;
  /**
   * Kelas lebar container. Default `max-w-6xl` (halaman topik);
   * gunakan `max-w-5xl` untuk halaman hub/list.
   */
  containerClassName?: string;
};

/**
 * Kerangka halaman learns: BackgroundMesh + Header + container +
 * ScrollToTop + Footer. Satu tempat untuk mengubah layout seluruh
 * halaman di grup learns.
 */
export default function LearnPageShell({
  children,
  containerClassName = "max-w-6xl",
}: LearnPageShellProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <BackgroundMesh />
      {/* <Header /> */}

      <div
        className={`relative z-10 ${containerClassName} mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-24`}
      >
        {children}
      </div>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
