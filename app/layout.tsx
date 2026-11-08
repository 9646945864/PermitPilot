
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PermitPilot | Simplify Building Permits",
  description:
    "AI-powered permitting assistance for residential contractors."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
