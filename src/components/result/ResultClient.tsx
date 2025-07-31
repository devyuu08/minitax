"use client";

import { useTaxContext } from "@/context/TaxContext";
import ResultCard from "@/components/result/ResultCard";
import styles from "./ResultClient.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import SkeletonResult from "@/components/SkeletonResult";

export default function ResultClient() {
  const { result } = useTaxContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  if (!result) {
    return (
      <div className={styles.errorCard}>
        <h2>앗, 이런!</h2>
        <p>
          결과를 불러오는 데 문제가 발생했어요. <br />
          홈으로 돌아가 다시 시도해 주세요.
        </p>
        <Link href="/" className={styles.backButton}>
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/calculator" className={styles.recalculateButton}>
          다시 계산하기
        </Link>
      </div>
      <p className={styles.badge}>계산 완료</p>
      <h1 className={styles.title}>세금 계산 결과</h1>
      <p className={styles.sub}>
        {result.income.toLocaleString()}원 소득 기준으로 예상한 세금 결과입니다.
      </p>
      {result && isLoading ? (
        <SkeletonResult />
      ) : (
        <ResultCard result={result} />
      )}
    </div>
  );
}
