import { TaxResult } from "@/types/tax";
import { Calculator } from "lucide-react";
import styles from "./TaxCalculationCard.module.css";

/**
 * TaxCalculationCard
 * - 세액 계산 결과 카드 UI
 * - 소득세, 지방세, 총 납부세액을 항목별로 표시
 * - 실효세율을 함께 보여 사용자 이해도 향상
 */

interface Props {
  result: TaxResult;
}

export default function TaxCalculationCard({ result }: Props) {
  return (
    <article
      className={styles.card}
      aria-labelledby="tax-calculation-heading"
      role="region"
    >
      {/* 상단 헤더 영역: 아이콘 + 타이틀 + 부제목 */}
      <header className={styles.header}>
        <div className={styles.icon}>
          <Calculator size={20} />
        </div>
        <div>
          <h2 id="tax-calculation-heading" className={styles.title}>
            세액 계산
          </h2>
          <p className={styles.sub}>
            실효세율 {result.effectiveTaxRate.toFixed(2)}%
          </p>
        </div>
      </header>

      <div className={styles.line} />

      {/* 세금 항목 리스트: 국세와 지방세 */}
      <ul className={styles.list} aria-label="세액 계산 항목">
        {/* 항목 1: 소득세 (국세) */}
        <li>
          <div>
            <span className={styles.label}>소득세</span>
            <span className={styles.badgeBlue}>국세</span>
          </div>
          <span className={styles.value}>
            {result.taxAmount.toLocaleString()}원
          </span>
        </li>

        {/* 항목 2: 지방소득세 (지방세) */}
        <li>
          <div>
            <span className={styles.label}>지방소득세</span>
            <span className={styles.badgeGreen}>지방세</span>
          </div>
          <span className={styles.value}>
            {result.localTax.toLocaleString()}원
          </span>
        </li>
      </ul>

      {/* 총 세액 박스: 소득세 + 지방소득세 합산 결과 */}
      <div className={styles.totalBox}>
        <span className={styles.totalLabel}>총 납부세액</span>
        <span className={styles.totalAmount}>
          {result.finalTax.toLocaleString()}원
        </span>
      </div>
    </article>
  );
}
