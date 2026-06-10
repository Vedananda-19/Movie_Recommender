import {Outlet} from "react-router-dom"
import NavBar from "../Components/NavBar"
import useAuth from "../hooks/useAuth";

function MainLayout(){
    const { accessToken } = useAuth()!
    return(
        <div className="mainLayout">
            <NavBar isAuthenticated={Boolean(accessToken)}/>
            <Outlet />
        </div>
    )
}

export default MainLayout