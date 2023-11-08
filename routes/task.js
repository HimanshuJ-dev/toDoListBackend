const express = require("express");
const { body } = require("express-validator");

const taskController = require('../controllers/task');

const router = express.Router();

router.post('/new-task', taskController.postAddTask);

router.get('/tasks', taskController.getTasks);

router.put('/edit-task', taskController.updateTasks);

router.delete('/delete-task', taskController.deleteTask);

module.exports = router;