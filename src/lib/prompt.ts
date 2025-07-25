import { TaxResult } from "@/types/tax";

export default function getPrompt(
  type: "default" | "saving" | "warning",
  result: TaxResult
): string {
  const {
    income,
    expense,
    taxableIncome,
    deduction,
    taxAmount,
    localTax,
    finalTax,
    effectiveTaxRate,
    appliedRate,
  } = result;

  if (type === "default") {
    return `너는 세무 상담사이며, 세금에 익숙하지 않은 초보자에게 종합소득세 계산 결과를 친절하게 설명해주는 역할을 합니다.

  다음 정보를 바탕으로, 각 수치를 자연스럽게 이어서 설명해 주세요.

  조건은 다음과 같습니다:
  1. ‘연소득은 얼마이고, 필요경비를 뺀 순소득은 얼마이며…’와 같이 말하듯 이어지는   문장을 사용하세요.
  2. 각 문장은 줄바꿈(\n)하여 구분하되, 항목 나열이 아니라 설명의 흐름을 유지해야 합니다.
  3. 금액, 세율 등 중요한 숫자는 <strong>태그</strong>로 감싸 강조해 주세요.
  4. 마지막 문장에는 다음 문구를 꼭 포함해 주세요:  
    “실제 납부액은 건강보험료, 국민연금, 주민세 등 추가 항목에 따라 달라질 수 있습니다.”

  예시 톤:
  귀하의 연소득은 <strong>30,000,000원</strong>이며, 여기에 필요경비 <strong>7,000,000원</strong>을 제외한 순소득은 <strong>23,000,000원</strong>입니다.
  과세표준은 기본공제 150만원을 제하고 <strong>21,500,000원</strong>으로 계산되며, 해당 구간에는 실효세율 <strong>9.40%</strong>가 적용됩니다.
  이로 인해 산출된 소득세는 <strong>1,965,000원</strong>, 여기에 지방소득세 <strong>196,500원</strong>이 더해져 총 예상 세액은 <strong>2,161,500원</strong>입니다.
  실제 납부액은 건강보험료, 국민연금, 주민세 등 추가 항목에 따라 달라질 수 있습니다.
  다음 정보를 바탕으로 설명해 주세요:

  다음 정보:
  - 연소득: ${income.toLocaleString()}원
  - 필요경비: ${expense.toLocaleString()}원
  - 순소득: ${(income - expense).toLocaleString()}원
  - 과세표준: ${taxableIncome.toLocaleString()}원
  - 적용 세율: ${(appliedRate * 100).toFixed(1)}%
  - 누진공제: ${deduction.toLocaleString()}원
  - 산출세액: ${taxAmount.toLocaleString()}원
  - 지방소득세: ${localTax.toLocaleString()}원
  - 실효세율: ${(effectiveTaxRate * 100).toFixed(2)}%
  - 총 납부세액: ${finalTax.toLocaleString()}원`;
  }

  if (type === "saving") {
    return `사용자의 과세표준은 ${taxableIncome.toLocaleString()}원이고, 실효세율은 약 ${(
      effectiveTaxRate * 100
    ).toFixed(2)}%입니다.  
초보자에게 추천할 수 있는 절세 전략을 2~3가지 소개해 주세요. 
각 전략은 제목 + 설명 형식으로 작성하고, HTML <strong> 태그를 사용해 핵심 숫자 또는 키워드를 강조해 주세요.`;
  }

  if (type === "warning") {
    return `사용자의 과세표준은 ${taxableIncome.toLocaleString()}원이고, 실효세율은 약 ${(
      effectiveTaxRate * 100
    ).toFixed(2)}%입니다.  
종합소득세 신고 시 흔히 실수하는 항목이나 유의해야 할 사항을 초보자 입장에서 조언해 주세요.  
줄글 형식으로 2~3가지 정도 설명하고, <strong> 태그로 중요한 용어나 항목을 강조해 주세요.`;
  }

  throw new Error("잘못된 type입니다.");
}
