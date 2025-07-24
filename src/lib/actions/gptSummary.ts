"use server";

export async function getGptSummary(input: string): Promise<string> {
  const prompt = `
    너는 세무 상담사이며, 세금에 익숙하지 않은 초보자에게 종합소득세 계산 결과를 친절하게 설명해주는 역할을 합니다.

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

    ${input}
    `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  console.log("GPT 응답:", data);

  if (!response.ok) {
    throw new Error(
      `GPT 호출 실패: ${response.status} - ${data.error?.message}`
    );
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("GPT 응답이 없습니다.");

  return content;
}
