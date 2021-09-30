import { PastTypes, OnboardingTypes, BreakTypes } from "../types";

const initialState = {
  pastBreakData: [],
  activityWatchData: {},
  intervalBreakData: {
    date: "",
    minsAppRunningAfterLastIntervalBreak: 0,
    breakCount: 0,
  },
  awData: {},
  lastScheduledBreak: "",
  initScheduled: {},
  today: "",
  totalUploaded: 0,
  webUploaded: 0,
  todayaW: "",
};

const PastReducer = (state = initialState, action) => {
  switch (action.type) {
    case PastTypes.ADD_MINUTE:
      if (
        state.intervalBreakData.date !==
        new Date().getDate() +
          "" +
          (new Date().getMonth() + 1) +
          "" +
          new Date().getFullYear()
      )
        return {
          ...state,
          intervalBreakData: {
            ...state.intervalBreakData,
            minsAppRunningAfterLastIntervalBreak: 1,
            date:
              new Date().getDate() +
              "" +
              (new Date().getMonth() + 1) +
              "" +
              new Date().getFullYear(),
          },
        };
      return {
        ...state,
        intervalBreakData: {
          ...state.intervalBreakData,
          minsAppRunningAfterLastIntervalBreak:
            state.intervalBreakData.minsAppRunningAfterLastIntervalBreak + 1,
        },
      };

    case PastTypes.ADD_INTERVAL_BREAK:
      return {
        ...state,
        intervalBreakData: {
          ...state.intervalBreakData,
          breakCount: state.intervalBreakData.breakCount + 1,
          minsAppRunningAfterLastIntervalBreak: 0,
        },
      };

    case PastTypes.BACKUP_AW_DATA:
      if (action.payload.type === "active-windows")
        return {
          ...state,
          awData: { ...state.awData, activeWindows: action.payload },
        };
      if (action.payload.type === "screen-time")
        return {
          ...state,
          awData: { ...state.awData, screenTime: action.payload },
        };
      return state;

    case PastTypes.SAVE_BREAK_DATA:
      return {
        ...state,
        pastBreakData: [...state.pastBreakData, action.payload],
      };

    case OnboardingTypes.RESET:
      return {
        pastBreakData: [],
        activityWatchData: {},
        intervalBreakData: {
          date: "",
          minsAppRunningAfterLastIntervalBreak: 0,
          breakCount: 0,
        },
        awData: {},
        lastScheduledBreak: "",
        initScheduled: {},
        today: "",
        totalUploaded: 0,
        webUploaded: 0,
        todayaW: "",
      };

    case BreakTypes.ON_CANCEL_BREAK:
      return {
        ...state,
        lastScheduledBreak: action.payload.endtime,
        intervalBreakData: action.payload.intervalBreakData,
        initScheduled: action.payload.initScheduled,
      };

    case BreakTypes.END_BREAK:
      return { ...state, lastScheduledBreak: action.payload.endtime };
    case PastTypes.SAVE_INIT_BREAK_DATA:
      return { ...state, initScheduled: action.payload };
    case PastTypes.SET_AW_UP_NUM:
      return {
        ...state,
        totalUploaded: action.payload.all,
        webUploaded: action.payload.web,
        todayaW: action.payload.tod,
      };
    case PastTypes.SET_TODAY:
      return { ...state, today: action.payload };

    default:
      return state;
  }
};

export default PastReducer;
