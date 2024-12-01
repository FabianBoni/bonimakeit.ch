import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import R2 from "./components/R2";

export const metadata: Metadata = {
  title: "Fabian Boni",
  description: "Full stack developer and enterpreneur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <R2 />
      </body>
    </html>
  );
}