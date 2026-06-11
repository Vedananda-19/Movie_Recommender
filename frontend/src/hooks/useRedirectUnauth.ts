import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "./useAuth"

function useRedirectUnauth(){
    const navigate = useNavigate()
    const location = useLocation()
    const {logout} = useAuth()!
    const redirect = () => {
        logout()
        navigate("/login",{state:{from:location},replace:true})
    }
    return redirect
}

export default useRedirectUnauth