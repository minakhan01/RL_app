import React, { Suspense, lazy, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import BreakManager from "../breakmanager";
import { store } from "../redux";
import { BreakActions } from "../redux/actions";
import { Provider, useDispatch } from "react-redux";
const { ipcRenderer, remote } = window.require("electron");
const BreakScreen = lazy(() => import("../screens/BreakScreen"));
const HomeScreen = lazy(() => import("../screens/HomeScreen"));
const OnboardingScreen = lazy(() => import("../screens/OnboardingScreen"));
const CalendarScreen = lazy(() => import("../screens/CalendarScreen"));
const PopupScreen = lazy(() => import("../screens/PopupScreen"));
const StroopScreen = lazy(() => import("../screens/StroopScreen"));
const FruitNinjaScreen = lazy(() => import("../screens/FruitNinjaScreen"));
const LoginScreen = lazy(() => import("../screens/LoginScreen"));
const AWCheckerScreen = lazy(() => import("../screens/AWCheckerScreen"));
const AnalyticsScreen = lazy(() => import("../screens/AnalyticsScreen"));
const NewHomeScreen = lazy(() => import("../screens/NewHomeScreen"));

const Main = () => {
  let history = useHistory();
  //script to manage break triggers is called here
  let dispatch = useDispatch();
  useEffect(() => {
    if (store.getState().onboarding.complete) {
      console.log("hm")
      BreakManager(history);
    }
    if (store.getState().break.breakState === "break-popup") {
    } else if (store.getState().break.breakState === "break") {
      dispatch(BreakActions.startBreak());
    }
    ipcRenderer.on("asynchronous-message", function (evt, message) {
      let timeNow = new Date().toISOString();
      let breakData = {
        breakType: "chosen",
        breakDescription: "chosen",
        breakDuration: 10 * 60,
        breakStartTime: timeNow,
      };
      dispatch(BreakActions.addBreakData(breakData));
      dispatch(BreakActions.startBreak());
    });
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/calendar" component={CalendarScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/" component={OnboardingScreen} />
        <Route path="/break" component={BreakScreen} />
        <Route path="/popup" component={PopupScreen} />
        <Route path="/home" component={HomeScreen} />
        <Route path="/stroop" component={StroopScreen} />
        <Route path="/fruit" component={FruitNinjaScreen} />
        <Route path="/aw" component={AWCheckerScreen} />
        <Route path="/ana" component={AnalyticsScreen} />
        <Route path="/new" component={NewHomeScreen} />
      </Switch>
    </Suspense>
  );
};

export default Main;
