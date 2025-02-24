import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Der Die Das - German Article Practice",
  description: "Learn German articles through interactive practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="apple-mobile-web-app-title" content="DerDieDas" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyledComponentsRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
