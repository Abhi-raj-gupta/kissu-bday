import React, { useState, useRef } from "react";
import "./PureCake.css";

// 🎵 SONGS
import song1 from "../assets/song.mp3";
import song2 from "../assets/song2.mp3";

function PureCake({next}) {
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

  const [sliceStage, setSliceStage] = useState(0);
  const [showNext, setShowNext] = useState(false);

  const [leftText, setLeftText] = useState(false);
  const [rightText, setRightText] = useState(false);

  // 🎵 AUDIO REFS
  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);

  const handleMove = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // 🔪 Knife
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

    // 🍰 Slice
    if (sliceDrag) {
      const x = clientX - 40;
      const y = clientY - 80;

      setSlicePos({ x, y });

      if (
        sliceStage === 0 &&
        x < window.innerWidth * 0.25 &&
        y < window.innerHeight * 0.4
      ) {
        setSliceStage(1);
        setLeftText(true);
      }

      if (
        sliceStage === 1 &&
        x > window.innerWidth * 0.75 &&
        y < window.innerHeight * 0.4
      ) {
        setSliceStage(2);
        setSliceDrag(false);
        setShowNext(true);
        setRightText(true);
      }
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
      {/* 🎵 SONG 1 */}
      <audio ref={audioRef1} src={song1} loop autoPlay />

      {/* 🎵 SONG 2 */}
      <audio ref={audioRef2} src={song2} loop />

      {/* 🎯 BACKGROUND */}
      {cut && (
        <>
          <div
            className="bg-left"
            style={{
              backgroundImage:
                "url(" + process.env.PUBLIC_URL + "/assets/left.png)",
            }}
          ></div>

          <div
            className="bg-right"
            style={{
              backgroundImage:
                "url(" + process.env.PUBLIC_URL + "/assets/right.png)",
            }}
          ></div>
        </>
      )}

      {/* TEXT */}
      {leftText && (
        <div className="taste-text left-text">Very tasty cake 😋</div>
      )}

      {rightText && (
        <div className="taste-text right-text">So delicious ❤️</div>
      )}

      <h1>🎉 Happy Birthday ❤️</h1>

      <div className="cake-area">
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
        {cut && sliceStage !== 2 && (
          <div
            className="slice"
            onMouseDown={() => setSliceDrag(true)}
            onTouchStart={() => setSliceDrag(true)}
            style={{
              left: slicePos.x,
              top: slicePos.y,
              position: "fixed",
              transform: sliceStage === 1 ? "scale(0.5)" : "scale(1)",
              transition: "0.3s",
            }}
          >
            <div className="slice-cream"></div>
            <div className="slice-body"></div>
          </div>
        )}
      </div>

      {/* 💥 Blast */}
      {blast && (
        <>
          <div className="bomb left"></div>
          <div className="bomb right"></div>
        </>
      )}

      {/* 💨 BLOW BUTTON */}
      {!blown && (
        <button
          onClick={() => {
            setBlown(true);

            // ❌ STOP SONG 1
            if (audioRef1.current) {
              audioRef1.current.pause();
              audioRef1.current.currentTime = 0;
            }

            // ▶️ START SONG 2
            if (audioRef2.current) {
              audioRef2.current.play();
            }
          }}
        >
          Blow Candles 💨
        </button>
      )}

      {/* NEXT */}
      {showNext && (
        <button className="enter-btn" onClick={next}>
        💌 Enter
      </button>
      )}
    </div>
  );
}

export default PureCake;