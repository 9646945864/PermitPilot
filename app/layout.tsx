import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Permivo — The clearer route to getting built",
  description: "Permit help, without the guesswork, for small residential contractors in Mecklenburg County.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
