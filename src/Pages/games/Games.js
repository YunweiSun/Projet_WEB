import { useState } from "react";

import Cardgame from "./cardgame/Cardgame.js";
import Gomoku from "./Gomoku.js";

import './Games.css'


export default function Games({ goHome }) {
	const [game, setGame] = useState("");

	const launchGame = (game) => {
		if (game === "memory") {
			return <Cardgame goHome={goHome}/>
		} else if (game === "gomoku") {
			return <Gomoku goHome={goHome}/>
		}
	}

	return (
		<>
			{game ? (
				launchGame(game)
			) : (
				<div className='fond'>
					<div className='container1'>
						<button className='i' onClick={() => setGame("memory")}>MEMORY</button>
						<button className='i' onClick={() => setGame("gomoku")}>GOMOKU</button>
						<button className="retour" onClick={goHome}>Retour</button>
					</div>
				</div>
			)
			}
		</>
	)
}
