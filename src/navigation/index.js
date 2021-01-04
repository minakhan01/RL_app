import React, { Suspense, lazy, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import BreakManager from "../breakmanager/BreakManager"
const BreakScreen = lazy(() => import("../screens/BreakScreen"));
const HomeScreen = lazy(() => import("../screens/HomeScreen"));

const Main = () => {
  
  useEffect(BreakManager,[])

  return (<Suspense fallback={<Loading />}>
    <Switch>
      
      <Route exact path="/" component={HomeScreen} />
      <Route path="/break" component={BreakScreen} />

    </Switch>
  </Suspense>)
};

export default Main;
