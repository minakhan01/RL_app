import "./styles.css";
import { BreakActions, PastActions } from "../redux/actions";
import exitFullscreen from "../assets/exit-fullscreen.png";
import fullscreen from "../assets/fullscreen.png";
import { store } from "../redux";
import { useEffect, useState } from "react";

export default function Toolbar(props) {
  let mounted = true;
  useEffect(() => {
    return () => {
      mounted = false;
    };
  });

  const [minsRem, setMinsRem] = useState(Math.ceil(props.totaltime / 60));
  setTimeout(() => {
    setMinsRem(minsRem - 1);
  }, 60000);
  let str;
  if (minsRem != 1) str = minsRem + " Minutes remaining";
  else str = minsRem + " Minute remaining";
  if (props.type === "minimize")
    return (
      <div className="toolbar">
        <div className="minutes-remaining">{str}</div>
        <button
          className="minimize-break2"
          onClick={() => {
            if (mounted) props.minimize(true);
            let date = new Date().toISOString();
            let curr = store.getState().break.maxMinTrack;
            curr.push({ type: "max", time: date });
            store.dispatch(BreakActions.setMaxMinTrack(curr));
          }}
        >
          <img
            src={exitFullscreen}
            alt="Mountains"
            width="70"
            height="70"
          ></img>
        </button>
        <button
          className="close-break2"
          onClick={() => {
            store.dispatch(BreakActions.startFruit());
          }}
        >
          &#10006;
        </button>
      </div>
    );
  else
    return (
      <div className="toolbar2">
        <div className="minutes-remaining2">{str}</div>
        <div className="break-text-min">{props.message}</div>
        <div>
          <button
            className="minimize-break3"
            onClick={() => {
              if (mounted) props.minimize(false);
              let date = new Date().toISOString();
              let curr = store.getState().break.maxMinTrack;
              curr.push({ type: "min", time: date });
              store.dispatch(BreakActions.setMaxMinTrack(curr));
            }}
          >
            <img src={fullscreen} alt="Mountains" width="70" height="70"></img>
          </button>
        </div>
        <div>
          <button
            className="close-break3"
            onClick={() => {
              store.dispatch(BreakActions.startFruit());
            }}
          >
            &#10006;
          </button>
        </div>
      </div>
    );
}
