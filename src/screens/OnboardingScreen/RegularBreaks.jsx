import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input } from "antd";

import "./styles.css";

const RegularBreakScreen = (props) => {
  const [breakArray, setBreakArray] = useState(["https://www.youtube.com"]);
  const [breakLength, setBreakLength] = useState(1);
  const [breakInterval, setBreakInterval] = useState(60);
  useEffect(() => {
    console.log("loo", breakArray);
  }, [breakArray]);
  //   console.log("loo", breakArray);

  return (
    <div className="step-container">
      <h1>Regular Breaks</h1>
      <div style={{ marginTop: "3%" }}>
        <p style={{ fontSize: "18px", marginBottom: "0" }}>
          How long would you like your breaks to be?
        </p>
        <div
          style={{
            marginTop: "1%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Input
            size="large"
            style={{ width: "10%", borderRadius: 5, verticalAlign: "center" }}
            placeholder="First Name"
            type="number"
            value={breakLength}
            onChange={(e) => {
              if (e.target.value > 0) setBreakLength(e.target.value);
            }}
          />
          <p style={{ marginTop: "1%", marginLeft: "1%", fontSize: "15px" }}>
            minutes
          </p>
        </div>
      </div>
      <div style={{ marginTop: "3%" }}>
        <p style={{ fontSize: "18px", marginBottom: "0" }}>
          After how long would you like to take regular breaks?
        </p>
        <div
          style={{
            marginTop: "1%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Input
            size="large"
            style={{ width: "10%", borderRadius: 5, verticalAlign: "center" }}
            placeholder="First Name"
            type="number"
            value={breakInterval}
            onChange={(e) => {
              if (e.target.value > 0 && e.target.value < 61)
                setBreakInterval(e.target.value);
            }}
          />
          <p style={{ marginTop: "1%", marginLeft: "1%", fontSize: "15px" }}>
            minutes
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegularBreakScreen);
