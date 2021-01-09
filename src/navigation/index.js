import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from "../components/Loading";

const HomeScreen = lazy(() => import("../screens/HomeScreen"));
const OnboardingScreen = lazy(() => import("../screens/OnboardingScreen"));

const Main = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path="/" component={OnboardingScreen} />
    </Switch>
  </Suspense>
);

export default Main;
