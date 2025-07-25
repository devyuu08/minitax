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
  return (
    <div className={styles.gpt_wrapper}>
      <div className={styles.title}>
        {icon}
        <h3>{title}</h3>
      </div>

      {status === "loading" && fallback ? (
        <div className={styles.loading}>
          <Loader2 className={styles.spinner} />
          {fallback}
        </div>
      ) : status === "error" && fallback ? (
        <p className={styles.error}>{fallback}</p>
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
    </div>
  );
}
