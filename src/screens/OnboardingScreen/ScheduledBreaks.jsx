import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input } from "antd";
import TimeField from "react-simple-timefield";

import "./styles.css";

const ScheduledBreakScreen = (props) => {
  const [breakArray, setBreakArray] = useState(["https://www.youtube.com"]);
  useEffect(() => {
    console.log("loo", breakArray);
  }, [breakArray]);
  //   console.log("loo", breakArray);

  return (
    <div className="step-container">
      <h1>Scheduled Breaks</h1>
      <div><p>From what time to what time are you in front of this screen?</p></div>
      <TimeField
        value={"  :  "} // {String}   required, format '00:00' or '00:00:00'
        // onChange={(event, value) => {...}} // {Function} required
        // input={<MyCustomInputElement />}   // {Element}  default: <input type="text" />
        // inputRef={(ref) => {...}}          // {Function} input's ref
        colon=":" // {String}   default: ":"
      />

      <p
        style={{
          textDecorationLine: "underline",
          marginTop: "2%",
          fontSize: "17px",
        }}
        onClick={() => {
          let tempArray = breakArray;
          let newNumber = Object.values(breakArray).length + 1;
          tempArray[newNumber] = "";
          console.log("asd", tempArray);
          setBreakArray(tempArray);
        }}
      >
        +Add a Break
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduledBreakScreen);
