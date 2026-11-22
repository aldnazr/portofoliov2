import type { Metadata, Viewport } from "next";
import { Geist_Mono, Google_Sans_Flex } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteDescription, siteTitle } from "@/data/site.ts";

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-google-sans-flex",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
      className={`${googleSansFlex.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=document.documentElement;if(t==="light"||t==="dark"||t==="system"){d.setAttribute("data-theme",t)}var m=document.querySelector('meta[name="color-scheme"]');if(m){m.setAttribute("content",t==="light"||t==="dark"?t:"light dark")}}catch(e){}})()`,
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
