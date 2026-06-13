import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../apis/api";
import useAuth from "../hooks/useAuth";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const { login } = useAuth()!;
    const navigate = useNavigate();
    const location = useLocation();

    const resetForm = () => {
        setUsername("");
        setPassword("");
        setErrorMsg("");
    };

    async function handleLogin(e: React.SubmitEvent) {
        e.preventDefault();
        try {
            const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);
            const response = await api.post("/auth/login", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            const token = response.data;
            console.log(token);
            login(token);
            location.state?.from
                ? navigate(location.state.from)
                : navigate("/movies");
            resetForm();
        } catch (error: any) {
            console.log(error);
            setErrorMsg(error.response?.data?.detail ?? "Login Failed");
        }
    }
    return (
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
                    <Link to="/register">
                        New User ? Click here to Register
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
