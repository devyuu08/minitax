import { TaxInput, TaxResult } from "@/types/tax";

/**
 * calculateTax
 * - 사용자가 입력한 연소득(income)과 필요경비(expense)를 기반으로
 *   종합소득세를 간이 방식으로 계산하여 결과를 반환하는 핵심 계산 로직
 *
 * 계산 공식:
 * 1) 과세표준 = 연소득 - 필요경비 - 기본공제(150만원)
 * 2) 세율 구간에 따른 누진세 계산
 * 3) 소득세 계산 = 과세표준 × 세율 - 누진공제
 * 4) 지방소득세 = 소득세의 10%
 * 5) 최종 세금 = 소득세 + 지방소득세
 * 6) 실효세율 = 총 세금 / 연소득 * 100
 *
 * @param income - 연소득 (단위: 원)
 * @param expense - 필요경비 (단위: 원)
 * @returns TaxResult - 세금 계산 결과 객체
 */

export default function calculateTax({ income, expense }: TaxInput): TaxResult {
  const BASIC_DEDUCTION = 1_500_000; // 기본 공제액(150만원)

  // 1. 과세표준 계산 (음수가 되지 않도록 최소 0 처리)
  const taxableIncome = Math.max(0, income - expense - BASIC_DEDUCTION);

  // 초기 세율 및 누진공제값 설정
  let rate = 0.06;
  let deduction = 0;

  // 2. 세율 구간 및 누진공제 설정
  if (taxableIncome <= 14_000_000) {
    rate = 0.06;
    deduction = 0;
  } else if (taxableIncome <= 50_000_000) {
    rate = 0.15;
    deduction = 1_260_000;
  } else if (taxableIncome <= 88_000_000) {
    rate = 0.24;
    deduction = 5_760_000;
  } else if (taxableIncome <= 150_000_000) {
    rate = 0.35;
    deduction = 15_440_000;
  } else if (taxableIncome <= 300_000_000) {
    rate = 0.38;
    deduction = 19_940_000;
  } else if (taxableIncome <= 500_000_000) {
    rate = 0.4;
    deduction = 25_940_000;
  } else if (taxableIncome <= 1_000_000_000) {
    rate = 0.42;
    deduction = 35_940_000;
  } else {
    rate = 0.45;
    deduction = 65_940_000;
  }

  // 3. 종합소득세 계산 (소수점 제거)
  const taxAmount = Math.floor(taxableIncome * rate - deduction);

  // 4. 지방소득세는 소득세의 10%
  const localTax = Math.floor(taxAmount * 0.1);

  // 5. 총 납부세액 = 소득세 + 지방세
  const finalTax = taxAmount + localTax;

  // 6. 실효세율 (%) = 총세금 ÷ 연소득 × 100
  const effectiveTaxRate =
    income > 0 ? Number(((finalTax / income) * 100).toFixed(2)) : 0;

  return {
    income,
    expense,
    taxableIncome,
    taxAmount: Math.max(taxAmount, 0), // 세금은 음수가 되지 않게 처리
    appliedRate: rate,
    deduction,
    localTax,
    finalTax,
    effectiveTaxRate,
  };
}
