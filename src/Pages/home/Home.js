import { useState } from "react";

import Connection from '../connection/Connection.js'
import CardGame from "../cardgame/Cardgame.js";
import Levels from "../levels/Levels.js"

export default function Home() {
  const [gameStart, setGameStart] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [level, setLevel] = useState(0);

  function goHome() {
    setGameStart(false);
    setPseudo("");
  }

  return (
    <>
      {gameStart ? 
        (
          // Show board game if the pseudo is not empty, connection page otherwise
          (level > 0) ? ((pseudo) ? <CardGame goHome={goHome} level={level} setLevel={setLevel}/> : <Connection setPseudo={setPseudo}></Connection>) : <Levels setLevel={setLevel}/>
        ) : (
          // Show home page
          <div>
            <h2>Click on the play button ^^</h2>
            <button onClick={() => setGameStart(true)}>Play</button>
          </div>
        )}
    </>
  );
}