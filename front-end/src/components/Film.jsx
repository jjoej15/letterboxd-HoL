import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

function Film(props) {
    const [isHovering, setIsHovering] = useState(false);

    // If hovering over film div, darkens background image
    let containerStyle = isHovering ? {background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.imgSrc})`,
                                       backgroundPosition: `center`,
                                       backgroundRepeat: `no-repeat`,
                                       backgroundSize: `cover`}
                                    : {backgroundImage: `url(${props.imgSrc})`};
                                    
    return(
        <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
             className="Film" id={props.id} style={containerStyle} onClick={props.onClick} key={props.title}>
            <div className="film-info">
                <h1 className="film-title">{props.title}</h1>

                {props.isRevealed && 
                <div className="film-rating" >
                    <h3>{props.rating}</h3>
                    <FontAwesomeIcon icon={faStar} />
                </div> }
            </div>
        </div>
    );
}

Film.propTypes = {
    title: PropTypes.string,
    rating: PropTypes.string,
    imgSrc: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func,
    isRevealed: PropTypes.bool
}

export default Film;