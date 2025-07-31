"use client";

import { useContext, useReducer, createContext } from "react";
import { initialTaxState, taxReducer, TaxState } from "./taxReducer";
import { TaxResult } from "@/types/tax";

// Context 내부에서 제공할 타입
interface TaxContextType extends TaxState {
  setResult: (result: TaxResult) => void;
  clearResult: () => void;
}

// 실제 Context 객체 생성
const TaxContext = createContext<TaxContextType | undefined>(undefined);

export const TaxProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(taxReducer, initialTaxState);

  const setResult = (result: TaxResult) =>
    dispatch({ type: "SET_RESULT", payload: result });

  const clearResult = () => dispatch({ type: "CLEAR_RESULT" });

  return (
    <TaxContext.Provider value={{ ...state, setResult, clearResult }}>
      {children}
    </TaxContext.Provider>
  );
};

export const useTaxContext = () => {
  const context = useContext(TaxContext);
  if (!context) {
    throw new Error("세금 상태는 TaxProvider 내부에서만 사용 가능");
  }
  return context;
};
