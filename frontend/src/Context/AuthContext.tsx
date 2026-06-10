import { useState, createContext, type ReactElement } from "react";

type TokenObj = { access_token: string; bearer: string };
type AuthContextType = {
    accessToken: TokenObj | null;
    login: (token: TokenObj) => void;
    logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: ReactElement }) {
    const storedToken = localStorage.getItem("access_token");
    const [accessToken, setAccessToken] = useState<TokenObj | null>(
        storedToken ? JSON.parse(storedToken!) : null,
    );

    const login = (token: TokenObj) => {
        localStorage.setItem("access_token", JSON.stringify(token));
        setAccessToken(token);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setAccessToken(null);
    };

    return <AuthContext value={{ accessToken, login, logout }}>{children}</AuthContext>;
}

export default AuthContext;
