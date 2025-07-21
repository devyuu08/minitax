"use client";

import { useTaxContext } from "@/context/TaxContext";
import styles from "./ResultCard.module.css";

export default function ResultCard() {
  const { result } = useTaxContext();

  if (!result) {
    return <p>계산 결과가 없습니다. 홈으로 돌아가 다시 입력해주세요.</p>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <span className={styles.label}>과세표준</span>
        <span>{result.taxableIncome.toLocaleString()} 원</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>적용 세율</span>
        <span>{(result.appliedRate * 100).toFixed(0)}%</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>누진공제</span>
        <span>{result.deduction.toLocaleString()} 원</span>
      </div>
      <div className={styles.rowTotal}>
        <span className={styles.label}>예상 세금</span>
        <span className={styles.amount}>
          {result.taxAmount.toLocaleString()} 원
        </span>
      </div>
    </div>
  );
}
