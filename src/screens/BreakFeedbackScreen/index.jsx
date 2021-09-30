import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import { AWClientService } from "../../services";
import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";
import s1 from "../../assets/s1.png";
import s2 from "../../assets/s2.png";
import s3 from "../../assets/s3.png";
import s4 from "../../assets/s4.png";
import s5 from "../../assets/s5.png";

import s1y from "../../assets/s1y.png";
import s2y from "../../assets/s2y.png";
import s3y from "../../assets/s3y.png";
import s4y from "../../assets/s4y.png";
import s5y from "../../assets/s5y.png";

const BreakFeedbackScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const history = useHistory();
  let mounted = true;
  const dispatch = useDispatch();

  let getImageButton = (name, name2, points, rate, setRate, mounted) => {
    if (points == rate)
      return (
        <div className="responsive">
          <div className="gallery">
            <button
              className="feedback-button"
              onClick={() => {
                if (mounted) setRate(points);
              }}
            >
              <p style={{ fontSize: "50px" }}>{points - 1}</p>
            </button>
          </div>
        </div>
      );
    else
      return (
        <div className="responsive">
          <div className="gallery">
            <button
              className="feedback-button"
              onClick={() => {
                if (mounted) setRate(points);
              }}
            >
              <p style={{ fontSize: "50px", opacity: "0.5" }}>{points - 1}</p>
            </button>
          </div>
        </div>
      );
  };

  const addBreakInfo = async () => {
    let breakState = store.getState().break;
    if (props.onboarding.user && props.onboarding.user._id) {
      let body = {
        prebreakScores: breakState.prebreakScores,
        postbreakScores: breakState.postbreakScores,
        startTime: breakState.breakStartTime,
        endTime: new Date(),
        type: breakState.breakType,
        feedbackScore: rate,
        feedbackText: feedbackText,
        panas: [],
        user: props.onboarding.user._id,
        suddenReason: breakState.suddenReason,
      };
      let response = await axios.post(
        "https://thepallab.com/api/user/break",
        body
      );
      if (response.data.message === "Successful Added") {
        let dat = {
          ...store.getState().break,
          breakEndTime: new Date(),
          rating: rate,
          notes: feedbackText,
        };
        delete dat.breakState;
        delete dat.windowChanged;
        dispatch(PastActions.saveBreakData(dat));
        dispatch(BreakActions.closeBreakScreen());
      }
    }
  };

  return (
    <div className="break-div">
      <button
        className="close-break"
        onClick={() => {
          addBreakInfo();
        }}
      >
        <div>&#10006;</div>
        <div className="save-button-text">Save feedback and close</div>
      </button>
      <div className="break-completed-text">Break completed successfully!</div>

      <div className="feedback-request-text">How was helpful this break?</div>

      <div className="break-feedback">
        {getImageButton(s5, s5y, 1, rate, setRate, mounted)}
        {getImageButton(s4, s4y, 2, rate, setRate, mounted)}
        {getImageButton(s3, s3y, 3, rate, setRate, mounted)}
        {getImageButton(s2, s2y, 4, rate, setRate, mounted)}
        {getImageButton(s1, s1y, 5, rate, setRate, mounted)}
      </div>

      {/* <div style={{ display: "flex" }}>
        <div style={{ width: "7vw", textAlign: "left", paddingLeft: "0vw" }}>
          Not Helpful
        </div>
        <div style={{ width: "28vw" }} />
        <div style={{ width: "4vw", textAlign: "right", paddingRight: "1vw" }}>
          Helpful
        </div>
      </div> */}

      <div className="feedback-text-box">
        <div className="floating-label">Why was this break helpful/unhelpful?</div>
        <textarea
          onChange={(event) => {
            if (mounted) setFeedbackText(event.target.value);
          }}
          data-role="none"
          rows="3"
          cols="80"
          placeholder="Type in here any notes or reflections about the break that you would like to save"
          className="feedback-text"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreakFeedbackScreen);
