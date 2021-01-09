<<<<<<< HEAD
  
=======
>>>>>>> 8be3e8ad544b28231d4ab354ff5712658390b989
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { testAction } from "../../redux/actions/test.action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./styles.css";

//import { AWClientService } from "../../services";
//let client=new AWClientService()
//client.getCurrentlyActiveWindow().then(console.log)
//client.getActiveWindows().then(console.log)
//client.getAFK().then(console.log)
//client.getAppTotalWithoutAudio().then(console.log)
//client.getAppTotalWithAudio().then(console.log)

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

<<<<<<< HEAD
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
=======
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
>>>>>>> 8be3e8ad544b28231d4ab354ff5712658390b989
