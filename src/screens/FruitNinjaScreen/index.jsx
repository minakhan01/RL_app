import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BreakActions, PastActions } from "../../redux/actions";
import { Button } from "antd";
import { store } from "../../redux";
import Games from "../../components/Games";

const { ipcRenderer, remote } = window.require("electron");

var s1 = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
//TO-DO: add style
const FruitNinjaScreen = () => {
  const [complte, setComplete] = useState(false);
  const [scores, setScore] = useState([]);
  let dispatch = useDispatch();
  var order = Math.floor(Math.random() * 2);
  return (
    <Games
      order={0}
      status={"end"}
      onComplete={() => {
        //remove in mobile app
        // remote.getCurrentWindow().close();
      }}
    />
  );
};
export default FruitNinjaScreen;
