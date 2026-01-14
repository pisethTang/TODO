const express = require("express");
const router = express.Router();
const {createTask, getMyTasks, deleteTask, updateTask} =require("../controllers/taskController");
const {protect} = require("../middleware/authMiddleware");



// every route in this file should be protected 
// notice that we put 'protect' before the controller function 
router.post("/", protect, createTask);
router.get("/", protect, getMyTasks); // get all tasks 
router.delete("/:id", protect, deleteTask); 
// the colon acts as a variable placeholder. When Express sees this colon, it will grab whatever is in front of it (which is the taskID) and then put it inside the req.params object.
// The Workflow:
// Postman calls DELETE /api/tasks/2.
// Express matches this URL against your route /:id.
// Express parses the URL, finds the value 2, and automatically creates: req.params = { id: '2' }.
// This happens before your code even runs.

router.put("/:id", protect, updateTask);




module.exports = router;