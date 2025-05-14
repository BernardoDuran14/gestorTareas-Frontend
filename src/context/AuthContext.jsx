import { createContext, useState, useEffect } from "react";

// Crear contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    // Cargar token desde localStorage al iniciar
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) setToken(savedToken);
    }, []);

    // Función para hacer login
    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    // Función para logout
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isLogged: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};
