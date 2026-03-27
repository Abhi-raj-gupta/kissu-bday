import React, { useState, useEffect } from "react";

export default function LoveLetter({ next }) {
  const text = "You are the best thing in my life ❤️";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="center">
      <h2>My Letter 💌</h2>
      <p>{displayText}</p>
      <button onClick={next}>Next ➡️</button>
    </div>
  );
}