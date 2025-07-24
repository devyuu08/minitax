"use client";

import { useEffect, useState } from "react";
import styles from "./GptSummary.module.css";
import { Bot, Loader2, MessageCircle } from "lucide-react";

const mockSummary = [
  "귀하의 <strong>연소득은 50,000,000원</strong>이고, <strong>필요경비는 10,000,000원</strong>으로 계산되었습니다.",
  "<strong>순소득 40,000,000원</strong>에서 기본공제 126만원을 제외한 <strong>과세표준은 38,500,000원</strong>입니다.",
  "이 구간에는 <strong>실효세율 9.93%</strong>가 적용되어 <strong>소득세 4,515,000원</strong>이 산출됩니다.",
  "여기에 <strong>지방소득세 451,500원</strong>을 합쳐 <strong>총 납부 예상 세액은 4,966,500원</strong>입니다.",
  "실제 납부액은 건강보험료, 국민연금, 주민세 등 추가 항목에 따라 달라질 수 있습니다.",
];

export default function GptSummary() {
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    setSummary(mockSummary.join("\n"));
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.iconBox}>
            <Bot size={24} color="white" />
          </div>
          <div className={styles.textGroup}>
            <h1>MiniTax가 쉽게 알려드릴게요</h1>
            <p>복잡한 세금 계산을 한눈에 이해해보세요</p>
          </div>
        </div>

        <button className={styles.resetButton}>
          <Loader2 size={14} />
          다시 설명
        </button>
      </div>

      <div className={styles.label}>📉 표준세율 구간에 해당합니다</div>

      <div className={styles.gpt_wrapper}>
        <div className={styles.title}>
          <MessageCircle size={20} />
          <h3>MiniTax 요약 설명</h3>
        </div>

        <ul className={styles.list}>
          {summary?.split("\n").map((line, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: line }} />
          ))}
        </ul>
      </div>
    </section>
  );
}
