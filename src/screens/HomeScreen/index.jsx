import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { testAction } from "../../redux/actions/test.action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./styles.css";

const HomeScreen = (props) => {
  const history = useHistory();
  useEffect(() => {
    // props._testAction();
  }, []);
  return <div>Hello world {props.test.value}</div>;
};

const mapStateToProps = (state) => {
  return { test: state.test };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      _testAction: testAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
