"use client";

import { ShieldCheck } from "lucide-react";
import styles from "./CalculatorForm.module.css";

export default function CalculatorForm() {
  return (
    <>
      <form className={styles.form}>
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
          <label htmlFor="income">연소득(세전)</label>
          <input
            type="number"
            id="income"
            name="income"
            inputMode="numeric"
            placeholder="50,000,000"
            min={0}
            required
          />
          원
          <p className={styles.helperText}>
            사업소득, 프리랜서 수입 등 모든 소득 포함
          </p>
        </div>

        {/* 필요경비 입력 */}
        <div className={styles.field}>
          <label htmlFor="expense">필요경비</label>
          <input
            type="number"
            id="expense"
            name="expense"
            inputMode="numeric"
            placeholder="10,000,000"
            min={0}
            required
          />
          원
          <p className={styles.helperText}>사업 관련 지출, 재료비, 임차료 등</p>
        </div>

        {/* 제출 버튼 */}
        <button type="submit" className={styles.submit}>
          계산하기
        </button>
      </form>

      {/* 하단 안내 박스 */}
      <section className={styles.noticeBox}>
        <div className={styles.noticeTitle}>
          <ShieldCheck size={16} color="#3b82f6" />
          <span>안전하고 정확한 계산</span>
        </div>
        <ul className={styles.noticeList}>
          <li>2024년 최신 세율표 적용</li>
          <li>입력 정보는 저장되지 않음</li>
          <li>국세청 공식 계산 방식 사용</li>
        </ul>
      </section>
    </>
  );
}
