import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import "./styles.css";



const renderTime = (time) => {
  let minutes=Math.floor(time/60)
  let seconds=time%60
  let min
  let sec
  if(minutes<10)
    min='0'+minutes;
  else
    min=minutes
  if(seconds<10)
    sec='0'+seconds;
  else
    sec=seconds;

  return (
    <div className="time-wrapper">
      <div className="time">{min+':'+sec}</div>
      <div className="subtime">minutes remaining</div>
    </div>
  );
};


export default function Timer(totaltime, startTime) {

    let timeElapsed = Math.ceil((new Date(startTime) - new Date()) / 1000)
    console.log('break duration is ' + totaltime)
    console.log('time elapsed is ' + timeElapsed)

  return (
  <CountdownCircleTimer
    initialRemainingTime={totaltime-timeElapsed}
    rotation='counterclockwise'
    size='350'
    isPlaying
    duration={totaltime}
    colors={[
      ['#004777', 0.33],
      ['#F7B801', 0.33],
      ['#A30000', 0.33],
    ]}
  >
    {({ remainingTime }) => renderTime(remainingTime)}
  </CountdownCircleTimer>
)
}

