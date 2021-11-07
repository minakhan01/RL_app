import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import { AWClientService } from "../../services";
import {
  BreakActions,
  PastActions,
  OnboardingActions,
} from "../../redux/actions";
import { store } from "../../redux";

import "./styles.css";

const BreakFeedbackScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [nexpage, setNext] = useState("");
  const [selected, setSelected] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const number_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const panas_emotions = [
    "Interested",
    "Distressed",
    "Excited",
    "Upset",
    "Strong",
    "Determined",
    "Guilty",
    "Scared",
    "Hostile",
    "Enthusiastic",
    "Proud",
    "Attentive",
    "Jittery",
    "Irritable",
    "Alert",
    "Ashamed",
    "Inspired",
    "Nervous",
    "Afraid",
    "Active",
  ];
  const history = useHistory();
  let mounted = true;
  const dispatch = useDispatch();

  let getImageButton = (points, rate, setRate, mounted) => {
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
        panas: selected,
        user: props.onboarding.user._id,
        suddenReason: breakState.suddenReason,
        skipped: breakState.skipped,
        prefeedbackScore: breakState.prebreakScore,
        prefeedbackText: breakState.prebreakText,
        maxMinTrack: breakState.maxMinTrack,
        prepanas: breakState.prepanas,
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
        if (props.onboarding.user.token.length > 0) {
          let expiryTime = new Date(props.onboarding.user.expiry);
          let current = new Date();
          let authToken = props.onboarding.user.token;
          if (expiryTime < current) {
            let res = await axios.post(
              `https://thepallab.com/api/user/refresh`,
              {
                _id: props.onboarding.user._id,
              }
            );
            props.loginUserAction(res.data.user);
            authToken = res.data.user.token;
          }
          let calendarList = await axios.get(
            "https://www.googleapis.com/calendar/v3/users/me/calendarList",

            {
              params: {
                pageSize: 100,
                pageToken: nexpage,
              },
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
              },
            }
          );
          let items = calendarList.data.items;
          let callInfo = {};
          for (let item of items) {
            if (item.primary) {
              callInfo = item;
            }
          }
          if (callInfo.id) {
            let today = new Date(breakState.breakStartTime);
            let tomorrow = new Date();
            try {
              let insertCal = await axios.post(
                `https://www.googleapis.com/calendar/v3/calendars/${callInfo.id}/events`,
                {
                  end: { dateTime: tomorrow, timeZone: callInfo.timeZone },
                  start: { dateTime: today, timeZone: callInfo.timeZone },
                  summary: `${breakState.breakType} break taken on PAL`,
                  description: `You took a ${breakState.breakType} break on PAL`,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                  },
                }
              );
            } catch (error) {
              console.log("err", error);
            }
          }
        }
        delete dat.breakState;
        delete dat.windowChanged;
        dispatch(PastActions.saveBreakData(dat));
        dispatch(BreakActions.closeBreakScreen());
      }
    }
  };

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  // if (loading) {
  //   return (
  //     <div className="break-div" style={{ backgroundColor: "black" }}>
  //       <p style={{ textAlign: "center", fontSize: "20px", color: "white" }}>
  //         Choose the images that best represent your emotional state right now
  //       </p>
  //       <div
  //         style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
  //       >
  //         {panas_emotions.map((item, index) => {
  //           return (
  //             <div
  //               style={{
  //                 padding: "1%",
  //                 backgroundColor: selected.includes(item.toString())
  //                   ? "green"
  //                   : "black",
  //               }}
  //               onClick={() => {
  //                 let tempSelected = [...selected];
  //                 if (tempSelected.includes(item.toString())) {
  //                   let tempIndex = tempSelected.indexOf(item.toString());
  //                   tempSelected.splice(tempIndex, 1);
  //                 } else {
  //                   tempSelected.push(item.toString());
  //                 }
  //                 setSelected(tempSelected);
  //               }}
  //             >
  //               <img src={emotions[item]} width="130px" height="130px" />
  //             </div>
  //           );
  //         })}
  //       </div>
  //       <Button
  //         onClick={() => {
  //           setLoading(false);
  //         }}
  //       >
  //         Next
  //       </Button>
  //     </div>
  //   );
  // } else {
  return (
    <div className="break-div">
      {/* <button
          className="close-break"
          onClick={() => {
            addBreakInfo();
          }}
        >
          <div>&#10006;</div>
          <div className="save-button-text">Save feedback and close</div>
        </button> */}
      <div className="break-completed-text">Break completed successfully!</div>

      <div className="feedback-request-text">How was helpful this break?</div>

      <div className="break-feedback">
        {number_array.map((item, index) => {
          return getImageButton(item + 1, rate, setRate, mounted);
        })}

        {/* {getImageButton(2, rate, setRate, mounted)}
          {getImageButton(3, rate, setRate, mounted)}
          {getImageButton(4, rate, setRate, mounted)}
          {getImageButton(5, rate, setRate, mounted)} */}
      </div>

      <div className="feedback-request-text" style={{ marginTop: "1%" }}>
        How do you feel now (after the break)?
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginRight: "15%",
          marginLeft: "15%",
          justifyContent: "center",
          marginBottom: "3%",
        }}
      >
        {panas_emotions.map((item, index) => {
          return (
            <Button
              onClick={() => {
                let tempSelected = [...selected];
                if (tempSelected.includes(item.toString())) {
                  let tempIndex = tempSelected.indexOf(item.toString());
                  tempSelected.splice(tempIndex, 1);
                } else {
                  tempSelected.push(item.toString());
                }
                setSelected(tempSelected);
              }}
              style={{
                margin: "2px",
                backgroundColor: selected.includes(item.toString())
                  ? "green"
                  : "white",
                color: selected.includes(item.toString()) ? "white" : "black",
                border: 0,
                outline: "none",
              }}
            >
              {item}
            </Button>
          );
        })}
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
        <div className="floating-label">
          Why was this break helpful/unhelpful?
        </div>
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
      <Button
        style={{ marginTop: "3%" }}
        onClick={() => {
          addBreakInfo();
        }}
      >
        Save feedback and close
      </Button>
    </div>
  );
  // }
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { loginUserAction: OnboardingActions.loginUser },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreakFeedbackScreen);
