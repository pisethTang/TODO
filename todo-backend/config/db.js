const mysql = require("mysql2/promise"); // using the promise version for async/await 
require("dotenv").config(); // load the secret .env variables 


let poolOption = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10, // max 10 active connections at once 
    queueLimit: 0       // no limit on how many requests can wait in line 
};


// create the pool 
const pool = mysql.createPool(poolOption);


// a helper function to check if we are connected, and is called when the server starts
async function testConnection(){
    try {
        const connection = await pool.getConnection();
        if (connection) console.log("✅ Database connected successfully");
        connection.release(); // always release connection back to the pool 
    } catch (error){
        console.error("❌ Database connection failed:", error.message);
    }
}


module.exports = {
    pool,
    testConnection
};