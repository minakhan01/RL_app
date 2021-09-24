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
