"use client";

import { TaxResult } from "@/types/tax";
import styles from "./IncomeBreakdownCard.module.css";
import { FileText } from "lucide-react";

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

      <ul className={styles.list} aria-label="소득 세부 항목">
        <li>
          <span>연간 총소득</span>
          <span className={styles.income}>
            +{result.income.toLocaleString()}원
          </span>
        </li>
        <li>
          <span>필요경비</span>
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

      <div className={styles.footer}>
        <span>과세표준</span>
        <span className={styles.taxableIncome}>
          {result.taxableIncome.toLocaleString()}원
        </span>
      </div>
    </article>
  );
}
