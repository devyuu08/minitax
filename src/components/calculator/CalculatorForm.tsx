"use client";

import { Lock, ScanLine, ShieldCheck } from "lucide-react";
import styles from "./CalculatorForm.module.css";
import { useEffect, useRef, useState } from "react";
import { useTaxContext } from "@/context/TaxContext";
import { useRouter } from "next/navigation";
import calculateTax from "@/lib/calculateTax";

export default function CalculatorForm() {
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [isActive, setIsActive] = useState(false);

  const incomeRef = useRef<HTMLInputElement | null>(null);

  const { setResult } = useTaxContext();
  const router = useRouter();

  useEffect(() => {
    incomeRef.current?.focus();
  }, []);

  useEffect(() => {
    const parsedIncome = parseInt(income.replace(/,/g, ""), 10);
    const parsedExpense = parseInt(expense.replace(/,/g, ""), 10);

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

  const formatNumber = (value: string) => {
    const number = value.replace(/[^0-9]/g, "");
    return number ? Number(number).toLocaleString() : "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const incomeValue = parseInt(income.replace(/,/g, ""), 10);
    const expenseValue = parseInt(expense.replace(/,/g, ""), 10);

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
            <ScanLine size={28} color="#fff" />
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
              ref={incomeRef}
              type="text"
              id="income"
              name="income"
              value={income}
              inputMode="numeric"
              placeholder="50,000,000"
              min={0}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setIncome(formatNumber(raw));
              }}
              aria-describedby="incomeDesc"
              required
            />
            <span className={styles.inputSuffix}>원</span>
          </div>
          <p id="incomeDesc">사업소득, 프리랜서 수입 등 모든 소득 포함</p>
        </div>

        {/* 필요경비 입력 */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <span className={styles.yellowDot} />
            <label htmlFor="expense">필요경비</label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="expense"
              name="expense"
              value={expense}
              inputMode="numeric"
              placeholder="10,000,000"
              min={0}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setExpense(formatNumber(raw));
              }}
              aria-describedby="expenseDesc"
              required
            />
            <span className={styles.inputSuffix} aria-hidden="true">
              원
            </span>
          </div>
          <p id="expenseDesc"> 사업 관련 지출, 재료비, 임차료 등</p>
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
      <section className={styles.noticeBox} aria-labelledby="notice-heading">
        <div className={styles.noticeHeader}>
          <ShieldCheck size={20} color="#2563eb" aria-hidden="true" />
          <h3 id="notice-heading">계산 방식 안내</h3>
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
