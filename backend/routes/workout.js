const express = require("express");
const router = express.Router();
const { 
    getAllTaskHandler,
    createTaskHandler,
    getTaskByID,
    deleteTask,
    updateTask,
} = require('../controllers/taskController');

router.get("/", getAllTaskHandler);
router.get("/:id", getTaskByID);
router.post("/", createTaskHandler);
router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);

module.exports = router;
