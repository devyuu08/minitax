"use client";

import { TaxResult } from "@/types/tax";
import styles from "./IncomeBreakdownCard.module.css";
import { FileText } from "lucide-react";

/**
 * IncomeBreakdownCard
 * - 세금 계산 결과 중 '소득 내역'을 보여주는 카드 UI 컴포넌트
 * - 연간 총소득, 필요경비, 기본공제를 시각적으로 분리하여 표시
 * - 마지막에는 과세표준(과세 대상 소득) 요약 정보를 강조하여 출력
 */

type Props = {
  result: TaxResult;
};

export default function IncomeBreakdownCard({ result }: Props) {
  return (
    <article
      className={styles.card}
      role="region"
      aria-labelledby="income-breakdown-heading"
    >
      {/* 카드 상단 헤더 – 아이콘 + 제목 + 부제목 */}
      <header className={styles.header}>
        <div className={`${styles.iconBox} ${styles.blue}`}>
          <FileText size={20} />
        </div>
        <div>
          <h2 id="income-breakdown-heading" className={styles.title}>
            소득 내역
          </h2>
          <p className={styles.subtitle}>수입과 지출 상세</p>
        </div>
      </header>

      <div className={styles.divider} />

      {/* 소득 상세 항목 리스트 – 연간 총소득, 필요경비, 기본공제 */}
      <ul className={styles.list} aria-label="소득 세부 항목">
        <li>
          <span>연간 총소득</span>
          {/* 수입 항목은 양수(+)로 강조 */}
          <span className={styles.income}>
            +{result.income.toLocaleString()}원
          </span>
        </li>
        <li>
          <span>필요경비</span>
          {/* 지출 항목은 음수(-)로 강조 */}
          <span className={styles.expense}>
            -{result.expense.toLocaleString()}원
          </span>
        </li>
        <li>
          <span>기본공제</span>
          <span className={styles.expense}>
            -{result.deduction.toLocaleString()}원
          </span>
        </li>
      </ul>

      {/* 하단 요약 – 실제 과세 기준이 되는 과세표준 표시 */}
      <div className={styles.footer}>
        <span>과세표준</span>
        <span className={styles.taxableIncome}>
          {result.taxableIncome.toLocaleString()}원
        </span>
      </div>
    </article>
  );
}
