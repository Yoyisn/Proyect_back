const { getTasks, createTask, getTask, updateTask, deleteTasks, getAllTasks } = require('../Controllers/tasks.controller.js');
const { validateSchema } = require('../Middlewares/validator.middleware.js');

const { authRequired } = require('../Middlewares/validateToken.js');
const  createTaskSchema  = require('../Schemas/task.schema.js');

const { Router } = require('express');
const router = Router();

router.get('/tasks', authRequired, getTasks);

router.get('/tasks/:id', authRequired, getTask);

router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask);

router.put('/tasks/:id', authRequired, updateTask);

router.delete('/tasks/:id', authRequired, deleteTasks);

router.get('/comunityProblems', authRequired, getAllTasks);

module.exports = router;