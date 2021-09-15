import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import { store } from "./redux";
import Main from "./navigation";

import "antd/dist/antd.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

function App() {
  useEffect(() => {
    console.log("hm");
  }, []);
  return (
    <Provider store={store}>
      <HashRouter>
        <Main />
      </HashRouter>
    </Provider>
  );
}

export default App;
