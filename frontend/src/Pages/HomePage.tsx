import { useNavigate } from "react-router-dom"

function HomePage (){
    const navigate = useNavigate()
    return(
        <div>Home
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
            <button onClick={() => navigate("/Movies")}>Movies</button>
        </div>
    )
}

export default HomePage