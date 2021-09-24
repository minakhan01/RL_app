import { OnboardingTypes } from "../types";
const initialState = {
  name: "",
  breakMessage: "Drink Water",
  screenTime: { start: "", end: "" },
  scheduledBreaks: [{ start: "", end: "", day: "" }],
  regularBreakLength: 1,
  regularBreakInterval: 60,
  overRideSites: [{ name: "Youtube", url: "www.youtube.com", key: "1" }],
  allOverRides: [{ name: "", url: "", interval: 60, breakLength: 1 }],
  loading: false,
  err: null,
  complete: false,
  startTime: "",
  user: {},
  awChecked: false,
};

const OnboardingReducer = (state = initialState, action) => {
  switch (action.type) {
    case OnboardingTypes.SET_NAME:
      return { ...state, name: action.payload };
    case OnboardingTypes.LOGIN_USER:
      return { ...state, user: action.payload, name: action.payload.name };
    case OnboardingTypes.SET_BREAK_MESSAGE:
      return { ...state, breakMessage: action.payload };
    case OnboardingTypes.SET_SCHEDULED_BREAKS:
      return { ...state, scheduledBreaks: action.payload };
    case OnboardingTypes.SET_SCREEN_TIME:
      return { ...state, screenTime: action.payload };
    case OnboardingTypes.SET_REGULAR_BREAK_INTERVAL:
      return { ...state, regularBreakInterval: action.payload };
    case OnboardingTypes.SET_REGULAR_BREAK_LENGTH:
      return { ...state, regularBreakLength: action.payload };
    case OnboardingTypes.SET_ALL_OVERRIDES:
      return { ...state, allOverRides: action.payload };
    case OnboardingTypes.SET_OVERRIDE_SITES:
      return { ...state, overRideSites: action.payload };
    case OnboardingTypes.SET_ONBOARDING_COMPLETE:
      return { ...state, complete: true };
    case OnboardingTypes.AW_CHECKED:
      return { ...state, awChecked: true };
    case OnboardingTypes.RESET:
      return {
        name: "",
        breakMessage: "Drink Water",
        screenTime: { start: "", end: "" },
        scheduledBreaks: [{ start: "", end: "", day: "" }],
        regularBreakLength: 1,
        regularBreakInterval: 60,
        overRideSites: [{ name: "Youtube", url: "www.youtube.com", key: "1" }],
        allOverRides: [{ name: "", url: "", interval: 60, breakLength: 1 }],
        loading: false,
        err: null,
        complete: false,
        user: {},
        awChecked: false,
      };
    default:
      return state;
  }
};

export default OnboardingReducer;
