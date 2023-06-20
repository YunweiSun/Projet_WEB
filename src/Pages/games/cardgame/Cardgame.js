import React, { useState, useEffect } from 'react';

import Levels from './Levels.js';

import './Cardgame.css';

const CardGame = ({ goHome }) => {
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState([
    { id: 1, src: '/images/Sigles/ARQ-.png', isFlipped: false, isMatched: false },
    { id: 2, src: '/images/Sigles/ARQ.png', isFlipped: false, isMatched: false },
    { id: 3, src: '/images/Sigles/ATM-.png', isFlipped: false, isMatched: false },
    { id: 4, src: '/images/Sigles/ATM.png', isFlipped: false, isMatched: false },
    { id: 5, src: '/images/Sigles/BGP-.png', isFlipped: false, isMatched: false },
    { id: 6, src: '/images/Sigles/BGP.png', isFlipped: false, isMatched: false },
    { id: 7, src: '/images/Sigles/CSMA-CA-.png', isFlipped: false, isMatched: false },
    { id: 8, src: '/images/Sigles/CSMA-CA.png', isFlipped: false, isMatched: false },
    { id: 9, src: '/images/Sigles/CSMA-CD-.png', isFlipped: false, isMatched: false },
    { id: 10, src: '/images/Sigles/CSMA-CD.png', isFlipped: false, isMatched: false },
    { id: 11, src: '/images/Sigles/DNS.png', isFlipped: false, isMatched: false },
    { id: 12, src: '/images/Sigles/DNS-.png', isFlipped: false, isMatched: false }
  ]);
  const totalCards = () => {
    let numCards = 0;
    if (level === 1) {
      numCards = 4;
    } else if (level === 2) {
      numCards = 8;
    } else if (level === 3) {
      numCards = 12;
    }
    const newCards = cards.slice(0, numCards);
    return newCards;
  };
  const nextLevelCards = totalCards();
  const shuffle = () => {
    for (let i = nextLevelCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nextLevelCards[i], nextLevelCards[j]] = [nextLevelCards[j], nextLevelCards[i]];
    }
    console.log(nextLevelCards);
    return nextLevelCards;
  };
  const className = () => {
    let newClassName = "card-level1";
    if (level === 2) {
      newClassName = "card-level2";
    } else if (level === 3) {
      newClassName = "card-level3";
    }
    return newClassName;
  };
  const cardClassName = className();
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [ShowSuccess, setShowSuccess] = useState(false);
  const [cardPairs, setCardPairs] = useState([]);
  const [timer, setTimer] = useState();
  const [gameTime, setGameTime] = useState(0);

  const startTimer = () => {
    setGameTime(0);
    const interval = setInterval(() => {
      setGameTime((prevTime) => prevTime + 1);
    }, 1000);
    setTimer(interval);
  };

  const checkIfMatched = (card1, card2) => {
    const src1 = card1.src;
    const src2 = card2.src;

    if (src1.endsWith("-.png") && src2.endsWith(".png")) {
      return src1.slice(0, -5) === src2.slice(0, -4);
    } else if (src2.endsWith("-.png") && src1.endsWith(".png")) {
      return src2.slice(0, -5) === src1.slice(0, -4);
    }
  };

  useEffect(() => {
    shuffle();
    const checkForMatch = () => {
      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        if (checkIfMatched(card1, card2)) {
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
    if (level === 1) {
      return cardPairs.length === 2;
    } else if (level === 2) {
      return cardPairs.length === 4;
    } else if (level === 3) {
      return cardPairs.length === 6;
    }
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
    setShowSuccess(false);
  };

  return (
    <>
      {(level > 0) ? (
        ShowSuccess ? (
          <div>
            <div>Congratulations, time used: {gameTime} seconds, score: {score}</div>
            <div className='bouttonContainer'>
              <button className='restartButton' onClick={restartGame}>Replay</button>
              <button className='closeButton' onClick={() => {
                setShowSuccess(false);
                setLevel(0);
                goHome();
              }}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className='score'>Score: {score}</p>
            <p className='gameTime'>Game time: {gameTime} seconds</p>
            <p className='level'>Level: {level}</p>
            <div className={cardClassName}>
              {nextLevelCards.map((card) => (
                <div
                  key={card.id}
                  className={`card ${card.isFlipped ? 'flipped' : ''}`}
                  onClick={() => handleCardClick(card)}
                >
                  <img src={card.isFlipped || card.isMatched ? card.src : '/images/Sigles/dos de carte.png'} alt="Card" />
                </div>
              ))}
            </div>
          </>
        )
      ) : (
        <Levels setLevel={setLevel} />
      )
      }



    </>
  )
}

export default CardGame;