import { PastTypes } from "../types";

export const addMinute = () => ({
  type: PastTypes.ADD_MINUTE,
  payload: {},
});

export const addIntervalBreak = () => ({
  type: PastTypes.ADD_INTERVAL_BREAK,
  payload: {},
});

export const backupAWData = (dat) => ({
  type: PastTypes.BACKUP_AW_DATA,
  payload: dat,
});

export const saveBreakData = (dat) => ({
  type: PastTypes.SAVE_BREAK_DATA,
  payload: dat,
});

export const setToday = (dat) => ({
  type: PastTypes.SET_TODAY,
  payload: dat,
});

export const saveInitBreakData = (dat) => ({
  type: PastTypes.SAVE_INIT_BREAK_DATA,
  payload: dat,
});

export const setAwUpNum = (all, web, tod) => ({
  type: PastTypes.SET_AW_UP_NUM,
  payload: { all, web, tod },
});

export const AddWeekly = (data) => ({
  type: PastTypes.ADD_WEEKLY,
  payload: { data },
});

export const AddWeeklyExtra = (data) => ({
  type: PastTypes.ADD_WEEKLY_EXTRA,
  payload: { data },
});

export const setWeeklyRem = (data) => ({
  type: PastTypes.SET_WEEKLY_REM,
  payload: { data },
});

export const setTakenId = (data) => ({
  type: PastTypes.SET_TAKEN_ID,
  payload: { data },
});

export const setTakenIdApp = (data) => ({
  type: PastTypes.SET_TAKEN_ID,
  payload: { data },
});
