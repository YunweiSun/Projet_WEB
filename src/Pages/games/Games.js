import { useState } from "react";

import Cardgame from "./Cardgame.js";
import Morpion from "./Morpion.js";
import Quizz from "./Quizz.js";
import Divers from "./Divers.js";

import './Games.css'


export default function Games({ goHome }) {
	const [game, setGame] = useState("");

	const launchGame = (game) => {
		if (game === "memory") {
			return <Cardgame />
		} else if (game === "morpion") {
			return <Morpion />
		} else if (game === "quizz") {
			return <Quizz />
		} else if (game === "divers") {
			return <Divers />
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
						<button className='i' onClick={() => setGame("morpion")}>MORPION</button>
						<button className='i' onClick={() => setGame("quizz")}>QUIZZ</button>
						<button className='i' onClick={() => setGame("divers")}>DIVERS</button>
						<button className="retour" onClick={goHome}>Retour</button>
					</div>
				</div>
			)
			}
		</>
	)
}
