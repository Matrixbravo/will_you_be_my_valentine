import React, { useState } from "react";
import Confetti from "react-confetti";
import "./App.css";
import song from "./song.mp3";
import valentineImg from "./valentine.gif";

const noMessages = [
  "Are you sure?",
  "Really sure?",
  "Think again 🤔",
  "Don’t break my heart 💔",
  "Last chance 😢",
  "Okay stop clicking 😈",
];

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [shake, setShake] = useState(false);
  const [position, setPosition] = useState({ top: "60%", left: "50%" });

  const handleNoClick = () => {
    setNoCount((c) => c + 1);
    setYesScale((s) => s + 0.25);

    setPosition({
      top: Math.random() * 80 + "%",
      left: Math.random() * 80 + "%",
    });

    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleYesClick = () => {
    setAccepted(true);
    new Audio(song).play();
  };

  return (
    <div className={`container ${shake ? "shake" : ""}`}>
      {accepted && <Confetti />}

      {!accepted ? (
        <>
          <img
            src={valentineImg}
            alt="Will you be my Valentine?"
            className="valentine-img"
          />

          <h1>Will you be my Valentine? 💘</h1>

          <button
            className="yes"
            style={{ transform: `scale(${yesScale})` }}
            onClick={handleYesClick}
          >
            YES 💖
          </button>

          <button
            className="no"
            style={{ top: position.top, left: position.left }}
            onClick={handleNoClick}
          >
            {noMessages[noCount % noMessages.length]}
          </button>
        </>
      ) : (
        <div className="celebration">
          <h1>YAYYY 💕🎉</h1>
          <img
            src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
            alt="celebrate"
          />
          <p>You’re officially my Valentine 🥰</p>
        </div>
      )}
    </div>
  );
}

export default App;
