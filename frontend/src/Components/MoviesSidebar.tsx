import { useLocation, useNavigate } from "react-router-dom";

function MoviesSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside className="moviesSidebar">
            <div
                className={`sidebarEl ${location.pathname === "/movies" ? "active" : ""}`}
                onClick={() => navigate("/movies")}
            >
                Movies
            </div>
            <div
                className={`sidebarEl ${location.pathname === "/movies/recommendations" ? "active" : ""}`}
                onClick={() => navigate("/movies/recommendations")}
            >
                Recommendations
            </div>
            <div
                className={`sidebarEl ${location.pathname === "/movies/search" ? "active" : ""}`}
                onClick={() => navigate("/movies/search")}
            >
                Search
            </div>
        </aside>
    );
}

export default MoviesSidebar;
