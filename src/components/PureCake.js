import React, { useState } from "react";
import "./PureCake.css";

function PureCake() {
  const [blown, setBlown] = useState(false);
  const [cut, setCut] = useState(false);
  const [blast, setBlast] = useState(false);

  const [knifeDrag, setKnifeDrag] = useState(false);
  const [knifePos, setKnifePos] = useState({
    x: window.innerWidth < 600 ? window.innerWidth / 2 - 80 : 500,
    y: window.innerWidth < 600 ? window.innerHeight - 120 : 250,
  });

  const [sliceDrag, setSliceDrag] = useState(false);
  const [slicePos, setSlicePos] = useState({
    x: window.innerWidth / 2 - 40,
    y: window.innerHeight / 2,
  });

  const handleMove = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // 🔪 Knife Drag
    if (knifeDrag) {
      const x = clientX - 60;
      const y = clientY - 10;
      setKnifePos({ x, y });

      const cake = document.querySelector(".cake-area");
      const rect = cake.getBoundingClientRect();

      if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
        setCut(true);
        setKnifeDrag(false);

        setBlast(true);
        setTimeout(() => setBlast(false), 1200);
      }
    }

    // 🍰 Slice Drag
    if (sliceDrag) {
      setSlicePos({
        x: clientX - 40,
        y: clientY - 80,
      });
    }
  };

  return (
    <div
      className="container"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseUp={() => {
        setKnifeDrag(false);
        setSliceDrag(false);
      }}
      onTouchEnd={() => {
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
            onTouchStart={() => setKnifeDrag(true)}
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
            onTouchStart={() => setSliceDrag(true)}
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

      {/* 💥 Party Bomb */}
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