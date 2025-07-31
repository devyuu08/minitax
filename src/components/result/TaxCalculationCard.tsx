import { TaxResult } from "@/types/tax";
import { Calculator } from "lucide-react";
import styles from "./TaxCalculationCard.module.css";

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

      <ul className={styles.list} aria-label="세액 계산 항목">
        <li>
          <div>
            <span className={styles.label}>소득세</span>
            <span className={styles.badgeBlue}>국세</span>
          </div>
          <span className={styles.value}>
            {result.taxAmount.toLocaleString()}원
          </span>
        </li>
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

      <div className={styles.totalBox}>
        <span className={styles.totalLabel}>총 납부세액</span>
        <span className={styles.totalAmount}>
          {result.finalTax.toLocaleString()}원
        </span>
      </div>
    </article>
  );
}
