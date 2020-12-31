import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./redux";
import Main from "./navigation";

import "antd/dist/antd.css";

function App() {
  // useEffect(() => {
  //   Firebase.initializeApp(config);
  // }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
