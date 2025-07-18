import styles from "./page.module.css";
import { ShieldCheck, Bot, Lock } from "lucide-react";
import CalculatorForm from "@/components/CalculatorForm";

export default function Page() {
  return (
    <div className={styles.container}>
      <section className={styles.headerSection}>
        <h2 className={styles.subTitle}>MiniTax</h2>
        <div className={styles.badge}>
          <span className={styles.greenDot} />
          2024년 세율 기준 · 실시간 계산
        </div>
        <h1 className={styles.title}>종합소득세 계산기</h1>
        <p className={styles.description}>
          프리랜서와 개인사업자를 위한 스마트한 세금 계산
          <br />
          복잡한 세법도 이제 간단하게
        </p>

        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <ShieldCheck size={16} color="#10b981" />
            정확한 계산
          </div>
          <div className={styles.featureItem}>
            <Bot size={16} color="#6366f1" />
            AI 설명
          </div>
          <div className={styles.featureItem}>
            <Lock size={16} color="#a78bfa" />
            개인정보 보호
          </div>
        </div>
      </section>
      <CalculatorForm />
    </div>
  );
}
