"use client";

import styles from "./SkeletonResult.module.css";

export default function SkeletonResult() {
  return (
    <section className={styles.container}>
      {/* SummaryCard 영역 */}
      <div className={styles.flexRow}>
        <div className={styles.cardSkeleton} />
        <div className={styles.cardSkeleton} />
        <div className={styles.cardSkeleton} />
      </div>

      {/* 상세 카드 영역 */}
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
        <div className={styles.buttonRow}>
          <div className={styles.gptButton} />
          <div className={styles.gptButton} />
        </div>
      </div>
    </section>
  );
}
