export interface TaxInput {
  income: number; // 연소득
  expense: number; // 필요경비
}

export interface TaxResult {
  taxableIncome: number; // 과세표준
  taxAmount: number; // 산출세액
  appliedRate: number; // 적용 세율(%)
  deduction: number; // 누진공제
}

export default function calculateTax({ income, expense }: TaxInput): TaxResult {
  const BASIC_DEDUCTION = 1_500_000; // 기본 공제액(150만원)

  const taxableIncome = Math.max(0, income - expense - BASIC_DEDUCTION);

  let rate = 0.06;
  let deduction = 0;

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

  const taxAmount = Math.floor(taxableIncome * rate - deduction);

  return {
    taxableIncome,
    taxAmount: Math.max(taxAmount, 0),
    appliedRate: rate,
    deduction,
  };
}
