import { useNavigate, useLocation } from "react-router-dom";

export function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="navbar">
            <div
                className={`navbarEl ${location.pathname === "/" ? "active" : ""}`}
                onClick={() => navigate("/")}
            >
                Home
            </div>
            <div
                className={`navbarEl ${location.pathname === "/movies" ? "active" : ""}`}
                onClick={() => navigate("/movies")}
            >
               Movies
            </div>
        </div>
    );
}

export function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="sidebar">
            <div
                className={`sidebarEl ${location.pathname === "/" ? "active" : ""}`}
                onClick={() => navigate("/")}
            >
                Home
            </div>
            <div
                className={`sidebarEl ${location.pathname === "/movies" ? "active" : ""}`}
                onClick={() => navigate("/movies")}
            >
                Movies
            </div>
        </div>
    );
}
