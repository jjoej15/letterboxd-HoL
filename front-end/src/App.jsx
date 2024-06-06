import './css/App.css'
import React, {useState, createContext} from 'react';
import Home from './components/Home';
import Game from './components/Game';

export const GameSetContext = createContext();
export const ScoreSetContext = createContext();
export const ScoreContext = createContext();

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [fade, setFade] = useState(false);
  
  const changeGameState = () => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
      setGameStarted(s => !s);
    }, 1000);
  }

  return (
    <div className={fade ? 'app-fade-out' : 'app'}>
      <ScoreSetContext.Provider value={setScore}>
        <ScoreContext.Provider value={score}>
          <GameSetContext.Provider value={changeGameState}>
            {gameStarted ? <Game /> : <Home />}
          </GameSetContext.Provider>           
        </ScoreContext.Provider>
      </ScoreSetContext.Provider> 
    </div> 
  );
}

export default App
