"use client";

import { Lock, ShieldCheck } from "lucide-react";
import styles from "./CalculatorForm.module.css";
import { useEffect, useState } from "react";
import { useTaxContext } from "@/context/TaxContext";
import { useRouter } from "next/navigation";
import calculateTax from "@/lib/calculateTax";

export default function CalculatorForm() {
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [isActive, setIsActive] = useState(false);

  const { setResult } = useTaxContext();
  const router = useRouter();

  useEffect(() => {
    const parsedIncome = parseInt(income, 10);
    const parsedExpense = parseInt(expense, 10);

    if (
      !isNaN(parsedIncome) &&
      parsedIncome > 0 &&
      !isNaN(parsedExpense) &&
      parsedExpense >= 0
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [income, expense]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const incomeValue = parseInt(income, 10);
    const expenseValue = parseInt(expense, 10);

    if (isNaN(incomeValue) || isNaN(expenseValue)) return;

    const result = calculateTax({ income: incomeValue, expense: expenseValue });

    setResult(result);
    router.push("/result");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 상단 제목 영역 */}
        <div className={styles.formHeader}>
          <div className={styles.iconWrapper}>
            {/* 계산기 이미지 아이콘 넣기 */}
          </div>
          <h2 className={styles.formTitle}>소득 정보 입력</h2>
          <p className={styles.formSubtitle}>
            간단한 정보만 입력하면 바로 계산됩니다
          </p>
        </div>

        {/* 연소득 입력 */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <span className={styles.greenDot} />
            <label htmlFor="income">연소득(세전)</label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="number"
              id="income"
              name="income"
              inputMode="numeric"
              placeholder="50,000,000"
              min={0}
              onChange={(e) => setIncome(e.target.value)}
              required
            />
            <span className={styles.inputSuffix}>원</span>
          </div>
          <p>사업소득, 프리랜서 수입 등 모든 소득 포함</p>
        </div>

        {/* 필요경비 입력 */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <span className={styles.yellowDot} />
            <label htmlFor="expense">필요경비</label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="number"
              id="expense"
              name="expense"
              inputMode="numeric"
              placeholder="10,000,000"
              min={0}
              onChange={(e) => setExpense(e.target.value)}
              required
            />
            <span className={styles.inputSuffix}>원</span>
          </div>
          <p>사업 관련 지출, 재료비, 임차료 등</p>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className={`${styles.submit} ${!isActive ? styles.disabled : ""}`}
          disabled={!isActive}
        >
          {!isActive ? (
            <>
              <Lock size={16} />
              정보를 입력해주세요
            </>
          ) : (
            "세금 계산하기"
          )}
        </button>
      </form>

      {/* 하단 안내 박스 */}
      <section className={styles.noticeBox}>
        <div className={styles.noticeHeader}>
          <ShieldCheck size={20} color="#2563eb" />
          <h3>계산 방식 안내</h3>
        </div>
        <p>
          이 계산기는 2024년 세율 기준으로 간이 계산된 결과입니다. 실제 세액은
          각종 공제와 감면에 따라 달라질 수 있으니, 정확한 신고를 위해서는
          세무사와 상담하시기 바랍니다.
        </p>
      </section>
    </div>
  );
}
