const { pool } = require('../config/db');

async function createTables() {
    try {
        const connection = await pool.getConnection();

        // 1. Create Users Table
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // 2. Create Tasks Table
        // Notice the FOREIGN KEY: It links user_id to the users table
        // ON DELETE CASCADE: If a user is deleted, their tasks vanish too. Clean.
        const createTasksTable = `
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                description TEXT,
                status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
                user_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `;

        await connection.query(createUsersTable);
        console.log('✅ Users table ready');

        await connection.query(createTasksTable);
        console.log('✅ Tasks table ready');

        connection.release();
        process.exit(0); // Stop the script when done

    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
}

createTables();