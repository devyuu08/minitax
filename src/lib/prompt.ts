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
    return `
      당신은 세무 상담사이며, 세금에 대해 잘 모르는 초보자에게 절세 전략을 설명하는 역할입니다.

      다음 사용자의 세금 정보를 참고하여 해당 세율 구간에 적합한 절세 전략 3가지를 초보자도 이해할 수 있도록 설명해주세요.

      조건:
      1. 각 전략은 말하듯 이어지는 문장을 사용하세요.
      2. **번호를 매기거나 하이픈을 사용하지 마세요.**
      3. <strong>태그</strong>를 활용해 중요한 숫자나 용어를 강조합니다.
      3. 너무 전문적인 말 대신 쉬운 표현을 사용하세요.
      4. 불필요한 인사말이나 서론 없이 바로 핵심 전략을 구체적으로 설명해주세요.
      5. 예시 형식으로 작성해주세요.

      사용자 정보:
      - 과세표준: <strong>${taxableIncome.toLocaleString()}원</strong>
      - 실효세율: <strong>${(effectiveTaxRate * 100).toFixed(2)}%</strong>
      - 적용세율 구간: <strong>${(appliedRate * 100).toFixed(0)}%</strong>

      예시:
      사업과 관련된 지출은 모두 <strong>필요경비</strong>로 처리할 수 있습니다. 예를 들어, 업무용 전화비, 교통비, 사무용품 구입비 등이 이에 해당하며, 이 지출 내역을 빠짐없이 정리하면 과세표준을 낮출 수 있습니다.  
      간편장부를 활용하면 복잡한 장부 작성 없이도 수입과 지출을 체계적으로 기록할 수 있어, <strong>추계신고</strong>보다 유리한 절세 효과를 볼 수 있습니다.  
      <strong>노란우산공제</strong>에 가입하면 연간 최대 <strong>500만 원</strong>까지 필요경비와 별도로 소득공제가 가능해, 종합소득세 부담을 줄이는 데 도움이 됩니다.
      `;
  }

  if (type === "warning") {
    return `당신은 세무 상담사이며, 종합소득세 신고가 처음인 사용자에게 현실적인 유의사항을 안내하는 역할을 합니다.

    다음 사용자의 세금 정보를 참고하여 해당 세율 구간에 적합한 유의사항 5가지를 초보자도 이해할 수 있도록 설명해주세요.

    조건:
    1. 각 유의사항은 말하듯 이어지는 문장을 사용하세요.
    2. **번호를 매기거나 하이픈을 사용하지 마세요.**
    3. 각 항목은 줄바꿈(\\n)으로 구분된 설명형 문장으로 작성합니다.
    4. 실제 신고 시 초보자가 자주 실수하는 현실적인 사례를 중심으로 작성해 주세요.
    5. 중요한 단어나 항목은 <strong>태그</strong>로 감싸 강조해 주세요.
    6. 예시 형식으로 작성해주세요.

    사용자 정보:
      - 과세표준: <strong>${taxableIncome.toLocaleString()}원</strong>
      - 실효세율: <strong>${(effectiveTaxRate * 100).toFixed(2)}%</strong>
      - 적용세율 구간: <strong>${(appliedRate * 100).toFixed(0)}%</strong>

    예시:
    <strong>사업용 계좌</strong>를 사용하지 않으면 비용 인정이 어려울 수 있으므로, 반드시 사업 전용 계좌를 이용하는 것이 좋습니다.  
    간편장부 대상자임에도 <strong>장부 미비</strong>로 인해 추계신고를 하면, 실제 지출을 반영하지 못해 세금이 더 많이 나올 수 있습니다.  
    <strong>경비 증빙자료</strong> 없이 카드, 현금영수증 등을 정리하지 않으면 필요경비로 인정되지 않아, 세액이 증가할 수 있습니다.
    `;
  }

  throw new Error("잘못된 type입니다.");
}
