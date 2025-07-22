export interface TaxInput {
  income: number; // 연소득
  expense: number; // 필요경비
}

export interface TaxOutput {
  taxableIncome: number; // 과세표준
  taxAmount: number; // 산출세액
  appliedRate: number; // 적용 세율(%)
  deduction: number; // 누진공제
  localTax: number; // 지방소득세 (보통 소득세의 10%)
  effectiveTaxRate: number; // 실효세율 (총세금 / 소득 * 100)
  finalTax: number; // 총 납부세액 (소득세 + 지방세)
}

export type TaxResult = TaxInput & TaxOutput;
