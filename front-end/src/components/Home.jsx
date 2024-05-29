import Footer from "./Footer";

function Home() {
    return(
        <>
            <div className="Home">
                <div className="vertical-center">
                    <img type='image/svg+xml' alt='letterboxd decal dots' src='https://a.ltrbxd.com/logos/letterboxd-decal-dots-pos-rgb.svg'/>
                    <h1 className="app-title">Letterboxd Higher or Lower</h1>
                    <button className="play-game-btn">Play</button>
                    <h3 className="high-score-home">High Score: 10</h3>
                </div>
            </div>

            <Footer />
        </>

    );
}

export default Home;