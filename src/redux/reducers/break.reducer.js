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
  suddenReason: "",
  skipped: [],
  prebreakScore: "",
  prebreakText: "",
  maxMinTrack: [],
  prepanas: [],
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

    case BreakTypes.ON_CANCEL_BREAK:
      return {
        ...state,
        breakState: "cancel-break",
        breaksTriggered: action.payload.breaksTriggered,
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
        suddenReason: "",
        skipped: [],
        prebreakScore: "",
        prebreakText: "",
        maxMinTrack: [],
        prepanas: [],
      };

    case BreakTypes.END_BREAK:
      return { ...state, breakState: "break-feedback" };
    case BreakTypes.START_PRE_BREAK_FEEDBACK:
      return { ...state, breakState: "pre-break-feedback" };
    case BreakTypes.START_STROOP:
      return { ...state, breakState: "break-stroop" };
    case BreakTypes.START_FRUIT:
      return { ...state, breakState: "break-fruit" };
    case BreakTypes.SETSKIPPED:
      return { ...state, skipped: action.payload.val };

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
        suddenReason: "",
        skipped: [],
        prebreakScore: "",
        prebreakText: "",
        maxMinTrack: [],
        prepanas: [],
      };

    case BreakTypes.SET_WINDOW_CHANGED:
      return { ...state, windowChanged: true };
    case BreakTypes.SET_BREAK_TRIGGERED:
      return { ...state, breaksTriggered: action.payload };
    case BreakTypes.ADD_BREAK_DATA:
      return { ...state, ...action.payload.breakData };
    case BreakTypes.SET_PRE_BREAK_FEEDBACK:
      return {
        ...state,
        prebreakScore: action.payload.score,
        prebreakText: action.payload.text,
        prepanas: action.payload.panas,
      };
    case BreakTypes.SET_MAX_MIN_TRACK:
      return {
        ...state,
        maxMinTrack: action.payload.data,
      };
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

    case BreakTypes.RESET_BREAK:
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
        suddenReason: "",
        skipped: [],
        prebreakScore: "",
        prebreakText: "",
        maxMinTrack: [],
        prepanas: [],
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
        suddenReason: "",
        skipped: [],
        prebreakScore: "",
        prebreakText: "",
        maxMinTrack: [],
        prepanas: [],
      };

    default:
      return state;
  }
};

export default BreakReducer;
