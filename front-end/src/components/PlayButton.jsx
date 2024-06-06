import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { GameSetContext, ScoreSetContext} from '../App';

function PlayButton(props) {
    const text = props.text || 'PLAY';
    const startGame = useContext(GameSetContext);
    const setScore = useContext(ScoreSetContext);

    const handleClick = () => {
        startGame();
        setTimeout(() => {
            setScore(0);
        }, 1000);
    }

    return(<button onClick={handleClick} id="play-game-btn">{text}</button>);
}

PlayButton.propTypes = {
    text: PropTypes.string
}

export default PlayButton;