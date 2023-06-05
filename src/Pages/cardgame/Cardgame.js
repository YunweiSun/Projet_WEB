import React, { useState, useEffect } from 'react';
import './CardGame.css'; 
import Modal from 'react-modal';

const CardGame = () => {
  const [cards, setCards] = useState([
    { id: 1, src: '/images/card1.png', isFlipped: false, isMatched: false },
    { id: 2, src: '/images/card1.png', isFlipped: false, isMatched: false },
    { id: 3, src: '/images/card2.png', isFlipped: false, isMatched: false },
    { id: 4, src: '/images/card2.png', isFlipped: false, isMatched: false }
  ]);
  const [flippedCards, setFlippedCards] = useState([]); 
  const [score, setScore] = useState(0); 
  const [ShowSuccess, setShowSuccess] = useState(false); 
  const [cardPairs,setCardPairs] = useState([]);
  const [timer, setTimer] = useState();
  const [gameTime, setGameTime] = useState(0);

  const startTimer = () => {
    setGameTime(0);
    const interval = setInterval(() => {
      setGameTime((prevTime) => prevTime + 1);
    }, 1000);
    setTimer(interval);
  };

  useEffect(() => {

    
    const checkForMatch = () => {
      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        if (card1.src === card2.src) {
          setCardPairs([...cardPairs, cards]);

          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === card1.id || card.id === card2.id
                ? { ...card, isMatched: true }
                : card
            )
          );
          setScore((prevScore) => prevScore + 1);
        } else {
          setTimeout(() => {
            setCards((prevCards) =>
              prevCards.map((card) =>
                card.id === card1.id || card.id === card2.id
                  ? { ...card, isFlipped: false }
                  : card
              )
            );
          }, 500);
        }
        setFlippedCards([]);
      }
    };

    checkForMatch();
    if (allCardsMatched()) {
      setShowSuccess(true);
      clearInterval(timer);
    }
  }, [flippedCards]);

  const handleCardClick = (card) => {
    if (!timer) {
      startTimer(); 
    }

    if (card.isFlipped || card.isMatched) return;

    setCards((prevCards) =>
      prevCards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      )
    );
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, card]);
  };

  const allCardsMatched = () => {
    return cardPairs.length >= 2;
  };
  
  const restartGame = () => {
    const resetCards = cards.map((card) => {
      return {
        ...card,
        isFlipped: false,
        isMatched: false,
      };
    });
    setCardPairs([]);
    setTimer(null);
    setGameTime(0);
    setCards(resetCards);
    setFlippedCards([]);
    setScore(0);
  };

  return (
    <div className='container'> 
      <div>
        <h1 className='title'>Memory Card Game</h1>
        <p className='score'>Score: {score}</p>
        <p className='score'>Game time: {gameTime} seconds</p>
        <div className="card-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card ${card.isFlipped ? 'flipped' : ''}`}
              onClick={() => handleCardClick(card)}
            >
              <img src={card.isFlipped || card.isMatched ? card.src : '/images/dos.png'} alt="Card" />
            </div>
          ))}
        </div>

        <Modal isOpen={ShowSuccess}>
          <div className='notif'>Congratulations, time used: {gameTime} seconds, score: {score}</div>
          <div className='bouttonContainer'>
            <button className='restartGame' onClick={() => setShowSuccess(false)}>Close</button>
          </div>

        </Modal>

      </div>
      <div className='bouttonContainer'>
        <button className='restartGame' onClick={restartGame}>Restart</button>
          <button className='restartGame'>Next level</button>
      </div>
    </div>
  );
};

export default CardGame;