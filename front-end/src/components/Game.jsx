import Film from "./Film"; 
import { useState, useEffect, useContext } from "react";
import { ScoreContext, ScoreSetContext, GameSetContext } from "../App";

function Game() {
    const highScore = decodeURIComponent(document.cookie) !== "" ? decodeURIComponent(document.cookie).split("=")[1] : ""
    const [leftFilm, setLeftFilm] = useState(null);
    const [rightFilm, setRightFilm] = useState(null);
    const [prevLeftFilm, setPrevLeftFilm] = useState(null);
    const [prevRightFilm, setPrevRightFilm] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [movieData, setMovieData] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [usedIdxTable, setUsedIdxTable] = useState({});

    const score = useContext(ScoreContext);
    const setScore = useContext(ScoreSetContext);
    const endGame = useContext(GameSetContext);
   
    const fetchData = async() => {
        try {
            // Fetching film data, times out after 8 seconds
            const response = await fetch('http://localhost:4000/movies', {signal: AbortSignal.timeout(8000)});
            const data = await response.json();
            setMovieData(data);
            // console.log(movieData);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoaded(true);
        }
    }
    
    const setFilms = (filmToKeep, filmToKeepId) => {
        let leftIdx;
        if (filmToKeepId !== 'left' || filmToKeep.count > 1) {
            if (filmToKeepId !== '') setPrevLeftFilm({...leftFilm});

            leftIdx = Math.floor(Math.random() * movieData[0].data.length);
            while (leftIdx in usedIdxTable) {
                leftIdx = Math.floor(Math.random() * movieData[0].data.length);
            }

            setLeftFilm({
                "title": movieData[0].data[leftIdx]['Title'],
                "year": movieData[0].data[leftIdx].Year,
                "rating": movieData[0].data[leftIdx].Rating,
                "imgSrc": movieData[0].data[leftIdx]['Image Source'],
                "isRevealed": false,
                "count": 1
            });
            
            setTimeout(() => {
                setPrevLeftFilm(null);
            }, 1000);
        }
        
        let rightIdx;
        if (filmToKeepId !== 'right' || filmToKeep.count > 1) {
            console.log(leftIdx);
            if (filmToKeepId !== '') setPrevRightFilm({...rightFilm});

            rightIdx = Math.floor(Math.random() * movieData[0].data.length);
            while (rightIdx===leftIdx || rightIdx in usedIdxTable) {
                rightIdx = Math.floor(Math.random() * movieData[0].data.length);
            }

            setRightFilm({
                "title": movieData[0].data[rightIdx]['Title'],
                "year": movieData[0].data[rightIdx].Year,
                "rating": movieData[0].data[rightIdx].Rating,
                "imgSrc": movieData[0].data[rightIdx]['Image Source'],
                "isRevealed": false,
                "count": 1
            });    
            
            setTimeout(() => {
                setPrevRightFilm(null);
            }, 1000);
        }

        setUsedIdxTable({...usedIdxTable, [leftIdx]: true, [rightIdx]: true});
    }

    // Fetches data on mount
    useEffect(() => {
        fetchData();
    }, [])

    // Sets first two movies once data has fetched
    useEffect(() => {
        if (movieData) {
            setFilms({}, '');
        }
    }, [movieData]);

    const endGameNow = () => {
        if (score >= highScore) document.cookie = `highScore=${score}`;
        if (score === 0) setScore(-1);
        setUsedIdxTable({});
        setTimeout(() => {
            setClicked(false);
            endGame();
        }, 1750)
    }
    
    const handleClick = (film, otherFilm, id, otherId) => {
        setClicked(true);

        const ratingAnimation = () => {
            if (!leftFilm.isRevealed) {
                let climbingRating = 0;
                setLeftFilm((f) => ({...f, "rating": climbingRating.toFixed(2), "isRevealed": true}));

                setTimeout(() => {
                    let climbInterval = setInterval(() => {
                        if (climbingRating < leftFilm.rating - .01) {
                            climbingRating += .01;
                            setLeftFilm((f) => ({...f, "rating": climbingRating.toFixed(2)}));
                        } else {
                            clearInterval(climbInterval);
                        }
                    }, 1);                         
                }, 300);
            }

            if (!rightFilm.isRevealed) {
                let climbingRating = 0;
                setRightFilm((f) => ({...f, "rating": climbingRating.toFixed(2), "isRevealed": true}));

                setTimeout(() => {
                    let climbInterval = setInterval(() => {
                        if (climbingRating < rightFilm.rating - .01) {
                            climbingRating += .01;
                            setRightFilm((f) => ({...f, "rating": climbingRating.toFixed(2)}));
                        } else {
                            clearInterval(climbInterval);
                        }
                    }, 1);  
                }, 300);
            }
        }

        // How long to wait for animation to finish. Calculated by taking the largest unrevealed rating and multiplying by 100, then adding 500
        const waitMs = (!leftFilm.isRevealed && !rightFilm.isRevealed 
                            ? Math.max(leftFilm.rating*100, rightFilm.rating*100) 
                            : (!leftFilm.isRevealed 
                                ? leftFilm.rating*100 
                                : rightFilm.rating*100)) + 300;

        ratingAnimation();

        // Wait for animation to finish before continuing function
        setTimeout(() => {
            // Revealing rating, increasing count
            setLeftFilm((f) => ({...f, "count": leftFilm.count + 1}));
            setRightFilm((f) => ({...f, "count": rightFilm.count + 1}));             

            // User answered correctly
            if (film.rating >= otherFilm.rating) {
                setScore((s) => s + 1);
                if (score + 1 === 468) { // Max score
                    endGameNow();
                } else {
                    setTimeout(() => {
                        // If correct film has been correct twice in a row, keep other film
                        if (film.count === 2) {
                            setFilms(otherFilm, otherId);
                        } else { // Otherwise keep correct film
                            setFilms(film, id);
                        }        
                        setClicked(false);
                    }, 1750)                    
                }
                
            // User answered incorrectly, game ends
            } else {
                endGameNow();
            }       
        }, waitMs);                                     
    }  

    return( 
        isLoaded ? 
            <div className="Game">
                <div className="films">
                    {leftFilm && 
                        <div id="left-film-box">
                            <Film title={`${leftFilm.title} (${leftFilm.year})`} 
                                 rating={`${leftFilm.rating}`} imgSrc={`${leftFilm.imgSrc}`} 
                                 isRevealed={leftFilm.isRevealed} id="film-slide-in"
                                 onClick={!clicked ? ((film, otherFilm, id, otherId) => handleClick(leftFilm, rightFilm, "left", "right")) : undefined}/>
                           {prevLeftFilm &&
                                <Film title={`${prevLeftFilm.title} (${prevLeftFilm.year})`} 
                                      rating={`${prevLeftFilm.rating}`} imgSrc={`${prevLeftFilm.imgSrc}`} 
                                      isRevealed={prevLeftFilm.isRevealed} id="film-slide-out" />}                          
                       </div>}
                    {rightFilm && 
                        <div id="right-film-box">
                           <Film title={`${rightFilm.title} (${rightFilm.year})`} 
                                 rating={`${rightFilm.rating}`} imgSrc={`${rightFilm.imgSrc}`} 
                                 isRevealed={rightFilm.isRevealed} id="film-slide-in"
                                 onClick={!clicked ? ((film, otherFilm, id, otherId) => handleClick(rightFilm, leftFilm, "right", "left")) : undefined}/> 
                           {prevRightFilm &&
                                <Film title={`${prevRightFilm.title} (${prevRightFilm.year})`} 
                                      rating={`${prevRightFilm.rating}`} imgSrc={`${prevRightFilm.imgSrc}`} 
                                      isRevealed={prevRightFilm.isRevealed} id="film-slide-out" />}                                  
                        </div>}
                </div>

                <h3 className="score">Score: {score === -1 ? 0 : score}</h3>

                <div className="prompt">
                    <h3>What film has the higher Letterboxd rating?</h3>              
                </div>
            </div>
        :
        // Blank page w/ background
        <div style={{"transform": "translateY(-100%)"}}>e</div>
    );
}

export default Game;
