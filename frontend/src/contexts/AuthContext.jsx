import { createContext, useState } from "react";
import * as AuthService from "../services/AuthServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    async function login(credentials) {

        const data = await AuthService.login(credentials);
        
        setUser(data.user);
        setToken(data.token);

        localStorage.setItem("token", data.token);

        return data;

    }

    const logout = () => {

        setUser(null);
        setToken(null);

        localStorage.removeItem("token");

    }

    const isAuthenticated = Boolean(token);

    return ( 
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                login,
                logout
            }}
        >

            {children}
            
        </AuthContext.Provider>
    )

}