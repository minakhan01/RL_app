import React, { Suspense, lazy, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import BreakManager from "../breakmanager";
import { store } from "../redux";
import { BreakActions } from "../redux/actions";
import { Provider, useDispatch } from "react-redux";
const { ipcRenderer, remote } = window.require("electron");
var curWindow = remote.getCurrentWindow();
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
const BreakFeedbackScreen = lazy(() =>
  import("../screens/BreakFeedbackScreen")
);
const CancelScreen = lazy(() => import("../screens/CancelScreen"));
const SuddenScreen = lazy(() => import("../screens/SuddenScreen"));
const EditScheduledBreakScreen = lazy(() =>
  import("../screens/EditScheduledBreaks")
);
const EditRegularBreakScreen = lazy(() =>
  import("../screens/EditRegularBreaksScreen")
);
const EditAdHocBreakScreen = lazy(() =>
  import("../screens/EditActivityBreaksScreen")
);
const SignupScreen = lazy(() => import("../screens/SignUpScreen"));

const AWScreen = lazy(() => import("../screens/AWScreen"));
const PreBreakFeedbackScreen = lazy(() =>
  import("../screens/PreBreakFeedbackScreen")
);

const CPTScreen = lazy(() => import("../screens/CPTScreen"));
const WeeklyForm = lazy(() => import("../screens/WeeklyForm"));
const WeeklyPopUp = lazy(() => import("../screens/WeeklyPopUp"));
const CBTestScreen = lazy(() => import("../screens/CBTestScreen"));
const WeeklyQInputScreen = lazy(() => import("../screens/WeeklyQInputScreen"));
const AWCheckerInScreen = lazy(() => import("../screens/AWCheckerInScreen"));

const Main = () => {
  let history = useHistory();
  //script to manage break triggers is called here
  let dispatch = useDispatch();
  useEffect(() => {
    if (store.getState().onboarding.complete) {
      BreakManager(history);
      if (store.getState().break.breakState !== "break") {
        history.push("/home");
        dispatch(BreakActions.resetBreak());
      }
    }
    if (store.getState().break.breakState === "break-popup") {
    } else if (store.getState().break.breakState === "break") {
      dispatch(BreakActions.startBreak());
    }
    ipcRenderer.on("asynchronous-message", function (evt, message) {
      history.push("/sud");
    });
    ipcRenderer.on("asynchronous-message-two", function (evt, message) {
      if (store.getState().break.breakState === "no-break") {
        history.push("/home");
        dispatch(BreakActions.resetBreak());
      } else {
        let breakInfo = store.getState().break;
        let pastInfo = store.getState().past;
        let endtime = breakInfo.breakEndTime;
        if (breakInfo.breakEndTime.length === 0) {
          endtime = new Date().toISOString();
        }
        let data = {
          endtime: endtime,
          intervalBreakData: pastInfo.intervalBreakData,
          initScheduled: pastInfo.initScheduled,
          breaksTriggered: breakInfo.breaksTriggered,
        };
        dispatch(BreakActions.onCancelBreak(data));
        dispatch(BreakActions.cancelBreak());
        curWindow.setOpacity(1);
        curWindow.setVisibleOnAllWorkspaces(false, {visibleOnFullScreen: false});
        curWindow.setAlwaysOnTop(false);
        history.push("/home");
      }
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
        <Route path="/home" component={NewHomeScreen} />
        <Route path="/stroop" component={StroopScreen} />
        <Route path="/fruit" component={FruitNinjaScreen} />
        <Route path="/aw" component={AWCheckerScreen} />
        <Route path="/aww" component={AWCheckerScreen} />
        <Route path="/ana" component={AnalyticsScreen} />
        <Route path="/feedback" component={BreakFeedbackScreen} />
        <Route path="/cancel" component={CancelScreen} />
        <Route path="/sud" component={SuddenScreen} />
        <Route path="/edit-sched" component={EditScheduledBreakScreen} />
        <Route path="/edit-reg" component={EditRegularBreakScreen} />
        <Route path="/edit-act" component={EditAdHocBreakScreen} />
        <Route path="/awviz" component={AWScreen} />
        <Route path="/signup" component={SignupScreen} />
        <Route path="/prefeedback" component={PreBreakFeedbackScreen} />
        <Route path="/cpt" component={CPTScreen} />
        <Route path="/week" component={WeeklyForm} />
        <Route path="/weekq" component={WeeklyQInputScreen} />
        <Route path="/weekpop" component={WeeklyPopUp} />
        <Route path="/cbt" component={CBTestScreen} />
      </Switch>
    </Suspense>
  );
};

export default Main;
