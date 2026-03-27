import React, { useState } from "react";
import "./PureCake.css";

function PureCake() {
  const [blown, setBlown] = useState(false);
  const [cut, setCut] = useState(false);
  const [blast, setBlast] = useState(false); // ✅ NEW

  const [knifeDrag, setKnifeDrag] = useState(false);
  const [knifePos, setKnifePos] = useState({ x: 500, y: 250 });

  const [sliceDrag, setSliceDrag] = useState(false);
  const [slicePos, setSlicePos] = useState({ x: 600, y: 300 });

  const handleMove = (e) => {
    // 🔪 Knife Drag
    if (knifeDrag) {
      const x = e.clientX - 60;
      const y = e.clientY - 10;
      setKnifePos({ x, y });

      const cake = document.querySelector(".cake-area");
      const rect = cake.getBoundingClientRect();

      if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
        setCut(true);
        setKnifeDrag(false);

        setBlast(true); // 💥 START BLAST
        setTimeout(() => setBlast(false), 1000); // AUTO HIDE
      }
    }

    // 🍰 Slice Drag
    if (sliceDrag) {
      setSlicePos({
        x: e.clientX - 40,
        y: e.clientY - 80,
      });
    }
  };

  return (
    <div
      className="container"
      onMouseMove={handleMove}
      onMouseUp={() => {
        setKnifeDrag(false);
        setSliceDrag(false);
      }}
    >
      <h1>🎉 Happy Birthday ❤️</h1>

      <div className="cake-area">
        {/* 🎂 Cake */}
        <div className="cake">
          <div className="cream"></div>
          <div className="drip"></div>
          <div className="body"></div>

          {/* Candles */}
          <div className="candles">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="candle" style={{ left: `${20 + i * 15}%` }}>
                {!blown && <div className="flame"></div>}
              </div>
            ))}
          </div>

          {cut && <div className="cut-gap"></div>}
        </div>

        {/* 🔪 Knife */}
        {blown && !cut && (
          <div
            className="knife"
            onMouseDown={() => setKnifeDrag(true)}
            style={{
              left: knifePos.x,
              top: knifePos.y,
              position: "fixed",
            }}
          >
            <div className="blade"></div>
            <div className="handle">
              <span className="dot dot1"></span>
              <span className="dot dot2"></span>
            </div>
          </div>
        )}

        {/* 🍰 Slice */}
        {cut && (
          <div
            className="slice"
            onMouseDown={() => setSliceDrag(true)}
            style={{
              left: slicePos.x,
              top: slicePos.y,
              position: "fixed",
            }}
          >
            <div className="slice-cream"></div>
            <div className="slice-body"></div>
          </div>
        )}
      </div>

      {/* 💥 PARTY BOMB */}
      {blast && (
        <>
          <div className="bomb left"></div>
          <div className="bomb right"></div>
        </>
      )}

      {!blown && (
        <button onClick={() => setBlown(true)}>Blow Candles 💨</button>
      )}
    </div>
  );
}

export default PureCake;