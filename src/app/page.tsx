import Link from "next/link";
import styles from "./page.module.css";
import { Bot, Calculator, Lightbulb } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MiniTax – 프리랜서를 위한 종합소득세 계산기",
  description:
    "MiniTax는 연소득과 필요경비만 입력하면 세금 계산과 AI 설명을 제공하는 종합소득세 계산기입니다.",
  openGraph: {
    title: "MiniTax – 프리랜서를 위한 종합소득세 계산기",
    description:
      "MiniTax는 연소득과 필요경비만 입력하면 세금 계산과 AI 설명을 제공하는 종합소득세 계산기입니다.",
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

export default function Home() {
  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <header className={styles.headerSection} role="banner">
        <h1>MiniTax</h1>

        <div className={styles.divider} />

        <p className={styles.subtitle}>
          프리랜서도 쉽게 이해하는 <br /> 종합소득세 계산기
        </p>
        <p className={styles.description}>
          복잡한 세법. 이제 고민하지 마세요. 연소득과 필요경비만 입력하면 AI가
          세금을 <br /> 계산하고 쉽게 설명해드립니다.
        </p>
      </header>
      <Link
        href="/calculator"
        className={styles.calculator_Btn}
        aria-label="종합소득세 계산기 시작하기"
      >
        지금 계산 시작하기
      </Link>

      {/* Feature Section */}
      <section className={styles.featureList}>
        <div className={styles.featureItem}>
          <div className={`${styles.iconBox} ${styles.blue}`}>
            <Calculator color="#6366f1" />
          </div>
          <h2>간단한 계산</h2>
          <p>연소득과 필요경비만 입력하면 자동으로 세금을 계산해드립니다.</p>
        </div>
        <div className={styles.featureItem}>
          <div className={`${styles.iconBox} ${styles.green}`}>
            <Bot color="#10b981" />
          </div>
          <h2>AI 설명</h2>
          <p>복잡한 세법을 AI가 쉽고 친근한 언어로 설명해드립니다.</p>
        </div>
        <div className={styles.featureItem}>
          <div className={`${styles.iconBox} ${styles.purple}`}>
            <Lightbulb color="#a855f7" />
          </div>
          <h2>절세 전략</h2>
          <p>개인 상황에 맞는 절세 방법과 신고 유의사항을 제공합니다.</p>
        </div>
      </section>
    </main>
  );
}
