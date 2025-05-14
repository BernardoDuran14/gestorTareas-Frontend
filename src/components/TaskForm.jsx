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
                    deadline: deadline || undefined // no enviar si está vacío
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            onTaskCreated(res.data.task); // avisamos al padre
            setTitle("");
            setDescription("");
            setDeadline("");
        } catch (err) {
            alert("Error al crear la tarea");
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Crear nueva tarea</h3>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Descripción (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
            <button type="submit">Agregar tarea</button>
        </form>
    );
}

export default TaskForm;
