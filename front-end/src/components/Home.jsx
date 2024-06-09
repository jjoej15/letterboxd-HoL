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
                    <h3 className="app-title">LETTERBOXD</h3>
                    <h3 className="app-title">HIGHER OR LOWER</h3>
                    <PlayButton />
                    <h3 className="high-score-home">HIGH SCORE: {highScore !== "" ? highScore : 0}</h3>
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