import React from "react";
import "./Gallery.css";

// 👉 apne photos yaha import kar
import pic1 from "../assets/g1.jpg";
import pic2 from "../assets/g2.jpg";
import pic3 from "../assets/g3.jpg";
import pic4 from "../assets/g4.jpg";
import pic5 from "../assets/g5.jpg";
import pic6 from "../assets/g6.jpg";

function Memory({ next }) {  // pass a function from App.js for next page
  const photos = [
    { src: pic1, caption: "Having fun at the party 🎉" },
    { src: pic2, caption: "Sweet memories 💖" },
    { src: pic3, caption: "Best friends forever 😊" },
    { src: pic4, caption: "Cake cutting moment 🎂" },
    { src: pic5, caption: "Lovely surprise 😍" },
    { src: pic6, caption: "Cherished moments 💕" },
  ];

  return (
    <div className="memory-page">
      {/* 💖 FLOATING HEARTS */}
      <div className="hearts">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      {/* 🎀 TITLE */}
      <h1 className="memory-title">Happy Birthday 💕</h1>

      {/* 📸 POLAROID GRID */}
      <div className="photo-grid">
        {photos.map((item, index) => (
          <div className={`polaroid p${index}`} key={index}>
            <img src={item.src} alt="memory" />
            <div className="photo-caption">{item.caption}</div>
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

export default Memory;