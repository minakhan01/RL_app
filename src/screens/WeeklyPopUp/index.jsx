import React, { useState, useEffect } from "react";
import { PastActions } from "../../redux/actions";
import { Button, Input, Checkbox, message } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const { TextArea } = Input;

const WeeklyPopUp = (props) => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState({});
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingBottom: "5%",
      }}
    >
      <h1>Take Weekly Survey</h1>

      <Button
        style={{ marginTop: "2%" }}
        onClick={() => {
          props.setWeeklyRem(false);
          history.push("/weekq");
        }}
      >
        Now
      </Button>
      <Button
        style={{ marginTop: "2%" }}
        onClick={() => {
          props.setWeeklyRem(false);
          history.push("/home");
        }}
      >
        Later
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { break: state.break, past: state.past };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setWeeklyRem: PastActions.setWeeklyRem }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyPopUp);
