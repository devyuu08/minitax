"use client";

import { useTaxContext } from "@/context/TaxContext";
import ResultCard from "@/components/result/ResultCard";
import styles from "./ResultClient.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import SkeletonResult from "@/components/SkeletonResult";

/**
 * ResultClient
 * - 계산 결과 페이지의 클라이언트 컴포넌트
 * - Context에서 계산 결과를 가져와 화면에 표시
 * - 로딩 상태 처리 및 결과가 없을 경우 예외 메시지 출력
 */
export default function ResultClient() {
  const { result } = useTaxContext();
  const [isLoading, setIsLoading] = useState(true); // Skeleton UI 표시용 로딩 상태

  // 페이지 로딩 후 1.2초 후 로딩 종료 (UX 목적: 스켈레톤 유지 시간 보장)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  // 예외 처리: 계산 결과가 없을 경우 에러 메시지 표시
  if (!result) {
    return (
      <div className={styles.errorCard} role="alert" aria-live="assertive">
        <h2>앗, 이런!</h2>
        <p>
          결과를 불러오는 데 문제가 발생했어요. <br />
          홈으로 돌아가 다시 시도해 주세요.
        </p>
        <Link
          href="/"
          className={styles.backButton}
          role="button"
          aria-label="홈으로 돌아가기"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        {/* 상단 영역: 다시 계산하기 버튼 */}
        <Link
          href="/calculator"
          className={styles.recalculateButton}
          role="button"
          aria-label="다시 계산하기"
        >
          다시 계산하기
        </Link>
      </div>
      <p className={styles.badge} aria-live="polite">
        계산 완료
      </p>

      {/* 제목 및 설명 텍스트 */}
      <h1 className={styles.title}>세금 계산 결과</h1>
      <p className={styles.sub}>
        {result.income.toLocaleString()}원 소득 기준으로 예상한 세금 결과입니다.
      </p>

      {/* 조건부 렌더링: 로딩 중이면 Skeleton, 완료되면 ResultCard */}
      {result && isLoading ? (
        <SkeletonResult />
      ) : (
        <ResultCard result={result} />
      )}
    </div>
  );
}
