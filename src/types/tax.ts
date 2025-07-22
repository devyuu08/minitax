export interface TaxInput {
  income: number; // 연소득
  expense: number; // 필요경비
}

export interface TaxOutput {
  taxableIncome: number; // 과세표준
  taxAmount: number; // 산출세액
  appliedRate: number; // 적용 세율(%)
  deduction: number; // 누진공제
}

export type TaxResult = TaxInput & TaxOutput;
