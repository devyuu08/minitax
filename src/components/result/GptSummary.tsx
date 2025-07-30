"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import styles from "./GptSummary.module.css";
import {
  AlertTriangle,
  Bot,
  Lightbulb,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { getGptSummary } from "@/lib/actions/gptSummary";
import { TaxResult } from "@/types/tax";
import { getTaxRateLabel } from "@/lib/getTaxRateLabel";
import GptSection from "./GptSection";

// const mockSummary = [
//   "귀하의 <strong>연소득은 50,000,000원</strong>이고, <strong>필요경비는 10,000,000원</strong>으로 계산되었습니다.",
//   "<strong>순소득 40,000,000원</strong>에서 기본공제 126만원을 제외한 <strong>과세표준은 38,500,000원</strong>입니다.",
//   "이 구간에는 <strong>실효세율 9.93%</strong>가 적용되어 <strong>소득세 4,515,000원</strong>이 산출됩니다.",
//   "여기에 <strong>지방소득세 451,500원</strong>을 합쳐 <strong>총 납부 예상 세액은 4,966,500원</strong>입니다.",
//   "실제 납부액은 건강보험료, 국민연금, 주민세 등 추가 항목에 따라 달라질 수 있습니다.",
// ];

type GptState = {
  summary: string | null;
  strategy: string | null;
  warning: string | null;
  loading: null | "default" | "saving" | "warning";
  error: null | "default" | "saving" | "warning";
};

type Action =
  | { type: "LOADING"; payload: GptState["loading"] }
  | { type: "ERROR"; payload: GptState["error"] }
  | { type: "SET_SUMMARY"; payload: string }
  | { type: "SET_STRATEGY"; payload: string }
  | { type: "SET_WARNING"; payload: string }
  | { type: "RESET_ERROR" }
  | { type: "RESET_ALL" };

function gptReducer(state: GptState, action: Action): GptState {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: action.payload, error: null };
    case "ERROR":
      return { ...state, error: action.payload, loading: null };
    case "SET_SUMMARY":
      return { ...state, summary: action.payload, loading: null };
    case "SET_STRATEGY":
      return { ...state, strategy: action.payload, loading: null };
    case "SET_WARNING":
      return { ...state, warning: action.payload, loading: null };
    case "RESET_ERROR":
      return { ...state, error: null };
    case "RESET_ALL":
      return {
        summary: null,
        strategy: null,
        warning: null,
        loading: "default",
        error: null,
      };

    default:
      return state;
  }
}

export default function GptSummary({ result }: { result: TaxResult }) {
  const [state, dispatch] = useReducer(gptReducer, {
    summary: null,
    strategy: null,
    warning: null,
    loading: "default",
    error: null,
  });

  const cacheRef = useRef<
    Partial<Record<"default" | "saving" | "warning", string>>
  >({});

  const fetchSummary = useCallback(async () => {
    // 캐시 확인
    if (cacheRef.current["default"]) {
      dispatch({ type: "SET_SUMMARY", payload: cacheRef.current["default"] });
      return;
    }

    try {
      dispatch({ type: "RESET_ALL" });
      dispatch({ type: "LOADING", payload: "default" });

      const res = await getGptSummary("default", result);
      cacheRef.current["default"] = res;
      dispatch({ type: "SET_SUMMARY", payload: res });
    } catch (err) {
      console.error("요약 실패:", err);
      dispatch({ type: "ERROR", payload: "default" });
    }
  }, [result]);

  const handleExplainClick = useCallback(
    async (type: "saving" | "warning") => {
      if (state.loading) return;
      dispatch({ type: "LOADING", payload: type });

      // 캐시 확인
      if (cacheRef.current[type]) {
        if (type === "saving") {
          dispatch({ type: "SET_STRATEGY", payload: cacheRef.current[type] });
        } else {
          dispatch({ type: "SET_WARNING", payload: cacheRef.current[type] });
        }
        return;
      }

      dispatch({ type: "LOADING", payload: type });

      try {
        const res = await getGptSummary(type, result);
        cacheRef.current[type] = res;

        if (type === "saving") {
          dispatch({ type: "SET_STRATEGY", payload: res });
        } else {
          dispatch({ type: "SET_WARNING", payload: res });
        }
      } catch (err) {
        console.error(`${type} 요약 실패:`, err);
        dispatch({ type: "ERROR", payload: type });
      }
    },
    [result, state.loading]
  );

  useEffect(() => {
    if (!state.summary) {
      fetchSummary();
    }
  }, [fetchSummary, state.summary]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.iconBox}>
            <Bot size={24} color="white" />
          </div>
          <div className={styles.textGroup}>
            <h1>MiniTax가 쉽게 알려드릴게요</h1>
            <p>복잡한 세금 계산을 한눈에 이해해보세요</p>
          </div>
        </div>

        <button
          className={styles.resetButton}
          onClick={fetchSummary}
          disabled={state.loading === "default"}
        >
          {state.loading === "default" ? (
            <Loader2 size={14} className={styles.spinner} />
          ) : (
            <Loader2 size={14} />
          )}
          다시 설명
        </button>
      </div>

      <div className={styles.label}>{getTaxRateLabel(result.appliedRate)}</div>

      {/* 기본 요약 영역 */}
      <GptSection
        icon={<MessageCircle size={20} />}
        title="MiniTax 요약 설명"
        content={state.summary}
        status={
          state.loading === "default"
            ? "loading"
            : state.error === "default"
            ? "error"
            : null
        }
        fallback={
          state.loading === "default"
            ? "GPT가 내용을 정리 중이에요..."
            : state.error === "default"
            ? "요약에 실패했습니다."
            : undefined
        }
      />

      <div className={styles.buttonWrapper}>
        <button
          className={`${styles.labelButton} ${styles.strategy}`}
          onClick={() => handleExplainClick("saving")}
          disabled={state.loading === "saving"}
        >
          <Lightbulb size={16} style={{ marginRight: 6 }} />
          절세 전략
        </button>
        <button
          className={`${styles.labelButton} ${styles.warning}`}
          onClick={() => handleExplainClick("warning")}
          disabled={state.loading === "warning"}
        >
          <AlertTriangle size={16} style={{ marginRight: 6 }} />
          신고 유의사항
        </button>
      </div>

      {/* 절세 전략 설명 영역 */}
      {state.strategy ||
      state.loading === "saving" ||
      state.error === "saving" ? (
        <GptSection
          icon={<Lightbulb size={20} />}
          title="절세 전략"
          content={state.strategy}
          status={
            state.loading === "saving"
              ? "loading"
              : state.error === "saving"
              ? "error"
              : null
          }
          fallback={
            state.loading === "saving"
              ? "절세 전략을 정리 중이에요..."
              : state.error === "saving"
              ? "절세 전략 요청에 실패했습니다."
              : undefined
          }
        />
      ) : null}

      {/* 신고 유의사항 설명 영역 */}
      {state.warning ||
      state.loading === "warning" ||
      state.error === "warning" ? (
        <GptSection
          icon={<AlertTriangle size={20} />}
          title="신고 시 유의사항"
          content={state.warning}
          status={
            state.loading === "warning"
              ? "loading"
              : state.error === "warning"
              ? "error"
              : null
          }
          fallback={
            state.loading === "warning"
              ? "신고 유의사항을 정리 중이에요..."
              : state.error === "warning"
              ? "신고 유의사항 요청에 실패했습니다."
              : undefined
          }
        />
      ) : null}
    </section>
  );
}
