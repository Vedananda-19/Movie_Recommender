import { useState } from "react";
import { Link,useNavigate } from "react-router-dom"

function LoginPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    function handleLogin(){
        
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