import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });

    // 1. Fetch tasks on load
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data);
        } catch (err) {
            console.error("Failed to fetch tasks: ", err);
        }
    };

    // 2. Add a task
    const addTask = async (e) => {
        e.preventDefault();
        try {
            await api.post("/tasks", newTask);
            setNewTask({ title: "", description: "" });
            fetchTasks(); // Refresh the list
        } catch (err) {
            alert("Error adding task: ", err);
        }
    };

    // 3. Delete a task
    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks(); // Refresh the list
        } catch (err) {
            alert("Error deleting task: ", err);
        }
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        // clear the token
        localStorage.removeItem("token");

        // redirect to login
        // because the ProtectedRoute wraps around this dashboard,
        navigate("/");
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>My To-Do List</h1>
                <button
                    onCLick={handleLogout}
                    style={{ height: "30px", marginTop: "25px" }}
                >Log Out</button>
            </div>

            <form onSubmit={addTask}>
                <input
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                    }
                />
                <button type="submit">Add Task</button>
            </form>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.title}</strong> - {task.status}
                        <button
                            onClick={() => deleteTask(task.id)}
                            style={{ marginLeft: "10px" }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
