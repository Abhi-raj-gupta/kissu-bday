import React, { useState } from "react";
import "./LoveLetter.css";

function Envelope({next}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="envelope-container">

      {/* 🎈 BACKGROUND DECOR */}
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


      {/* ✨ TITLE */}
      {!open && <h1 className="surprise-text">🎁 Surprise 🎁</h1>}

      {!open ? (
        <div
          className="envelope"
          onClick={() => setOpen(true)}
        >
          <div className="flap"></div>
          <div className="body1"></div>
          <div className="seal">❤</div>
        </div>
      ) : (
        <div className="letter">
          <div className="letter-page">
            <h1>My Love 💖</h1>
            <p>
              You are the most beautiful part of my life.  
              Every moment with you feels like a dream.  
              I love you more than words can express ❤️  
              <br /><br />
              You make my world brighter and happier 🌍✨  
              <br /><br />
              I promise to stay with you forever 💕  
              <br /><br />
              <b>Forever Yours ❤️</b>
            </p>

            {/* 💌 ENTER BUTTON */}
            <button className="enter-btn" onClick={next}>
              💌 Enter
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Envelope;