import { useState } from "react";

import Cardgame from "./cardgame/Cardgame.js";
import Gomoku from "./Gomoku.js";
import cdLogo from './CDlogo.jpeg';
import gomokuLogo from './gomokulogo.jpeg';
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
					<div class="boxG">
					<div className='container1'><table>
						<tr>
							<td>
								<tr><img src={cdLogo} alt="CD Logo" /></tr>
								<tr><button class="big-button"  onClick={() => setGame("memory")}>MEMORY</button></tr>
								</td>
							<td>
							<tr><img src={gomokuLogo} alt="Gomoku Logo" /></tr>
								<tr><button class="big-button"  onClick={() => setGame("gomoku")}>GOMOKU</button></tr>
								</td>
						</tr>
						
						<br/>
						<br/>
						<br/>
						<div class="retour"><button class="button-retour"  onClick={goHome}>Retour</button></div>
							
						
						</table>
					</div>
					</div>
				</div>
			)
			}
		</>
	)
}
