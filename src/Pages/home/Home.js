import { useState } from "react";

import Connection from '../connection/Connection.js'
import CardGame from "../cardgame/Cardgame.js";

export default function Home() {
  const [gameStart, setGameStart] = useState(false);
  const [pseudo, setPseudo] = useState("");

  function goHome() {
    setGameStart(false);
    setPseudo("");
  }

  return (
    <>
      {gameStart ? 
        (
          (pseudo) ? <CardGame goHome={goHome}/> : <Connection setPseudo={setPseudo}></Connection>
        ) : (
          <div>
            <h2>Click on the play button ^^</h2>
            <button onClick={() => setGameStart(true)}>Play</button>
          </div>
        )}
    </>
  );
}