const express = require("express");
const dotenv = require("dotenv");
const { testConnection } = require("./config/db");

// router imports
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

//
const cors = require("cors");
// If we don't put the above, then we'll get the following error from the broser:
//(index):1 Access to XMLHttpRequest at 'http://localhost:3000/api/auth/login' from origin 'http://localhost:5173'
// has been blocked by CORS policy: Response to preflight request doesn't pass access
// control check: No 'Access-Control-Allow-Origin' header is present on the requested
// resource.

// 1. load env vars
dotenv.config();

// 2. initialize app
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors()); // allows backend port to talk to frontend port.



// 3. Middleware
app.use(express.json()); // allows the app to understand JSON data sent in POST request
// without the above, the req.body will be undefined

// 4. Routes ()
app.get("/", async (req, res) => {
    // req: object containing info about the user/client (ip, data they sent and browser type)
    // res: an object containing tools to send data back.

    res.send("API is running 🍰!");
});

app.use("/api/auth", authRoutes);
// In authRoutes.js, we defined the path as /register.
// In index.js, we mount it at /api/auth.
// The Result: The final URL will be combined:
// http://localhost:3000/api/auth/register.

app.use("/api/tasks", taskRoutes);

// 5. start the server
app.listen(PORT, async () => {
    // binds the application to the network port and start the event loop (listening for clicks)
    console.log(`🚀 Server running on port ${PORT}`);

    // test the db connection when the server starts
    await testConnection();
});
