import React from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

//import { AWClientService } from "../../services";
//let client=new AWClientService()
//client.getCurrentlyActiveWindow().then(console.log)
//client.getActiveWindows().then(console.log)
//client.getAFK().then(console.log)
//client.getAppTotalWithoutAudio().then(console.log)
//client.getAppTotalWithAudio().then(console.log)

const HomeScreen = () => {
  const history = useHistory();
  return <div>Hello world</div>;
};




export default HomeScreen;
