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
        search: ""
    });
    const [titleSearch, setTitleSearch] = useState("");

    useEffect(() => {
        if (!isLogged) {
            navigate("/login");
        }
    }, [isLogged, navigate]);

    useEffect(() => {
        fetchFilteredTasks();
        // eslint-disable-next-line
    }, [token]);

    const fetchFilteredTasks = async (newFilters = {}) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);

        try {
            const params = new URLSearchParams();
            if (updatedFilters.status) params.append("status", updatedFilters.status);
            if (updatedFilters.before) params.append("before", updatedFilters.before);
            if (updatedFilters.search) params.append("search", updatedFilters.search);

            const res = await axios.get(
                `http://localhost:3100/api/tasks?${params.toString()}`,
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
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Mis Tareas</h2>
                <button className="btn btn-danger" onClick={logout}>
                    Cerrar sesión
                </button>
            </div>

            <TaskForm onTaskCreated={handleNewTask} />

            <div className="bg-light p-3 rounded mb-4">
                <h5 className="mb-3">Filtrar tareas</h5>
                <div className="row g-3 align-items-center">
                    <div className="col-md-3">
                        <select
                            className="form-select"
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
                        <input
                            type="date"
                            className="form-control"
                            value={filters.before}
                            onChange={(e) => fetchFilteredTasks({ before: e.target.value })}
                        />
                    </div>

                    <div className="col-md-4 d-flex gap-2">
                        <input
                            type="text"
                            className="form-control"
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

            {tasks.length === 0 ? (
                <p className="text-muted">No tienes tareas aún.</p>
            ) : (
                <ul className="list-group">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onTaskUpdated={handleTaskUpdated}
                            onTaskDeleted={handleTaskDeleted}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DashboardPage;
