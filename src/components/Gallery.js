import React from "react";

export default function Gallery({ next }) {
  return (
    <div className="center">
      <h2>Our Memories 📸</h2>

      <img src="/images/pic1.jpg" width="200" alt="" />
      <img src="/images/pic2.jpg" width="200" alt="" />

      <br />
      <button onClick={next}>Next ➡️</button>
    </div>
  );
}