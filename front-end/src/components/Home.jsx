import Footer from "./Footer";
import PlayButton from "./PlayButton";
import letterboxdSvg from '../assets/images/letterboxd-decal-dots-pos-rgb.svg';
import { useContext } from "react";
import { ScoreContext } from "../App";

function Home() {
    // Checks cookies to look for user's stored high score 
    // TODO: set cookie expiration dates
    const highScore = decodeURIComponent(document.cookie) !== "" ? decodeURIComponent(document.cookie).split("=")[1] : ""
    const score = useContext(ScoreContext);

    return(
        score === 0 ?
            <div className="Home">
                <div className="vertical-center">
                    <img type='image/svg+xml' alt='letterboxd decal dots' src={letterboxdSvg}/>
                    <p className="app-title">LETTERBOXD</p>
                    <p className="app-title">HIGHER OR LOWER</p>
                    <PlayButton />
                    <p className="high-score-home">HIGH SCORE: {highScore !== "" ? highScore : 0}</p>
                </div>
                
                <Footer />
            </div>
        : 
            <div className="Results">
                {score > 0 ? score : 0}
                <PlayButton text="Try again" />
            </div>
    );
}

export default Home;