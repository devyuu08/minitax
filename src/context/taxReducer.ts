import { TaxResult } from "@/types/tax";

type TaxAction =
  | { type: "SET_RESULT"; payload: TaxResult }
  | { type: "CLEAR_RESULT" };

export interface TaxState {
  result: TaxResult | null;
}

export const initialTaxState: TaxState = {
  result: null,
};

export function taxReducer(state: TaxState, action: TaxAction): TaxState {
  switch (action.type) {
    case "SET_RESULT":
      return { ...state, result: action.payload };
    case "CLEAR_RESULT":
      return { ...state, result: null };
    default:
      return state;
  }
}
