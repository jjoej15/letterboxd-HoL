import './css/App.css'
import React, {useState, createContext} from 'react';
import Home from './components/Home';
import Game from './components/Game';

export const HighScoreContext = createContext();
export const GameSetContext = createContext();

function App() {
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  

  return (
      <HighScoreContext.Provider value={highScore}>
        <GameSetContext.Provider value={setGameStarted}>
          {gameStarted ? <Game />
                      : <Home />}
        </GameSetContext.Provider>   
      </HighScoreContext.Provider>
  );
}

export default App
