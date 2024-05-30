import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { GameSetContext } from '../App';

function PlayButton(props) {
    const text = props.text || 'Play';
    const setGameState = useContext(GameSetContext);

    const startGame = (e) => {
        // Triggers bounce animation
        e.target.classList.add('bounce-animation');

        // Set timeout to let animation finish and start game
        setTimeout(() => {
            e.target.classList.remove('bounce-animation');
            setGameState(true);
        }, 1000);
    }

    return(<button onClick={(e) => startGame(e)} id="play-game-btn">{text}</button>);
}

PlayButton.propTypes = {
    text: PropTypes.string,
}

export default PlayButton;