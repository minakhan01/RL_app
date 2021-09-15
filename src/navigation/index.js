import React, { Suspense, lazy, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import BreakManager from "../breakmanager";
import { store } from "../redux";
const BreakScreen = lazy(() => import("../screens/BreakScreen"));
const HomeScreen = lazy(() => import("../screens/HomeScreen"));
const OnboardingScreen = lazy(() => import("../screens/OnboardingScreen"));
const CalendarScreen = lazy(() => import("../screens/CalendarScreen"));
const PopupScreen = lazy(() => import("../screens/PopupScreen"));
const StroopScreen = lazy(() => import("../screens/StroopScreen"));

const Main = () => {
  let history = useHistory();
  //script to manage break triggers is called here
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/calendar" component={CalendarScreen} />
        <Route exact path="/" component={OnboardingScreen} />
        <Route path="/break" component={BreakScreen} />
        <Route path="/popup" component={PopupScreen} />
        <Route path="/home" component={HomeScreen} />
        <Route path="/stroop" component={StroopScreen} />
      </Switch>
    </Suspense>
  );
};

export default Main;
