// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BreakActions, PastActions } from "../../redux/actions";
// import { Button } from "antd";
// import { store } from "../../redux";
// import FruitNinja from "../../components/fruit_ninja";

// var s1 = {
//   height: "100vh",
//   width: "100vw",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };
// //TO-DO: add style
// const FruitNinjaScreen = () => {
//   const [complte, setComplete] = useState(false);
//   const [scores, setScore] = useState([]);
//   let dispatch = useDispatch();
//   console.log("sc", scores);
//   if (complte) {
//     return (
//       <div style={{ backgroundColor: "white", padding: "3%" }}>
//         {scores.length < 3 ? (
//           <Button
//             onClick={() => {
//               setComplete(false);
//             }}
//           >
//             Continue
//           </Button>
//         ) : (
//           <Button
//             onClick={() => {
//               dispatch(BreakActions.startBreak());
//             }}
//           >
//             Take Break
//           </Button>
//         )}
//       </div>
//     );
//   } else {
//     return (
//       <div style={{ backgroundColor: "white", padding: "3%" }}>
//         <FruitNinja
//           timelimit={10}
//           version={1}
//           bpi={5}
//           style={s1}
//           onComplete={(score) => {
//             //   setStage({ ...stage, stroop: 2, scores: [...stage.scores, score] });
//             let tempArray = [...scores];
//             tempArray.push(score);
//             setScore(tempArray);
//             setComplete(true);
//           }}
//         />
//       </div>
//     );
//   }
// };
// export default FruitNinjaScreen;
