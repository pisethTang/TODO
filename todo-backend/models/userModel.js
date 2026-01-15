const { pool } = require("../config/db"); // so that we can send SQL queries to our database.

const User = {
    // find a user by email (useful for checking duplicates or login)
    findByEmail: async (email) => {
        // "await" literally pauses this function here until the DB answers.
        // without it, JS will trigger the db query but won't wait for the answer and return the value right away.
        let sqlString = "SELECT * FROM users WHERE email=?";
        const [rows] = await pool.query(sqlString, [email]);
        // destructuring: [rows] should be looked at as "one" variable
        // it automatically chops off every other element beside first one and name it "rows".
        //                       trigger the database query
        // returns a big array of exactly 2 items every time we run a query.
        // 0: the actual data (the rows or the success message)
        // 1: technical metadata about the table fields

        // the 2nd argument: has to always be a list of values to be passed into ? placeholders.
        const firstUser = rows[0];
        return firstUser;
    },

    // create a new user
    create: async (firstName, lastName, email, passwordHash) => {
        let sqlString =
            "INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)";
        const [results] = await pool.query(sqlString, [
            firstName,
            lastName,
            email,
            passwordHash,
        ]);
        return results.insertId;
    },

    //
    checkCookie: async (id) => {
        // req.user.id comes from the decoded token in the protect middleware
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
            id,
        ]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return rows[0];
        // res.json({ user: rows[0] }); // This now includes the email!
    },
};

module.exports = User;

// when we run a SELECT query, mysql returns an Array of rows.
// when we run an INSERT query, mysql returns an Object (called a Header):
// {
//   fieldCount: 0,
//   affectedRows: 1, // How many rows were added
//   insertId: 42,    // THE ID OF THE NEW ROW (Auto-incremented)
//   info: "",
//   serverStatus: 2,
//   warningStatus: 0
// }
// So results.insertId is the specific ID that the database just assigned to the new user. We return it so the frontend knows "User #42 was just created."

// const:
// does not mean the value is immutable.
// it means the variable name cannot be pointed to a new thing.
// For example: const user = {name: "Seth"};
//  user.name = "Bon";       ALLOWED (we are changing the internal state)
// user = {name: "Another"}; ERROR
