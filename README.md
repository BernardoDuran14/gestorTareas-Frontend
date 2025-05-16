# 💻 Frontend - Gestor de Tareas

Este es el frontend del proyecto **Gestor de Tareas**, construido con **React** y **Bootstrap**. Permite al usuario registrarse, iniciar sesión y gestionar sus tareas a través de un tablero visual tipo Scrum.

## 🚀 Tecnologías utilizadas
- React
- React Router DOM
- Context API (manejo global del token)
- Axios (para llamadas a la API)
- Bootstrap 5 (diseño responsive)
- Vite (o Create React App si aplicaste otro método)

## 📂 Estructura del proyecto

frontend/
├── pages/ → LoginPage, RegisterPage, DashboardPage
├── components/ → TaskForm, TaskItem, etc.
├── context/ → AuthContext.js (manejo global de sesión)
├── App.js → Enrutamiento principal con React Router
├── main.jsx → Punto de entrada de la app
└── .env → Variables de entorno

## ▶️ Cómo ejecutar localmente
1. Instala las dependencias:

npm install

## Ejecuta el proyecto:

npm run dev

La app se abrirá automáticamente en tu navegador en http://localhost:5173 (puede variar según Vite).

## 🔐 Variables de entorno
Crea un archivo .env en la raíz del frontend con:
VITE_API_URL=http://localhost:3100
## Y en tu código Axios usa:

axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, {
  headers: { Authorization: `Bearer ${token}` }
});

## 📌 Funcionalidades

Registro e inicio de sesión con JWT
Gestión de sesión con Context API
Crear, editar, completar y eliminar tareas
Filtros por título, estado y fecha límite
Diseño responsive con Bootstrap
Modo oscuro en toda la aplicación
Tablero Scrum (3 columnas): Pendiente, En progreso, Completada
Validación básica de formularios

## 📡 Conexión con backend
El frontend consume un backend que expone los siguientes endpoints:

/api/auth/login
/api/auth/register
/api/auth/me
/api/tasks

## 👨‍💻 Autor
Proyecto desarrollado por Bernardo Duran.
