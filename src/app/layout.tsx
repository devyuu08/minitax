import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import style from "./layout.module.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "MiniTax",
  description: "프리랜서/개인사업자를 위한 종합소득세 간이 계산기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Header />
          <div className={style.container}>
            <main>{children}</main>
            <footer>
              © 2025 MiniTax. 프리랜서를 위한 스마트한 세금 계산기
            </footer>
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
