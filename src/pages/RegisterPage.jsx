import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                name,
                email,
                password,
            });
            alert("Usuario registrado correctamente");
            navigate("/login");
        } catch (err) {
            if (err.response && err.response.data) {
                if (err.response.data.errors) {
                    alert(err.response.data.errors.map(e => e.msg).join("\n"));
                }
                else if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert("Error desconocido en el registro");
                }
            } else {
                alert("Error en la conexión con el servidor");
            }
        }

    };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <form
                onSubmit={handleRegister}
                className="bg-secondary text-light p-5 rounded shadow"
                style={{ width: "100%", maxWidth: 400 }}
            >
                <h2 className="mb-4 text-center">Registro</h2>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Nombre completo
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="form-control bg-dark text-light border-light"
                        placeholder="Ingresa tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

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

                <button type="submit" className="btn btn-success w-100 mb-3">
                    Registrarse
                </button>

                <p className="text-center">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-info">
                        Inicia sesión aquí
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterPage;
