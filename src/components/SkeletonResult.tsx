"use client";

import styles from "./SkeletonResult.module.css";

/**
 * SkeletonResult
 * - 결과 페이지에서 데이터를 불러오는 동안 표시되는 로딩 스켈레톤 UI
 * - SummaryCard / 상세 카드 / GPT 요약 영역을 모두 스켈레톤으로 구성
 */

export default function SkeletonResult() {
  return (
    <section className={styles.container}>
      {/* SummaryCard 영역 (3개 카드 스켈레톤) */}
      <div className={styles.flexRow}>
        <div className={styles.cardSkeleton} />
        <div className={styles.cardSkeleton} />
        <div className={styles.cardSkeleton} />
      </div>

      {/* 상세 카드 영역 (소득 내역 + 세액 계산 스켈레톤) */}
      <div className={styles.flexRow}>
        <div className={styles.detailSkeleton} />
        <div className={styles.detailSkeleton} />
      </div>

      {/* GPT 요약 카드 영역 */}
      <div className={styles.gptCard}>
        <div className={styles.gptHeaderSkeleton} />
        <div className={styles.gptLine} />
        <div className={styles.gptLine} />
        <div className={styles.gptLine} />

        {/* 버튼 2개 스켈레톤 */}
        <div className={styles.buttonRow}>
          <div className={styles.gptButton} />
          <div className={styles.gptButton} />
        </div>
      </div>
    </section>
  );
}
