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
      return { ...state, breakState: "no-break", windowChanged: false };

    case BreakTypes.END_BREAK:
      return { ...state, breakState: "break-feedback" };
    case BreakTypes.START_STROOP:
      return { ...state, breakState: "break-stroop" };

    case BreakTypes.CLOSE_BREAK_SCREEN:
      return { ...state, breakState: "no-break", windowChanged: false };

    case BreakTypes.SET_WINDOW_CHANGED:
      return { ...state, windowChanged: true };
    case BreakTypes.SET_BREAK_TRIGGERED:
      return { ...state, breaksTriggered: action.payload };

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
      };

    default:
      return state;
  }
};

export default BreakReducer;
