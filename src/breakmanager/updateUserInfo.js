import { BreakActions, OnboardingActions } from "../redux/actions";
import { store } from "../redux";
import axios from "axios";
export default async function updateUserInfo() {
  let body = {
    _id: store.getState().onboarding.user._id,
  };
  let response = await axios.post("https://thepallab.com/api/user/login", body);

  store.dispatch(OnboardingActions.updateUser(response.data.user));
}
