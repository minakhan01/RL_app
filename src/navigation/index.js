import React, { Suspense, lazy, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import BreakManager from "../breakmanager"
const BreakScreen = lazy(() => import("../screens/BreakScreen"));
const HomeScreen = lazy(() => import("../screens/HomeScreen"));
const OnboardingScreen = lazy(() => import("../screens/OnboardingScreen"));
const CalendarScreen = lazy(() => import("../screens/CalendarScreen"));
const PopupScreen = lazy(() => import("../screens/PopupScreen"));

const Main = () => {
  let history=useHistory()
  //script to manage break triggers is called here
  useEffect(()=>BreakManager(history),[])
  return (<Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path="/calendar" component={CalendarScreen} />
      <Route exact path="/" component={OnboardingScreen} />      
      <Route path="/break" component={BreakScreen} />
      <Route path="/popup" component={PopupScreen} />
    </Switch>
  </Suspense>)
};

export default Main;
