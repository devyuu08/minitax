import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import style from "./layout.module.css";
import Header from "@/components/Header";
import { TaxProvider } from "@/context/TaxContext";
import FloatingMenuButton from "@/components/FloatingMenuButton";

export const metadata: Metadata = {
  title: "MiniTax",
  description: "프리랜서/개인사업자를 위한 종합소득세 간이 계산기",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* manifest.json 명시 */}
        <link rel="manifest" href="/manifest.json" />

        {/* Android 테마 색상 */}
        <meta name="theme-color" content="#6366f1" />

        {/* iOS PWA 관련 */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MiniTax" />
        <meta name="application-name" content="MiniTax" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <TaxProvider>
            <Header />
            <div className={style.container}>
              <main>{children}</main>
              <FloatingMenuButton />
              <footer>
                © 2025 MiniTax. 프리랜서를 위한 스마트한 세금 계산기
              </footer>
            </div>
          </TaxProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
