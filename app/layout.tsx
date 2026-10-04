import type { Metadata, Viewport } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteDescription, siteTitle } from "@/data/site";

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-google-sans-flex",
});

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#08090d" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="system"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${googleSansFlex.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"||t==="system")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Analytics />
        <SpeedInsights />

        {children}
      </body>
    </html>
  );
}
