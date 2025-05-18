import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
    const { token } = useContext(AuthContext);
    const [showEdit, setShowEdit] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || "");
    const [editDeadline, setEditDeadline] = useState(
        task.deadline ? task.deadline.split("T")[0] : ""
    );

    const updateStatus = async (newStatus) => {
        try {
            const res = await axios.put(
                `http://localhost:3100/api/tasks/${task._id}`,
                { status: newStatus },
                {
                    headers: { Authorization: `Bearer ${token}` },
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
                headers: { Authorization: `Bearer ${token}` },
            });
            onTaskDeleted(task._id);
        } catch (error) {
            alert("No se pudo eliminar la tarea");
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `http://localhost:3100/api/tasks/${task._id}`,
                {
                    title: editTitle,
                    description: editDescription,
                    deadline: editDeadline || undefined,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            onTaskUpdated(res.data.task);
            setShowEdit(false);
        } catch (error) {
            alert("Error al editar tarea");
        }
    };

    return (
        <li className="list-group-item border-0 p-0">
            <div className="card bg-dark text-light border-dark shadow-sm mb-3">
                <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <h6 className="card-subtitle mb-2 text-secondary">
                        Estado: {task.status}
                    </h6>

                    {task.deadline && (
                        <p className="card-text">
                            Fecha límite: {new Date(task.deadline).toLocaleDateString()}
                        </p>
                    )}

                    {task.description && (
                        <p className="card-text">{task.description}</p>
                    )}

                    <div className="d-flex gap-2 flex-wrap mt-3">
                        {task.status === "pendiente" && (
                            <>
                                <button
                                    className="btn btn-outline-warning btn-sm"
                                    onClick={() => updateStatus("en progreso")}
                                >
                                    Iniciar
                                </button>
                                <button
                                    className="btn btn-outline-info btn-sm"
                                    onClick={() => setShowEdit(true)}
                                >
                                    Editar
                                </button>
                            </>
                        )}

                        {task.status === "en progreso" && (
                            <>
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => updateStatus("completada")}
                                >
                                    Completar
                                </button>
                                <button
                                    className="btn btn-outline-info btn-sm"
                                    onClick={() => setShowEdit(true)}
                                >
                                    Editar
                                </button>
                            </>
                        )}

                        {task.status === "completada" && (
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={deleteTask}
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {showEdit && (
                <div className="modal d-block bg-light bg-opacity-75" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark text-light border border-light">
                            <form onSubmit={handleEdit}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Editar tarea</h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowEdit(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Título</label>
                                        <input
                                            type="text"
                                            className="form-control bg-dark text-light border-light"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Descripción</label>
                                        <input
                                            type="text"
                                            className="form-control bg-dark text-light border-light"
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Fecha límite</label>
                                        <input
                                            type="date"
                                            className="form-control bg-dark text-light border-light"
                                            value={editDeadline}
                                            onChange={(e) => setEditDeadline(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success">
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowEdit(false)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
}

export default TaskItem;
