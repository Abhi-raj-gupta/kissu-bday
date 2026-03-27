import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function Surprise({ next }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerText = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 5000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const blast = () => {
    confetti({
      particleCount: 200,
      spread: 120,
    });
  };

  return (
    <div className="center">
      <h2>Click for Surprise 🎁</h2>

      <button
        onClick={() => {
          setShow(true);
          blast();
        }}
      >
        Click Me 💖
      </button>

      {show && <h1>❤️ I LOVE YOU ❤️</h1>}

      <br />
      <button onClick={next}>Final ➡️</button>
    </div>
  );
}