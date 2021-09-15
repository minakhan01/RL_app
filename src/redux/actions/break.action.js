import { BreakTypes } from "../types";

export const endBreak = (endtime) => ({
  type: BreakTypes.END_BREAK,
  payload: { endtime },
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

export const startStroop = (str, breakData) => ({
  type: BreakTypes.START_STROOP,
  payload: {},
});

export const cancelBreak = (endtime) => ({
  type: BreakTypes.CANCEL_BREAK,
  payload: { endtime },
});

export const setBreakTriggered = (value) => ({
  type: BreakTypes.SET_BREAK_TRIGGERED,
  payload: value,
});
