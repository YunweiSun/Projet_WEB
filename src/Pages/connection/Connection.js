import React, { useState } from 'react';

import './Connection.css'

function Banner({ setPseudo }) {
    const [userName, setUserName] = useState('');

    function handleInputChange(event) {
        setUserName(event.target.value);
    }

    return (
        <div>
            <h3>Entrer votre pseudo pour acceder à votre espace de jeu :</h3>
            <ul >
                <li className='b1'>Pseudo :  </li>
                <li className='b2'>
                    <input
                        type="text"
                        onChange={handleInputChange}
                    />
                </li>
            </ul>
            <button className='Connexion' onClick={() => { setPseudo(userName) }}>
                Se Connecter
            </button>
        </div>
    );
}

export default Banner;