import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                email,
                password,
            });
            login(res.data.token);
            alert("Login exitoso");
            navigate("/dashboard");
        } catch (err) {
            console.error("💥 Error al hacer login:", err);

            if (err.response?.data?.message) {
                alert("Error en login: " + err.response.data.message);
            } else if (err.response?.data?.errors) {
                alert(err.response.data.errors.map(e => e.msg).join("\n"));
            } else if (err.request) {
                alert("❌ No se obtuvo respuesta del servidor. ¿Render está despierto?");
            } else {
                alert("❌ Error inesperado al conectar con el servidor.");
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <form
                onSubmit={handleLogin}
                className="bg-secondary text-light p-5 rounded shadow"
                style={{ width: "100%", maxWidth: 400 }}
            >
                <h2 className="mb-4 text-center">Iniciar sesión</h2>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="form-control bg-dark text-light border-light"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="form-control bg-dark text-light border-light"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                    Entrar
                </button>

                <p className="text-center">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="text-info">
                        Regístrate aquí
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
