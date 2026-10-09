import type { ReactNode } from "react";
import BackgroundMesh from "@/components/background-mesh";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";
import BackLink from "@/components/back-link";

type PageShellProps = {
  children: ReactNode;
  containerClassName?: string;
  currentLabel?: string;
  backHref?: string;
  backLabel?: string;
};

export default function PageShell({
  children,
  containerClassName = "max-w-6xl",
  currentLabel,
  backHref = "/",
  backLabel = "Kembali ke Portofolio",
}: PageShellProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <BackgroundMesh />

      <main
        className={`relative z-10 mx-auto ${containerClassName} px-4 pb-24 pt-8 sm:px-6 sm:pt-12`}
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-6 sm:mb-8">
          <Breadcrumb currentLabel={currentLabel} />
          <BackLink href={backHref} label={backLabel} />
        </div>
        {children}
      </main>

      <Footer />
    </div>
  );
}
