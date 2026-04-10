import React, { useRef, useState } from "react";
import "./FinalPage.css";
import confetti from "canvas-confetti";
import myVideo from "../assets/v1.mp4";

const FinalPage = () => {
  const videoRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleVideoEnd = () => {
    // 💥 Blast effect
    confetti({
      particleCount: 250,
      spread: 150,
      origin: { y: 0.6 },
    });

    // ❤️ Show message
    setShowMessage(true);
  };

  return (
    <div className="final-container">

      {/* 📝 Top Text */}
      <h1 className="top-text">A Special Memory For You 💖</h1>

      {/* 🎬 Video Frame */}
      <div className="video-frame">
        <video
          ref={videoRef}
          src={myVideo}
          controls
          onEnded={handleVideoEnd}
        />
      </div>

      {/* 💖 FINAL MESSAGE */}
      {showMessage && (
        <div className="final-message">
          Thank you for coming in my life ❤️
        </div>
      )}

    </div>
  );
};

export default FinalPage;