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
    <section
      className={styles.container}
      aria-labelledby="result-summary-heading"
    >
      <h2 id="result-summary-heading" className="sr-only">
        세금 계산 상세 결과
      </h2>

      {/* 요약 카드 */}
      <section aria-labelledby="summary-heading">
        <h3 id="summary-heading" className="sr-only">
          세금 요약 정보
        </h3>
        <SummaryCard result={result} />
      </section>

      {/*소득 내역 및 세액 계산 박스*/}
      <div className={styles.flexRow}>
        <section aria-labelledby="income-breakdown-heading">
          <h3 id="income-breakdown-heading" className="sr-only">
            소득 내역
          </h3>
          <IncomeBreakdownCard result={result} />
        </section>

        <section aria-labelledby="tax-calculation-heading">
          <h3 id="tax-calculation-heading" className="sr-only">
            세액 계산
          </h3>
          <TaxCalculationCard result={result} />
        </section>
      </div>

      {/* AI 설명 영역 */}
      <GptSummary result={result} />
    </section>
  );
}
