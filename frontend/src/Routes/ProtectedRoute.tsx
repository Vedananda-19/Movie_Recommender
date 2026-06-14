import {Outlet,Link} from "react-router-dom"
import useAuth from "../hooks/useAuth"

function ProtectedRoute(){
    const {user} = useAuth()!
    if (user) {
        return <Outlet />
    }
    else{
        return <NotLoggedInPage />
    }
}

export default ProtectedRoute

function NotLoggedInPage(){
    return (
        <div className="themeBackground emptyState">
            <h1>Login to View</h1>
            <Link className="loginLink" to={"/login"}>Login</Link>
        </div>
    )
}
