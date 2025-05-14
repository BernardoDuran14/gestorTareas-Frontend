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
                password,
            });
            login(res.data.token);
            alert("Login exitoso");
            navigate("/dashboard");
        } catch (err) {
            alert("Error en login: " + err.response.data.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleLogin} className="card p-4 shadow" style={{ width: "100%", maxWidth: 400 }}>
                <h2 className="text-center mb-4">Iniciar sesión</h2>

                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Entrar</button>

                <p className="mt-3 text-center">
                    ¿No tienes una cuenta? <a href="/register">Regístrate</a>
                </p>

            </form>
        </div>
    );
}

export default LoginPage;
