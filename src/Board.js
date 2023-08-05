import React, { useState } from "react";
import "./box.css";
import "./Board.css";
export const Board = () => {
  const [scores, setScores] = useState({ xScores: 0, oScores: 0 });
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlayer, setXPlayer] = useState(true);
  const [loading, setLoading] = useState(false);
  //The Conditions which The Player Will only Win If Achieve it
  const Winning_Conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const CheckWinner = (board) => {
    for (let i = 0; i < Winning_Conditions.length; i++) {
      const [x, y, z] = Winning_Conditions[i];

      // Iterate through win conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
  };
  //Reset the board to be empty and play another round
  const Reset = () => {
    setBoard(Array(9).fill(null));
    setScores({ xScores: 0, oScores: 0 });
  };
  //OnClick Function Is To Write X or O on The box
  const OnClick = (boxindex) => {
    const HandleClick = board.map((each, index) => {
      if ((boxindex === index) & (each === null)) {
        if (xPlayer) {
          return "X";
        } else {
          return "O";
        }
      } else return each;
    });

    setBoard(HandleClick);
    //check who is the winner and increase his score
    const Winner = CheckWinner(HandleClick);
    if (Winner) {
      if (Winner === "O") {
        let { oScores } = scores;
        oScores += 1;
        setScores({ ...scores, oScores });
      }
      if (Winner === "X") {
        let { xScores } = scores;
        xScores += 1;
        setScores({ ...scores, xScores });
      }
      setLoading(true);
      //Give A small period of time to start the next round
      setTimeout(Clear, 1500);
    }
    setXPlayer(!xPlayer);
    console.log(scores);
  };
  //Function To clear th board
  const Clear = () => {
    setBoard(Array(9).fill(null));
    setLoading(false);
  };
  return (
    <>
      {loading && <div className="Loading">Loading Next Round.....</div>}
      <div className="scores">
        <div className={xPlayer && "xscores"}>X - {scores.xScores}</div>
        <div className={!xPlayer && "oscores"}>O - {scores.oScores}</div>
      </div>
      <div className="board">
        {board.map((box, boxindex) => {
          return (
            <button
              className={board[boxindex] === "X" ? "box x" : "box o"}
              onClick={() => OnClick(boxindex)}
              key={boxindex}
            >
              {board[boxindex]}
            </button>
          );
        })}
      </div>
      <button onClick={Reset} className="Reset">
        {" "}
        Reset
      </button>
    </>
  );
};
