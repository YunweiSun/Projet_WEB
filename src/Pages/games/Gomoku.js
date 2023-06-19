import React, { useState, useEffect } from 'react';
import './Gomoku.css'

const BOARD_SIZE = 3;
const WIN_CONDITION = 3;



const Gomoku = ({goHome}) => {
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isBoardFull, setIsBoardFull] = useState(false);

  useEffect(() => {
    if (currentPlayer === 'O' && !winner) {
      
      makeComputerMove();
    }
  }, [currentPlayer, winner]);
  useEffect(() => {
    checkBoardFull();
  }, [board]);

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((rowArr, rowIndex) =>
      rowArr.map((cell, colIndex) => (rowIndex === row && colIndex === col ? currentPlayer : cell))
    );

    setBoard(newBoard);

    if (checkWinner(newBoard, currentPlayer)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const makeComputerMove = () => {
    const emptyCells = [];
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (!cell) {
          emptyCells.push([rowIndex, colIndex]);
        }
      });
    });
  
    if (emptyCells.length === 0) return;
  
    let highestScore = -Infinity;
    let bestMoves = [];
  
    emptyCells.forEach(([row, col]) => {
      let score = 0;
  
      // Check rows
      let oCountRow = 0;
      let xCountRow = 0;
      for (let i = 0; i < BOARD_SIZE; i++) {
        if (board[row][i] === 'O') {
          oCountRow++;
          
        } else if (board[row][i] === 'X') {
          xCountRow++;
          
        }
        if(oCountRow === 2){
          score += 10;
        }
        if(xCountRow === 2){
          score += 8;
        }
        if(oCountRow === 1 && xCountRow === 0){
          score += 2;
        }
        if(oCountRow === 0 && xCountRow === 0){
          score += 1;
        }
      }
  
      // Check columns
      let oCountCol = 0;
      let xCountCol = 0;
      for (let i = 0; i < BOARD_SIZE; i++) {
        if (board[i][col] === 'O') {
          oCountCol++;
        } else if (board[i][col] === 'X') {
          xCountCol++;
        }
        if(oCountCol === 2){
          score += 10;
        }
        if(xCountCol === 2){
          score += 8;
        }
        if(oCountCol === 1 && xCountCol === 0){
          score += 2;
        }
        if(oCountCol === 0 && xCountCol === 0){
          score += 1;
        }
      }
  
      // Check diagonals
      let oCountDiagonal = 0;
      let xCountDiagonal = 0;
      if (row === col) {
        for (let i = 0; i < BOARD_SIZE; i++) {
          if (board[i][i] === 'O') {
            oCountDiagonal++;
            
          
          } else if (board[i][i] === 'X') {
            xCountDiagonal++;
          }
          
          if(oCountDiagonal === 2){
            score += 10;
          }
          if(xCountDiagonal === 2){
            score += 8;
          }
          if(oCountDiagonal === 1 && xCountDiagonal === 0){
            score += 2;
          }
          if(oCountDiagonal === 0 && xCountDiagonal === 0){
            score += 1;
          }
        }
      }
  
      let oCountDiagonal2 = 0;
      let xCountDiagonal2 = 0;
      if (row + col === BOARD_SIZE - 1) {
        for (let i = 0; i < BOARD_SIZE; i++) {
          if (board[i][BOARD_SIZE - 1 - i] === 'O') {
            oCountDiagonal2++;
            
          } else if (board[i][BOARD_SIZE - 1 - i] === 'X') {
            xCountDiagonal2++;
            
          }
          if(oCountDiagonal2 === 2){
            score += 10;
          }
          if(xCountDiagonal2 === 2){
            score += 8;
          }
          if(oCountDiagonal2 === 1 && xCountDiagonal2 === 0){
            score += 2;
          }
          if(oCountDiagonal2 === 0 && xCountDiagonal2 === 0){
            score += 1;
          }

        }
      }
  
      if (score > highestScore) {
        highestScore = score;
        bestMoves = [[row, col]];
      } else if (score === highestScore) {
        bestMoves.push([row, col]);
      }
    });
  
    const [row, col] = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    handleClick(row, col);
  };
  

  const checkWinner = (board, player) => {
    // 检查胜利条件的逻辑...
// 检查水平方向
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col <= BOARD_SIZE - WIN_CONDITION; col++) {
        let win = true;
        for (let i = 0; i < WIN_CONDITION; i++) {
          if (board[row][col + i] !== player) {
            win = false;
            break;
          }
        }
        if (win) return true;
      }
    }

    // 检查垂直方向
    for (let col = 0; col < BOARD_SIZE; col++) {
      for (let row = 0; row <= BOARD_SIZE - WIN_CONDITION; row++) {
        let win = true;
        for (let i = 0; i < WIN_CONDITION; i++) {
          if (board[row + i][col] !== player) {
            win = false;
            break;
          }
        }
        if (win) return true;
      }
    }

    // 检查主对角线方向
    for (let row = 0; row <= BOARD_SIZE - WIN_CONDITION; row++) {
      for (let col = 0; col <= BOARD_SIZE - WIN_CONDITION; col++) {
        let win = true;
        for (let i = 0; i < WIN_CONDITION; i++) {
          if (board[row + i][col + i] !== player) {
            win = false;
            break;
          }
        }
        if (win) return true;
      }
    }

    // 检查副对角线方向
    for (let row = 0; row <= BOARD_SIZE - WIN_CONDITION; row++) {
      for (let col = WIN_CONDITION - 1; col < BOARD_SIZE; col++) {
        let win = true;
        for (let i = 0; i < WIN_CONDITION; i++) {
          if (board[row + i][col - i] !== player) {
            win = false;
            break;
          }
        }
        if (win) return true;
      }
}

return false;
  };
  const resetGame = () => {
    setBoard(Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)));
    setCurrentPlayer('X');
    setWinner(null);
  };
  const checkBoardFull = () => {
    const isFull = board.every(row => row.every(cell => cell !== null));
    setIsBoardFull(isFull);
  };
  const renderCell = (row, col) => (
    
    <div
      className="cell"
      key={`${row}-${col}`}
      onClick={() => handleClick(row, col)}
    >
      {board[row][col]}
    </div>
  );

  return (
    <div className="gomoku">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
          </div>
        ))}
      </div>
      {winner && <div className="winner">Winner: {winner}</div>}
      {isBoardFull && !winner && <div className="draw">ne one wins</div>}
      <div>
      <button class="big-button" onClick={resetGame}>restart</button></div>
      <button onClick={goHome}>Return Home</button>
    </div>

  );
};

export default Gomoku;
