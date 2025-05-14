import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3100/api/auth/login", {
                email,
                password
            });
            login(res.data.token); // Guardar el token en contexto
            alert("Login exitoso");
            navigate("/dashboard"); // Redirigir al dashboard
        } catch (err) {
            alert("Error en login: " + err.response.data.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Iniciar sesión</h2>
            <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Entrar</button>
        </form>
    );
}

export default LoginPage;
