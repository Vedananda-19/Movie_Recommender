import { useNavigate } from "react-router-dom"

function HomePage (){
    const navigate = useNavigate()
    return(
        <div className="themeBackground homePage">
            <div className="heroCard">
                <span className="eyebrow">Your next favorite movie</span>
                <h1>Find something worth watching.</h1>
                <p>Explore popular releases, keep a watchlist, and save the movies you love.</p>
                <div className="heroActions">
                    <button onClick={() => navigate("/login")}>Login</button>
                    <button className="secondaryBtn" onClick={() => navigate("/register")}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage
