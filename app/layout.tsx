import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Saurabh Singh Yadav — Full Stack Developer",
  description: "Full Stack MERN Developer | B.Tech Cloud Computing & ML | Production-grade web applications",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
