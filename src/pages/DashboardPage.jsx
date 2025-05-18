import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function DashboardPage() {
    const { token, isLogged, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({
        status: "",
        before: "",
        search: "",
    });
    const [titleSearch, setTitleSearch] = useState("");

    useEffect(() => {
        if (!isLogged) {
            navigate("/login");
        }
    }, [isLogged, navigate]);

    // Cargar tareas iniciales sin actualizar filtros para evitar loop
    useEffect(() => {
        if (token) {
            const loadTasks = async () => {
                await fetchFilteredTasks(null);
            };
            loadTasks();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const fetchFilteredTasks = async (newFilters = null) => {
        const updatedFilters = newFilters ? { ...filters, ...newFilters } : filters;

        if (newFilters) setFilters(updatedFilters);

        try {
            const params = new URLSearchParams();
            if (updatedFilters.status) params.append("status", updatedFilters.status);
            if (updatedFilters.before) params.append("before", updatedFilters.before);
            if (updatedFilters.after) params.append("after", updatedFilters.after);
            if (updatedFilters.search) params.append("search", updatedFilters.search);

            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/tasks?${params.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTasks(res.data);
        } catch (err) {
            alert("Error al filtrar tareas");
        }
    };

    const handleNewTask = (newTask) => {
        setTasks([newTask, ...tasks]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    };

    const handleTaskDeleted = (deletedId) => {
        setTasks(tasks.filter((t) => t._id !== deletedId));
    };

    return (
        <div className="container mt-4 light text-dark min-vh-100 p-4 rounded">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Mis Tareas</h2>
                <button className="btn btn-danger" onClick={logout}>
                    Cerrar sesión
                </button>
            </div>

            <TaskForm onTaskCreated={handleNewTask} />

            <div className="bg-secondary p-3 rounded mb-4">
                <h3>Filtrar tareas</h3>

                <div className="row g-3 align-items-center">
                    <div className="col-md-3">
                        <select
                            className="form-select bg-light text-dark border-dark"
                            value={filters.status}
                            onChange={(e) => fetchFilteredTasks({ status: e.target.value })}
                        >
                            <option value="">Todas</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="en progreso">En progreso</option>
                            <option value="completada">Completada</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Desde</label>
                        <input
                            type="date"
                            className="form-control bg-light text-dark border-dark"
                            value={filters.after}
                            onChange={(e) => fetchFilteredTasks({ after: e.target.value })}
                        />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Hasta</label>
                        <input
                            type="date"
                            className="form-control bg-light text-dark border-dark"
                            value={filters.before}
                            onChange={(e) => fetchFilteredTasks({ before: e.target.value })}
                        />
                    </div>


                    <div className="col-md-4 d-flex gap-2">
                        <input
                            type="text"
                            className="form-control bg-light text-dark border-dark"
                            placeholder="Buscar por título"
                            value={titleSearch}
                            onChange={(e) => setTitleSearch(e.target.value)}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={() => fetchFilteredTasks({ search: titleSearch })}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-4">
                    <h5 className="text-center">Pendiente</h5>
                    {tasks
                        .filter((t) => t.status === "pendiente")
                        .map((task) => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                onTaskUpdated={handleTaskUpdated}
                                onTaskDeleted={handleTaskDeleted}
                            />
                        ))}
                </div>

                <div className="col-md-4">
                    <h5 className="text-center">En Progreso</h5>
                    {tasks
                        .filter((t) => t.status === "en progreso")
                        .map((task) => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                onTaskUpdated={handleTaskUpdated}
                                onTaskDeleted={handleTaskDeleted}
                            />
                        ))}
                </div>

                <div className="col-md-4">
                    <h5 className="text-center">Completadas</h5>
                    {tasks
                        .filter((t) => t.status === "completada")
                        .map((task) => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                onTaskUpdated={handleTaskUpdated}
                                onTaskDeleted={handleTaskDeleted}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
