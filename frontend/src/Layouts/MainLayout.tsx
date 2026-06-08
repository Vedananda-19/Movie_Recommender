import {Outlet} from "react-router-dom"
import { NavBar } from "../Components/LayoutComponents"

function MainLayout(){
    return(
        <div className="mainLayout">
            <NavBar />
            <Outlet />
        </div>
    )
}

export default MainLayout