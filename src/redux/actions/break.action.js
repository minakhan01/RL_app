import { BreakTypes } from "../types";

export const endBreak = () => ({
  type: BreakTypes.END_BREAK,
  payload: { },
});

export const startBreak = (ob) => ({
  type: BreakTypes.START_BREAK,
  payload: {...ob},
});

export const closeBreakScreen = () => ({
  type: BreakTypes.CLOSE_BREAK_SCREEN,
  payload: { },
});

export const setWindowChanged = () => ({
  type: BreakTypes.SET_WINDOW_CHANGED,
  payload: { },
});