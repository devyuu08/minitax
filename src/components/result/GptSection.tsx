"use client";

import { Loader2 } from "lucide-react";
import styles from "./GptSection.module.css";

/**
 * GptSection 컴포넌트
 * - GPT API로부터 받은 설명 결과를 보여주는 섹션 UI
 * - 로딩, 에러, 성공 상태에 따라 다르게 렌더링
 * - 시멘틱 마크업(aria, role) 적용으로 접근성 향상
 *
 * @param icon - 섹션을 대표하는 아이콘 요소
 * @param title - 섹션 제목 텍스트
 * @param content - GPT가 반환한 설명 결과 (줄바꿈 단위로 <li>로 분할 렌더링)
 * @param status - 현재 상태: 'loading' | 'error' | null
 * @param fallback - 로딩/에러 상태일 때 사용자에게 보여줄 대체 문구
 */

interface GptSectionProps {
  icon: React.ReactNode;
  title: string;
  content: string | null;
  status?: "loading" | "error" | null;
  fallback?: string;
}

export default function GptSection({
  icon,
  title,
  content,
  status = null,
  fallback,
}: GptSectionProps) {
  // 접근성용 ID 생성 (공백 제거 + 소문자 처리)
  const sectionId = `gpt-section-title-${title
    .replace(/\s/g, "")
    .toLowerCase()}`;

  return (
    <section
      className={styles.gpt_wrapper}
      role="region"
      aria-labelledby={sectionId}
    >
      {/* 제목 + 아이콘 */}
      <div className={styles.title}>
        {icon}
        <h3 id={sectionId}>{title}</h3>
      </div>

      {/* 로딩 상태 */}
      {status === "loading" && fallback ? (
        <div className={styles.loading} aria-live="polite">
          <Loader2 className={styles.spinner} />
          {fallback}
        </div>
      ) : // 에러 상태
      status === "error" && fallback ? (
        <p className={styles.error} aria-live="polite">
          {fallback}
        </p>
      ) : // 정상 데이터 렌더링 (줄바꿈 기준 <li> 분할)
      content ? (
        <ul className={styles.list}>
          {content
            .split("\n")
            .filter((line) => line.trim() !== "")
            .map((line, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: line }} />
            ))}
        </ul>
      ) : null}
    </section>
  );
}
