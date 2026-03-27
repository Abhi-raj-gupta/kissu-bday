import React from "react";

export default function Timeline({ next }) {
  return (
    <div className="center">
      <h2>Our Journey ⏳</h2>
      <ul>
        <li>First Chat 💬</li>
        <li>First Meet 👀</li>
        <li>Best Moment ❤️</li>
      </ul>
      <button onClick={next}>Next ➡️</button>
    </div>
  );
}