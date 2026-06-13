import {Outlet} from "react-router-dom"
import NavBar from "../Components/NavBar"
import useAuth from "../hooks/useAuth";

function MainLayout(){
    const { user } = useAuth()!
    return(
        <div className="mainLayout">
            <NavBar isAuthenticated={Boolean(user)}/>
            <Outlet />
        </div>
    )
}

export default MainLayout