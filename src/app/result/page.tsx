import ResultCard from "@/components/ResultCard";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>예상 세금 결과</h1>
      <ResultCard />;
    </div>
  );
}
