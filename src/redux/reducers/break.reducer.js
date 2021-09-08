import { BreakTypes } from "../types";

const initialState = {
  breakState: "no-break",
  windowChanged: true,
  breakType: "",
  breakDescription: "",
  breakStartTime: "",
  breakDuration: 0,
  popupStartTime: "",
  breaksTriggered: {},
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

    case BreakTypes.CLOSE_BREAK_SCREEN:
      return { ...state, breakState: "no-break", windowChanged: false };

    case BreakTypes.SET_WINDOW_CHANGED:
      return { ...state, windowChanged: true };
    case BreakTypes.SET_BREAK_TRIGGERED:
      return { ...state, breaksTriggered: action.payload };

    default:
      return state;
  }
};

export default BreakReducer;
