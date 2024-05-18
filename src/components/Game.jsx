import React, { useState, useEffect } from 'react';
import { Typography, Button, Container } from '@mui/material';
import Board from '../Board';
import './Game.css';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isAgainstAI, setIsAgainstAI] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState('X');
  const [celebration, setCelebration] = useState(false);

  useEffect(() => {
    if (isAgainstAI && !xIsNext && winner === null) {
      // AI's turn
      const availableMoves = squares.map((square, index) => (square === null ? index : null)).filter((index) => index !== null);
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      const aiMove = availableMoves[randomIndex];
      const newSquares = squares.slice();
      newSquares[aiMove] = playerSymbol === 'X' ? 'O' : 'X'; // AI plays the opposite symbol
      setSquares(newSquares);
      setXIsNext(true); // Switch back to player's turn
      const newWinner = calculateWinner(newSquares);
      if (newWinner) {
        setWinner(newWinner);
        handleCelebration();
      } else if (!newSquares.includes(null)) {
        // Check for tie
        setWinner('Tie');
      }
    }
  }, [squares, xIsNext, isAgainstAI, winner, playerSymbol]);

  const handleClick = (i) => {
    if (winner || squares[i] || (isAgainstAI && !xIsNext)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? playerSymbol : playerSymbol === 'X' ? 'O' : 'X';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    const newWinner = calculateWinner(newSquares);
    if (newWinner) {
      setWinner(newWinner);
      handleCelebration();
    } else if (!newSquares.includes(null)) {
      // Check for tie
      setWinner('Tie');
    }
  };

  const handleSymbolSelection = (symbol) => {
    setPlayerSymbol(symbol);
    setIsAgainstAI(true);
  };

  const handlePlayModeChange = () => {
    setIsAgainstAI(!isAgainstAI);
    setSquares(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
    setPlayerSymbol('X');
  };

  const handlePlayAgain = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
    setCelebration(false);
  };

  const handleCelebration = () => {
    setCelebration(true);
    setTimeout(() => {
      setCelebration(false);
    }, 3000); // Duration of the celebration animation
  };

  let status;
  if (winner) {
    status = winner === 'Tie' ? 'It\'s a Tie!' : `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? playerSymbol : playerSymbol === 'X' ? 'O' : 'X'}`;
  }

  return (
    <div className="game-container">
      <Typography variant="h3" align="center" gutterBottom>
        Tic Tac Toe
      </Typography>
      {!isAgainstAI && !winner && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Button variant="contained" onClick={() => handleSymbolSelection('X')} style={{ marginRight: '10px' }}>
            Play as X
          </Button>
          <Button variant="contained" onClick={() => handleSymbolSelection('O')}>
            Play as O
          </Button>
        </div>
      )}
      <div className={`grid-container ${xIsNext ? 'move-x' : 'move-o'}`}>
        <Board squares={squares} onClick={handleClick} xIsNext={xIsNext} />
      </div>
      <Typography variant="h5" align="center" style={{ marginTop: '20px' }}>
        {status}
      </Typography>
      {!winner && (
        <Button variant="contained" onClick={handlePlayModeChange} style={{ marginTop: '20px' }}>
          {isAgainstAI ? 'Play with a friend' : 'Play with AI'}
        </Button>
      )}
      {winner && (
        <Button variant="contained" onClick={handlePlayAgain} style={{ marginTop: '20px' }}>
          Play Again
        </Button>
      )}
      {celebration && (
        <div className="celebration-container">
          <span role="img" aria-label="celebration-left" className={`celebration-emoji neon ${playerSymbol === 'X' ? 'neon-red' : 'neon-blue'}`}>🎉</span>
          <span role="img" aria-label="celebration-right" className={`celebration-emoji neon ${playerSymbol === 'X' ? 'neon-red' : 'neon-blue'}`}>🎉</span>
        </div>
      )}
    </div>
  );
};

export default Game;
