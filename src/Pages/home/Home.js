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

  function handleInputChange(event) {
    setPseudo(event.target.value);
  }

  return (
    <>
      {gameStart ? 
        (
          // Show board game if the pseudo is not empty, connection page otherwise
          (level > 0) ? ((pseudo) ? <CardGame goHome={goHome} level={level} setLevel={setLevel}/> : <Connection setPseudo={setPseudo}></Connection>) : <Levels setLevel={setLevel}/>
        ) : (
          // Show home page
          <div className='fond'>
            <h1 className='CG'>WELCOME TO </h1>
            <h1 className='CG1'> TC's Game! </h1>
              <ul className='conn'>
                  <li className='b1'>Nom d'utilisateur :  </li>
                  <li className='b2'>
                      <input
                        type="text"
                        onChange={handleInputChange}
                      /> 
                  </li>
                  <button className='go' onClick={() => setGameStart(true)}>C'est parti!</button>
              </ul>
          </div>
        )}
    </>
  );
}