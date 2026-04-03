import React, { useState } from "react";
import "./Journey.css";

const messages = [
  "Our journey started fhfgjjhbhjhiu iuu uuoig iuiu  u ioiu5ouoirt  joioir6 oio  oioi oi 6oioio oi o oi  o  oi oioihohto t ❤️",
  "First smile hgiutuihhgthtriuhbihbijhibh  ho o h h  i oi o i ohoi h h jh jh o  ehhc j nkjnj jjjjjjjjjjjjjjjj errrrrrrrrrr eeeeeeeeeeeeee ewwwwwwwwwwww eeeeeeer we           4e4 e4322222222 4  h hoi h hi  😊",
  "First talk 💬",
  "First memory 📸",
  "Best day ever 🌸",
  "Lots of fun 😂",
  "Little fights 😅",
  "Strong bond 💕",
  "Forever together 🤝",
  "We made it ❤️🔥"
];

function Journey({next}) {
  const [step, setStep] = useState(0);
  const [showMsg, setShowMsg] = useState(false);
  const [finish, setFinish] = useState(false);

  const positions = [
    { x: 10, y: 15 },
    { x: 30, y: 11 },
    { x: 55, y: 9 },
    { x: 70, y: 14 },
    { x: 55, y: 48 },
    { x: 30, y: 53 },
    { x: 17.4, y: 65 },
    { x: 34, y: 84 },
    { x: 54, y: 86.2 },
    { x: 75, y: 90.7 }
  ];

  const moveCar = () => {
    setStep((prev) => {
      if (prev < positions.length - 1) {
        setShowMsg(true);
        return prev + 1;
      } else {
        setFinish(true);
        return prev;
      }
    });
  };

  return (
    <div className="journey-container">
      {/* 💖 Hearts */}
      <div className="hearts">

        {/* 💖 BIG RANDOM HEARTS */}
        {[...Array(8)].map((_, i) => {
          const isLeft = i % 2 === 0;

          return (
            <div
              key={i}
              className="big-heart"
              style={{
                left: isLeft ? `${Math.random() * 30}%` : "auto",
                right: !isLeft ? `${Math.random() * 30}%` : "auto",
                animationDuration: `${6 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          );
        })}

        {/* 💖 SMALL HEARTS */}
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></span>
        ))}
      </div>

      {/* 🛣️ SAME TRACK (ONLY CENTERED) */}
      <svg 
        className="track-svg" 
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >

        <path
          d="
            M -30 15
            C 40 10, 70 0, 115 25
            S 60 40, 10 50
            S 0 80, 35 80
            S 70 85, 100 85
          "
          stroke="#111"
          strokeWidth="12"
          fill="transparent"
          strokeLinecap="round"
        />

        <path
          d="
            M -30 15
            C 40 10, 70 0, 115 25
            S 60 40, 10 50
            S 0 80, 35 80
            S 70 85, 100 85
          "
          stroke="white"
          strokeWidth="3"
          fill="transparent"
        />

        <path
          d="
            M -30 15
            C 40 10, 70 0, 115 25
            S 60 40, 10 50
            S 0 80, 35 80
            S 70 85, 100 85
          "
          stroke="yellow"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray="5 5"
        />

      </svg>

      {/* 🔴 POINTS */}
      {positions.map((pos, i) => (
        <div
          key={i}
          className={`point ${i <= step ? "active" : ""}`}
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`
          }}
        />
      ))}

      {/* 🚗 CAR */}
      <div
        className="car"
        style={{
          left: `${positions[step].x}%`,
          top: `${positions[step].y}%`
        }}
      >
        (OUR JOURNEY)🚗
      </div>

      {/* 💬 POPUP */}
      {showMsg && !finish && (
        <div className="popup" onClick={() => setShowMsg(false)}>
          {messages[step]}
        </div>
      )}

      {/* 🎉 FINISH */}
      {finish && (
      <div className="finish-screen">
        <h1>🏁 Finished 🎉</h1>
        <p>You are my best journey ❤️</p>
        <div className="blast">💥 💖 💥 💖 💥</div>

        {/* ✅ NEW NEXT BUTTON */}
        <button className="enter-btn" onClick={next}>
        💌 Enter
       </button>
      </div>
    )}

      {/* GO BUTTON */}
      {!finish && (
        <button className="move-btn" onClick={moveCar}>
          GO 🚗
        </button>
      )}

    </div>
  );
}

export default Journey;