// 종합소득세 결과 페이지 컴포넌트
// - 페이지 메타데이터 정의
// - 실제 UI는 클라이언트 컴포넌트인 ResultClient에서 처리됨

import ResultClient from "@/components/result/ResultClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MiniTax – 종합소득세 계산 결과",
  description:
    "입력한 연소득과 필요경비를 기준으로 계산된 종합소득세 예상 결과를 확인하세요. AI가 세금 구조도 쉽게 설명해드립니다.",
  openGraph: {
    title: "MiniTax – 종합소득세 계산 결과",
    description:
      "입력한 연소득과 필요경비를 기준으로 계산된 종합소득세 예상 결과를 확인하세요. AI가 세금 구조도 쉽게 설명해드립니다.",
    images: ["/thumbnail.png"],
    siteName: "MiniTax",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniTax – 종합소득세 계산기",
    description: "AI가 쉽고 빠르게 설명해주는 프리랜서 전용 세금 계산기",
    images: ["/thumbnail.png"],
  },
};

export default function Page() {
  return <ResultClient />;
}
