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

/**
 * GptSummary
 * - 결과 페이지에서 GPT 요약 설명을 렌더링하는 컴포넌트
 * - 기본 요약 + 절세 전략 + 신고 유의사항을 선택적으로 요청/표시
 * - 중복 요청 방지를 위한 캐싱 및 useReducer로 상태 관리
 */

// GPT 응답 상태 타입 정의
type GptState = {
  summary: string | null;
  strategy: string | null;
  warning: string | null;
  loading: null | "default" | "saving" | "warning";
  error: null | "default" | "saving" | "warning";
};

// GPT 상태 변경 액션 정의
type Action =
  | { type: "LOADING"; payload: GptState["loading"] }
  | { type: "ERROR"; payload: GptState["error"] }
  | { type: "SET_SUMMARY"; payload: string }
  | { type: "SET_STRATEGY"; payload: string }
  | { type: "SET_WARNING"; payload: string }
  | { type: "RESET_ERROR" }
  | { type: "RESET_ALL" };

// 상태 변경 로직 정의
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
  // 상태 초기화 및 디스패치 함수 생성
  const [state, dispatch] = useReducer(gptReducer, {
    summary: null,
    strategy: null,
    warning: null,
    loading: "default",
    error: null,
  });

  const hasFetched = useRef(false); // 중복 요청 방지용 ref

  // 응답 캐싱용 ref (요약 유형별로 저장)
  const cacheRef = useRef<
    Partial<Record<"default" | "saving" | "warning", string>>
  >({});

  // 기본 요약 설명 fetch 함수 (중복 요청 방지 및 캐싱 포함)
  const fetchSummary = useCallback(async () => {
    if (hasFetched.current) return; // 중복 방지
    hasFetched.current = true;

    // 캐시 확인
    if (cacheRef.current["default"]) {
      dispatch({ type: "SET_SUMMARY", payload: cacheRef.current["default"] });
      return;
    }

    try {
      dispatch({ type: "LOADING", payload: "default" });

      const res = await getGptSummary("default", result);
      cacheRef.current["default"] = res;
      dispatch({ type: "SET_SUMMARY", payload: res });
    } catch (err) {
      console.error("요약 실패:", err);
      dispatch({ type: "ERROR", payload: "default" });
    }
  }, [result]);

  // 버튼 클릭 시 추가 설명 요청 (절세 전략 또는 신고 유의사항)
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
    fetchSummary();
  }, [fetchSummary]);

  // 다시 설명 버튼 클릭 시 캐시 및 상태 초기화
  const resetSummary = () => {
    hasFetched.current = false;
    cacheRef.current = {}; // 캐시 초기화
    dispatch({ type: "RESET_ALL" }); // 상태 초기화
    fetchSummary(); // 다시 fetch 트리거
  };

  return (
    <section className={styles.container} aria-labelledby="gpt-summary-heading">
      <header className={styles.header}>
        <div className={styles.left}>
          <div className={styles.iconBox} aria-hidden="true">
            <Bot size={24} color="white" />
          </div>
          <div className={styles.textGroup}>
            <h2 id="gpt-summary-heading">MiniTax가 쉽게 알려드릴게요</h2>
            <p>복잡한 세금 계산을 한눈에 이해해보세요</p>
          </div>
        </div>

        <button
          className={styles.resetButton}
          onClick={resetSummary}
          disabled={state.loading === "default"}
          aria-label="요약 다시 요청하기"
        >
          {state.loading === "default" ? (
            <Loader2 size={14} className={styles.spinner} />
          ) : (
            <Loader2 size={14} />
          )}
          다시 설명
        </button>
      </header>

      <div className={styles.label}>
        <span className="sr-only">적용된 세율 구간:</span>
        {getTaxRateLabel(result.appliedRate)}
      </div>

      {/* 기본 요약 영역 */}
      <article aria-label="GPT 요약 설명">
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
      </article>

      <div
        className={styles.buttonWrapper}
        role="group"
        aria-label="추가 설명 요청 버튼"
      >
        <button
          className={`${styles.labelButton} ${styles.strategy}`}
          onClick={() => handleExplainClick("saving")}
          disabled={state.loading === "saving"}
          aria-label="절세 전략 설명 요청"
        >
          <Lightbulb size={16} style={{ marginRight: 6 }} />
          절세 전략
        </button>
        <button
          className={`${styles.labelButton} ${styles.warning}`}
          onClick={() => handleExplainClick("warning")}
          disabled={state.loading === "warning"}
          aria-label="신고 유의사항 설명 요청"
        >
          <AlertTriangle size={16} style={{ marginRight: 6 }} />
          신고 유의사항
        </button>
      </div>

      {/* 절세 전략 설명 영역 */}
      {state.strategy ||
      state.loading === "saving" ||
      state.error === "saving" ? (
        <article aria-label="절세 전략 설명">
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
        </article>
      ) : null}

      {/* 신고 유의사항 설명 영역 */}
      {state.warning ||
      state.loading === "warning" ||
      state.error === "warning" ? (
        <article aria-label="신고 시 유의사항 설명">
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
        </article>
      ) : null}
    </section>
  );
}
