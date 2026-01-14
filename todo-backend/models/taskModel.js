const { pool } = require("../config/db");

const Task = {
    // 1. Create a new task
    create: async (title, description, userId) => {
        const sql = "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)";
        const [result] = await pool.query(sql, [title, description, userId]);
        return result.insertId;
    },

    // 2. Get all tasks created by the specific user (represented by the userId)
    getAllByUser: async (userId) => {
        // TODO: Write a SELECT query that gets everything from 'tasks' 
        // but ONLY where user_id matches the one passed in.
        const sql = "SELECT * FROM tasks WHERE user_id = ?";
        const [rows] = await pool.query(sql, [userId])
        return rows;
    },

    // 3. Delete a task (Security check: Must belong to the user!)
    delete: async (taskId, userId) => {
        // TODO: Write a DELETE query that deletes from 'tasks'
        // WHERE id = ? AND user_id = ?
        // (This ensures a user can't delete someone else's task by guessing the ID)
        const sql = "DELETE FROM tasks WHERE id = ? AND user_id = ?";
        const [rows] = await pool.query(sql, [taskId, userId]);
        return rows;
    }, 

    update: async (taskId, userId, updates) => {
        const {title, description, status} = updates;
        // use coalesce in sql or logic in JS 
        const sql = `
            UPDATE tasks
            SET title = ?, description = ?, status = ?, updated_at = NOW()
            WHERE id = ? AND user_id = ?
        `;
        const [results] = await pool.query(sql, [title, description, status, taskId, userId]);
        return results.affectedRows > 0;
    }
};

module.exports = Task;