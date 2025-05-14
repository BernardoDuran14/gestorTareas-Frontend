import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
    const { token } = useContext(AuthContext);

    const updateStatus = async (newStatus) => {
        try {
            const res = await axios.put(
                `http://localhost:3100/api/tasks/${task._id}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onTaskUpdated(res.data.task);
        } catch (error) {
            alert("No se pudo actualizar el estado");
        }
    };

    const deleteTask = async () => {
        try {
            await axios.delete(`http://localhost:3100/api/tasks/${task._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onTaskDeleted(task._id);
        } catch (error) {
            alert("No se pudo eliminar la tarea");
        }
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-start flex-wrap">
            <div>
                <h6 className="mb-1">
                    <strong>{task.title}</strong> — <span className="text-muted">{task.status}</span>
                </h6>
                {task.deadline && (
                    <small className="text-muted">
                        Fecha límite: {new Date(task.deadline).toLocaleDateString()}
                    </small>
                )}
                {task.description && (
                    <p className="mb-1">{task.description}</p>
                )}
            </div>

            <div className="d-flex gap-2">
                {task.status === "pendiente" && (
                    <button className="btn btn-warning btn-sm" onClick={() => updateStatus("en progreso")}>
                        Iniciar
                    </button>
                )}
                {task.status === "en progreso" && (
                    <button className="btn btn-primary btn-sm" onClick={() => updateStatus("completada")}>
                        Completar
                    </button>
                )}
                {task.status === "completada" && (
                    <button className="btn btn-danger btn-sm" onClick={deleteTask}>
                        Eliminar
                    </button>
                )}
            </div>
        </li>
    );
}

export default TaskItem;
