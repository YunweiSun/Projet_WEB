import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from "./Pages/home/Home.js";
import CardGame from "./Pages/cardgame/Cardgame.js";
import Ranking from "./Pages/ranking/Ranking.js";


const App = () => {
  const [activeComponent, setActiveComponent] = useState('Home');

  const handleNavigation = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <Router>
      <div>
        <nav className='navigation'>
          <ul>
            <li onClick={() => handleNavigation('Home')}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => handleNavigation('CardGame')}>
              <Link to="/cardgame">Card Game</Link>
            </li>
            <li onClick={() => handleNavigation('Ranking')}>
              <Link to="/ranking">Ranking</Link>
            </li>
            
          </ul>
        </nav>

        <div className='home-body'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cardgame" element={<CardGame />} />
            <Route path="/ranking" element={<Ranking />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
