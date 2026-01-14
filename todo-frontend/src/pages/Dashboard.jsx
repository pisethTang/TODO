import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data);
        } catch (err) {
            console.error("Failed to fetch tasks: ", err);
        }
    };

    const toggleStatus = async (task) => {
        const newStatus = task.status === "pending" ? "completed" : "pending";
        try {
            // send the current {title, description, __} where ___ is a flipped status
            await api.put(`/tasks/${task.id}`, {
                title: task.title,
                description: task.description || "",
                status: newStatus,
            });

            fetchTasks(); //reload the list to show the change
        } catch (err) {
            alert(`Error updating task status: ${err}`);
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

    // 1. Fetch tasks on load
    useEffect(() => {
        fetchTasks();
    }, []);
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header stays the same... */}
            <div className="bg-blue-600 text-white shadow-lg">
                <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">My To-Do List</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Form stays the same... */}
                <form
                    onSubmit={addTask}
                    className="bg-white rounded-lg shadow-md p-6 mb-8"
                >
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Add New Task
                    </h2>
                    <div className="flex gap-3">
                        <input
                            placeholder="Task Title"
                            value={newTask.title}
                            onChange={(e) =>
                                setNewTask({
                                    ...newTask,
                                    title: e.target.value,
                                })
                            }
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
                        >
                            Add Task
                        </button>
                    </div>
                </form>

                {/* Task List - Updated with Toggle Checkbox */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Your Tasks
                    </h2>
                    {tasks.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">
                            No tasks yet.
                        </p>
                    ) : (
                        <ul className="space-y-3">
                            {tasks.map((task) => (
                                <li
                                    key={task.id}
                                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* THE CHECKBOX */}
                                        <input
                                            type="checkbox"
                                            checked={
                                                task.status === "completed"
                                            }
                                            onChange={() => toggleStatus(task)}
                                            className="w-5 h-5 cursor-pointer accent-blue-600"
                                        />
                                        <span
                                            className={`text-lg transition-all ${
                                                task.status === "completed"
                                                    ? "line-through text-gray-400"
                                                    : "text-gray-800 font-medium"
                                            }`}
                                        >
                                            {task.title}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="text-red-500 hover:text-red-700 font-bold px-2"
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
