import { useNavigate, useLocation } from "react-router-dom";

function NavBar({ isAuthenticated }: { isAuthenticated: Boolean }) {
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
            {
                !isAuthenticated && 
                <div className={`navbarEl ${["/login","/register"].includes(location.pathname) ? "active" : ""}`}>
                    <button onClick={() => navigate("/login")}>Login</button>
                    <button onClick={() => navigate("/register")}>Register</button>
                </div>
            }
        </div>
    );
}

export default NavBar;
