"use client";

import { TaxResult } from "@/types/tax";
import styles from "./SummaryCards.module.css";
import { Calculator, DollarSignIcon, SearchCheckIcon } from "lucide-react";

interface SummaryCardProps {
  result: TaxResult;
}

export default function SummaryCards({ result }: SummaryCardProps) {
  if (!result) return null;
  return (
    <section className={styles.wrapper}>
      {/* 총 소득 */}
      <div className={styles.card}>
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
      </div>

      {/* 순소득 */}
      <div className={styles.card}>
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
      </div>

      {/* 예상 세액 */}
      <div className={styles.card}>
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
      </div>
    </section>
  );
}
