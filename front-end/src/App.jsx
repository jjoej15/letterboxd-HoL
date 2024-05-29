import './App.css'
import React, {useState, createContext} from 'react';
import Home from './components/Home';
import Game from './components/Game';

export const HighScoreContext = createContext();
export const GameStartedContext = createContext();

function App() {
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  

  return (
      <HighScoreContext.Provider value={highScore} >
        <GameStartedContext.Provider value={gameStarted}>
          {gameStarted ? <Game />
                      : <Home />}
        </GameStartedContext.Provider>   
      </HighScoreContext.Provider>
  );
}

export default App
