import "./globals.css";
import type { Metadata } from "next";
import { inter, outfit } from "@/font";
import React from "react";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "Zenith | RTGS Inward Dashboard",
  description: "This is the rtgs inward application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html className={`${inter.variable} ${outfit.variable}`} lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
