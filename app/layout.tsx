// app/layout.js
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

const DynamicHeader = dynamic(() => import('./components/Header'), { ssr: false });
const DynamicFooter = dynamic(() => import('./components/Footer'), { ssr: false });

export const metadata: Metadata = {
  title: "Create Flowbite React",
  description: "Generated by create flowbite react",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        <DynamicHeader />
        {children}
        <DynamicFooter />
      </body>
    </html>
  );
}