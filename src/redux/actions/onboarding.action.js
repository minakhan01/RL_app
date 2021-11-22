import { OnboardingTypes } from "../types";

export const setName = (value) => ({
  type: OnboardingTypes.SET_NAME,
  payload: value,
});

export const setBreakMessage = (value) => ({
  type: OnboardingTypes.SET_BREAK_MESSAGE,
  payload: value,
});

export const setScheduledBreaks = (value) => ({
  type: OnboardingTypes.SET_SCHEDULED_BREAKS,
  payload: value,
});

export const setScreenTime = (value) => ({
  type: OnboardingTypes.SET_SCREEN_TIME,
  payload: value,
});

export const setRegularBreakInterval = (value) => ({
  type: OnboardingTypes.SET_REGULAR_BREAK_INTERVAL,
  payload: value,
});

export const setRegularBreakLength = (value) => ({
  type: OnboardingTypes.SET_REGULAR_BREAK_LENGTH,
  payload: value,
});

export const setOverrideSites = (value) => ({
  type: OnboardingTypes.SET_OVERRIDE_SITES,
  payload: value,
});

export const setAllOverrides = (value) => ({
  type: OnboardingTypes.SET_ALL_OVERRIDES,
  payload: value,
});

export const setOnboardingComplete = () => ({
  type: OnboardingTypes.SET_ONBOARDING_COMPLETE,
  payload: {},
});

export const reset = () => ({
  type: OnboardingTypes.RESET,
  payload: {},
});

export const awChecked = () => ({
  type: OnboardingTypes.AW_CHECKED,
  payload: {},
});

export const loginUser = (data) => ({
  type: OnboardingTypes.LOGIN_USER,
  payload: data,
});

export const updateUser = (data) => ({
  type: OnboardingTypes.UPDATE_USER,
  payload: data,
});

export const addOnbInfo = (data) => ({
  type: OnboardingTypes.ADD_ONB_INFO,
  payload: data,
});

export const addTempSched = (value) => ({
  type: OnboardingTypes.ADD_TEMP_SCHED,
  payload: { value },
});

export const addTempReg = (length, interval) => ({
  type: OnboardingTypes.ADD_TEMP_REG,
  payload: { length, interval },
});

export const addTempAct = (site, all) => ({
  type: OnboardingTypes.ADD_TEMP_ACT,
  payload: { site, all },
});

export const addCbt = (data) => ({
  type: OnboardingTypes.ADD_CBT,
  payload: { data },
});
