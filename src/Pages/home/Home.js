import { useState } from "react";

import Games from "../games/Games.js";

export default function Home() {
  const [gameStart, setGameStart] = useState(false);
  const [pseudo, setPseudo] = useState("");

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
          <Games goHome={goHome}/>
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