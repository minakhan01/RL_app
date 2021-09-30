import { BreakTypes } from "../types";

export const endBreak = (endtime) => ({
  type: BreakTypes.END_BREAK,
  payload: { endtime },
});

export const startBreak = () => ({
  type: BreakTypes.START_BREAK,
  payload: {},
});

export const addBreakData = (breakData) => ({
  type: BreakTypes.ADD_BREAK_DATA,
  payload: { breakData },
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

export const startStroop = () => ({
  type: BreakTypes.START_STROOP,
  payload: {},
});

export const startFruit = () => ({
  type: BreakTypes.START_FRUIT,
  payload: {},
});

export const cancelBreak = () => ({
  type: BreakTypes.CANCEL_BREAK,
  payload: {},
});

export const onCancelBreak = (endtime) => ({
  type: BreakTypes.ON_CANCEL_BREAK,
  payload: endtime,
});

export const setBreakTriggered = (value) => ({
  type: BreakTypes.SET_BREAK_TRIGGERED,
  payload: value,
});

export const prebreakScores = (stroop, fruit) => ({
  type: BreakTypes.ADD_PREBREAK_DATA,
  payload: { stroop, fruit },
});

export const postbreakScores = (stroop, fruit) => ({
  type: BreakTypes.ADD_POSTBREAK_DATA,
  payload: { stroop, fruit },
});
