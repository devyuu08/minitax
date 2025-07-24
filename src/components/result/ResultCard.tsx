"use client";

import { TaxResult } from "@/types/tax";
import styles from "./ResultCard.module.css";
import SummaryCard from "./SummaryCards";
import IncomeBreakdownCard from "./IncomeBreakdownCard";
import TaxCalculationCard from "./TaxCalculationCard";
import GptSummary from "./GptSummary";

interface ResultCardProps {
  result: TaxResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <section className={styles.container}>
      <SummaryCard result={result} />

      {/*소득 내역 및 세액 계산 박스*/}
      <div className={styles.flexRow}>
        <IncomeBreakdownCard result={result} />
        <TaxCalculationCard result={result} />
      </div>

      {/*AI 설명 박스*/}
      <GptSummary result={result} />
    </section>
  );
}
