const Task = require("../models/taskModel");
const { taskValidation } = require("../validations/taskValidation");

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = taskValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Create task with the user ID from auth middleware
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// Get all tasks of the logged-in user
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort("-createdAt");
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// Update task by ID and user ownership
exports.updateTask = async (req, res, next) => {
  try {

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// Delete task by ID and user ownership
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task._id);
  } catch (err) {
    next(err);
  }
};
