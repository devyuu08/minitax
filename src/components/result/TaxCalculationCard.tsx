import { TaxResult } from "@/types/tax";
import { Calculator } from "lucide-react";
import styles from "./TaxCalculationCard.module.css";

interface Props {
  result: TaxResult;
}

export default function TaxCalculationCard({ result }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <Calculator size={20} />
        </div>
        <div>
          <h3 className={styles.title}>세액 계산</h3>
          <p className={styles.sub}>
            실효세율 {result.effectiveTaxRate.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className={styles.line} />

      <div className={styles.item}>
        <div>
          <span className={styles.label}>소득세</span>
          <span className={styles.badgeBlue}>국세</span>
        </div>
        <span className={styles.value}>
          {result.taxAmount.toLocaleString()}원
        </span>
      </div>

      <div className={styles.item}>
        <div>
          <span className={styles.label}>지방소득세</span>
          <span className={styles.badgeGreen}>지방세</span>
        </div>
        <span className={styles.value}>
          {result.localTax.toLocaleString()}원
        </span>
      </div>

      <div className={styles.totalBox}>
        <span className={styles.totalLabel}>총 납부세액</span>
        <span className={styles.totalAmount}>
          {result.finalTax.toLocaleString()}원
        </span>
      </div>
    </div>
  );
}
