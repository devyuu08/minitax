"use client";

import { TaxResult } from "@/types/tax";
import styles from "./SummaryCards.module.css";
import { Calculator, DollarSignIcon, SearchCheckIcon } from "lucide-react";

// SummaryCards.tsx
// ⎯ 예상 세금 결과를 요약하여 3개의 카드(총소득, 순소득, 예상 세액)로 보여주는 컴포넌트

interface SummaryCardProps {
  result: TaxResult;
}

export default function SummaryCards({ result }: SummaryCardProps) {
  if (!result) return null;
  return (
    <section
      className={styles.wrapper}
      aria-labelledby="summary-cards-heading"
      role="region"
    >
      <h2 id="summary-cards-heading" className="sr-only">
        세금 요약 카드
      </h2>

      {/* 1. 총소득 카드 – 연간 총 수입을 나타냄 */}
      <article className={styles.card} aria-labelledby="total-income-heading">
        <h3 id="total-income-heading" className="sr-only">
          총 소득
        </h3>
        <div className={styles.header}>
          <div className={`${styles.iconBox} ${styles.blue}`}>
            <DollarSignIcon size={24} color="white" />
          </div>
          <div>
            <div className={styles.label}>총 소득</div>
            <div className={styles.sub}>연간 총 수입</div>
          </div>
        </div>
        <div className={styles.amount}>
          {result.income.toLocaleString()}{" "}
          <span className={styles.unit}>원</span>
        </div>
      </article>

      {/* 2. 순소득 카드 – 경비 제외 후 과세 대상 소득 */}
      <article className={styles.card} aria-labelledby="net-income-heading">
        <h3 id="net-income-heading" className="sr-only">
          순소득
        </h3>
        <div className={styles.header}>
          <div className={`${styles.iconBox} ${styles.green}`}>
            <Calculator size={24} color="white" />
          </div>
          <div>
            <div className={styles.label}>순소득</div>
            <div className={styles.sub}>과세 대상 소득</div>
          </div>
        </div>
        <div className={styles.amount}>
          {result.taxableIncome.toLocaleString()}{" "}
          <span className={styles.unit}>원</span>
        </div>
      </article>

      {/* 3. 예상 세액 카드 – 실제 납부해야 할 총 세금 */}
      <article className={styles.card} aria-labelledby="estimated-tax-heading">
        <h3 id="estimated-tax-heading" className="sr-only">
          예상 세액
        </h3>
        <div className={styles.header}>
          <div className={`${styles.iconBox} ${styles.orange}`}>
            <SearchCheckIcon size={24} color="white" />
          </div>
          <div>
            <div className={styles.label}>예상 세액</div>
            <div className={styles.sub}>총 납부 금액</div>
          </div>
        </div>
        <div className={styles.amount}>
          <span className={styles.orangeText}>
            {result.taxAmount.toLocaleString()}
          </span>
          <span className={styles.unit}> 원</span>
        </div>
      </article>
    </section>
  );
}
