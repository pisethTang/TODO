const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST route
router.post("/register", authController.register);

router.post("/login", authController.login);

// when to use { } (named exports) : when a file is a "Toolbox" containing many different tools (like a Controller with reister, login, logout).
// we want to pick and choose which tool grab.

module.exports = router; // a direct export (no curly braces are required). The file itself is the tool.

// with the above syntax, we can just write:
// const authRoutes = require('./routes/authRoutes');
// app.use(authRoutes); // Clean.

// but with the { }, then we would have to index into it:
// const authRoutes = require('./routes/authRoutes');
// app.use(authRoutes.router); // Clunky!
