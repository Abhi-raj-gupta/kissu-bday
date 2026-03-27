import React from "react";
import "./Welcome.css";

// 📸 IMPORT YOUR IMAGES
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

function Welcome({ next }) {

  const images = [img1, img2, img3];

  return (
    <div className="welcome-container">

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

      <h1 className="title">Happy Birthday My Love 🎂</h1>

      {/* 📱 Instagram Style Cards */}
      <div className="story-container">
        {images.map((img, index) => (
          <div className={`story-card card-${index}`} key={index}>
            <img src={img} alt="memory" className="uploaded-img" />
          </div>
        ))}
      </div>

      {/* 💌 ENTER BUTTON */}
      <button className="enter-btn" onClick={next}>
        💌 Enter
      </button>
    </div>
  );
}

export default Welcome;