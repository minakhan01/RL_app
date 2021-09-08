import { BreakTypes } from "../types";

export const endBreak = () => ({
  type: BreakTypes.END_BREAK,
  payload: {},
});

export const startBreak = () => ({
  type: BreakTypes.START_BREAK,
  payload: {},
});

export const closeBreakScreen = () => ({
  type: BreakTypes.CLOSE_BREAK_SCREEN,
  payload: {},
});

export const setWindowChanged = () => ({
  type: BreakTypes.SET_WINDOW_CHANGED,
  payload: {},
});

export const startPopup = (str, breakData) => ({
  type: BreakTypes.START_POPUP,
  payload: { start: str, breakData },
});

export const cancelBreak = () => ({
  type: BreakTypes.CANCEL_BREAK,
  payload: {},
});

export const setBreakTriggered = (value) => ({
  type: BreakTypes.SET_BREAK_TRIGGERED,
  payload: value,
});
