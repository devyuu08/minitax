import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";

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
          <main>{children}</main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
