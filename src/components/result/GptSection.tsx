"use client";

import { Loader2 } from "lucide-react";
import styles from "./GptSection.module.css";

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
  const sectionId = `gpt-section-title-${title
    .replace(/\s/g, "")
    .toLowerCase()}`;

  return (
    <section
      className={styles.gpt_wrapper}
      role="region"
      aria-labelledby={sectionId}
    >
      <div className={styles.title}>
        {icon}
        <h3 id={sectionId}>{title}</h3>
      </div>

      {status === "loading" && fallback ? (
        <div className={styles.loading} aria-live="polite">
          <Loader2 className={styles.spinner} />
          {fallback}
        </div>
      ) : status === "error" && fallback ? (
        <p className={styles.error} aria-live="polite">
          {fallback}
        </p>
      ) : content ? (
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
