import React from "react";
import Stroop from "@orcatech/react-neuropsych-stroop";
import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function StroopTest(props) {
  const [count, setCount] = useState({
    total: 0,
    score: 0,
    lastResult: "",
    words: [],
    colors: [],
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     props.onComplete(count.score);
  //     return <>Test completed. The score is {count.score}</>;
  //   }, 10000);
  // }, []);

  if (count.colors.length == 0) {
    var words = [
      "purple",
      "black",
      "green",
      "red",
      "blue",
      "orange",
      "pink",
      "yellow",
    ];
    var words2 = [...words];
    var colors = [
      "9370D8",
      "000000",
      "009900",
      "ff0000",
      "000099",
      "EE7600",
      "FF69B4",
      "FFFF00",
    ];
    var colors2 = [...colors];

    words2 = words.slice(0, props.len || 4);
    colors2 = colors.slice(0, props.len || 4);

    words = [...words2];
    colors = [...colors];

    shuffleArray(words2);
    colors2 = [];
    words2.forEach((word) => {
      colors2.push(colors[words.indexOf(word)]);
    });

    setCount({ ...count, words: words2, colors: colors2 });
  }

  var words = count.words;
  var colors = count.colors;

  const combos = [
    {
      word: Math.floor(Math.random() * words.length),
      color: Math.floor(Math.random() * words.length),
    },
  ];

  var onComplete = (data) => {
    // handle test completion
    const { errors, successes, begin, finish, timeLimitReached } = data;
    //setCount({ ...count, total: count.total + 1 })
  };

  var onSuccess = (data) => {
    setCount({
      ...count,
      total: count.total + 1,
      score: count.score + 1,
      lastResult: "Correct!",
    });
    // handle each success that occurs
  };

  var onError = (data) => {
    setCount({ ...count, total: count.total + 1, lastResult: "Wrong!" });
    // handle each error that occurs
  };
  if (count.total == 3) {
      props.onComplete(count.score)
      return <>Test completed. The score is {count.score}</>
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      key={count.total}
    >
      <div>Question {count.total + 1}</div>
      <CountdownCircleTimer
        onComplete={() => {
          setCount({
            ...count,
            total: count.total + 1,
            lastResult: "Out of time!",
          });
        }}
        isPlaying
        duration={10}
        size={100}
        colors="#000000"
        strokeWidth={6}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>

      <Stroop
        buttonsPerRow={words.length / 2}
        colors={colors}
        combos={combos}
        onComplete={onComplete}
        onError={onError}
        onSuccess={onSuccess}
        words={words}
        incorrectMessage="Incorrect!"
        completionMessage="Out of time!"
        timeLimit={30000}
      />
      <div>{count.lastResult}</div>
      <div>{count.score}</div>
    </div>
  );
}

export default StroopTest;
