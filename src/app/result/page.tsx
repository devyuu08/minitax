import ResultCard from "@/components/result/ResultCard";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <p className={styles.badge}>계산 완료</p>
      <h1 className={styles.title}>세금 계산 결과</h1>
      <p className={styles.sub}>
        (사용자의 입력값)원 소득 기준으로 예상한 세금 결과입니다.
      </p>
      <ResultCard />
    </div>
  );
}
