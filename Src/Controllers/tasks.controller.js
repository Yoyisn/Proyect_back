const Task = require('../Models/task.model.js');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"});
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).populate('user')
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"});
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description, dispositive, date } = req.body;

    const newTask = new Task({
        title,
        description,
        dispositive,
        date,
        user: req.user.id
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"});
    }
}

const getTask = async (req, res) => {
    try {
     const task = await Task.findById(req.params.id).populate('user');
    if (!task) return res.status(404).json({"message": "Task not found"})
    res.json(task)
    } catch (error) {
        return res.status(404).json({message: "Task not found"});
    }
};

const deleteTasks = async (req, res) => {
    try {
     const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({"message": "Task not found"})
    return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({message: "Task not found"});
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!task) return res.status(404).json({"message": "Task not found"})
        res.json(task)
    } catch (error) {
        return res.status(404).json({message: "Task not found"});
    }
};

module.exports = { getAllTasks, getTasks, createTask, getTask, deleteTasks, updateTask };