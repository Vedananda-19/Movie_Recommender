import { useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import api from "../apis/api"
import useAuth from "../hooks/useAuth";

function LoginPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const {login} = useAuth()!
    const navigate = useNavigate()

    const resetForm = () => {
        setUsername("")
        setPassword("")
        setErrorMsg("")
    }

    async function handleLogin(e:React.SubmitEvent){
        e.preventDefault()
        try{
            const response = await api.post(`/auth/login`,{username:username,password:password})
            const token = response.data
            console.log(token)
            login(token)
            navigate("/movies")
            resetForm()
        }
        catch(error){
            console.log(error)
            setErrorMsg("An Error Occured")
        }
    }
    return(
         <div className="backgroundDiv">
            <div className="centerCard">
                <form className="authForm" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button type="submit">Login</button>
                    {errorMsg && <p>{errorMsg}</p>}
                    <Link to="/register">New User ? Click here to Register</Link>
                </form>
            </div>
        </div>
    )
}

export default LoginPage