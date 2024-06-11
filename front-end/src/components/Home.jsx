import Footer from "./Footer";
import PlayButton from "./PlayButton";
import letterboxdSvg from '../assets/images/letterboxd-decal-dots-pos-rgb.svg';
import PropTypes from 'prop-types';
import { useContext, useState } from "react";
import { ScoreContext, ScoreSetContext } from "../App";

function Home(props) {
    // Checks cookies to look for user's stored high score 
    const highScore = decodeURIComponent(document.cookie) !== "" ? decodeURIComponent(document.cookie).split("=")[1] : "";
    const [clicked, setClicked] = useState(false); // Boolean representing whether a button has been clicked

    const score = useContext(ScoreContext);
    const setScore = useContext(ScoreSetContext);

    const clickHome = () => {
        if (!clicked) {
            setClicked(true);
            props.setFade(true);
            setTimeout(() => {
                setScore(0);
                setClicked(false);
                props.setFade(false);
            }, 1000);            
        }
    }

    return(
        score === 0 ? // Home screen
            <div className="Home">
                <div className="vertical-center">
                    <img type='image/svg+xml' alt='letterboxd decal dots' src={letterboxdSvg}/>
                    <h3 className="app-title">Letterboxd</h3>
                    <h3 className="app-title">Higher or Lower</h3>
                    <PlayButton />
                    <h3 className="high-score-home">High Score: {highScore !== "" ? highScore : 0}</h3>
                </div>
                
                <Footer />
            </div>
            
        : // Results screen
            <div className="Home">
                <div className="vertical-center" id="results">
                    <h1>Score:</h1>
                    <h1>{score > 0 ? score : 0}</h1>
                    <PlayButton text="PLAY AGAIN" />
                    <button className="button" id="home-btn" onClick={clickHome}>HOME</button>
                    <h3>High Score: {highScore}</h3>               
                </div>

                <Footer />
            </div>
    );
}

Home.propTypes = {
    setFade: PropTypes.func
}

export default Home;