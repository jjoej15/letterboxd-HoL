import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { GameSetContext, ScoreSetContext} from '../App';

function PlayButton(props) {
    const text = props.text || 'PLAY';
    const startGame = useContext(GameSetContext);
    const setScore = useContext(ScoreSetContext);
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        if (!clicked) {
            setClicked(true);
            startGame();
            setTimeout(() => {
                setScore(0);
                setClicked(false);
            }, 1000);            
        }

    }

    return(<button onClick={handleClick} id="play-game-btn">{text}</button>);
}

PlayButton.propTypes = {
    text: PropTypes.string
}

export default PlayButton;