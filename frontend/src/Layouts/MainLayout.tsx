import {Outlet, useLocation} from "react-router-dom"
import NavBar from "../Components/NavBar"
import MoviesSidebar from "../Components/MoviesSidebar";
import useAuth from "../hooks/useAuth";

function MainLayout(){
    const { user } = useAuth()!
    const location = useLocation()
    const isMoviesRoute = location.pathname.startsWith("/movies")

    return(
        <div className="mainLayout">
            <NavBar isAuthenticated={Boolean(user)}/>
            <div className={`layoutContent ${isMoviesRoute ? "withSidebar" : ""}`}>
                {isMoviesRoute && <MoviesSidebar />}
                <main className="routeContent">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout
