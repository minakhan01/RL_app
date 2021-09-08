import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { BreakActions, PastActions } from "../../redux/actions";
import { Button } from "antd";

//TO-DO: add style
const PopupScreen = () => {
  let dispatch = useDispatch();
  return (
    <div style={{ backgroundColor: "white", padding: "3%" }}>
      <div
        style={{
          color: "#7DCAB6",
          fontSize: "22px",
          textAlign: "center",
        }}
      >
        It's time to break!
      </div>
      <div style={{ paddingTop: "3%", fontSize: "15px" }}>
        Should we get started? This break will start automatically if you ignore
        this pop up
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: "10%",
        }}
      >
        <Button
          onClick={() => dispatch(BreakActions.cancelBreak())}
          style={{ color: "#7DCAB6", borderWidth: 0 }}
        >
          CANCEL
        </Button>
        <Button
          onClick={() => dispatch(BreakActions.startBreak())}
          style={{ color: "#7DCAB6", borderWidth: 0 }}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};
export default PopupScreen;
