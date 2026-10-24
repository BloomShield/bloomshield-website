import type { Metadata } from "next";
import "./style.css";
export const metadata: Metadata = { title: "BloomShield | Recruitment workspace", robots: { index:false, follow:false } };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="en-GB"><body><a className="skip" href="#main">Skip to workspace</a>{children}</body></html>; }
