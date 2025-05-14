import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function TaskForm({ onTaskCreated }) {
    const { token } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:3100/api/tasks",
                {
                    title,
                    description,
                    deadline: deadline || undefined,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            onTaskCreated(res.data.task);
            setTitle("");
            setDescription("");
            setDeadline("");
        } catch (err) {
            alert("Error al crear la tarea");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h5 className="mb-3">Crear nueva tarea</h5>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Descripción (opcional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <input
                    type="date"
                    className="form-control"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-success">
                Agregar tarea
            </button>
        </form>
    );
}

export default TaskForm;
