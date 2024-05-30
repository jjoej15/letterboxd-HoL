import PropTypes from 'prop-types';

function PlayButton(props) {
    const text = props.text || 'Play';

    const animation = (e) => {
        e.target.classList.add('bounce-animation');
        setTimeout(() => {e.target.classList.remove('bounce-animation')}, 1000);
    }

    return(<button onClick={(e) => animation(e)} id="play-game-btn">{text}</button>);
}

PlayButton.propTypes = {
    text: PropTypes.string,
}

export default PlayButton;