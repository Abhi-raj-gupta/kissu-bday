import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import "./Surprise.css";

import v1 from "../assets/v1.mp4";
import v2 from "../assets/v1.mp4";

import p1 from "../assets/s1.jpg";
import p2 from "../assets/s2.jpg";
import p3 from "../assets/s3.jpg";
import p4 from "../assets/s4.jpg";
import p5 from "../assets/s5.jpg";

export default function Surprise({ next }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [wrongPick, setWrongPick] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  const blast = () => confetti({ particleCount: 200, spread: 120 });

  const handlePlay = (current) => {
    if (current === "v1" && video2Ref.current) video2Ref.current.pause();
    if (current === "v2" && video1Ref.current) video1Ref.current.pause();
  };

  // 🔥 RANDOM CARDS
  useEffect(() => {
    const photos = [p1, p2, p3, p4, p5].map((p) => ({
      type: "photo",
      src: p,
    }));

    const items = [...photos, { type: "box" }];
    const shuffled = [...items].sort(() => Math.random() - 0.5);

    setCards(shuffled);
  }, []);

  const handleClick = (item, index) => {
    if (flipped.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    // ❌ WRONG PICK
    if (item.type === "photo") {
      setWrongPick(item.src);
    }

    // 🎁 LAST CARD → SURPRISE
    if (newFlipped.length === cards.length) {
      blast();
      setTimeout(() => setShowOptions(true), 600);
    }
  };

  return (
    <div className="center">
      <h2>🎁 Do You Want a Suprise 🎁</h2>
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

      {/* 🔥 GRID */}
      <div className="card-grid">
        {cards.map((item, i) => (
          <div
            key={i}
            className="flip-card"
            onClick={() => handleClick(item, i)}
          >
            <div className={`flip-inner ${flipped.includes(i) ? "flipped" : ""}`}>
              
              <div className="flip-front">❓</div>

              <div className="flip-back">
                {item.type === "photo" ? (
                  <img src={item.src} alt="" />
                ) : (
                  <div className="gift-box">🎁</div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ❌ WRONG POPUP */}
      {wrongPick && (
        <div className="photo-modal" onClick={() => setWrongPick(null)}>
          <div className="wrong-box">
            <h2>Ye Lo Surprise 😜</h2>
            <img src={wrongPick} alt="" />
            <p>Try Again ❤️</p>
          </div>
        </div>
      )}

      {/* 🎁 OPTIONS */}
      {showOptions && (
        <div className="option-modal">
          <h2>You found it ❤️</h2>

          <button
            onClick={() => {
              setShowOptions(false);
              setOpenVideo(true);
            }}
          >
             Ye Lo Apna Suprise
          </button>
        </div>
      )}

      {/* 🎥 VIDEO */}
      {openVideo && (
        <div className="video-modal">
          <div className="video-box">

            <div className="video-frame">
              <video
                ref={video1Ref}
                src={v1}
                controls
                onPlay={() => handlePlay("v1")}
              />
            </div>

            <div className="video-frame">
              <video
                ref={video2Ref}
                src={v2}
                controls
                onPlay={() => handlePlay("v2")}
              />
            </div>

            <button className="close-btn" onClick={() => setOpenVideo(false)}>
              ✖
            </button>

          </div>
        </div>
      )}

      <br />
      {/* 💌 ENTER BUTTON */}
      <button className="enter-btn" onClick={next}>
        💌 Next 
      </button>
    </div>
  );
}