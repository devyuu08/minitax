// lib/__tests__/calculateTax.test.ts
import calculateTax, { TaxInput } from "../calculateTax";

describe("calculateTax()", () => {
  it("1. 6% 구간 (14,000,000 이하)", () => {
    const input: TaxInput = { income: 20_000_000, expense: 4_500_000 };
    const result = calculateTax(input);

    expect(result.taxableIncome).toBe(14_000_000);
    expect(result.appliedRate).toBe(0.06);
    expect(result.deduction).toBe(0);
    expect(result.taxAmount).toBe(840_000);
  });

  it("2. 15% 구간 (14,000,000 초과 ~ 50,000,000 이하)", () => {
    const input: TaxInput = { income: 60_000_000, expense: 9_500_000 };
    const result = calculateTax(input);
    const taxable = 60_000_000 - 9_500_000 - 1_500_000;
    const expected = Math.floor(taxable * 0.15 - 1_260_000);

    expect(result.taxableIncome).toBe(taxable);
    expect(result.appliedRate).toBe(0.15);
    expect(result.deduction).toBe(1_260_000);
    expect(result.taxAmount).toBe(expected);
  });

  it("3. 24% 구간 (50,000,000 초과 ~ 88,000,000 이하)", () => {
    const input: TaxInput = { income: 90_000_000, expense: 5_000_000 };
    const taxable = 90_000_000 - 5_000_000 - 1_500_000;
    const expected = Math.floor(taxable * 0.24 - 5_760_000);
    const result = calculateTax(input);

    expect(result.taxableIncome).toBe(taxable);
    expect(result.appliedRate).toBe(0.24);
    expect(result.deduction).toBe(5_760_000);
    expect(result.taxAmount).toBe(expected);
  });

  it("4. 35% 구간 (88,000,000 초과 ~ 150,000,000 이하)", () => {
    const input: TaxInput = { income: 160_000_000, expense: 10_000_000 };
    const taxable = 160_000_000 - 10_000_000 - 1_500_000;
    const expected = Math.floor(taxable * 0.35 - 15_440_000);
    const result = calculateTax(input);

    expect(result.taxableIncome).toBe(taxable);
    expect(result.appliedRate).toBe(0.35);
    expect(result.deduction).toBe(15_440_000);
    expect(result.taxAmount).toBe(expected);
  });

  it("5. 최고 구간 (10억 초과, 45%)", () => {
    const input: TaxInput = { income: 1_200_000_000, expense: 50_000_000 };
    const taxable = 1_200_000_000 - 50_000_000 - 1_500_000;
    const expected = Math.floor(taxable * 0.45 - 65_940_000);
    const result = calculateTax(input);

    expect(result.taxableIncome).toBe(taxable);
    expect(result.appliedRate).toBe(0.45);
    expect(result.deduction).toBe(65_940_000);
    expect(result.taxAmount).toBe(expected);
  });

  it("6. 과세표준이 0 미만이면 세금은 0", () => {
    const input: TaxInput = { income: 1_000_000, expense: 1_000_000 };
    const result = calculateTax(input);

    expect(result.taxableIncome).toBe(0);
    expect(result.taxAmount).toBe(0);
    expect(result.appliedRate).toBe(0.06);
  });
});
