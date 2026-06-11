import { useState, useEffect, createContext, type ReactElement } from "react";
import api from "../apis/api";

type TokenObj = { access_token: string; bearer: string };
type AuthContextType = {
    accessToken: TokenObj | null;
    login: (token: TokenObj) => void;
    logout: () => void;
    check_auth: () => Promise<boolean>
    isLoading: boolean
};
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: ReactElement }) {
    const storedToken = localStorage.getItem("access_token");
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [accessToken, setAccessToken] = useState<TokenObj | null>(
        storedToken ? JSON.parse(storedToken!) : null,
    );

    useEffect(() => {
        if (accessToken) {
            check_auth();
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

    const login = (token: TokenObj) => {
        setAccessToken(token);
    };

    const logout = () => {
        setAccessToken(null);
    };

    const check_auth = async () => {
        let success=false
        if (!accessToken) return false
        setIsLoading(true)
        try{
            const response = await api.get("/auth/verify-token")
            if (response.status==200)
            success =  true
        }
        catch(error:any){
            console.log("Authorisation : "+error)
            if (error.response?.status===401) return false
        }
        finally{
            setIsLoading(false)
            console.log("Token Verified " + success)
            return success
        }
    }

    return <AuthContext value={{ accessToken, login, logout, check_auth, isLoading }}>{children}</AuthContext>;
}

export default AuthContext;
