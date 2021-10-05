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
import Angry from "../../assets/angry.jpg";
import Alarmed from "../../assets/alarmed.jpg";
import Aroused from "../../assets/aroused.jpg";
import Afraid from "../../assets/afraid.jpg";
import Tense from "../../assets/tense.jpg";
import Distressed from "../../assets/distressed.jpg";
import Annoyed from "../../assets/annoyed.jpg";
import Frustrated from "../../assets/frustrated.jpg";
import Miserable from "../../assets/miserable.jpg";
import Depressed from "../../assets/depressed.jpg";
import Sad from "../../assets/sad.jpg";
import Gloomy from "../../assets/gloomy.jpg";
import Bored from "../../assets/bored.jpg";
import Droopy from "../../assets/drowsy.jpg";
import Tired from "../../assets/tired.jpg";
import Excited from "../../assets/excited.jpg";
import Astonished from "../../assets/astonished.jpg";
import Delighted from "../../assets/delighted.jpg";
import Glad from "../../assets/glad.jpg";
import Happy from "../../assets/happy.jpg";
import Pleased from "../../assets/pleased.jpg";
import Satisfied from "../../assets/satisfied.jpg";
import Content from "../../assets/content.jpg";
import Serene from "../../assets/tranquil.jpg";
import Calm from "../../assets/calm.jpg";
import At_ease from "../../assets/at_ease.jpg";
import Relaxed from "../../assets/relaxed.jpg";
import Sleepy from "../../assets/sleepy.jpg";

import "./styles.css"

const BreakFeedbackScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [selected, setSelected] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const history = useHistory();
  let mounted = true;
  const dispatch = useDispatch();
  const emotions = {
    angry: Angry,
    alarmed: Alarmed,
    aroused: Aroused,
    afraid: Afraid,
    tense: Tense,
    distressed: Distressed,
    annoyed: Annoyed,
    frustrated: Frustrated,
    miserable: Miserable,
    depressed: Depressed,
    sad: Sad,
    gloomy: Gloomy,
    bored: Bored,
    droopy: Droopy,
    tired: Tired,
    excited: Excited,
    astonished: Astonished,
    delighted: Delighted,
    glad: Glad,
    happy: Happy,
    pleased: Pleased,
    satisfied: Satisfied,
    content: Content,
    serene: Serene,
    calm: Calm,
    at_ease: At_ease,
    relaxed: Relaxed,
    sleepy: Sleepy,
  };

  useEffect(() => {
    let shuf = shuffleArray(Object.keys(emotions));
    setShuffled(shuf);
  }, []);

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

  if (loading) {
    return (
      <div className="break-div" style={{ backgroundColor: "white" }}>
        <p style={{ textAlign: "center", fontSize: "20px",color:"black" }}>
          Choose the images that best represent your emotional state right now
        </p>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {shuffled.map((item, index) => {
            return (
              <div
                style={{
                  padding: "1%",
                  backgroundColor: selected.includes(item.toString())
                    ? "green"
                    : "white",
                }}
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
              >
                <img src={emotions[item]} width="150px" height="150px" />
              </div>
            );
          })}
        </div>
        <Button
          onClick={() => {
            setLoading(false);
          }}
        >
          Next
        </Button>
      </div>
    );
  } else {
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
        <div className="break-completed-text">
          Break completed successfully!
        </div>

        <div className="feedback-request-text">How was helpful this break?</div>

        <div className="break-feedback">
          {getImageButton(1, rate, setRate, mounted)}
          {getImageButton(2, rate, setRate, mounted)}
          {getImageButton(3, rate, setRate, mounted)}
          {getImageButton(4, rate, setRate, mounted)}
          {getImageButton(5, rate, setRate, mounted)}
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
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreakFeedbackScreen);
