import { OnboardingTypes } from "../types";
const initialState = {
  name: "",
  breakMessage: "",
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
  tempScheduledBreaks: [{ start: "", end: "", day: "" }],
  tempRegularBreakLength: 1,
  tempRegularBreakInterval: 60,
  tempOverRideSites: [{ name: "Youtube", url: "www.youtube.com", key: "1" }],
  tempAllOverRides: [{ name: "", url: "", interval: 60, breakLength: 1 }],
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
    case OnboardingTypes.ADD_ONB_INFO:
      return { ...state, ...action.payload };
    case OnboardingTypes.ADD_TEMP_SCHED:
      return { ...state, tempScheduledBreaks: action.payload.value };
    case OnboardingTypes.ADD_TEMP_REG:
      return {
        ...state,
        tempRegularBreakLength: action.payload.length,
        tempRegularBreakInterval: action.payload.interval,
      };
    case OnboardingTypes.ADD_TEMP_ACT:
      return {
        ...state,
        tempOverRideSites: action.payload.site,
        tempAllOverRides: action.payload.all,
      };
    case OnboardingTypes.RESET:
      return {
        name: "",
        breakMessage: "",
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
        tempScheduledBreaks: [{ start: "", end: "", day: "" }],
        tempRegularBreakLength: 1,
        tempRegularBreakInterval: 60,
        tempOverRideSites: [
          { name: "Youtube", url: "www.youtube.com", key: "1" },
        ],
        tempAllOverRides: [{ name: "", url: "", interval: 60, breakLength: 1 }],
      };
    default:
      return state;
  }
};

export default OnboardingReducer;
