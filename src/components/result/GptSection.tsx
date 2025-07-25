"use client";

import styles from "./GptSection.module.css";

interface GptSectionProps {
  icon: React.ReactNode;
  title: string;
  content: string | null;
}

export default function GptSection({ icon, title, content }: GptSectionProps) {
  if (!content) return null;

  return (
    <div className={styles.gpt_wrapper}>
      <div className={styles.title}>
        {icon}
        <h3>{title}</h3>
      </div>
      <ul className={styles.list}>
        {content
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: line }} />
          ))}
      </ul>
    </div>
  );
}
