"use server";

export async function getGptSummary(input: string): Promise<string> {
  const prompt = `다음 세금 계산 결과를 초보자가 이해할 수 있게 설명해줘:\n${input}`;

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
