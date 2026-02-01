import { useState, useRef } from "react";
import Confetti from "react-confetti";
import "./App.css";
import song from "./song.mp3";
import valentineImg from "./valentine.gif";

const noMessages = [
  "No",
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

  const yesRef = useRef(null);
  const containerRef = useRef(null);

  // Track if NO button has started moving freely
  const [noAbsolute, setNoAbsolute] = useState(false);
  const [position, setPosition] = useState({ top: "0%", left: "0%" });

  const handleNoClick = () => {
    setNoCount((c) => c + 1);
    setYesScale((s) => s + 0.1);

    // On first click, convert NO to absolute position for random movement
    if (!noAbsolute && yesRef.current && containerRef.current) {
      const yesRect = yesRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setPosition({
        top: `${((yesRect.top + yesRect.height / 2 - containerRect.top) / containerRect.height) * 100}%`,
        left: `${((yesRect.right + 10 - containerRect.left) / containerRect.width) * 100}%`,
      });

      setNoAbsolute(true);
    } else if (noAbsolute && yesRef.current && containerRef.current) {
      const yesRect = yesRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      let left, top;
      const buttonWidth = 140;
      const buttonHeight = 50;
      let attempts = 0;

      do {
        left = Math.random() * (containerRect.width - buttonWidth);
        top = Math.random() * (containerRect.height - buttonHeight);
        attempts++;
        if (attempts > 100) break;
      } while (
        left + buttonWidth > yesRect.left &&
        left < yesRect.right &&
        top + buttonHeight > yesRect.top &&
        top < yesRect.bottom
      );

      setPosition({
        top: `${(top / containerRect.height) * 100}%`,
        left: `${(left / containerRect.width) * 100}%`,
      });
    }

    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleYesClick = () => {
    setAccepted(true);
    new Audio(song).play();
  };

  return (
    <div ref={containerRef} className={`container ${shake ? "shake" : ""}`}>
      {accepted && <Confetti />}

      {!accepted ? (
        <>
          <img
            src={valentineImg}
            alt="Will you be my Valentine?"
            className="valentine-img"
          />

          <h1>Will you be my Valentine? 💘</h1>

          <div className="buttons-wrapper">
            <button
              ref={yesRef}
              className="yes"
              style={{ transform: `scale(${yesScale})` }}
              onClick={handleYesClick}
            >
              YES 💖
            </button>

            <button
              className="no"
              style={
                noAbsolute
                  ? { position: "absolute", top: position.top, left: position.left }
                  : {}
              }
              onClick={handleNoClick}
            >
              {noMessages[noCount % noMessages.length]}
            </button>
          </div>
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
