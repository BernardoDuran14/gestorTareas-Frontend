import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";


function DashboardPage() {
    const { token, isLogged, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    // Redirige si no está logueado
    useEffect(() => {
        if (!isLogged) {
            navigate("/login");
        }
    }, [isLogged, navigate]);

    // Cargar tareas al iniciar
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get("http://localhost:3100/api/tasks", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTasks(res.data);
            } catch (error) {
                alert("Error al obtener tareas");
            }
        };

        if (token) fetchTasks();
    }, [token]);

    // 👇 FUNCION NUEVA: Agrega la nueva tarea al estado
    const handleNewTask = (newTask) => {
        setTasks([newTask, ...tasks]);
    };

    return (
        <div>
            <h2>Mis Tareas</h2>
            <button onClick={logout}>Cerrar sesión</button>

            {/* 👇 Incluir el formulario aquí */}
            <TaskForm onTaskCreated={handleNewTask} />

            <ul>
                {tasks.length === 0 ? (
                    <p>No tienes tareas aún.</p>
                ) : (
                    tasks.map((task) => (
                        <li key={task._id}>
                            <strong>{task.title}</strong> - {task.status}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default DashboardPage;
