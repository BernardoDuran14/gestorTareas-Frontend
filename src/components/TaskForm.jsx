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
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`,
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
        <form onSubmit={handleSubmit} className="bg-secondary p-3 rounded mb-4">
            <h5 className="text-white">Crear Tarea</h5>
            <div className="row g-2 align-items-end">
                <div className="col-md-4">
                    <label className="form-label text-light">Título</label>
                    <input
                        type="text"
                        className="form-control bg-light text-dark border-dark"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label text-light">Descripción</label>
                    <input
                        type="text"
                        className="form-control bg-light text-dark border-dark"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <label className="form-label text-light">Fecha límite</label>
                    <input
                        type="date"
                        className="form-control bg-light text-dark border-dark"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>
                <div className="col-md-1 d-grid">
                    <button type="submit" className="btn btn-success mt-2">
                        +
                    </button>
                </div>
            </div>
        </form>
    );
}

export default TaskForm;
