import Home from "./Pages/home/Home.js";

import "./App.css";

export default function Main() {
  // The title is always there: only the center part changes (see Home.js).
  return (
  <>
    <div className="gameContainer">
      <Home />
    </div>
  </>
  );
}
