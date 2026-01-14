const Task = require("../models/taskModel");

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Remember: Our middleware 'protect' added the 'user' object to the request!
        // The token had { id: 1 }, so req.user.id is 1.
        const userId = req.user.id;

        const taskId = await Task.create(title, description, userId);

        res.status(201).json({
            message: "Task created",
            taskId,
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const getMyTasks = async (req, res) => {
    try {
        // console.log("===================\n");
        // console.log("req: ", req);
        // console.log("===================\n");
        // console.log("res: ", res);
        const userId = req.user.id;
        const tasks = await Task.getAllByUser(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Server error: Cannot get task." });
    }
};

const deleteTask = async (req, res) => {
    try {
        // const userId =
        // console.log("Testing delete endpoint ...");
        const taskId = req.params.id; // params is injected automatically by the Express Router
        const userId = req.user.id; // from our "protect" middleware

        const success = await Task.delete(taskId, userId);
        if (!success) {
            return res
                .status(404)
                .json({ error: "Task not found or user is unauthorized" });
        }

        res.json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Server error: Cannot delete task." });
    }
};

const updateTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const taskId = req.params.id;
        const {title, description, status} = req.body;

        const success = await Task.update(taskId, userId, {title, description, status});
        if (!success) {
            return res.status(404).json({ error: "task cannnot be updated or unauthorized" });
        }
        res.json({
            message: "Tasked updated sucessfully",
        });
    } catch (error) {
        res.status(500).json({
            error: "Server error: Failed to update the given task",
        });
    }
};

module.exports = { createTask, getMyTasks, deleteTask, updateTask};
