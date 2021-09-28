import { BreakTypes, OnboardingTypes } from "../types";

const initialState = {
  breakState: "no-break",
  windowChanged: true,
  breakType: "",
  breakDescription: "",
  breakStartTime: "",
  breakDuration: 0,
  popupStartTime: "",
  breaksTriggered: {},
  breakEndTime: "",
  prebreakScores: {
    stroop: [],
    fruit: [],
  },
  postbreakScores: {
    stroop: [],
    fruit: [],
  },
};

const BreakReducer = (state = initialState, action) => {
  switch (action.type) {
    case BreakTypes.START_BREAK:
      return {
        ...state,
        breakState: "break",
        windowChanged: false,
        breakStartTime: new Date().toISOString(),
      };

    case BreakTypes.START_POPUP:
      return {
        ...state,
        breakState: "break-popup",
        popupStartTime: action.payload.start,
        windowChanged: false,
        ...action.payload.breakData,
      };

    case BreakTypes.CANCEL_BREAK:
      return {
        ...state,
        breakState: "no-break",
        windowChanged: false,
        breakType: "",
        breakDescription: "",
        breakStartTime: "",
        breakDuration: 0,
        popupStartTime: "",
        breaksTriggered: {},
        breakEndTime: "",
        prebreakScores: {
          stroop: [],
          fruit: [],
        },
        postbreakScores: {
          stroop: [],
          fruit: [],
        },
      };

    case BreakTypes.END_BREAK:
      return { ...state, breakState: "break-feedback" };
    case BreakTypes.START_STROOP:
      return { ...state, breakState: "break-stroop" };
    case BreakTypes.START_FRUIT:
      return { ...state, breakState: "break-fruit" };

    case BreakTypes.CLOSE_BREAK_SCREEN:
      return {
        ...state,
        breakState: "no-break",
        windowChanged: false,
        breakType: "",
        breakDescription: "",
        breakStartTime: "",
        breakDuration: 0,
        popupStartTime: "",
        breaksTriggered: {},
        breakEndTime: "",
        prebreakScores: {
          stroop: [],
          fruit: [],
        },
        postbreakScores: {
          stroop: [],
          fruit: [],
        },
      };

    case BreakTypes.SET_WINDOW_CHANGED:
      return { ...state, windowChanged: true };
    case BreakTypes.SET_BREAK_TRIGGERED:
      return { ...state, breaksTriggered: action.payload };
    case BreakTypes.ADD_BREAK_DATA:
      return { ...state, ...action.payload.breakData };
    case BreakTypes.ADD_PREBREAK_DATA:
      return {
        ...state,
        prebreakScores: {
          stroop: action.payload.stroop,
          fruit: action.payload.fruit,
        },
      };

    case BreakTypes.ADD_POSTBREAK_DATA:
      return {
        ...state,
        postbreakScores: {
          stroop: action.payload.stroop,
          fruit: action.payload.fruit,
        },
      };

    case OnboardingTypes.RESET:
      return {
        breakState: "no-break",
        windowChanged: true,
        breakType: "",
        breakDescription: "",
        breakStartTime: "",
        breakDuration: 0,
        popupStartTime: "",
        breaksTriggered: {},
        breakEndTime: "",
        prebreakScores: {
          stroop: [],
          fruit: [],
        },
        postbreakScores: {
          stroop: [],
          fruit: [],
        },
      };

    default:
      return state;
  }
};

export default BreakReducer;
