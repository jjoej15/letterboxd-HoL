import Film from "./Film"; 
import { useState, useEffect, useContext } from "react";
import { ScoreContext, ScoreSetContext, GameSetContext } from "../App";

function Game() {
    const highScore = decodeURIComponent(document.cookie) !== "" ? decodeURIComponent(document.cookie).split("=")[1] : ""
    const [leftFilm, setLeftFilm] = useState(null);
    const [rightFilm, setRightFilm] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [movieData, setMovieData] = useState(null);
    const [clicked, setClicked] = useState(false);
    const score = useContext(ScoreContext);
    const setScore = useContext(ScoreSetContext);
    const endGame = useContext(GameSetContext);
   
    const fetchData = async() => {
        try {
            // Fetching film data, times out after 8 seconds
            const response = await fetch('http://localhost:4000/movies', {signal: AbortSignal.timeout(8000)});
            const data = await response.json();
            setMovieData(data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoaded(true);
        }
    }
    
    const setFilms = (correctFilm, filmId) => {
        if (filmId !== 'left' || correctFilm.count > 1) {
            const leftIdx = Math.floor(Math.random() * movieData[0].data.length);
            setLeftFilm({
                "title": movieData[0].data[leftIdx]['Title'],
                "year": movieData[0].data[leftIdx].Year,
                "rating": movieData[0].data[leftIdx].Rating,
                "imgSrc": movieData[0].data[leftIdx]['Image Source'],
                "isRevealed": false,
                "count": 1
            });
        }

        if (filmId !== 'right' || correctFilm.count > 1) {
            const rightIdx = Math.floor(Math.random() * movieData[0].data.length);
            setRightFilm({
                "title": movieData[0].data[rightIdx]['Title'],
                "year": movieData[0].data[rightIdx].Year,
                "rating": movieData[0].data[rightIdx].Rating,
                "imgSrc": movieData[0].data[rightIdx]['Image Source'],
                "isRevealed": false,
                "count": 1
            });            
        }
    }

    // Fetches data on mount
    useEffect(() => {
        fetchData();
    }, [])

    // Sets first two movies once data has fetched
    useEffect(() => {
        if (movieData) {
            console.log(movieData);
            setFilms({}, '');
        }
    }, [movieData]);
    
    const handleClick = (film, otherFilm, id) => {
        setClicked(true);

        // Revealing rating, increasing count
        setLeftFilm((f) => ({...f, "isRevealed": true, "count": leftFilm.count + 1}));
        setRightFilm((f) => ({...f, "isRevealed": true, "count": rightFilm.count + 1}));    
        
        if (film.rating >= otherFilm.rating) {
            setScore((s) => s + 1);
            setTimeout(() => {
                setFilms(film, id);
                setClicked(false);
            }, 1500)

        // Game end
        } else {
            if (score >= highScore) document.cookie = `highScore=${score}`;
            if (score === 0) setScore(-1);
            setTimeout(() => {
                setClicked(false);
                endGame();
            }, 1750)
        }                                                        
    }    
    return( 
        isLoaded ? 
            <div className="Game">
                <div className="films">
                    {leftFilm && <Film id='left-side-film' title={`${leftFilm.title} (${leftFilm.year})`} 
                        rating={`${leftFilm.rating}`} imgSrc={`${leftFilm.imgSrc}`} 
                        isRevealed={leftFilm.isRevealed} onClick={!clicked ? ((film, otherFilm, id) => handleClick(leftFilm, rightFilm, "left")) : undefined}/>}
                    {rightFilm && <Film id='right-side-film'title={`${rightFilm.title} (${rightFilm.year})`} 
                        rating={`${rightFilm.rating}`} imgSrc={`${rightFilm.imgSrc}`}
                        isRevealed={rightFilm.isRevealed} onClick={!clicked ? ((film, otherFilm, id) => handleClick(rightFilm, leftFilm, "right")) : undefined}/>}
                </div>

                <p className="score">Score: {score === -1 ? 0 : score}</p>

                <div className="prompt">
                    <p>What film has the</p>
                    <p>higher Letterboxd</p>
                    <p>rating?</p>                
                </div>
            </div>
        :
        // Blank page w/ background
        <div style={{"transform": "translateY(-100%)"}}>e</div>
    )


}

export default Game;