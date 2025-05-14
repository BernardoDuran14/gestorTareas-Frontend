import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3100/api/auth/register", {
                name,
                email,
                password,
            });
            alert("Usuario registrado correctamente");
            navigate("/login");
        } catch (err) {
            alert("Error en registro: " + err.response.data.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleRegister} className="card p-4 shadow" style={{ width: "100%", maxWidth: 400 }}>
                <h2 className="text-center mb-4">Registro</h2>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

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

                <button type="submit" className="btn btn-success w-100">Registrarse</button>

                <p className="mt-3 text-center">
                    ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
                </p>

            </form>
        </div>
    );
}

export default RegisterPage;
