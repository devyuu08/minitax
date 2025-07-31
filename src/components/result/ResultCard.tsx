"use client";

import { TaxResult } from "@/types/tax";
import styles from "./ResultCard.module.css";
import SummaryCard from "./SummaryCards";
import IncomeBreakdownCard from "./IncomeBreakdownCard";
import TaxCalculationCard from "./TaxCalculationCard";
import GptSummary from "./GptSummary";

// props 타입 정의 – 세금 계산 결과 객체 전달
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

      {/* 1. 요약 카드 영역 */}
      <section aria-labelledby="summary-heading">
        <h3 id="summary-heading" className="sr-only">
          세금 요약 정보
        </h3>
        <SummaryCard result={result} />
      </section>

      {/* 2. 소득 내역 및 세액 계산 카드 그룹 */}
      <div className={styles.flexRow}>
        {/* 2-1. 소득 내역 카드 */}
        <section aria-labelledby="income-breakdown-heading">
          <h3 id="income-breakdown-heading" className="sr-only">
            소득 내역
          </h3>

          {/* 원천소득, 과세표준 등 수치 분해 */}
          <IncomeBreakdownCard result={result} />
        </section>

        {/* 2-2. 세액 계산 카드 */}
        <section aria-labelledby="tax-calculation-heading">
          <h3 id="tax-calculation-heading" className="sr-only">
            세액 계산
          </h3>

          {/* 종합소득세, 지방소득세 */}
          <TaxCalculationCard result={result} />
        </section>
      </div>

      {/* 3. AI 요약 설명 영역 */}
      {/* OpenAI API를 통해 결과 해석을 자연어로 제공 */}
      <GptSummary result={result} />
    </section>
  );
}
