import React, { useState } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Gallery from "./components/Gallery";
import LoveLetter from "./components/LoveLetter";
import Timeline from "./components/Timeline";
import Surprise from "./components/Surprise";
import PureCake from "./components/PureCake";
import FinalPage from "./components/FinalPage";


function App() {
  const [page, setPage] = useState(0);

  const next = () => setPage(page + 1);

  return (
    <div>
      {page === 0 && <Welcome next={next} />}
      {page === 1 && <Gallery next={next} />}
      {page === 2 && <LoveLetter next={next} />}
      {page === 3 && <Timeline next={next} />}
      {page === 4 && <Surprise next={next} />}
      {page === 5 && <PureCake next={next} />}
      {page === 6 && <FinalPage />}
    </div>
  );
}

export default App;