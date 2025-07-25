"use server";

import getPrompt from "@/lib/prompt";
import { TaxResult } from "@/types/tax";

export async function getGptSummary(
  type: "default" | "saving" | "warning",
  result: TaxResult
): Promise<string> {
  const prompt = getPrompt(type, result);

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

  if (!response.ok) {
    throw new Error(
      `GPT 호출 실패: ${response.status} - ${data.error?.message}`
    );
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("GPT 응답이 없습니다.");

  return content;
}
