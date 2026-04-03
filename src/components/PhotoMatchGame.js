import React, { useState } from "react";
import "./PhotoMatchGame.css";

// 🔥 Apni 18 photos
import m1 from "../assets/m1.jpg";
import m2 from "../assets/m2.jpg";
import m3 from "../assets/m3.jpg";
import m4 from "../assets/m4.jpg";
import m5 from "../assets/m5.jpg";
import m6 from "../assets/m6.jpg";
import m7 from "../assets/m7.jpg";
import m8 from "../assets/m8.jpg";
import m9 from "../assets/m9.jpg";
import m10 from "../assets/m10.jpg";
import m11 from "../assets/m11.jpg";
import m12 from "../assets/m12.jpg";
import m13 from "../assets/m13.jpg";
import m14 from "../assets/m14.jpg";
import m15 from "../assets/m15.jpg";
import m16 from "../assets/m16.jpg";
import m17 from "../assets/m17.jpg";
import m18 from "../assets/m18.jpg";

// 💖 Uski 18 photos
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.jpg";
import h3 from "../assets/h3.jpg";
import h4 from "../assets/h4.jpg";
import h5 from "../assets/h5.jpg";
import h6 from "../assets/h6.jpg";
import h7 from "../assets/h7.jpg";
import h8 from "../assets/h8.jpg";
import h9 from "../assets/h9.jpg";
import h10 from "../assets/h10.jpg";
import h11 from "../assets/h11.jpg";
import h12 from "../assets/h12.jpg";
import h13 from "../assets/h13.jpg";
import h14 from "../assets/h14.jpg";
import h15 from "../assets/h15.jpg";
import h16 from "../assets/h16.jpg";
import h17 from "../assets/h17.jpg";
import h18 from "../assets/h18.jpg";

// 🔥 Combine with type
const allPhotos = [
  { img: m1, type: "me" }, { img: m2, type: "me" }, { img: m3, type: "me" },
  { img: m4, type: "me" }, { img: m5, type: "me" }, { img: m6, type: "me" },
  { img: m7, type: "me" }, { img: m8, type: "me" }, { img: m9, type: "me" },
  { img: m10, type: "me" }, { img: m11, type: "me" }, { img: m12, type: "me" },
  { img: m13, type: "me" }, { img: m14, type: "me" }, { img: m15, type: "me" },
  { img: m16, type: "me" }, { img: m17, type: "me" }, { img: m18, type: "me" },

  { img: h1, type: "her" }, { img: h2, type: "her" }, { img: h3, type: "her" },
  { img: h4, type: "her" }, { img: h5, type: "her" }, { img: h6, type: "her" },
  { img: h7, type: "her" }, { img: h8, type: "her" }, { img: h9, type: "her" },
  { img: h10, type: "her" }, { img: h11, type: "her" }, { img: h12, type: "her" },
  { img: h13, type: "her" }, { img: h14, type: "her" }, { img: h15, type: "her" },
  { img: h16, type: "her" }, { img: h17, type: "her" }, { img: h18, type: "her" },
];

// 🔄 shuffle function
const shuffleCards = () => {
  return allPhotos
    .map((item, index) => ({ id: index, ...item }))
    .sort(() => Math.random() - 0.5);
};

function PhotoMatchGame({ next }) {
  const [cards, setCards] = useState(shuffleCards());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [message, setMessage] = useState("");

  const handleClick = (card) => {
    if (flipped.length === 2) return;
    if (flipped.includes(card)) return;
    if (matched.includes(card)) return;

    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;

      if (first.type !== second.type) {
        setMessage("❤️ Congratulations ❤️");
        setMatched((prev) => [...prev, first, second]);

        setTimeout(() => {
          setFlipped([]);
          setMessage("");
        }, 800);
      } else {
        setMessage("😂 Bhaklol 😂");

        setTimeout(() => {
          setFlipped([]);
          setMessage("");
        }, 800);
      }
    }
  };

  // 🔄 reshuffle
  const reshuffleGame = () => {
    setCards(shuffleCards());
    setFlipped([]);
    setMatched([]);
    setMessage("");
  };

  return (
    <div className="game-container">
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

      <h2>💖 Find the Perfect Match 💖</h2>

      <div className="grid">
        {cards.map((card) => (
          <div key={card.id} className="card" onClick={() => handleClick(card)}>
            {flipped.includes(card) || matched.includes(card) ? (
              <img src={card.img} alt="pic" />
            ) : (
              <div className="back">❤️</div>
            )}
          </div>
        ))}
      </div>

      {message && <h3 className="message">{message}</h3>}

      {matched.length === 36 && (
        <div className="win-container">
          <h2>💖 Kitna Acha Jori h 💖</h2>

          <button className="enter-btn"onClick={reshuffleGame}>🔄 Reshuffle</button>
          <button className="enter-btn" onClick={next}>
          💌 Enter
          </button>
        </div>
      )}
    </div>
  );
}

export default PhotoMatchGame;