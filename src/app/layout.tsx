import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/content/site";

import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://night-killers.vercel.app"),
  title: {
    default: "Night Killers",
    template: "%s | Night Killers"
  },
  description: siteConfig.description,
  openGraph: {
    title: "Night Killers",
    description: siteConfig.description,
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen">
          <div className="relative z-10">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
