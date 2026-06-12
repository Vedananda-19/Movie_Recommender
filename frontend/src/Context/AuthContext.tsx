import { useState, useEffect, createContext, type ReactElement } from "react";
import api from "../apis/api";

type TokenObj = { access_token: string; bearer: string };
type AuthContextType = {
    user: object | null;
    login: (token: TokenObj) => void;
    logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: ReactElement }) {
    const storedToken = localStorage.getItem("access_token");
    const [accessToken, setAccessToken] = useState<TokenObj | null>(
        storedToken ? JSON.parse(storedToken!) : null,
    );
    const [user,setUser] = useState<object | null>(null)

    useEffect(() => {
        if (accessToken) {
            checkAuth();
        }
    }, []);
    useEffect(() => {
        if (accessToken) {
            localStorage.setItem(
                "access_token",
                JSON.stringify(accessToken)
            );
        } else {
            localStorage.removeItem("access_token");
        }
    }, [accessToken]);

    const login = async (token: TokenObj) => {
        setAccessToken(token);
    };

    const logout = () => {
        setAccessToken(null);
        setUser(null)
    };

    const checkAuth = async () => {
        if (!accessToken) logout()
        try{
            const response = await api.get("/auth/me")
            setUser(response.data)
        }
        catch(error:any){
            console.log("Authorisation : "+error)
            if (error.response?.status===401) logout()
        }
        finally{
            console.log("Token Verified ")
        }
    }

    return <AuthContext value={{ user, login, logout}}>{children}</AuthContext>;
}

export default AuthContext;
