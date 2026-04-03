import React, { useState, useRef, useEffect } from "react";
import "./App.css";

import Welcome from "./components/Welcome";
import Gallery from "./components/Gallery";
import LoveLetter from "./components/LoveLetter";
import Timeline from "./components/Journey";
import Surprise from "./components/Surprise";
import PureCake from "./components/PureCake";
import FinalPage from "./components/FinalPage";
import PhotoMatchGame from "./components/PhotoMatchGame";

import song from "./assets/song.mp3";

function App() {
  const [page, setPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);

  const audioRef = useRef(null);

  const next = () => setPage(page + 1);

  // 🎶 autoplay after first click
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    document.addEventListener("click", playAudio, { once: true });

    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, []);

  // 🎵 toggle music
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // 💓 background heartbeat
  useEffect(() => {
    if (isPlaying) {
      document.body.classList.add("music-on");
    } else {
      document.body.classList.remove("music-on");
    }
  }, [isPlaying]);

  // 🖱️ DRAG BUTTON
  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => setDragging(false);

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - 30,
      y: e.clientY - 30,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  useEffect(() => {
  const createHeart = (x, y) => {
    const heart = document.createElement("div");
    heart.className = "heart";

    heart.style.left = x + "px";
    heart.style.top = y + "px";

    document.getElementById("heart-container").appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1000);
  };

  // 🖱️ Desktop (mouse)
  const handleMouseMove = (e) => {
    createHeart(e.clientX, e.clientY);
  };

  // 📱 Mobile (touch)
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    createHeart(touch.clientX, touch.clientY);
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("touchmove", handleTouchMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchmove", handleTouchMove);
  };
}, []);

  return (
    <div>
      {/* 💖 Heart container */}
      <div id="heart-container"></div>

      {/* 🎶 Background Music */}
      <audio ref={audioRef} loop>
        <source src={song} type="audio/mp3" />
      </audio>

      {/* 🎵 Draggable Music Button */}
      <button
        className={`music-btn ${isPlaying ? "playing heartbeat" : ""}`}
        onClick={toggleMusic}
        onMouseDown={handleMouseDown}
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          zIndex: 1000,
        }}
      >
        {isPlaying ? "❤️" : "🎵"}
      </button>

      {/* 👇 Pages */}
      {page === 0 && <Welcome next={next} />}
      {/* {page === 1 && <PureCake next={next} />} */}
      {page === 1&& <Gallery next={next} />}
      {page === 2&& <Timeline next={next} />}
      {page === 3&& <Surprise next={next} />}
      {page === 4&& <LoveLetter next={next} />}
      {page === 5&& <PhotoMatchGame next={next} />}
      {page === 6&& <PureCake next={next} />}
      {page === 7&& <FinalPage />}
      
    </div>
  );
}

export default App;